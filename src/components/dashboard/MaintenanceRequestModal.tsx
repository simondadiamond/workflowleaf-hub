import { useEffect, useState } from 'react';
import { MaintenanceRequest } from '../../types';
import { formatDate, getCategoryLabel, getStatusLabel, getStatusColor } from '../../lib/utils';

interface MaintenanceRequestModalProps {
  requestId: string | null;
  onClose: () => void;
}

export function MaintenanceRequestModal({ requestId, onClose }: MaintenanceRequestModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [request, setRequest] = useState<MaintenanceRequest | null>(null);

  useEffect(() => {
    if (!requestId) {
      setRequest(null);
      setError(null);
      setLoading(false);
      return;
    }

    const fetchRequest = async () => {
      setLoading(true);
      setError(null);
      try {
        // Use new flat API endpoint with query parameter
        const res = await fetch(`/api/maintenance-requests-id?id=${encodeURIComponent(requestId)}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch request details: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        setRequest(data);
      } catch (err) {
        setError((err as Error).message);
        setRequest(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [requestId]);

  if (!requestId) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 id="modal-title" className="text-xl font-semibold mb-4">
          Maintenance Request Details
        </h2>

        {loading && <p className="text-center py-8">Loading details...</p>}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
            {error}
          </div>
        )}

        {!loading && !error && request && (
          <div className="space-y-4 text-gray-800">
            <div>
              <strong>Unit/Location:</strong> {request.unit}
            </div>
            <div>
              <strong>Category:</strong> {getCategoryLabel(request.category)}
            </div>
            <div>
              <strong>Description:</strong>
              <p className="whitespace-pre-wrap mt-1">{request.description}</p>
            </div>
            <div>
              <strong>Status:</strong>{' '}
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                {getStatusLabel(request.status)}
              </span>
            </div>
            <div>
              <strong>Date Submitted:</strong> {formatDate(request.created_at)}
            </div>
            <div>
              <strong>Last Updated:</strong> {formatDate(request.updated_at)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
