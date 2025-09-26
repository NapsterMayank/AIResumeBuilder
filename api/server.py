import os
import json
from http.server import BaseHTTPRequestHandler
import google.generativeai as genai

# This is the Vercel Serverless Function
class handler(BaseHTTPRequestHandler):

    def do_POST(self):
        # 1. Get the API key from Vercel's environment variables
        api_key = os.environ.get('GEMINI_API_KEY')

        if not api_key:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": "GEMINI_API_KEY not set"}).encode())
            return

        # 2. Configure the Gemini client
        genai.configure(api_key=api_key)

        try:
            # 3. Read the incoming request data from the user
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            request_body = json.loads(post_data)
            
            # Assuming the frontend sends JSON like: {"prompt": "Hello"}
            user_prompt = request_body.get('prompt')

            if not user_prompt:
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"error": "Prompt is missing from request body"}).encode())
                return

            # 4. Generate content using the Gemini model
            model = genai.GenerativeModel('gemini-pro')
            response = model.generate_content(user_prompt)

            # 5. Send a successful JSON response back to the frontend
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"text": response.text}).encode())

        except Exception as e:
            # Send a detailed error response if something goes wrong
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())
            
        return