import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { MaintenanceRequest, MaintenanceCategory, MaintenanceStatus } from '../../types';
import { getCategoryLabel, getStatusLabel, getStatusColor, formatDate } from '../../lib/utils';
import { MaintenanceRequestModal } from './MaintenanceRequestModal';

const STATUS_OPTIONS: { label: string; value: MaintenanceStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'New', value: 'new' },
  { label: 'Assigned', value: 'assigned' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'On Hold', value: 'on_hold' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
];

// Debounce helper
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export function MaintenanceList() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [statusFilter, setStatusFilter] = useState<MaintenanceStatus | 'all'>('all');
  const [unitFilter, setUnitFilter] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

  // Fetch distinct units for filter dropdown
  const [units, setUnits] = useState<string[]>([]);
  const [unitsLoading, setUnitsLoading] = useState(false);
  const [unitsError, setUnitsError] = useState<string | null>(null);

  // Fetch units on mount
  useEffect(() => {
    const fetchUnits = async () => {
      setUnitsLoading(true);
      setUnitsError(null);
      try {
        const res = await fetch('/api/maintenance-requests-units');
        if (!res.ok) throw new Error('Failed to fetch units');
        const data: string[] = await res.json();
        setUnits(data);
      } catch (err) {
        setUnitsError((err as Error).message);
      } finally {
        setUnitsLoading(false);
      }
    };
    fetchUnits();
  }, []);

  const fetchRequests = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const payload = {
        status: statusFilter === 'all' ? null : statusFilter,
        unit: unitFilter || null,
        search: debouncedSearchTerm || null,
      };

      const res = await fetch('/api/maintenance-requests-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch maintenance requests: ${res.statusText}`);
      }

      const data: MaintenanceRequest[] = await res.json();
      setRequests(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [user, statusFilter, unitFilter, debouncedSearchTerm]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  return (
    <>
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-3 sm:space-y-0">
        {/* Status Filter */}
        <div className="flex flex-col">
          <label htmlFor="statusFilter" className="text-sm font-medium text-gray-700 mb-1">
            Filter by Status
          </label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as MaintenanceStatus | 'all')}
            className="rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
          >
            {STATUS_OPTIONS.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Unit Filter */}
        <div className="flex flex-col flex-grow min-w-[150px]">
          <label htmlFor="unitFilter" className="text-sm font-medium text-gray-700 mb-1">
            Filter by Unit/Property
          </label>
          {unitsLoading ? (
            <div className="text-gray-500 py-2">Loading units...</div>
          ) : unitsError ? (
            <div className="text-red-600 py-2">{unitsError}</div>
          ) : (
            <select
              id="unitFilter"
              value={unitFilter}
              onChange={(e) => setUnitFilter(e.target.value)}
              className="rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
            >
              <option value="">All Units</option>
              {units.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Search Input */}
        <div className="flex flex-col flex-grow min-w-[150px]">
          <label htmlFor="searchInput" className="text-sm font-medium text-gray-700 mb-1">
            Search Requests
          </label>
          <input
            id="searchInput"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by description or other"
            className="rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading requests...</div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">{error}</div>
      ) : requests.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg shadow">
          <p className="text-gray-500">No maintenance requests found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell max-w-xs">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((request) => (
                <tr
                  key={request.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedRequestId(request.id)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedRequestId(request.id);
                    }
                  }}
                  role="button"
                  aria-label={`View details for request in unit ${request.unit}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {request.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getCategoryLabel(request.category)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate hidden sm:table-cell">
                    {request.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getStatusColor(request.status)}`}
                    >
                      {getStatusLabel(request.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                    {formatDate(request.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <MaintenanceRequestModal
        requestId={selectedRequestId}
        onClose={() => setSelectedRequestId(null)}
      />
    </>
  );
}
