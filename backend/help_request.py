import sqlite3
from datetime import datetime

DB_FILE = "help_requests.db"

def init_db():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS help_requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            caller_id TEXT,
            timestamp TEXT,
            question TEXT,
            status TEXT
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS learned_answers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            question TEXT NOT NULL,
            answer TEXT NOT NULL,
            learned_at TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()

def create_help_request(caller_id: str, question: str):
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    timestamp = datetime.utcnow().isoformat()
    cursor.execute("""
        INSERT INTO help_requests (caller_id, timestamp, question, status)
        VALUES (?, ?, ?, ?)
    """, (caller_id, timestamp, question, "pending"))
    conn.commit()
    conn.close()
    # Simulate notifying supervisor
    print(f"[SUPERVISOR NOTIFICATION] New help request from {caller_id}: '{question}'")


# --- Knowledge Base: Learned Answers ---
def save_learned_answer(question: str, answer: str):
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    learned_at = datetime.utcnow().isoformat()
    cursor.execute("""
        INSERT INTO learned_answers (question, answer, learned_at)
        VALUES (?, ?, ?)
    """, (question, answer, learned_at))
    conn.commit()
    conn.close()

def get_learned_answers():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute("SELECT id, question, answer, learned_at FROM learned_answers ORDER BY learned_at DESC")
    results = cursor.fetchall()
    conn.close()
    return [
        {"id": row[0], "question": row[1], "answer": row[2], "learned_at": row[3]}
        for row in results
    ]
