# Cloud-Based Hotel Room Maintenance Tracker

A full-stack demo project for tracking hotel room status and maintenance
requests, built for a cloud computing course project.

## Structure

```
hotel-maintenance-tracker/
├── backend/            Node.js + Express REST API (JSON file storage)
│   ├── server.js
│   ├── package.json
│   └── data/
│       ├── rooms.json
│       └── maintenance.json
├── frontend-html/      Plain HTML + CSS + JavaScript client
│   ├── index.html
│   ├── style.css
│   └── script.js
└── frontend-react/     React.js client (same features, component-based)
    ├── package.json
    ├── public/index.html
    └── src/
        ├── index.js
        ├── App.jsx
        └── App.css
```

## Features

- View all hotel rooms with live status (Available / Occupied / Under Maintenance)
- Submit a maintenance request for a room (issue + priority)
- Track requests through Pending → In Progress → Resolved
- Delete resolved/invalid requests
- Room status auto-updates to "Under Maintenance" when a new request comes in

## 1. Run the backend (required by both frontends)

```bash
cd backend
npm install
npm start
```

The API runs at `http://localhost:5000`.

### API Endpoints

| Method | Endpoint                | Description                     |
|--------|--------------------------|----------------------------------|
| GET    | /api/rooms               | List all rooms                  |
| POST   | /api/rooms                | Add a room                      |
| PATCH  | /api/rooms/:id            | Update a room                   |
| GET    | /api/maintenance          | List all maintenance requests   |
| POST   | /api/maintenance          | Create a new request            |
| PATCH  | /api/maintenance/:id      | Update request status           |
| DELETE | /api/maintenance/:id      | Delete a request                |

## 2. Run the plain HTML/CSS/JS frontend

Just open `frontend-html/index.html` in a browser (or serve it with any
static server, e.g. `npx serve frontend-html`). Make sure the backend is
running first, since it calls `http://localhost:5000/api`.

## 3. Run the React frontend

```bash
cd frontend-react
npm install
npm start
```

Opens at `http://localhost:3000` and talks to the same backend API.

## Deploying to the cloud

- **Backend**: Deploy to Render, Railway, AWS EC2/Elastic Beanstalk, or
  Azure App Service. Replace the JSON-file storage in `server.js` with a
  real database (MongoDB Atlas, DynamoDB, or Amazon RDS) for production use.
- **Frontend (React)**: Build with `npm run build` and host the static
  files on AWS S3 + CloudFront, Netlify, or Vercel.
- **Frontend (HTML)**: Host directly on S3, Netlify, or GitHub Pages.
- Update `API_BASE` in `script.js` / `App.jsx` to your deployed backend URL.
