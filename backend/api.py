from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from help_request import get_learned_answers, init_db

app = FastAPI()

# Allow CORS for local dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    init_db()

@app.get("/api/learned-answers")
def api_learned_answers():
    return {"learned_answers": get_learned_answers()}
