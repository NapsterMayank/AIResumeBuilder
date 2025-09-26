from http.server import BaseHTTPRequestHandler
import os
import json
import requests

class handler(BaseHTTPRequestHandler):
    def _set_cors_headers(self, status_code=200):
        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_OPTIONS(self):
        # Handle CORS preflight requests
        self._set_cors_headers()

    def do_POST(self):
        try:
            # Get request data
            content_length = int(self.headers.get('Content-Length', 0))
            if content_length == 0:
                self._set_cors_headers(400)
                self.wfile.write(json.dumps({'error': 'No data received'}).encode('utf-8'))
                return
            
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))

            # Basic validation
            if not data or 'inputType' not in data or 'text' not in data:
                self._set_cors_headers(400)
                self.wfile.write(json.dumps({'error': 'Missing required fields: inputType and text.'}).encode('utf-8'))
                return

            # Get environment variables
            GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
            if not GEMINI_API_KEY:
                self._set_cors_headers(500)
                self.wfile.write(json.dumps({'error': 'Server configuration error: Missing API key.'}).encode('utf-8'))
                return
            
            # Special debug endpoint
            if data.get('inputType') == 'debug':
                self._set_cors_headers(200)
                debug_info = {
                    'status': 'API is working',
                    'hasApiKey': bool(GEMINI_API_KEY),
                    'keyPrefix': GEMINI_API_KEY[:10] + '...' if GEMINI_API_KEY else 'None'
                }
                self.wfile.write(json.dumps(debug_info).encode('utf-8'))
                return

            # Construct prompt and call Gemini API
            prompt = construct_prompt(
                data.get('inputType'),
                data.get('text'),
                data.get('keywords', []),
                data.get('experienceLevel')
            )
            
            # Try different model endpoints in order of preference
            model_endpoints = [
                "gemini-2.0-flash",
                "gemini-1.5-flash",
                "gemini-1.5-flash-latest", 
                "gemini-pro",
                "gemini-1.0-pro"
            ]
            
            api_response = None
            last_error = None
            
            for model in model_endpoints:
                try:
                    API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={GEMINI_API_KEY}"
                    payload = {"contents": [{"parts": [{"text": prompt}]}]}
                    
                    api_response = requests.post(API_URL, json=payload)
                    api_response.raise_for_status()
                    break  # Success - exit the loop
                    
                except requests.exceptions.RequestException as e:
                    last_error = e
                    continue  # Try next model
            
            if api_response is None:
                # All models failed
                raise last_error or Exception("All model endpoints failed")

            api_data = api_response.json()
            rewritten_text = api_data.get('candidates', [{}])[0].get('content', {}).get('parts', [{}])[0].get('text')

            if rewritten_text:
                # Send success response ONLY after everything has worked
                self._set_cors_headers(200)
                self.wfile.write(json.dumps({'rewrittenText': rewritten_text.strip()}).encode('utf-8'))
            else:
                self._set_cors_headers(500)
                self.wfile.write(json.dumps({'error': 'Failed to extract text from AI response.'}).encode('utf-8'))

        except requests.exceptions.RequestException as e:
            # Handle API-specific errors without exposing sensitive info
            error_message = "Failed to connect to AI service. Please try again."
            if hasattr(e, 'response') and e.response is not None:
                if e.response.status_code == 400:
                    error_message = "Invalid request to AI service."
                elif e.response.status_code == 401:
                    error_message = "Authentication failed with AI service."
                elif e.response.status_code == 403:
                    error_message = "Access denied to AI service."
                elif e.response.status_code == 404:
                    error_message = "AI service endpoint not found."
                elif e.response.status_code >= 500:
                    error_message = "AI service is temporarily unavailable."
            
            self._set_cors_headers(500)
            self.wfile.write(json.dumps({'error': error_message}).encode('utf-8'))
            
        except Exception as e:
            # Send a single error response without sensitive details
            self._set_cors_headers(500)
            self.wfile.write(json.dumps({'error': 'An internal server error occurred. Please try again.'}).encode('utf-8'))

# --- CORRECTED: Only one definition of this function ---
def construct_prompt(input_type, text, keywords=None, experience_level=None):
    """Constructs a specific prompt for the LLM based on the regeneration type."""
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
    return prompts.get(input_type, text)