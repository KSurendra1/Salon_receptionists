import React from 'react'
import { Search, Filter } from 'lucide-react'

interface SearchFilterProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  statusFilter: 'all' | 'pending' | 'resolved'
  onStatusChange: (status: 'all' | 'pending' | 'resolved') => void
}

export function SearchFilter({ 
  searchTerm, 
  onSearchChange, 
  statusFilter, 
  onStatusChange 
}: SearchFilterProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by caller ID or keywords..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value as 'all' | 'pending' | 'resolved')}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          >
            <option value="all">All Requests</option>
            <option value="pending">Pending Only</option>
            <option value="resolved">Resolved Only</option>
          </select>
        </div>
      </div>
    </div>
  )
}