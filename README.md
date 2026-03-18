# CodeLeap Network

Social feed with full CRUD, infinite scroll, likes, and persistent auth.

![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.x-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![npm](https://img.shields.io/badge/npm-10.x-CB3837?style=for-the-badge&logo=npm&logoColor=white)

---

## 🚀 About

**CodeLeap Network** is a social feed built as part of the CodeLeap engineering test. Users sign up with a username (persisted in `localStorage`), create posts, and interact with content from the community. The app consumes the public CodeLeap REST API and implements the full required feature set plus several bonus items.

---

## 🛠 Technologies

| Technology                | Purpose                                    |
| ------------------------- | ------------------------------------------ |
| **React 19**              | UI library                                 |
| **TypeScript 5.9**        | Type-safe development                      |
| **Vite 7**                | Build tool and dev server                  |
| **Tailwind CSS 4**        | Utility-first styling                      |
| **TanStack Query 5**      | Server state, caching, and infinite scroll |
| **Axios**                 | HTTP client                                |
| **React Router 7**        | Client-side routing with route guards      |
| **Sonner**                | Toast notifications                        |
| **date-fns**              | Date formatting                            |
| **clsx + tailwind-merge** | Conditional and conflict-free class names  |
| **react-icons**           | Icon library                               |

---

## 📁 Project Structure

```
codeleap-network/
├── src/
│   ├── api/
│   │   └── posts.ts               # Axios functions for each endpoint
│   ├── components/
│   │   ├── create-post-form.tsx   # New post form
│   │   ├── delete-modal.tsx       # Delete confirmation modal
│   │   ├── edit-modal.tsx         # Edit post modal
│   │   ├── guest-route.tsx        # Redirects to / when username exists
│   │   ├── header.tsx             # App header with logout
│   │   ├── post-card.tsx          # Post card with like button
│   │   ├── post-filters.tsx       # Search and sort controls
│   │   ├── protected-route.tsx    # Redirects to /login when no username
│   │   └── spinner.tsx            # Reusable loading spinner
│   ├── hooks/
│   │   ├── use-likes.ts           # Like state persisted in localStorage
│   │   ├── use-posts.ts           # React Query hooks (CRUD + infinite scroll)
│   │   └── use-username.ts        # Username persisted in localStorage
│   ├── lib/
│   │   └── cn.ts                  # clsx + tailwind-merge utility
│   ├── pages/
│   │   ├── login-page.tsx         # Signup screen
│   │   └── main-page.tsx          # Feed with filters and infinite scroll
│   ├── types/
│   │   └── index.ts               # Post, payloads, PaginatedResponse
│   ├── App.tsx                    # Routes definition
│   ├── index.css                  # Global styles, Roboto font, keyframes
│   └── main.tsx                   # Entry point, providers setup

```

---

## ✅ Features

### Required

- Signup screen — username saved to `localStorage`, no backend auth
- Protected routes — redirects based on username presence
- Create, read, edit and delete posts
- Edit and delete only your own posts (username string check)
- Feed sorted by most recent first
- Feed auto-updates after creating a post
- Confirmation modal before deleting
- Edit modal with title and content fields

### Bonus

- ♾️ Infinite scroll via `IntersectionObserver` + `useInfiniteQuery`
- ❤️ Like/unlike posts with count (persisted in `localStorage`)
- 🔍 Search posts by title or username
- ↕️ Sort feed by newest or oldest
- 🔐 Persistent logout via header button
- 🎞️ Fade + scale animations on modals
- 🔔 Toast notifications for mutation errors and successes
- 📱 Fully responsive layout

---

## ⚙️ How to Run

### Prerequisites

- Node.js 18+
- npm

### 1. Clone the repository

```bash
git clone git@github.com:isaqu3d/codeleap-network.git
cd codeleap-network
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 📝 Available Scripts

| Command           | Description                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start dev server with HMR           |
| `npm run build`   | Type-check and build for production |
| `npm run preview` | Preview the production build        |
| `npm run lint`    | Run ESLint                          |

---

## 🌐 API

Base URL: `https://dev.codeleap.co.uk/careers/`

| Method   | Route            | Description            |
| -------- | ---------------- | ---------------------- |
| `GET`    | `/careers/`      | List posts (paginated) |
| `POST`   | `/careers/`      | Create a post          |
| `PATCH`  | `/careers/{id}/` | Update a post          |
| `DELETE` | `/careers/{id}/` | Delete a post          |

---

## 📝 License

MIT License

---

Made by [Isaque de Sousa](https://github.com/isaqu3d) — give a ⭐️!
