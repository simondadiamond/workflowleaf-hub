import { useState } from 'react';
import { MaintenanceRequest } from '../../types';
import { MaintenanceRequestModal } from './MaintenanceRequestModal';
import { formatDate, getCategoryLabel, getStatusLabel, getStatusColor } from '../../lib/utils';

interface MaintenanceListProps {
  requests: MaintenanceRequest[];
  onRequestUpdated: (updatedRequest: MaintenanceRequest) => void;
}

export function MaintenanceList({ requests, onRequestUpdated }: MaintenanceListProps) {
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

  // Keyboard handler for row selection
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTableRowElement>, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedRequestId(id);
    }
  };

  return (
    <>
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
            {requests.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No maintenance requests found.
                </td>
              </tr>
            ) : (
              requests.map((request) => (
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
