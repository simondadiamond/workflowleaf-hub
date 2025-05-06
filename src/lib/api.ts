const API_URL = '/api';

export async function signUp(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ action: 'signUp', email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return response.json();
}

export async function signIn(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ action: 'signIn', email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return response.json();
}

export async function signOut() {
  const response = await fetch(`${API_URL}/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ action: 'signOut' }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return response.json();
}

export async function getMaintenanceRequests(userId: string) {
  const response = await fetch(`${API_URL}/maintenance-requests-search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': userId,
    },
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return response.json();
}

export async function createMaintenanceRequest(
  userId: string,
  data: {
    unit: string;
    category: string;
    description: string;
  }
) {
  const response = await fetch(`${API_URL}/maintenance`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': userId,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return response.json();
}

// New: Update maintenance status
export async function updateMaintenanceStatus(requestId: string, newStatus: string) {
  const url = `${API_URL}/update-maintenance-status?requestId=${encodeURIComponent(requestId)}&newStatus=${encodeURIComponent(newStatus)}`;
  const response = await fetch(url, { method: 'POST' });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }
  return response.json();
}

// New: Fetch notes for a request
export async function getMaintenanceNotes(requestId: string) {
  const url = `${API_URL}/get-maintenance-notes?requestId=${encodeURIComponent(requestId)}`;
  const response = await fetch(url);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }
  return response.json();
}

// New: Add a note to a request
export async function addMaintenanceNote(requestId: string, noteText: string) {
  const url = `${API_URL}/add-maintenance-note?requestId=${encodeURIComponent(requestId)}&noteText=${encodeURIComponent(noteText)}`;
  const response = await fetch(url, { method: 'POST' });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }
  return response.json();
}
