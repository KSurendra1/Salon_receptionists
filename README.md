# Salon Receptionists Project

This repository contains both the backend and frontend (Supervisor UI) for the Salon Receptionists project. The system manages help requests from receptionists, provides a supervisor dashboard, and maintains a knowledge base of learned answers.

---

## Backend (`backend/`)

### Overview
The backend manages help requests, agent and assistant logic, and provides APIs for the supervisor UI. It uses Python, SQLite, and FastAPI.

### Features
- Manage and store help requests in a SQLite database
- Agent and assistant logic for handling requests
- API endpoints for help requests and learned answers
- Modular code structure for easy maintenance and extension

### Setup Instructions
1. **Navigate to the backend directory:**
   ```sh
   cd backend
   ```
2. **Install Python dependencies:**
   ```sh
   pip install -r requirements.txt
   ```
3. **Set up environment variables:**
   - Copy `.env.example` to `.env` and fill in the required values (if applicable).
4. **Run the backend agent:**
   ```sh
   python agent.py
   ```
5. **Run the API server (for UI integration):**
   ```sh
   uvicorn api:app --reload
   ```

### File Descriptions
- `agent.py` - Main entry point for the backend agent logic
- `assistant.py` - Assistant-related logic and functions
- `help_request.py` - Help request data models and database interactions
- `api.py` - FastAPI app exposing API endpoints
- `help_requests.db` - SQLite database file
- `prompts.py` - Prompt templates and related logic
- `tools.py` - Utility functions and tools
- `requirements.txt` - Python dependencies
- `README.md` - This documentation file

### Requirements
- Python 3.10+
- See `requirements.txt` for Python package dependencies

---

## Supervisor UI (`supervisor_ui/`)

### Overview
The Supervisor UI is a React-based dashboard for supervisors to view, filter, and manage help requests, as well as review the knowledge base of learned answers.

### Features
- Dashboard to view all help requests
- Search and filter functionality
- Request cards with detailed information
- "Learned Answers" section to display knowledge base
- Integration with backend and Supabase
- Built with React, TypeScript, Vite, and Tailwind CSS

### Setup Instructions
1. **Navigate to the UI directory:**
   ```sh
   cd supervisor_ui
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Configure environment variables (if required):**
   - Create a `.env` file in the root and add your Supabase or API keys as needed.
4. **Run the development server:**
   ```sh
   npm run dev
   ```
   The app will be available at `http://localhost:5173` by default.

### Project Structure
- `src/` - Source code
  - `App.tsx` - Main application component
  - `main.tsx` - Entry point
  - `index.css` - Global styles (Tailwind CSS)
  - `components/` - UI components (Dashboard, RequestCard, SearchFilter, LearnedAnswers)
  - `hooks/` - Custom React hooks
  - `lib/` - Utility libraries
- `supabase/` - Database migrations and configuration
- `index.html` - Main HTML file
- `package.json` - Project dependencies and scripts
- `vite.config.ts` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration

### Requirements
- Node.js 18+
- npm 9+

### Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

---

## License
Specify your license here (e.g., MIT, Apache 2.0, etc.)
