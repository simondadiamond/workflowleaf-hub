export type User = {
  id: string;
  email?: string;
  full_name?: string;
  role?: 'property_manager' | 'tenant' | 'maintenance_staff';
};

export type MaintenanceRequest = {
  id: string;
  created_at: string;
  updated_at: string;
  unit: string;
  category: string;
  description: string;
  status: 'new' | 'assigned' | 'in_progress' | 'completed';
  user_id: string;
};

export type MaintenanceCategory = 
  'plumbing' | 
  'electrical' | 
  'hvac' | 
  'appliance' | 
  'structural' | 
  'pest_control' | 
  'other';
