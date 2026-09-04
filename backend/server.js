/**
 * Cloud-Based Hotel Room Maintenance Tracker
 * Node.js + Express REST API
 *
 * Endpoints:
 *   GET    /api/rooms                 -> list all rooms
 *   POST   /api/rooms                 -> add a room
 *   PATCH  /api/rooms/:id             -> update room status
 *
 *   GET    /api/maintenance           -> list all maintenance requests
 *   POST   /api/maintenance           -> create a new maintenance request
 *   PATCH  /api/maintenance/:id       -> update status (Pending/In Progress/Resolved)
 *   DELETE /api/maintenance/:id       -> delete a request
 *
 * Data is persisted to local JSON files under /data so the demo works
 * without a database. Swap `readData`/`writeData` for a real DB
 * (MongoDB/DynamoDB/etc.) when deploying to the cloud.
 */

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const ROOMS_FILE = path.join(__dirname, "data", "rooms.json");
const MAINTENANCE_FILE = path.join(__dirname, "data", "maintenance.json");

function readData(file) {
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

function writeData(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function nextId(items) {
  return items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1;
}

// ---------- ROOMS ----------

app.get("/api/rooms", (req, res) => {
  res.json(readData(ROOMS_FILE));
});

app.post("/api/rooms", (req, res) => {
  const { number, floor, status } = req.body;
  if (!number || !floor) {
    return res.status(400).json({ error: "number and floor are required" });
  }
  const rooms = readData(ROOMS_FILE);
  const newRoom = {
    id: nextId(rooms),
    number,
    floor,
    status: status || "Available",
  };
  rooms.push(newRoom);
  writeData(ROOMS_FILE, rooms);
  res.status(201).json(newRoom);
});

app.patch("/api/rooms/:id", (req, res) => {
  const rooms = readData(ROOMS_FILE);
  const room = rooms.find((r) => r.id === parseInt(req.params.id));
  if (!room) return res.status(404).json({ error: "Room not found" });
  Object.assign(room, req.body);
  writeData(ROOMS_FILE, rooms);
  res.json(room);
});

// ---------- MAINTENANCE REQUESTS ----------

app.get("/api/maintenance", (req, res) => {
  res.json(readData(MAINTENANCE_FILE));
});

app.post("/api/maintenance", (req, res) => {
  const { roomNumber, issue, priority } = req.body;
  if (!roomNumber || !issue) {
    return res.status(400).json({ error: "roomNumber and issue are required" });
  }
  const requests = readData(MAINTENANCE_FILE);
  const newRequest = {
    id: nextId(requests),
    roomNumber,
    issue,
    priority: priority || "Medium",
    status: "Pending",
    reportedDate: new Date().toISOString(),
    resolvedDate: null,
  };
  requests.push(newRequest);
  writeData(MAINTENANCE_FILE, requests);

  // Optionally reflect on the room's status
  const rooms = readData(ROOMS_FILE);
  const room = rooms.find((r) => r.number === roomNumber);
  if (room) {
    room.status = "Under Maintenance";
    writeData(ROOMS_FILE, rooms);
  }

  res.status(201).json(newRequest);
});

app.patch("/api/maintenance/:id", (req, res) => {
  const requests = readData(MAINTENANCE_FILE);
  const item = requests.find((r) => r.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: "Request not found" });

  Object.assign(item, req.body);
  if (req.body.status === "Resolved" && !item.resolvedDate) {
    item.resolvedDate = new Date().toISOString();
  }
  writeData(MAINTENANCE_FILE, requests);
  res.json(item);
});

app.delete("/api/maintenance/:id", (req, res) => {
  let requests = readData(MAINTENANCE_FILE);
  const exists = requests.some((r) => r.id === parseInt(req.params.id));
  if (!exists) return res.status(404).json({ error: "Request not found" });
  requests = requests.filter((r) => r.id !== parseInt(req.params.id));
  writeData(MAINTENANCE_FILE, requests);
  res.status(204).end();
});

app.get("/", (req, res) => {
  res.send("Hotel Room Maintenance Tracker API is running.");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
