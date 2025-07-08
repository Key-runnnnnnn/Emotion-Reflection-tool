from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi.responses import JSONResponse
import os
import google.generativeai as genai
from dotenv import load_dotenv
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextInput(BaseModel):
    text: str

# Load Gemini API key from environment
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel("gemini-2.5-flash-preview-05-20")
else:
    model = None

@app.post("/analyze")
async def analyze_emotion(input: TextInput):
    if not model:
        return JSONResponse(content={"error": "Gemini API key not configured."}, status_code=500)
    prompt = (
        "Analyze the following reflection and reply with ONLY a single JSON object in this format: "
        '{"emotion": "<one word emotion>", "confidence": <confidence between 0 and 1>} ' 
        "and nothing else. Reflection: " + input.text
    )
    try:
        response = model.generate_content(prompt)
        print("Gemini response:", response.text)  # Debug print
        import json
        # Try to find a JSON-like substring in the response
        start = response.text.find('{')
        end = response.text.rfind('}')
        if start != -1 and end != -1 and end > start:
            json_str = response.text[start:end+1]
            try:
                data = json.loads(json_str)
                return JSONResponse(content=data)
            except Exception as e:
                return JSONResponse(content={"error": f"Failed to parse JSON: {e}", "raw": response.text}, status_code=500)
        else:
            return JSONResponse(content={"error": "Could not find JSON in Gemini response.", "raw": response.text}, status_code=500)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)



@app.get("/")
async def root():
    return {"message": "Hello World"}


