# TODO App (Frontend)

This repository demonstrates a simple TODO application with:

- **Backend**: Node.js + Express + PostgreSQL
- **Frontend**: React + TypeScript + MUI

Backend repository of this application can be found on [GitHub](https://github.com/MichalKomet/engager.app-be)

## Backend Setup

1. **Clone or download** the [backend repository](https://github.com/MichalKomet/engager.app-be)
2. **Create a .env file** based on .env.example, providing necessary variables, for example:

```dotenv
SERVER_PORT=7005

PG_USER=myuser
PG_NAME=mydb
PG_PASSWORD=mypassword
```

3. **Install dependencies** (in the backend folder):

```bash
  npm install
```

4. **Run via Docker** (optional but recommended):

```bash
  docker-compose --env-file .env up
```

Or run directly with Node:
```bash
  npm run start
```

The backend will be available at http://localhost:7005 (or wherever you configured SERVER_PORT).

Make sure the backend is running and accessible (e.g., you can test GET /items via Postman or browser).

## Frontend Setup

1. **Clone or download** this repository (the frontend).
2. **Create a .env file** to specify the backend URL, for example:

```dotenv
VITE_API_URL=http://localhost:7005
```

3. **Install dependencies**:

```bash
  npm install
```

4. **Start development server**:

```bash
  npm run start
```

This will open the React application in your browser (default at http://localhost:5173 or a similar port).

## Usage

1.	Ensure the backend is running (so the frontend can successfully fetch data).
2.	Open the frontend in your browser (e.g., http://localhost:5173).
3.	Create, Edit, or Delete TODO items. By default, the application sorts tasks by due date, and you can optionally display completed tasks via a checkbox.
4.	Validation Errors will appear if you submit invalid data (empty name, invalid date format, etc.), and the dialog will remain open for you to correct the inputs.

## Project Overview

•	**Backend** Endpoints:
-	GET /items – retrieve all TODOs
-	POST /items – create a new TODO
-	PUT /items/:id – update an existing TODO
-	DELETE /items/:id – remove a TODO

Each endpoint enforces validation on the server side.

•	**Frontend**:
-	Built with React, TypeScript, and MUI (Material UI).
-	Displays a list of TODOs (with optional filtering of completed tasks).
-	Provides a Dialog to add or edit tasks.
-	Shows error messages if validation fails on the server.

## Troubleshooting

-	**Database**: Make sure your PostgreSQL is running and that credentials in .env match your local DB settings.
-	**Docker**: If using Docker, ensure the containers (backend & DB) are up and running before the frontend tries to connect.