# Imagify

AI-powered image generation web app. Type a prompt, pick a style, and get an image — powered by ClipDrop's text-to-image API.

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Express, TypeScript, MongoDB, Mongoose
- **Auth:** JWT (bcrypt for hashing)
- **Payments:** Razorpay (credit-based system)
- **Image API:** ClipDrop

## Features

- Text-to-image generation with style options (realistic, anime, painting, 3D)
- Credit-based usage with Razorpay checkout
- Image history, public gallery, and dashboard
- Dark mode
- Rate limiting and input validation (Zod)

## Setup

### Prerequisites

- Node.js
- MongoDB instance
- ClipDrop API key
- Razorpay key pair

### Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```
MONGO_URL=your_mongodb_url
JWT_SECRET=your_jwt_secret
CLIPDROP_API=your_clipdrop_api_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
FRONTEND_URL=http://localhost:5173
```

```bash
npm run dev
```

Server starts on `http://localhost:3000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Opens on `http://localhost:5173`.

## Project Structure

```
backend/
  src/
    controller/   # Route handlers (image, user)
    models/       # Mongoose schemas
    routes/       # Express routers
    middleware/    # Auth middleware
    config.ts     # DB connection
    validation.ts # Zod schemas
    index.ts      # Entry point

frontend/
  src/
    pages/        # Home, Result, Dashboard, Gallery, Explore, BuyCredit
    components/   # Navbar, Footer, Login, etc.
    context/      # App and Theme context providers
```
