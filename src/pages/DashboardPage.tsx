import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { useEffect, useState } from 'react';

interface MaintenanceRequest {
  id: string;
  created_at: string;
  updated_at: string;
  unit: string;
  category: string;
  description: string;
  status: string;
  user_id: string;
}

export function DashboardPage() {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRequests() {
      try {
        const res = await fetch('/api/maintenance');
        if (!res.ok) {
          throw new Error('Failed to fetch maintenance requests');
        }
        const data = await res.json();
        setRequests(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchRequests();
  }, []);

  return (
    <DashboardLayout>
      {loading && <p>Loading maintenance requests...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <ul>
          {requests.map((req) => (
            <li key={req.id}>
              <strong>{req.category}</strong> - {req.description} (Status: {req.status})
            </li>
          ))}
        </ul>
      )}
    </DashboardLayout>
  );
}
