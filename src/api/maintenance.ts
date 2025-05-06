/* 
  Maintenance API calls updated for flat Netlify function structure.
  */

import axios from 'axios';

const API_BASE = '/api';

export async function fetchUnits() {
  const res = await axios.get(`${API_BASE}/maintenance-requests-units`);
  return res.data;
}

export async function searchRequests(payload: {
  status?: string | null;
  unit?: string | null;
  search?: string | null;
}) {
  const res = await axios.post(`${API_BASE}/maintenance-requests-search`, payload);
  return res.data;
}

export async function fetchRequestById(id: string) {
  const res = await axios.get(`${API_BASE}/maintenance-requests-id`, { params: { id } });
  return res.data;
}
