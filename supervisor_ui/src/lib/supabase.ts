// This file is kept for type compatibility but not used
export type HelpRequest = {
  id: string
  caller_id: string
  question: string
  answer: string | null
  status: 'pending' | 'resolved'
  created_at: string
  resolved_at: string | null
}

export type KnowledgeBaseEntry = {
  id: string
  question_keywords: string
  answer: string
  created_at: string
  updated_at: string
}