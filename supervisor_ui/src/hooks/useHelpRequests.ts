import { useState, useEffect } from 'react'
import { HelpRequest, getStoredRequests, saveRequests } from '../lib/mockData'

export function useHelpRequests() {
  const [requests, setRequests] = useState<HelpRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchRequests = async () => {
    try {
      setLoading(true)
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const data = getStoredRequests()
      setRequests(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const resolveRequest = async (id: string, answer: string) => {
    try {
      const updatedRequests = requests.map(request => 
        request.id === id 
          ? {
              ...request,
              answer,
              status: 'resolved' as const,
              resolved_at: new Date().toISOString()
            }
          : request
      )

      setRequests(updatedRequests)
      saveRequests(updatedRequests)

      // Simulate AI notification
      console.log(`🤖 AI System Notified: Request ${id} resolved with answer: "${answer}"`)
      
      // Update knowledge base (simulate)
      const request = requests.find(r => r.id === id)
      if (request) {
        console.log(`📚 Knowledge Base Updated: "${request.question}" -> "${answer}"`)
      }

      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resolve request')
      return false
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  return {
    requests,
    loading,
    error,
    refetch: fetchRequests,
    resolveRequest
  }
}