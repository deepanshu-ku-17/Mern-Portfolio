<div align="center"> <img src="https://deepanshu-kumar-portfolio.netlify.app/logo.png" alt="DK Logo" width="60" /> # Deepanshu Kumar — Portfolio

**MERN Stack Developer · Full Stack JavaScript · Web3 Enthusiast**

[![Live Portfolio](https://img.shields.io/badge/%F0%9F%8C%90_Live_Portfolio-Visit_Now-6d9ef7?style=for-the-badge)](https://deepanshu-kumar-portfolio.netlify.app/)[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/deepanshu-kumar-5604b1239/)[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github)](https://github.com/deepanshu-ku-17)

</div> ---

 ---## About

Production-grade MERN stack developer portfolio with a premium glassmorphism UI, real-time GitHub integration, contact form with email notifications, resume download tracking, image uploads via Cloudinary, and a protected admin dashboard.

---

## Tech Stack


| Layer        | Technology                               |
| ------------ | ---------------------------------------- |
| Frontend     | React, Vite, Tailwind CSS, Framer Motion |
| Backend      | Node.js, Express.js                      |
| Database     | MongoDB Atlas + Mongoose                 |
| Auth         | JWT (Admin Dashboard)                    |
| Email        | Nodemailer + Gmail                       |
| Image Upload | Cloudinary                               |
| Deployment   | Netlify (Frontend) · Railway (Backend)  |

---

## Features

* **Glassmorphism UI** — aurora gradients, floating elements, scroll animations
* **Real GitHub Calendar** — live contribution graph via `react-github-calendar`
* **Contact Form** — saves to MongoDB + sends email to owner + auto-reply to visitor
* **Resume Download Modal** — collects name, email, purpose before download
* **Admin Dashboard** — protected by JWT, manage messages, projects, resume analytics
* **Project Management** — add/edit/delete projects with Cloudinary image upload
* **Live Demo Logic** — if `live` URL is null, only GitHub button shows on project card

---

## Project Structure

```
├── frontend/                   # React + Vite
│   ├── src/
│   │   ├── components/         # Nav, Hero, About, Projects, Contact...
│   │   ├── pages/              # Portfolio, AdminDashboard
│   │   ├── assets/             # Images
│   │   └── index.css           # Design system (CSS variables)
│   └── public/
│       └── resume.pdf          # Your resume
│
└── backend/                    # Node.js + Express
    ├── models/                 # Contact, Project, ResumeDownload
    ├── routes/                 # contact, projects, resume, admin, upload, github
    ├── middleware/             # JWT auth
    └── utils/                  # sendMail, cloudinary
```

---

## Local Setup

### Prerequisites

* Node.js 18+
* MongoDB (local or Atlas)

### 1. Clone the repo

```bash
git clone https://github.com/deepanshu-ku-17/React-Portfolio.git
cd React-Portfolio
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create `.env` file (never commit this):

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

ADMIN_PASSWORD=your_admin_password
JWT_SECRET=your_jwt_secret

EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

```bash
npm run dev   # runs on http://localhost:5000
```

### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev   # runs on http://localhost:5173
```

---

## Deployment

### Frontend → Netlify

1. Push `frontend/` code to GitHub
2. Netlify → Import from GitHub → set build command: `npm run build`, publish dir: `dist`
3. Done — same URL stays

### Backend → Railway

1. Push `backend/` to GitHub
2. Railway → New Project → Deploy from GitHub
3. Add all `.env` variables in Railway **Variables tab** (never upload `.env` file)
4. Railway gives you a public URL — add it to Netlify env as `VITE_API_URL`

### Database → MongoDB Atlas

1. Create free cluster at [cloud.mongodb.com](https://cloud.mongodb.com/)
2. Get connection string
3. Add to Railway variables as `MONGODB_URI`

> **Security:**`.env` is in `.gitignore`. All secrets live only in Railway/Netlify dashboards — never in code.

---

## Admin Dashboard

Access at `/admin` — JWT protected.


| Feature          | Description                                  |
| ---------------- | -------------------------------------------- |
| Messages         | View, delete contact form submissions        |
| Resume Downloads | See who downloaded with name, email, purpose |
| Projects         | Add, edit, delete, list/unlist projects      |
| Image Upload     | Cloudinary integration for project images    |

---

## API Endpoints


| Method   | Endpoint               | Description                        |
| -------- | ---------------------- | ---------------------------------- |
| `POST`   | `/api/contact`         | Submit contact form                |
| `GET`    | `/api/contact`         | Get all messages (admin)           |
| `DELETE` | `/api/contact/:id`     | Delete message (admin)             |
| `GET`    | `/api/projects`        | Get listed projects                |
| `POST`   | `/api/projects`        | Add project (admin)                |
| `PUT`    | `/api/projects/:id`    | Update project (admin)             |
| `DELETE` | `/api/projects/:id`    | Delete project (admin)             |
| `POST`   | `/api/resume-download` | Track resume download              |
| `GET`    | `/api/resume-download` | Get download analytics (admin)     |
| `POST`   | `/api/upload`          | Upload image to Cloudinary (admin) |
| `POST`   | `/api/admin/login`     | Admin login → JWT token           |
| `GET`    | `/api/health`          | Server health check                |

---

## Contact

**Deepanshu Kumar**

* Email: work.deepanshukumar@gmail.com
* LinkedIn: [deepanshu-kumar-5604b1239](https://www.linkedin.com/in/deepanshu-kumar-5604b1239/)
* GitHub: [@deepanshu-ku-17](https://github.com/deepanshu-ku-17)
* Portfolio: [deepanshu-kumar-portfolio.netlify.app](https://deepanshu-kumar-portfolio.netlify.app/)

---

<div align="center"> Made with ❤️ by Deepanshu Kumar · Ghaziabad → World

</div>
