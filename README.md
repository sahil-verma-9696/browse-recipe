# AI Powered Meal Planner

This roadmap tracks the development of the AI Powered Meal Planner.

---

## ✅ v1.0 - MVP: Basic Meal Explorer

### Pages
- [ ] Home page with:
  - [ ] Featured meals
  - [ ] List of categories
- [ ] Category page with:
  - [ ] Category cards
  - [ ] Meal count per category
- [ ] Meal detail page:
  - [ ] Ingredients
  - [ ] Recipe steps
  - [ ] YouTube embedded video

### Features
- [ ] Lazy load images using IntersectionObserver API
- [ ] Search meal with single network call
- [ ] Data chunking on scroll
- [ ] Shimmer UI while loading

---

## ✅ v1.1 - Favourites (Local Storage)

### Pages
- [ ] Favourites page

### Features
- [ ] Add/remove meals from favourites
- [ ] Store favourites in `localStorage`
- [ ] Read and display saved favourites

---

## ✅ v1.2 - Authentication (Frontend Only)

### Features
- [ ] Signup/Login UI
- [ ] Google authentication via Firebase/Auth
- [ ] Email + password auth support
- [ ] Auth state management (Context or Redux)

---

## ⏳ v1.3 - Backend Integration Begins

> Transition from frontend-only to persistent data backend.

### Features
- [ ] Setup MongoDB Atlas
- [ ] Create backend API (Node.js/Next.js API routes)
- [ ] Store user favourites in MongoDB
- [ ] Fetch user favourites on login
- [ ] Replace `localStorage` with MongoDB syncing

---

## 🔐 v1.4 - Auth Guard & Route Protection

### Features
- [ ] Protect Favourites page behind auth
- [ ] Show login prompt on unauthorized access
- [ ] Redirect after login

---

## 💬 v1.5 - UI Feedback & Error States

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

