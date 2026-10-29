# DevDirectory

A polished React 18 single-page engineering directory built to match the BCA Modern Frontend Frameworks lab specification.

## Features
- Connect & Communicate actions on developer cards and profiles: Message (opens a pre-filled email draft), Call (opens the device dialler), and Email.
- Contact actions use the email address and phone number supplied by the directory data; availability depends on the user's configured mail/calling apps.
- React Router v6 routes for Home, directory, profile, login, protected Add Post, and 404.
- Shared Axios client with the required JSONPlaceholder base URL, timeout, and JSON headers.
- Search by developer name or company with a reusable debounce hook.
- Developer profiles with authored posts.
- Mock login session with AuthContext, persistent demo session, logout, and redirect-back-to-original-route behavior.
- Controlled, validated article form with dynamic author dropdown and POST `/posts`.
- Loading skeletons, dismissible error alerts, retry actions, success feedback, responsive layouts, and motion.
- Tailwind CSS, Lucide icons, and custom CSS polish.

## Run locally
1. Install Node.js 18+.
2. In this directory run:
   ```bash
   npm install
   npm run dev
   ```
3. Open the local URL printed by Vite.

Verify production:
```bash
npm run build
npm run preview
```

## Demo login
This assignment uses a **mock session**, not a real credential backend. Enter any valid-looking email (e.g. `lead@devdirectory.com`) and any password of at least 4 characters. The session is stored locally for demo convenience. Do not use real passwords.

## API
Public data is loaded from `https://jsonplaceholder.typicode.com`. Its POST endpoint simulates creation and returns a mock resource; it does not permanently store submitted content. A newly submitted post is shown in the UI for the current session.

## Routes
- `/` — overview
- `/users` — searchable directory
- `/users/:id` — developer profile and posts
- `/login` — mock login
- `/add-post` — protected article form
- `*` — not found

## Project structure
```text
src/
├── assets/
├── components/ (Navbar, UserCard, ProtectedRoute, SkeletonLoader, AlertBanner)
├── context/AuthContext.jsx
├── hooks/useDebounce.js
├── pages/ (Home, UserDirectory, UserProfile, AddPost, Login, NotFound)
├── services/ (api.js, postService.js)
├── App.jsx
└── main.jsx
```

## Submission note
Update the repository name to `bca-frontend-devdirectory-<RollNumber>`, create conventional commits, deploy to a hosting provider, and capture your own runtime screenshots for the PDF report required by the assignment. The included `docs/PROJECT_REPORT.md` contains an architecture diagram and report outline.
