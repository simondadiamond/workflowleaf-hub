import { useState } from 'react';
import { MaintenanceForm } from './MaintenanceForm';
import { MaintenanceList } from './MaintenanceList';

export function Dashboard() {
  const [refreshList, setRefreshList] = useState(0);
  
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
                <p className="text-2xl font-bold text-blue-600">3</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                <h3 className="text-sm font-medium text-yellow-800">In Progress</h3>
                <p className="text-2xl font-bold text-yellow-600">2</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <h3 className="text-sm font-medium text-green-800">Completed</h3>
                <p className="text-2xl font-bold text-green-600">5</p>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Request Intelligence</h3>
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Example:</span> When a request contains keywords like "no hot water" or "water heater", the system automatically categorizes it as <span className="font-medium text-blue-600">Plumbing</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Maintenance Requests</h2>
        <MaintenanceList key={refreshList} />
      </div>
    </div>
  );
}