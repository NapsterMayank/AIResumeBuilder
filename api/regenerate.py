import os
import json
import requests

def handler(request):
    """Main handler function for Vercel serverless function"""
    
    # Handle CORS preflight requests
    if request.method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            'body': ''
        }
    
    if request.method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        print("API function called - POST request received")
        
        # Parse request body
        try:
            if hasattr(request, 'get_json'):
                data = request.get_json()
            elif hasattr(request, 'json'):
                data = request.json
            else:
                body = getattr(request, 'data', getattr(request, 'body', '{}'))
                if isinstance(body, bytes):
                    body = body.decode('utf-8')
                data = json.loads(body) if body else {}
        except Exception as parse_error:
            print(f"Failed to parse request data: {parse_error}")
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                'body': json.dumps({'error': 'Invalid JSON in request body'})
            }
            
        print(f"Received data: {data}")

        # Basic validation
        if not data or 'inputType' not in data or 'text' not in data:
            print("Missing required fields")
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                'body': json.dumps({'error': 'Missing required fields: inputType and text.'})
            }

        # Get environment variables
        GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
        if not GEMINI_API_KEY:
            print("Missing API key")
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                'body': json.dumps({'error': 'Server configuration error: Missing API key.'})
            }

        print("API key found, proceeding with generation")
        
        input_type = data.get('inputType')
        text = data.get('text')
        keywords = data.get('keywords', [])
        experience_level = data.get('experienceLevel')

        # Construct prompt
        prompt = construct_prompt(input_type, text, keywords, experience_level)
        print(f"Generated prompt for {input_type}")

        # Call Gemini API
        API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
        payload = {
            "contents": [{"parts": [{"text": prompt}]}]
        }

        print("Calling Gemini API...")
        api_response = requests.post(API_URL, json=payload)
        api_response.raise_for_status()
        print("Gemini API call successful")

        api_data = api_response.json()
        rewritten_text = api_data.get('candidates', [{}])[0].get('content', {}).get('parts', [{}])[0].get('text')

        if rewritten_text:
            print("Successfully generated text, returning response")
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                'body': json.dumps({'rewrittenText': rewritten_text.strip()})
            }
        else:
            print("Failed to extract text from API response")
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                'body': json.dumps({'error': 'Failed to extract text from AI response.'})
            }

    except requests.exceptions.RequestException as e:
        print(f"API request error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            'body': json.dumps({'error': f'API request failed: {str(e)}'})
        }
        
    except Exception as e:
        print(f"General error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            'body': json.dumps({'error': f'Server error: {str(e)}'})
        }


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