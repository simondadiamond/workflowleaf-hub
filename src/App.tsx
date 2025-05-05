import React, { useEffect, useState } from 'react';

interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  // add other fields as needed
}

const App: React.FC = () => {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRequests() {
      try {
        const res = await fetch('/api/maintenance');
        if (!res.ok) {
          throw new Error(`Error fetching data: ${res.statusText}`);
        }
        const data: MaintenanceRequest[] = await res.json();
        setRequests(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchRequests();
  }, []);

  if (loading) return <div>Loading maintenance requests...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Maintenance Requests</h1>
      <ul>
        {requests.map((req) => (
          <li key={req.id}>
            <strong>{req.title}</strong>: {req.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
