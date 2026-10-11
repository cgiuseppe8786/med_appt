# StayHealthy – Medical Appointment Booking App

StayHealthy is a full-stack web application that lets patients find doctors, book and cancel appointments, request instant consultations, leave reviews and view their medical reports.

It was built as the **IBM Front-End Developer Capstone Project** (`med_appt`).

## Features

- **Sign up / Login / Logout** with JWT authentication
- **Find a doctor** by speciality and **book an appointment** (name, phone, date, time slot)
- **Cancel an appointment** and see a **notification** with the booking details
- **Instant consultation** booking
- **Reviews**: give feedback to doctors you have consulted
- **Profile**: view and edit your user details
- **Reports**: view and download your medical reports

## Tech stack

| Layer      | Technologies                                         |
|------------|------------------------------------------------------|
| Frontend   | React 19, React Router, Vite, reactjs-popup          |
| Backend    | Node.js, Express, JWT, bcryptjs, express-validator   |
| Database   | MongoDB (Mongoose)                                   |
| Deployment | Docker, IBM Cloud Container Registry                 |

## Project structure

```
med_appt/
├── src/                  # React frontend
│   ├── Components/       # Navbar, Landing_Page, Login, Sign_Up, BookingConsultation,
│   │                     # InstantConsultationBooking, Notification, ReviewForm,
│   │                     # ProfileCard, ReportsLayout
│   ├── App.jsx           # Routes
│   └── main.jsx
├── public/               # Static assets (icons, sample patient report)
├── server/               # Express backend
│   ├── routes/auth.js    # /api/auth: register, login, user, update
│   ├── models/User.js    # Mongoose user model
│   ├── db.js             # MongoDB connection
│   └── index.js          # Server entry point (serves the production build)
├── config.js             # API_URL used by the frontend
├── vite.config.js
├── Dockerfile
└── package.json
```

## Prerequisites

- [Node.js](https://nodejs.org/) **20.19+ or 22.12+** (required by Vite)
- [MongoDB](https://www.mongodb.com/try/download/community) running on `mongodb://127.0.0.1:27017`
- Git
- Docker (only for the container deployment)

## Setup and installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/cgiuseppe8786/med_appt.git
   cd med_appt
   ```

2. **Install the dependencies** (frontend and backend)
   ```bash
   npm install
   cd server
   npm install
   cd ..
   ```

3. **Start MongoDB** on port `27017`. The app uses the `stayhealthybeta1` database (see `server/db.js`).

## Running in development

Open two terminals:

```bash
# Terminal 1 – backend API on http://localhost:8181
cd server
node index.js
```

```bash
# Terminal 2 – frontend on http://localhost:5173
npm run dev
```

Then open http://localhost:5173.

## Production build

```bash
npm run build
```

This runs `vite build` (minification, transpilation and bundling) and moves the output to `server/build`.

Start the server, which serves both the API and the built React app:

```bash
cd server
node index.js
```

Then open http://localhost:8181.

> On Windows, `npm run build` needs a POSIX shell for `rm` and `mv`:
> `npm run build --script-shell "C:\Program Files\Git\bin\bash.exe"`

## Deployment with Docker (IBM Cloud)

```bash
MY_NAMESPACE=$(ibmcloud cr namespaces | grep sn-labs-)
docker build . -t us.icr.io/$MY_NAMESPACE/medical_app
docker push us.icr.io/$MY_NAMESPACE/medical_app
docker run -p 8080:4173 us.icr.io/$MY_NAMESPACE/medical_app
```

The container serves the production build with `serve` on port `4173`, mapped to port `8080`.

## API endpoints

All endpoints are under `/api/auth`:

| Method | Endpoint    | Description               |
|--------|-------------|---------------------------|
| POST   | `/register` | Create a new user         |
| POST   | `/login`    | Log in and get a JWT      |
| GET    | `/user`     | Get the logged-in user    |
| PUT    | `/user`     | Update the user profile   |
| PUT    | `/update`   | Update user details       |

## Available scripts

| Script            | Description                                         |
|-------------------|-----------------------------------------------------|
| `npm run dev`     | Start the Vite development server                   |
| `npm start`       | Same as `dev`                                       |
| `npm run build`   | Build for production and move the output to `server/build` |
| `npm run lint`    | Run ESLint                                          |
| `npm run preview` | Build and preview the production bundle             |

## Author

Giuseppe Cammarata – [GitHub](https://github.com/cgiuseppe8786)
