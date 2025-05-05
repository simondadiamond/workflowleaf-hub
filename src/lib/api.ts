// Centralized API utility for calling Netlify functions

export async function fetchMaintenanceRequests() {
  const res = await fetch('/api/maintenance');
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to fetch maintenance requests');
  }
  return res.json();
}

export async function createMaintenanceRequest(requestData: {
  unit: string;
  category: string;
  description: string;
  status: string;
  user_id: string;
}) {
  const res = await fetch('/api/maintenance', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestData),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to create maintenance request');
  }
  return res.json();
}

export async function fetchProfiles() {
  const res = await fetch('/api/profiles');
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to fetch profiles');
  }
  return res.json();
}

export async function upsertProfile(profileData: {
  id: string;
  full_name: string;
  role: string;
}) {
  const res = await fetch('/api/profiles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profileData),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to update profile');
  }
  return res.json();
}
