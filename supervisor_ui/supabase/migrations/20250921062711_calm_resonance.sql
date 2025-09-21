/*
  # Glamour Salon AI Receptionist - Help Requests System

  1. New Tables
    - `help_requests`
      - `id` (uuid, primary key)
      - `caller_id` (text) - Customer phone number or identifier
      - `question` (text) - The customer's question
      - `answer` (text, nullable) - Supervisor's answer
      - `status` (text) - 'pending' or 'resolved'
      - `created_at` (timestamp) - When the request was created
      - `resolved_at` (timestamp, nullable) - When it was resolved
    
    - `knowledge_base`
      - `id` (uuid, primary key)
      - `question_keywords` (text) - Keywords from the question
      - `answer` (text) - The standardized answer
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users (supervisors)
*/

CREATE TABLE IF NOT EXISTS help_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  caller_id text NOT NULL,
  question text NOT NULL,
  answer text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'resolved')),
  created_at timestamptz DEFAULT now(),
  resolved_at timestamptz
);

CREATE TABLE IF NOT EXISTS knowledge_base (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_keywords text NOT NULL,
  answer text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE help_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Supervisors can manage help requests"
  ON help_requests
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Supervisors can manage knowledge base"
  ON knowledge_base
  FOR ALL
  TO authenticated
  USING (true);

-- Insert some sample data for demonstration
INSERT INTO help_requests (caller_id, question, created_at) VALUES
  ('+1-555-0123', 'What are your hours on Sunday?', now() - interval '2 hours'),
  ('+1-555-0456', 'Do you offer hair coloring services for special events?', now() - interval '1 hour'),
  ('+1-555-0789', 'Can I get a manicure and pedicure together in one appointment?', now() - interval '30 minutes'),
  ('+1-555-0101', 'What is your cancellation policy?', now() - interval '10 minutes');

INSERT INTO help_requests (caller_id, question, answer, status, created_at, resolved_at) VALUES
  ('+1-555-0234', 'Do you accept walk-ins?', 'Yes, we accept walk-ins but appointments are recommended to avoid wait times. Walk-ins are served on a first-come, first-served basis.', 'resolved', now() - interval '3 days', now() - interval '3 days' + interval '15 minutes'),
  ('+1-555-0567', 'What payment methods do you accept?', 'We accept cash, all major credit cards (Visa, MasterCard, American Express), debit cards, and mobile payments (Apple Pay, Google Pay).', 'resolved', now() - interval '2 days', now() - interval '2 days' + interval '20 minutes');