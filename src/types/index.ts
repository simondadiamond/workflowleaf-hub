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
  status: 'new' | 'assigned' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled';
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

export type MaintenanceNote = {
  id: string;
  request_id: string;
  content: string;
  created_at: string;
  user_id: string;
};
