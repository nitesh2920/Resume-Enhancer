from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline
import json

app = FastAPI()
saved_resumes = {}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the HuggingFace text generation pipeline once
text_generator = pipeline("text-generation", model="gpt2")

class EnhanceRequest(BaseModel):
    section: str
    content: str

class SaveResumeRequest(BaseModel):
    resume_id: str
    data: dict

@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.post("/ai-enhance")
async def ai_enhance(req: EnhanceRequest):
    try:
        # Parse content if JSON stringified
        content = json.loads(req.content)
    except:
        content = req.content

    # Prepare text input for AI enhancement
    if isinstance(content, dict):
        # Join dict values to a string for AI generation
        text_input = " ".join(str(v) for v in content.values())
    elif isinstance(content, str):
        text_input = content
    else:
        text_input = str(content)

    # Generate enhanced text using GPT-2
    generated = text_generator(text_input, max_length=100, num_return_sequences=1)
    enhanced_text = generated[0]['generated_text']

    # Return enhanced result - keep structure if original was dict
    if isinstance(content, dict):
        # For simplicity, just put enhanced text as a single field 'enhanced'
        enhanced = {"enhanced_text": enhanced_text}
    else:
        enhanced = enhanced_text

    return {"enhanced": enhanced}


# use below ai_enhace for demo above one takes time to reply .

# async def ai_enhance(req: EnhanceRequest):
#     # Simulate AI enhancement (fake enhancement)
#     try:
#         content = json.loads(req.content)
#     except:
#         content = req.content

#     if isinstance(content, dict):
#         enhanced = {k: v + " [AI Enhanced]" for k, v in content.items()}
#     elif isinstance(content, str):
#         enhanced = content + " [AI Enhanced]"
#     else:
#         enhanced = content

#     return {"enhanced": enhanced}



@app.post("/save-resume")
async def save_resume(req: SaveResumeRequest):
    saved_resumes[req.resume_id] = req.data
    return {"status": "ok", "saved_id": req.resume_id}

@app.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    # Fake parse: return dummy JSON
    dummy = {
        "name": "John Doe",
        "summary": "Experienced developer.",
        "experience": [{"company": "Acme", "role": "Engineer", "years": "2018-2021"}],
        "education": [{"school": "XYZ University", "degree": "B.Sc"}],
        "skills": ["Python", "React"]
    }
    return {"filename": file.filename, "resume": dummy}
