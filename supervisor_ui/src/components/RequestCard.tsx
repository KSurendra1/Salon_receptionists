import React, { useState } from 'react'
import { format } from 'date-fns'
import { Clock, User, MessageSquare, Send, CheckCircle } from 'lucide-react'
import { HelpRequest } from '../lib/mockData'

interface RequestCardProps {
  request: HelpRequest
  onResolve: (id: string, answer: string) => Promise<boolean>
}

export function RequestCard({ request, onResolve }: RequestCardProps) {
  const [isAnswering, setIsAnswering] = useState(false)
  const [answer, setAnswer] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!answer.trim()) return

    setSubmitting(true)
    const success = await onResolve(request.id, answer.trim())
    if (success) {
      setIsAnswering(false)
      setAnswer('')
    }
    setSubmitting(false)
  }

  const isPending = request.status === 'pending'

  return (
    <div className={`bg-white rounded-lg border-2 transition-all duration-200 ${
      isPending 
        ? 'border-rose-200 shadow-md hover:shadow-lg' 
        : 'border-green-200 shadow-sm'
    }`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <User className="w-4 h-4" />
            <span className="font-medium">{request.caller_id}</span>
            <span className="text-gray-400">•</span>
            <Clock className="w-4 h-4" />
            <span>{format(new Date(request.created_at), 'MMM d, h:mm a')}</span>
          </div>
          <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${
            isPending 
              ? 'bg-rose-100 text-rose-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {isPending ? (
              <>
                <Clock className="w-3 h-3" />
                <span>Pending</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-3 h-3" />
                <span>Resolved</span>
              </>
            )}
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-start space-x-2 mb-3">
            <MessageSquare className="w-5 h-5 text-rose-500 mt-0.5" />
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Customer Question:</h3>
              <p className="text-gray-700 leading-relaxed">{request.question}</p>
            </div>
          </div>

          {request.answer && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-2">Answer Provided:</h4>
              <p className="text-green-800">{request.answer}</p>
              {request.resolved_at && (
                <p className="text-sm text-green-600 mt-2">
                  Resolved on {format(new Date(request.resolved_at), 'MMM d, yyyy at h:mm a')}
                </p>
              )}
            </div>
          )}
        </div>

        {isPending && !isAnswering && (
          <button
            onClick={() => setIsAnswering(true)}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Answer This Request
          </button>
        )}

        {isAnswering && (
          <form onSubmit={handleSubmit} className="mt-4">
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here..."
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
              required
            />
            <div className="flex space-x-3 mt-3">
              <button
                type="submit"
                disabled={!answer.trim() || submitting}
                className="flex items-center space-x-2 bg-rose-600 hover:bg-rose-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Submitting...' : 'Submit Answer'}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAnswering(false)
                  setAnswer('')
                }}
                className="py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}