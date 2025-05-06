import { useState, useEffect } from 'react';
import { MaintenanceForm } from './MaintenanceForm';
import { MaintenanceList } from './MaintenanceList';
import { MaintenanceRequest } from '../../types';
import { searchRequests } from '../../api/maintenance';

export function Dashboard() {
  const [refreshList, setRefreshList] = useState(0);
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch requests on mount and when refreshList changes
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await searchRequests({});
        setRequests(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [refreshList]);

  // Called when a request is updated in modal (e.g., status changed)
  const handleRequestUpdated = (updatedRequest: MaintenanceRequest) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === updatedRequest.id ? updatedRequest : req))
    );
  };

  const handleRequestSubmitted = () => {
    setRefreshList((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <MaintenanceForm onRequestSubmitted={handleRequestSubmitted} />
        </div>
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-6 h-full">
            <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="text-sm font-medium text-blue-800">Open Requests</h3>
                <p className="text-2xl font-bold text-blue-600">
                  {requests.filter((r) => r.status === 'new').length}
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                <h3 className="text-sm font-medium text-yellow-800">In Progress</h3>
                <p className="text-2xl font-bold text-yellow-600">
                  {requests.filter((r) => r.status === 'in_progress').length}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <h3 className="text-sm font-medium text-green-800">Completed</h3>
                <p className="text-2xl font-bold text-green-600">
                  {requests.filter((r) => r.status === 'completed').length}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Request Intelligence</h3>
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Example:</span> When a request contains keywords like "no hot water" or "water heater", the system automatically categorizes it as{' '}
                  <span className="font-medium text-blue-600">Plumbing</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Maintenance Requests</h2>
        {loading && <p className="text-gray-500">Loading requests...</p>}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
            {error}
          </div>
        )}
        {!loading && !error && (
          <MaintenanceList requests={requests} onRequestUpdated={handleRequestUpdated} />
        )}
      </div>
    </div>
  );
}
