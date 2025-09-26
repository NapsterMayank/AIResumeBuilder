from http.server import BaseHTTPRequestHandler
import os
import json
import requests

class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_POST(self):
        try:
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()

            content_length = int(self.headers.get('Content-Length', 0))
            if content_length == 0:
                self.wfile.write(json.dumps({'error': 'No data received'}).encode('utf-8'))
                return
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))

            if not data or 'inputType' not in data or 'text' not in data:
                self.wfile.write(json.dumps({'error': 'Missing required fields: inputType and text.'}).encode('utf-8'))
                return

            GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
            if not GEMINI_API_KEY:
                self.wfile.write(json.dumps({'error': 'Server configuration error: Missing API key.'}).encode('utf-8'))
                return

            input_type = data.get('inputType')
            text = data.get('text')
            keywords = data.get('keywords', [])
            experience_level = data.get('experienceLevel')

            prompt = construct_prompt(input_type, text, keywords, experience_level)

            API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
            payload = {"contents": [{"parts": [{"text": prompt}]}]}
            api_response = requests.post(API_URL, json=payload)
            api_response.raise_for_status()
            api_data = api_response.json()
            rewritten_text = api_data.get('candidates', [{}])[0].get('content', {}).get('parts', [{}])[0].get('text')

            if rewritten_text:
                self.wfile.write(json.dumps({'rewrittenText': rewritten_text.strip()}).encode('utf-8'))
            else:
                self.wfile.write(json.dumps({'error': 'Failed to extract text from AI response.'}).encode('utf-8'))

        except requests.exceptions.RequestException as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'error': f'API request failed: {str(e)}'}).encode('utf-8'))
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'error': f'Server error: {str(e)}'}).encode('utf-8'))

def construct_prompt(input_type, text, keywords=None, experience_level=None):
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
        """,
        'cover_letter': f"""
            Act as a senior career coach and professional writer.
            Write a concise, personalized cover letter (3-5 short paragraphs) tailored to the role and company.
            Use a professional tone: {experience_level or 'professional'}.
            Keep sentences clear and ATS-friendly; avoid flowery language.
            If keywords are provided, weave them in naturally.

            INPUT CONTEXT:
            {text}

            Return ONLY the final cover letter text. No salutations beyond the letter itself.
        """,
        'mock_interview': f"""
            Act as an experienced technical interviewer.
            Generate 15 concise interview questions for the candidate.
            Mix difficulty (easy/medium/hard) and keep each question under 160 characters.
            Use bullet points with the • symbol, one question per line.

            CONTEXT:
            {text}

            Return ONLY bullet points like:
            • Question 1
            • Question 2
            • ...
        """,
    }
    return prompts.get(input_type, text)


