import React, { useEffect, useState, useCallback } from "react";
import "./App.css";

// Base URL of the Node.js/Express backend.
const API_BASE = "http://localhost:5000/api";

function RoomTile({ room }) {
  const cls = `room-tile room-${room.status.replace(/\s+/g, "-")}`;
  return (
    <div className={cls}>
      Room {room.number}
      <small>Floor {room.floor}</small>
      <small>{room.status}</small>
    </div>
  );
}

function RequestRow({ request, onUpdate, onDelete }) {
  return (
    <tr>
      <td>{request.roomNumber}</td>
      <td>{request.issue}</td>
      <td>{request.priority}</td>
      <td>
        <span className={`badge badge-${request.status.replace(/\s+/g, "-")}`}>
          {request.status}
        </span>
      </td>
      <td>{new Date(request.reportedDate).toLocaleString()}</td>
      <td className="actions">
        {request.status !== "In Progress" && request.status !== "Resolved" && (
          <button className="btn-progress" onClick={() => onUpdate(request.id, "In Progress")}>
            Start
          </button>
        )}
        {request.status !== "Resolved" && (
          <button className="btn-resolve" onClick={() => onUpdate(request.id, "Resolved")}>
            Resolve
          </button>
        )}
        <button className="btn-delete" onClick={() => onDelete(request.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default function App() {
  const [rooms, setRooms] = useState([]);
  const [requests, setRequests] = useState([]);
  const [form, setForm] = useState({ roomNumber: "", issue: "", priority: "Medium" });
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const [roomsRes, requestsRes] = await Promise.all([
        fetch(`${API_BASE}/rooms`),
        fetch(`${API_BASE}/maintenance`),
      ]);
      setRooms(await roomsRes.json());
      setRequests(await requestsRes.json());
    } catch (err) {
      console.error("Failed to load data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.roomNumber || !form.issue) return;
    await fetch(`${API_BASE}/maintenance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ roomNumber: "", issue: "", priority: "Medium" });
    loadData();
  };

  const updateStatus = async (id, status) => {
    await fetch(`${API_BASE}/maintenance/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    loadData();
  };

  const deleteRequest = async (id) => {
    await fetch(`${API_BASE}/maintenance/${id}`, { method: "DELETE" });
    loadData();
  };

  return (
    <div className="app">
      <header>
        <h1>🏨 Hotel Room Maintenance Tracker</h1>
        <p>Cloud-based dashboard for tracking room status &amp; maintenance requests</p>
      </header>

      <main>
        <section className="card">
          <h2>Rooms</h2>
          {loading ? (
            <p>Loading rooms...</p>
          ) : (
            <div className="grid">
              {rooms.map((room) => (
                <RoomTile key={room.id} room={room} />
              ))}
            </div>
          )}
        </section>

        <section className="card">
          <h2>Report a Maintenance Issue</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Room Number (e.g. 101)"
              value={form.roomNumber}
              onChange={(e) => setForm({ ...form, roomNumber: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Describe the issue"
              value={form.issue}
              onChange={(e) => setForm({ ...form, issue: e.target.value })}
              required
            />
            <select
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <button type="submit">Submit Request</button>
          </form>
        </section>

        <section className="card">
          <h2>Maintenance Requests</h2>
          <table>
            <thead>
              <tr>
                <th>Room</th>
                <th>Issue</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Reported</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <RequestRow key={r.id} request={r} onUpdate={updateStatus} onDelete={deleteRequest} />
              ))}
            </tbody>
          </table>
        </section>
      </main>

      <footer>
        <p>&copy; 2026 Hotel Room Maintenance Tracker</p>
      </footer>
    </div>
  );
}
