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

// Initial mock data
export const initialHelpRequests: HelpRequest[] = [
  {
    id: '1',
    caller_id: '+1-555-0123',
    question: 'What are your hours on Sunday?',
    answer: null,
    status: 'pending',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    resolved_at: null
  },
  {
    id: '2',
    caller_id: '+1-555-0456',
    question: 'Do you offer hair coloring services for special events?',
    answer: null,
    status: 'pending',
    created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    resolved_at: null
  },
  {
    id: '3',
    caller_id: '+1-555-0789',
    question: 'Can I get a manicure and pedicure together in one appointment?',
    answer: null,
    status: 'pending',
    created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    resolved_at: null
  },
  {
    id: '4',
    caller_id: '+1-555-0101',
    question: 'What is your cancellation policy?',
    answer: null,
    status: 'pending',
    created_at: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    resolved_at: null
  },
  {
    id: '5',
    caller_id: '+1-555-0234',
    question: 'Do you accept walk-ins?',
    answer: 'Yes, we accept walk-ins but appointments are recommended to avoid wait times. Walk-ins are served on a first-come, first-served basis.',
    status: 'resolved',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    resolved_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 15 * 60 * 1000).toISOString()
  },
  {
    id: '6',
    caller_id: '+1-555-0567',
    question: 'What payment methods do you accept?',
    answer: 'We accept cash, all major credit cards (Visa, MasterCard, American Express), debit cards, and mobile payments (Apple Pay, Google Pay).',
    status: 'resolved',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    resolved_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 20 * 60 * 1000).toISOString()
  }
]

// Local storage helpers
export const getStoredRequests = (): HelpRequest[] => {
  try {
    const stored = localStorage.getItem('glamour-salon-requests')
    return stored ? JSON.parse(stored) : initialHelpRequests
  } catch {
    return initialHelpRequests
  }
}

export const saveRequests = (requests: HelpRequest[]): void => {
  try {
    localStorage.setItem('glamour-salon-requests', JSON.stringify(requests))
  } catch (error) {
    console.error('Failed to save requests to localStorage:', error)
  }
}

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9)
}