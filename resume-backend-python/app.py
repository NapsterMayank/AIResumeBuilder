# app.py
# A secure backend service in Python to interact with the Google Gemini API.

import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

app = Flask(__name__)
# Enable Cross-Origin Resource Sharing for your React app
CORS(app)

# --- LLM API Configuration ---
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"

def construct_prompt(input_type, text, keywords=None, experience_level=None):
    """
    Constructs a specific prompt for the LLM based on the regeneration type.
    This is the core of "prompt engineering".
    """
    if keywords is None:
        keywords = []

    keyword_text = f"Incorporate these keywords seamlessly: {', '.join(keywords)}." if keywords else ""
    experience_text = f"The candidate's experience level is {experience_level}." if experience_level else ""

    prompts = {
        'objective': f"""
            Act as an expert career coach and resume writer. 
            Rewrite the following professional objective to be concise, powerful, and ATS-friendly. 
            The rewritten objective should be a single paragraph, no more than 3-4 sentences.
            It must be tailored for a tech industry role.
            {experience_text}
            {keyword_text}

            Original Objective: "{text}"
            
            Return only the rewritten objective text, without any introductory phrases.
        """,
        'experience': f"""
            Act as an expert technical resume writer. 
            
            IMPORTANT FORMATTING REQUIREMENTS:
            - Create exactly 3-5 concise bullet points
            - Each bullet point must be 1-2 sentences maximum (under 150 characters)
            - Start each bullet point with a strong action verb
            - Use the STAR method (Situation, Task, Action, Result)
            - Include quantified achievements with specific metrics when possible
            - Format as bullet points using the • symbol
            - Each bullet point should be on a separate line
            
            {experience_text}
            {keyword_text}

            Original Experience: "{text}"

            Return ONLY the bullet points in this exact format:
            • [First bullet point with action verb and quantified result]
            • [Second bullet point with action verb and quantified result]
            • [Third bullet point with action verb and quantified result]
            
            Do not include any introductory text or explanations.
        """,
        'project_description': f"""
            Act as an expert technical resume writer and project portfolio specialist.
            
            Create a professional, concise project description (2-3 sentences maximum, under 200 characters total).
            Focus on the technical implementation, problem solved, and impact.
            
            REQUIREMENTS:
            - Start with what the project does/solves
            - Mention key technologies used
            - Include a quantifiable impact or technical achievement if possible
            - Make it ATS-friendly and recruiter-readable
            - Keep it concise and impactful
            
            {keyword_text}

            Project Context: "{text}"
            
            Return only the project description, without any introductory phrases.
        """,
        'project_highlights': f"""
            Act as an expert technical resume writer.
            
            Create exactly 3-4 professional project highlight bullet points based on the project context.
            
            FORMATTING REQUIREMENTS:
            - Each bullet point must be 1-2 sentences maximum (under 130 characters)
            - Start with strong action verbs (Built, Implemented, Developed, Architected, etc.)
            - Include specific technical details and quantified results when possible
            - Focus on technical challenges solved and achievements
            - Format as bullet points using the • symbol
            - Each bullet point should be on a separate line
            
            {keyword_text}

            Project Context: "{text}"

            Return ONLY the bullet points in this exact format:
            • [First highlight with action verb and technical detail]
            • [Second highlight with action verb and quantified result]
            • [Third highlight with action verb and technical achievement]
            
            Do not include any introductory text or explanations.
        """
    }
    return prompts.get(input_type, text) # Fallback to original text if type is unknown
@app.route('/api/regenerate', methods=['POST'])
def regenerate():
    """API endpoint to handle regeneration requests."""
    data = request.get_json()

    # 1. Basic Validation
    if not data or 'inputType' not in data or 'text' not in data:
        return jsonify({'error': 'Missing required fields: inputType and text.'}), 400
    
    if not GEMINI_API_KEY:
        return jsonify({'error': 'Server configuration error: Missing API key.'}), 500

    input_type = data.get('inputType')
    text = data.get('text')
    keywords = data.get('keywords')
    experience_level = data.get('experienceLevel')
    
    # 2. Construct the Prompt
    prompt = construct_prompt(input_type, text, keywords, experience_level)

    # 3. Call the Gemini API
    payload = {
        "contents": [{"parts": [{"text": prompt}]}]
    }
    
    try:
        response = requests.post(API_URL, json=payload)
        response.raise_for_status()  # Raise an exception for bad status codes (4xx or 5xx)

        # 4. Extract and Send the Response
        api_data = response.json()
        rewritten_text = api_data.get('candidates', [{}])[0].get('content', {}).get('parts', [{}])[0].get('text')

        if rewritten_text:
            return jsonify({'rewrittenText': rewritten_text.strip()})
        else:
            print(f"Unexpected API response structure: {api_data}")
            return jsonify({'error': 'Failed to extract text from AI response.'}), 500

    except requests.exceptions.RequestException as e:
        print(f"Error calling Gemini API: {e}")
        return jsonify({'error': 'An error occurred while regenerating the content.'}), 500

if __name__ == '__main__':
    # Runs the app on port 5000 by default.
    # You can change this, e.g., app.run(port=3001, debug=True)
    app.run(debug=True, port=5000)

