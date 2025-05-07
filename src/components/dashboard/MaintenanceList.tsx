import { useState, useMemo } from 'react';
import { MaintenanceRequest } from '../../types';
import { MaintenanceRequestModal } from './MaintenanceRequestModal';
import { formatDate, getCategoryLabel, getStatusLabel, getStatusColor } from '../../lib/utils';

interface MaintenanceListProps {
  requests: MaintenanceRequest[];
  onRequestUpdated: (updatedRequest: MaintenanceRequest) => void;
}

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'plumbing', label: 'Plumbing' },
  { value: 'electrical', label: 'Electrical' },
  { value: 'hvac', label: 'HVAC' },
  { value: 'appliance', label: 'Appliance' },
  { value: 'structural', label: 'Structural' },
  { value: 'pest_control', label: 'Pest Control' },
  { value: 'other', label: 'Other' },
];

const statuses = [
  { value: '', label: 'All Statuses' },
  { value: 'new', label: 'New' },
  { value: 'assigned', label: 'Assigned' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'on_hold', label: 'On Hold' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

export function MaintenanceList({ requests, onRequestUpdated }: MaintenanceListProps) {
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Keyboard handler for row selection
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTableRowElement>, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedRequestId(id);
    }
  };

  // Filter requests based on search and filters
  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const matchesSearch =
        request.unit.toLowerCase().includes(searchText.toLowerCase()) ||
        request.description.toLowerCase().includes(searchText.toLowerCase());

      const matchesCategory = filterCategory ? request.category === filterCategory : true;
      const matchesStatus = filterStatus ? request.status === filterStatus : true;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [requests, searchText, filterCategory, filterStatus]);

  return (
    <>
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
        <label htmlFor="search" className="sr-only">
          Search maintenance requests
        </label>
        <input
          id="search"
          type="search"
          placeholder="Search by unit or description"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full sm:w-64 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          aria-label="Search maintenance requests by unit or description"
        />

        <label htmlFor="filter-category" className="sr-only">
          Filter by category
        </label>
        <select
          id="filter-category"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="w-full sm:w-48 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          aria-label="Filter maintenance requests by category"
        >
          {categories.map(({ value, label }) => (
            <option key={value || 'all'} value={value}>
              {label}
            </option>
          ))}
        </select>

        <label htmlFor="filter-status" className="sr-only">
          Filter by status
        </label>
        <select
          id="filter-status"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full sm:w-48 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          aria-label="Filter maintenance requests by status"
        >
          {statuses.map(({ value, label }) => (
            <option key={value || 'all'} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto border border-gray-300 rounded-md">
        <table className="min-w-full divide-y divide-gray-200" role="grid" aria-label="Maintenance requests table">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Unit
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Description
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRequests.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No maintenance requests found.
                </td>
              </tr>
            ) : (
              filteredRequests.map((request) => (
                <tr
                  key={request.id}
                  tabIndex={0}
                  role="button"
                  onClick={() => setSelectedRequestId(request.id)}
                  onKeyDown={(e) => handleKeyDown(e, request.id)}
                  className="cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-pressed={selectedRequestId === request.id}
                  aria-label={`Maintenance request for unit ${request.unit}, category ${getCategoryLabel(
                    request.category
                  )}, status ${getStatusLabel(request.status)}, submitted on ${formatDate(request.created_at)}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.unit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{getCategoryLabel(request.category)}</td>
                  <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-600 max-w-xs truncate">{request.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}
                    >
                      {getStatusLabel(request.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(request.created_at)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedRequestId && (
        <MaintenanceRequestModal
          requestId={selectedRequestId}
          onClose={() => setSelectedRequestId(null)}
          onRequestUpdated={onRequestUpdated}
        />
      )}
    </>
  );
}
