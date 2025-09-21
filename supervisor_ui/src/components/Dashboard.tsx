import React, { useState, useMemo } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { useHelpRequests } from '../hooks/useHelpRequests'
import { RequestCard } from './RequestCard'
import { SearchFilter } from './SearchFilter'
import { Headphones, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react'

export function Dashboard() {
  const { requests, loading, error, refetch, resolveRequest } = useHelpRequests()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'resolved'>('all')

  const filteredRequests = useMemo(() => {
    return requests.filter(request => {
      const matchesSearch = searchTerm === '' || 
        request.caller_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (request.answer && request.answer.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesStatus = statusFilter === 'all' || request.status === statusFilter
      
      return matchesSearch && matchesStatus
    })
  }, [requests, searchTerm, statusFilter])

  const pendingRequests = filteredRequests.filter(r => r.status === 'pending')
  const resolvedRequests = filteredRequests.filter(r => r.status === 'resolved')

  const handleResolve = async (id: string, answer: string) => {
    const success = await resolveRequest(id, answer)
    if (success) {
      toast.success('Request resolved successfully!')
    } else {
      toast.error('Failed to resolve request. Please try again.')
    }
    return success
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-rose-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading requests...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={refetch}
            className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-3">
              <div className="bg-rose-600 p-2 rounded-lg">
                <Headphones className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Glamour Salon</h1>
                <p className="text-gray-600">AI Receptionist Supervisor Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm">
                <div className="flex items-center space-x-1 text-rose-600">
                  <AlertCircle className="w-4 h-4" />
                  <span className="font-medium">{pendingRequests.length}</span>
                  <span>Pending</span>
                </div>
                <span className="text-gray-400">•</span>
                <div className="flex items-center space-x-1 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">{resolvedRequests.length}</span>
                  <span>Resolved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
        />

        {filteredRequests.length === 0 ? (
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {statusFilter === 'pending' ? 'No pending requests' : 
               statusFilter === 'resolved' ? 'No resolved requests' : 
               'No requests found'}
            </h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try adjusting your search terms.' : 'All customer queries are handled!'}
            </p>
          </div>
        ) : (
          <>
            {/* Pending Requests */}
            {pendingRequests.length > 0 && (statusFilter === 'all' || statusFilter === 'pending') && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertCircle className="w-5 h-5 text-rose-500 mr-2" />
                  Pending Requests ({pendingRequests.length})
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {pendingRequests.map(request => (
                    <RequestCard
                      key={request.id}
                      request={request}
                      onResolve={handleResolve}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Resolved Requests */}
            {resolvedRequests.length > 0 && (statusFilter === 'all' || statusFilter === 'resolved') && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Resolved Requests ({resolvedRequests.length})
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {resolvedRequests.map(request => (
                    <RequestCard
                      key={request.id}
                      request={request}
                      onResolve={handleResolve}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}