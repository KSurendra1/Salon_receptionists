# Salon Receptionists Supervisor UI

This is the frontend Supervisor UI for the Salon Receptionists project. It provides a dashboard for supervisors to view, filter, and manage help requests from receptionists, as well as a knowledge base of learned answers.

## Features

- Dashboard to view all help requests
- Search and filter functionality
- Request cards with detailed information
- "Learned Answers" section to display knowledge base
- Integration with backend and Supabase
- Built with React, TypeScript, Vite, and Tailwind CSS

## Setup Instructions

1. **Install dependencies**:
   ```sh
   npm install
   ```

2. **Configure environment variables** (if required):
   - Create a `.env` file in the root and add your Supabase or API keys as needed.

3. **Run the development server**:
   ```sh
   npm run dev
   ```
   The app will be available at `http://localhost:5173` by default.

## Project Structure

- `src/`
  - `App.tsx` - Main application component
  - `main.tsx` - Entry point
  - `index.css` - Global styles (Tailwind CSS)
  - `components/` - UI components (Dashboard, RequestCard, SearchFilter, LearnedAnswers)
  - `hooks/` - Custom React hooks (e.g., `useHelpRequests.ts`)
  - `lib/` - Utility libraries (e.g., Supabase client, mock data)
- `supabase/` - Database migrations and configuration
- `index.html` - Main HTML file
- `package.json` - Project dependencies and scripts
- `vite.config.ts` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration

## Requirements

- Node.js 18+
- npm 9+

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## License

Specify your license here (e.g., MIT, Apache 2.0, etc.)
