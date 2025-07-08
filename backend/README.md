# Emotion Reflection Tool – Backend (FastAPI)

This is the backend API for the Emotion Reflection Tool. It uses FastAPI and integrates with the Gemini API for emotion analysis.

---

## Features
- Receives text input via POST `/analyze`
- Returns detected emotion and confidence score
- CORS enabled for frontend integration
- Gemini API integration for real emotion analysis

---

## Setup Instructions

### 1. Create and activate a virtual environment
- On Windows CMD:
  ```cmd
  python -m venv .venv
  .venv\Scripts\activate.bat
  ```
- On PowerShell:
  ```powershell
  python -m venv .venv
  .venv\Scripts\Activate.ps1
  ```
- On Bash:
  ```sh
  python -m venv .venv
  source .venv/Scripts/activate
  ```

### 2. Install dependencies
```sh
pip install -r requirements.txt
```

### 3. Set up Gemini API Key
Create a `.env` file in the `backend/` folder:
```
GEMINI_API_KEY=your-gemini-api-key-here
```

### 4. Run the backend server
```sh
python -m uvicorn main:app --reload --port 8000
```

The backend will be available at [http://localhost:8000](http://localhost:8000)
