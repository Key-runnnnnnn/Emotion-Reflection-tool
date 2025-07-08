# Emotion Reflection Tool

A mobile-first web app for reflecting on your emotions. Built with React + Tailwind (frontend) and FastAPI (backend), powered by the Gemini API for real emotion analysis.

---

## Features
- Enter a short reflection and get an emotion + confidence score
- Animated, mobile-friendly UI with emoji feedback
- Gemini API integration for dynamic emotion analysis

---

## Project Structure

```
Emotion Reflection tool/
├── backend/    # FastAPI backend
├── frontend/   # React + Vite + Tailwind frontend
```

---

## Frontend Setup (React + Tailwind)

1. **Install dependencies**
   ```sh
   cd frontend
   npm install
   ```
2. **Run the frontend dev server**
   ```sh
   npm run dev
   ```
   The frontend will be available at [http://localhost:5173](http://localhost:5173)

---

## Backend Setup (FastAPI)

1. **Create and activate a virtual environment**
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
2. **Install dependencies**
   ```sh
   cd backend
   pip install -r requirements.txt
   ```
3. **Set up Gemini API Key**
   - Create a `.env` file in the `backend/` folder:
     ```
     GEMINI_API_KEY=your-gemini-api-key-here
     ```
4. **Run the backend server**
   ```sh
   python -m uvicorn main:app --reload --port 8000
   ```
   The backend will be available at [http://localhost:8000](http://localhost:8000)

---

## Deployment

### Deploy Backend (FastAPI) to Render
- **Root Directory:** `backend`
- **Build Command:** `pip install -r requirements.txt`
- **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
- **Environment Variables:** Set `GEMINI_API_KEY` in Render dashboard

### Deploy Frontend (React) to Render
- **Root Directory:** `frontend`
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `dist`
- **Update API URL:** Make sure your frontend fetches from the deployed backend URL

---

## Troubleshooting
- If you see a `500 Internal Server Error`, check your Gemini API key and backend logs.
- Make sure both servers are running and ports are correct.
- For Windows, always activate your virtual environment before installing dependencies or running the backend.
- For font 404 errors, ensure the font file exists in `frontend/public/` or update your CSS.