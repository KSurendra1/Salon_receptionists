# Salon Receptionists Backend

This is the backend service for the Salon Receptionists project. It manages help requests, agent and assistant logic, and provides APIs for the supervisor UI.

## Features

- Manage and store help requests in a SQLite database
- Agent and assistant logic for handling requests
- Modular code structure for easy maintenance and extension

## Setup Instructions

1. **Clone the repository** and navigate to the `backend` directory:
	```sh
	git clone <repo-url>
	cd backend
	```

2. **Install Python dependencies**:
	```sh
	pip install -r requirements.txt
	```

3. **Set up environment variables**:
	- Copy `.env.example` to `.env` and fill in the required values (if applicable).

4. **Run the backend**:
	```sh
	python agent.py
	```

## File Descriptions

- `agent.py` - Main entry point for the backend agent logic.
- `assistant.py` - Contains assistant-related logic and functions.
- `help_request.py` - Manages help request data models and database interactions.
- `help_requests.db` - SQLite database file for storing help requests.
- `prompts.py` - Contains prompt templates and related logic.
- `tools.py` - Utility functions and tools used by the backend.
- `requirements.txt` - Python dependencies.
- `package.json` - (If using Node.js tools/scripts)
- `README.md` - This documentation file.

## Requirements

- Python 3.10+
- See `requirements.txt` for Python package dependencies

## License

Specify your license here (e.g., MIT, Apache 2.0, etc.)
