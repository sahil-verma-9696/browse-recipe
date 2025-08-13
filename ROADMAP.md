# AI Powered Meal Planner

This roadmap tracks the development of the AI Powered Meal Planner.

---

## ✅ v0.0 - MVP: Basic Meal Explorer

### Pages

- [x] Home page with:
  - [x] Featured meals
  - [x] List of categories
- [x] Category page with:
  - [x] Category cards
  - [x] Meal count per category
- [x] Meal detail page:
  - [x] Ingredients
  - [x] Recipe steps
  - [x] YouTube embedded video

### Features

- [x] Lazy load images using IntersectionObserver API
- [x] Search meal with single network call
- [x] Data chunking on scroll
- [x] Shimmer UI while loading

---

## ✅ v0.1 - Favourites (Local Storage)

### Pages

- [x] Favourites page

### Features

- [x] Add/remove meals from favourites
- [x] Store favourites in `localStorage`
- [x] Read and display saved favourites

---

## ✅ v0.2 - Authentication (Frontend Only)

### Features

- [ ] Signup/Login UI
- [ ] Google authentication via Firebase/Auth
- [ ] Email + password auth support
- [ ] Auth state management (Context or Redux)

---

## ⏳ v0.3 - Backend Integration Begins

> Transition from frontend-only to persistent data backend.

### Features

- [ ] Setup MongoDB Atlas
- [ ] Create backend API (Node.js/Next.js API routes)
- [ ] Store user favourites in MongoDB
- [ ] Fetch user favourites on login
- [ ] Replace `localStorage` with MongoDB syncing

---

## 🔐 v0.4 - Auth Guard & Route Protection

### Features

- [ ] Protect Favourites page behind auth
- [ ] Show login prompt on unauthorized access
- [ ] Redirect after login

---

## 💬 v0.5 - UI Feedback & Error States

### Features

- [ ] Toast notifications on:
  - [ ] Login/logout
  - [ ] Add/remove favourites
- [ ] Loading spinner or shimmer on all fetches
- [ ] Empty states for:
  - [ ] No results
  - [ ] No favourites
- [ ] Global error fallback UI

---
