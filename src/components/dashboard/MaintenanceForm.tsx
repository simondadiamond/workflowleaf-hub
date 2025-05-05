import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { MaintenanceCategory } from '../../types';

interface MaintenanceFormProps {
  onRequestSubmitted: () => void;
}

export function MaintenanceForm({ onRequestSubmitted }: MaintenanceFormProps) {
  const { user } = useAuth();
  const [unit, setUnit] = useState('');
  const [category, setCategory] = useState<MaintenanceCategory>('other');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const { error } = await supabase.from('maintenance_requests').insert({
        unit,
        category,
        description,
        status: 'new',
        user_id: user.id,
      });
      
      if (error) throw error;
      
      setSuccess(true);
      setUnit('');
      setCategory('other');
      setDescription('');
      onRequestSubmitted();
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError((err as Error).message || 'Failed to submit request');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Submit New Maintenance Request</h2>
      
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
          Maintenance request submitted successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Property Unit/Location"
          id="unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          placeholder="e.g., Apartment 101"
          required
        />
        
        <div className="space-y-2">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as MaintenanceCategory)}
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
            required
          >
            <option value="plumbing">Plumbing</option>
            <option value="electrical">Electrical</option>
            <option value="hvac">HVAC</option>
            <option value="appliance">Appliance</option>
            <option value="structural">Structural</option>
            <option value="pest_control">Pest Control</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
            placeholder="Please describe the issue in detail"
            required
          />
        </div>
        
        <Button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Request'}
        </Button>
      </form>
    </div>
  );
}
