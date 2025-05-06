import { useEffect, useState } from 'react';
import { MaintenanceRequest, MaintenanceNote } from '../../types';
import { formatDate, getCategoryLabel, getStatusLabel, getStatusColor } from '../../lib/utils';
import {
  updateMaintenanceStatus,
  getMaintenanceNotes,
  addMaintenanceNote,
} from '../../lib/api';
import { useAuth } from '../../context/AuthContext';

interface MaintenanceRequestModalProps {
  requestId: string | null;
  onClose: () => void;
  onRequestUpdated?: (updatedRequest: MaintenanceRequest) => void;
}

const STATUS_OPTIONS = [
  { value: 'new', label: 'New' },
  { value: 'assigned', label: 'Assigned' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'on_hold', label: 'On Hold (e.g., Waiting Parts)' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

export function MaintenanceRequestModal({ requestId, onClose, onRequestUpdated }: MaintenanceRequestModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [request, setRequest] = useState<MaintenanceRequest | null>(null);

  // Status update state
  const [status, setStatus] = useState<string>('');
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [statusSuccess, setStatusSuccess] = useState<string | null>(null);

  // Notes state
  const [notes, setNotes] = useState<MaintenanceNote[]>([]);
  const [notesLoading, setNotesLoading] = useState(false);
  const [notesError, setNotesError] = useState<string | null>(null);
  const [newNote, setNewNote] = useState('');
  const [noteAdding, setNoteAdding] = useState(false);
  const [noteAddError, setNoteAddError] = useState<string | null>(null);

  // Auth
  const { user } = useAuth();

  // Fetch request details and notes
  useEffect(() => {
    if (!requestId) {
      setRequest(null);
      setError(null);
      setLoading(false);
      setStatus('');
      setNotes([]);
      setNotesError(null);
      setNotesLoading(false);
      return;
    }

    const fetchRequest = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/maintenance-requests-id?id=${encodeURIComponent(requestId)}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch request details: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        setRequest(data);
        setStatus(data.status);
      } catch (err) {
        setError((err as Error).message);
        setRequest(null);
      } finally {
        setLoading(false);
      }
    };

    const fetchNotes = async () => {
      setNotesLoading(true);
      setNotesError(null);
      try {
        const notesData = await getMaintenanceNotes(requestId);
        setNotes(
          Array.isArray(notesData)
            ? notesData.sort((a, b) => b.created_at.localeCompare(a.created_at))
            : []
        );
      } catch (err) {
        setNotesError((err as Error).message);
        setNotes([]);
      } finally {
        setNotesLoading(false);
      }
    };

    fetchRequest();
    fetchNotes();
  }, [requestId]);

  // Status update handler
  const handleStatusUpdate = async () => {
    if (!requestId || !status) return;
    setStatusUpdating(true);
    setStatusError(null);
    setStatusSuccess(null);
    try {
      await updateMaintenanceStatus(requestId, status);
      setStatusSuccess('Status updated successfully.');
      // Update local request state
      setRequest((prev) => (prev ? { ...prev, status } : prev));
      // Notify parent about update
      if (request) {
        onRequestUpdated?.({ ...request, status });
      }
    } catch (err) {
      setStatusError((err as Error).message);
    } finally {
      setStatusUpdating(false);
      setTimeout(() => setStatusSuccess(null), 2000);
    }
  };

  // Add note handler
  const handleAddNote = async () => {
    if (!requestId || !newNote.trim() || !user?.id) {
      setNoteAddError('You must be signed in to add a note.');
      return;
    }
    setNoteAdding(true);
    setNoteAddError(null);
    try {
      const added = await addMaintenanceNote(requestId, newNote.trim(), user.id);
      setNotes((prev) => [added, ...prev]);
      setNewNote('');
    } catch (err) {
      setNoteAddError((err as Error).message);
    } finally {
      setNoteAdding(false);
    }
  };

  if (!requestId) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 id="modal-title" className="text-xl font-semibold mb-4">
          Maintenance Request Details
        </h2>

        {loading && <p className="text-center py-8">Loading details...</p>}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
            {error}
          </div>
        )}

        {!loading && !error && request && (
          <div className="space-y-4 text-gray-800">
            <div>
              <strong>Unit/Location:</strong> {request.unit}
            </div>
            <div>
              <strong>Category:</strong> {getCategoryLabel(request.category)}
            </div>
            <div>
              <strong>Description:</strong>
              <p className="whitespace-pre-wrap mt-1">{request.description}</p>
            </div>
            <div>
              <strong>Status:</strong>{' '}
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                {getStatusLabel(request.status)}
              </span>
            </div>
            {/* Editable status dropdown */}
            <div className="flex items-center gap-2 mt-2">
              <select
                className="border rounded px-2 py-1 text-sm"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                disabled={statusUpdating}
                aria-label="Update status"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm disabled:opacity-60"
                onClick={handleStatusUpdate}
                disabled={statusUpdating || status === request.status}
              >
                {statusUpdating ? 'Updating...' : 'Update Status'}
              </button>
              {statusError && (
                <span className="text-red-600 text-xs ml-2">{statusError}</span>
              )}
              {statusSuccess && (
                <span className="text-green-600 text-xs ml-2">{statusSuccess}</span>
              )}
            </div>
            <div>
              <strong>Date Submitted:</strong> {formatDate(request.created_at)}
            </div>
            <div>
              <strong>Last Updated:</strong> {formatDate(request.updated_at)}
            </div>
          </div>
        )}

        {/* Notes / Activity Log Section */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Notes / Activity Log</h3>
          <div className="flex flex-col gap-2 mb-4">
            <textarea
              className="border rounded px-2 py-1 min-h-[60px] resize-y"
              placeholder="Add a note or activity log..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              disabled={noteAdding}
              maxLength={1000}
            />
            <div className="flex items-center gap-2">
              <button
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm disabled:opacity-60"
                onClick={handleAddNote}
                disabled={noteAdding || !newNote.trim()}
              >
                {noteAdding ? 'Adding...' : 'Add Note'}
              </button>
              {noteAddError && (
                <span className="text-red-600 text-xs ml-2">{noteAddError}</span>
              )}
            </div>
          </div>
          {notesLoading ? (
            <p className="text-center text-gray-500">Loading notes...</p>
          ) : notesError ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md mb-2">
              {notesError}
            </div>
          ) : notes.length === 0 ? (
            <p className="text-gray-500 text-sm">No notes yet.</p>
          ) : (
            <ul className="space-y-2">
              {notes.map((note) => (
                <li key={note.id} className="bg-gray-50 border border-gray-200 rounded p-2">
                  <div className="text-xs text-gray-500 mb-1">
                    {formatDate(note.created_at, true)}
                  </div>
                  <div className="whitespace-pre-wrap">{note.content}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
