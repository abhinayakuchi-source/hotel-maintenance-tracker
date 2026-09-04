# Cloud-Based Hotel Room Maintenance Tracker

A full-stack cloud computing project for monitoring hotel room status and managing room maintenance requests.

The system provides a dashboard where hotel staff can view room availability, report maintenance issues, track their progress, and manage maintenance requests.

## Project Overview

The Cloud-Based Hotel Room Maintenance Tracker is designed to simplify hotel maintenance management.

Instead of maintaining room maintenance information manually, the application provides a centralized web-based system to:

- Monitor hotel room status
- Report maintenance issues
- Assign priority to maintenance requests
- Track maintenance progress
- Resolve maintenance requests
- Delete completed or invalid requests
- Automatically update room status when maintenance is reported

## Technologies Used

### Frontend

- HTML
- CSS
- JavaScript
- React.js

### Backend

- Node.js
- Express.js
- REST API
- CORS

### Data Storage

- JSON files for the current demo implementation

### Cloud Deployment

- Render

## 📁 Project Structure

hotel-maintenance-tracker/
│
├── 📂 backend/
│   ├── 📄 server.js
│   ├── 📄 package.json
│   │
│   └── 📂 data/
│       ├── 📄 rooms.json
│       └── 📄 maintenance.json
│
├── 📂 frontend-html/
│   ├── 📄 index.html
│   ├── 📄 style.css
│   └── 📄 script.js
│
├── 📂 frontend-react/
│   ├── 📄 package.json
│   │
│   ├── 📂 public/
│   │   └── 📄 index.html
│   │
│   └── 📂 src/
│       ├── 📄 index.js
│       ├── 📄 App.jsx
│       └── 📄 App.css
│
├── 📄 .gitignore
└── 📄 README.md

## Features

### 1. Room Management

The system currently contains 10 hotel rooms distributed across 5 floors.

| Room | Floor | Status |
|------|-------|--------|
| 101 | 1 | Available |
| 102 | 1 | Occupied |
| 201 | 2 | Available |
| 202 | 2 | Under Maintenance |
| 301 | 3 | Occupied |
| 302 | 3 | Available |
| 401 | 4 | Available |
| 402 | 4 | Occupied |
| 501 | 5 | Available |
| 502 | 5 | Occupied |

Room statuses include:

- Available
- Occupied
- Under Maintenance

### 2. Maintenance Request Management

Users can create maintenance requests by providing:

- Room number
- Issue description
- Priority

Maintenance requests can have the following statuses:

Pending → In Progress → Resolved

The system also records:

- Reported date
- Resolved date

### 3. Automatic Room Status Update

When a new maintenance request is created for a room, the room status is automatically changed to:

Under Maintenance

This keeps the room information synchronized with the maintenance requests.

### 4. Delete Maintenance Requests

Maintenance requests can be deleted when they are resolved or no longer required.

## REST API

The backend provides the following REST API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/rooms | Get all rooms |
| POST | /api/rooms | Add a new room |
| PATCH | /api/rooms/:id | Update room information |
| GET | /api/maintenance | Get maintenance requests |
| POST | /api/maintenance | Create maintenance request |
| PATCH | /api/maintenance/:id | Update maintenance status |
| DELETE | /api/maintenance/:id | Delete maintenance request |

## Running the Project Locally

### Step 1: Clone the Repository

    git clone https://github.com/YOUR-USERNAME/hotel-maintenance-tracker.git
    cd hotel-maintenance-tracker

### Backend Setup

Go to the backend folder:

    cd backend

Install dependencies:

    npm install

Start the server:

    npm start

The backend runs locally on:

    http://localhost:5000

### Test Backend API

Open the following URL in a browser:

    http://localhost:5000/api/rooms

This displays the list of hotel rooms in JSON format.

For maintenance requests:

    http://localhost:5000/api/maintenance

## HTML Frontend

The project includes a simple HTML/CSS/JavaScript frontend.

Location:

    frontend-html/

Open the following file in a browser:

    frontend-html/index.html

Make sure the backend is running before opening the frontend.

## React Frontend

Go to the React frontend:

    cd frontend-react

Install dependencies:

    npm install

Start the React application:

    npm start

The React application runs at:

    http://localhost:3000

## Cloud Deployment

The backend has been successfully deployed using Render.

### Backend Deployment Configuration

Repository:

    hotel-maintenance-tracker

Branch:

    main

Root Directory:

    backend

Environment:

    Node

Build Command:

    npm install

Start Command:

    npm start

### Live Backend URL

    https://hotel-maintenance-tracker.onrender.com

## Live API Endpoints

### Rooms API

    https://hotel-maintenance-tracker.onrender.com/api/rooms

### Maintenance API

    https://hotel-maintenance-tracker.onrender.com/api/maintenance

### Root API

    https://hotel-maintenance-tracker.onrender.com/

## Cloud Architecture

User / Hotel Staff
        ↓
Frontend Dashboard
(HTML / CSS / JavaScript / React)
        ↓
REST API
        ↓
Render Cloud
(Node.js + Express)
        ↓
JSON Data Storage
(rooms.json / maintenance.json)

## Data Storage

The current version uses JSON files for storing:

    backend/data/rooms.json
    backend/data/maintenance.json

This allows the project to work without setting up a database.

For a production system, the JSON storage can later be replaced with a cloud database such as:

- MongoDB Atlas
- Amazon DynamoDB
- Amazon RDS

## Cloud Deployment Workflow

The deployment process used for this project is:

1. Develop the application locally
2. Test the backend API
3. Test the HTML frontend
4. Test the React frontend
5. Create a GitHub repository
6. Push the project to GitHub
7. Connect the GitHub repository to Render
8. Select the backend folder as the Root Directory
9. Configure the Node.js environment
10. Set the build command to npm install
11. Set the start command to npm start
12. Deploy the backend
13. Test the live API
14. Connect the frontend to the deployed backend

## GitHub Setup

The project source code is maintained in a GitHub repository.

Basic Git commands used:

    git add .
    git commit -m "Update hotel maintenance tracker"
    git push origin main

## Environment and Configuration

The backend uses the following configuration:

    PORT = process.env.PORT || 5000

This allows Render to provide the required cloud port while still allowing the application to run on port 5000 locally.

## Advantages

- Simple and easy-to-use interface
- Centralized maintenance tracking
- Live room status display
- REST API based architecture
- Supports multiple frontend technologies
- Easy to deploy to the cloud
- Can be extended with a cloud database
- Reduces manual maintenance tracking
- Supports 10 hotel rooms
- Tracks maintenance progress
- Automatically updates room status

## Future Enhancements

The following features can be added in future versions:

- Cloud database integration
- Hotel staff login and authentication
- Admin dashboard
- Maintenance staff assignment
- Email notifications
- SMS notifications
- Maintenance history
- Search and filtering
- Room-wise maintenance reports
- Analytics dashboard
- Automatic maintenance reminders
- Cloud database persistence
- User role management
- Mobile application

## Project Status

- Backend developed
- REST API implemented
- HTML frontend completed
- React frontend completed
- Room management implemented
- Maintenance tracking implemented
- Automatic room status update implemented
- Hotel rooms increased from 5 to 10
- GitHub repository created
- Backend deployed on Render
- Live backend API available
- Local testing completed
- Cloud deployment completed

## Project Demonstration

The application demonstrates the following workflow:

1. User opens the hotel maintenance dashboard.
2. The system displays all 10 hotel rooms.
3. Each room displays its current status.
4. User selects a room and reports a maintenance issue.
5. User enters the issue description and priority.
6. The maintenance request is created with Pending status.
7. The selected room automatically changes to Under Maintenance.
8. Staff can change the request to In Progress.
9. Staff can mark the request as Resolved.
10. Resolved or invalid requests can be deleted.

## Conclusion

The Cloud-Based Hotel Room Maintenance Tracker provides a simple digital solution for managing hotel rooms and maintenance activities.

The project demonstrates the integration of:

<img width="979" height="1575" alt="mermaid-diagram" src="https://github.com/user-attachments/assets/25baea9f-a41d-4c0e-b9ce-992af284d33a" />


The application can be further enhanced by integrating a cloud database, authentication, notifications, analytics, and additional hotel management features.

## Developed by

Abhinaya Kuchi


## Give me star if you like this project
