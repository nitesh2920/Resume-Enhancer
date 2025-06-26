# 🧠 AI Resume Enhancer - Backend

This is the **FastAPI backend** for the AI-powered Resume Enhancer application. It accepts resume uploads, parses and enhances content using OpenAI models, and provides endpoints for use in the frontend.

---

## 🚀 Features

- Upload and parse PDF/DOCX resumes
- Enhance sections like name, summary, experience, education, and skills using AI
- CORS-enabled for frontend integration
- Clean JSON output for use in frontend UI

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/nitesh2920/your-repo-name.git
cd your-repo-name/backend
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate
pip install -r requirements.txt

# run
uvicorn main:app --reload
```