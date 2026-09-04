// Base URL of the Node.js/Express backend.
// Change this if you deploy the backend to the cloud (e.g. an EC2/Render URL).
const API_BASE = "http://localhost:5000/api";

const roomsList = document.getElementById("rooms-list");
const requestsBody = document.getElementById("requests-body");
const form = document.getElementById("maintenance-form");

async function loadRooms() {
  const res = await fetch(`${API_BASE}/rooms`);
  const rooms = await res.json();
  roomsList.innerHTML = rooms
    .map(
      (room) => `
      <div class="room-tile room-${room.status.replace(/\s+/g, "-")}">
        Room ${room.number}
        <small>Floor ${room.floor}</small>
        <small>${room.status}</small>
      </div>`
    )
    .join("");
}

async function loadRequests() {
  const res = await fetch(`${API_BASE}/maintenance`);
  const requests = await res.json();
  requestsBody.innerHTML = requests
    .map(
      (r) => `
      <tr>
        <td>${r.roomNumber}</td>
        <td>${r.issue}</td>
        <td>${r.priority}</td>
        <td><span class="badge badge-${r.status.replace(/\s+/g, "-")}">${r.status}</span></td>
        <td>${new Date(r.reportedDate).toLocaleString()}</td>
        <td class="actions">
          ${
            r.status !== "In Progress" && r.status !== "Resolved"
              ? `<button class="btn-progress" onclick="updateStatus(${r.id}, 'In Progress')">Start</button>`
              : ""
          }
          ${
            r.status !== "Resolved"
              ? `<button class="btn-resolve" onclick="updateStatus(${r.id}, 'Resolved')">Resolve</button>`
              : ""
          }
          <button class="btn-delete" onclick="deleteRequest(${r.id})">Delete</button>
        </td>
      </tr>`
    )
    .join("");
}

async function updateStatus(id, status) {
  await fetch(`${API_BASE}/maintenance/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  loadRequests();
  loadRooms();
}

async function deleteRequest(id) {
  await fetch(`${API_BASE}/maintenance/${id}`, { method: "DELETE" });
  loadRequests();
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const roomNumber = document.getElementById("roomNumber").value.trim();
  const issue = document.getElementById("issue").value.trim();
  const priority = document.getElementById("priority").value;

  await fetch(`${API_BASE}/maintenance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ roomNumber, issue, priority }),
  });

  form.reset();
  loadRequests();
  loadRooms();
});

loadRooms();
loadRequests();
