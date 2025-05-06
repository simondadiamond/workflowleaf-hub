import { useState } from 'react';
import { MaintenanceRequest } from '../../types';
import { MaintenanceRequestModal } from './MaintenanceRequestModal';

interface MaintenanceListProps {
  requests: MaintenanceRequest[];
  onRequestUpdated: (updatedRequest: MaintenanceRequest) => void;
}

export function MaintenanceList({ requests, onRequestUpdated }: MaintenanceListProps) {
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

  return (
    <>
      <ul className="space-y-2">
        {requests.map((request) => (
          <li
            key={request.id}
            className="border border-gray-300 rounded p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => setSelectedRequestId(request.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setSelectedRequestId(request.id);
              }
            }}
          >
            <div className="flex justify-between items-center">
              <div>
                <strong>{request.unit}</strong> - {request.category}
              </div>
              <div
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  request.status === 'new'
                    ? 'bg-blue-100 text-blue-800'
                    : request.status === 'in_progress'
                    ? 'bg-yellow-100 text-yellow-800'
                    : request.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {request.status}
              </div>
            </div>
          </li>
        ))}
      </ul>

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
