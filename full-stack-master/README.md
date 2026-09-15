# 🛍️ Modern Full-Stack E-Commerce Platform

[![Angular](https://img.shields.io/badge/Angular-17.3-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![PrimeNG](https://img.shields.io/badge/PrimeNG-17.18-41B883?style=for-the-badge&logo=prime&logoColor=white)](https://primeng.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Checkout-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)

> An enterprise-grade, full-stack E-Commerce solution featuring a reactive, responsive **Angular 17** client interface and a high-performance **Node.js/Express & MongoDB** RESTful API engine.

---

## 📑 Table of Contents
- [Architecture Overview](#-architecture-overview)
- [Frontend Deep-Dive (Angular 17)](#-frontend-deep-dive-angular-17)
  - [Core Features & UI Modules](#-core-features--ui-modules)
  - [UI/UX & Component System](#-uiux--component-system)
  - [Directory Structure](#-frontend-directory-structure)
  - [Guards, Interceptors & State Management](#-guards-interceptors--state-management)
- [Backend REST API Overview](#-backend-rest-api-overview)
- [Security Deep-Dive: Refresh Token & Rate Limiting](#-security-deep-dive-refresh-token--rate-limiting)
- [Getting Started & Installation](#-getting-started--installation)
- [Seeded Test Accounts](#-seeded-test-accounts)
- [Scripts Reference](#-scripts-reference)
- [License](#-license)

---

## 🏗️ Architecture Overview

The system is architected as a decoupled client-server application:
- **Frontend Client (`frontend/`)**: Built with **Angular 17**, **PrimeNG**, and **RxJS**. Handles reactive UI rendering, state management, client routing, token authentication, and interactive shopping experiences.
- **Backend Service (`web api/`)**: Built with **Node.js**, **Express**, and **MongoDB**. Provides RESTful endpoints, dual JWT & API Key security layers, role-based authorization, rate limiting, and Stripe payments.

```
┌────────────────────────────────────────────────────────┐
│               Angular 17 Frontend App                  │
│  (PrimeNG 17, PrimeFlex, RxJS Observables, Interceptors)│
└───────────────────────────┬────────────────────────────┘
                            │ HTTP Requests (Bearer / API Key)
                            ▼
┌────────────────────────────────────────────────────────┐
│             Node.js / Express REST API                 │
│ (Dual Auth, RBAC Guards, Rate Limiter, Stripe, Sharp)  │
└───────────────────────────┬────────────────────────────┘
                            │ Mongoose ODM
                            ▼
┌────────────────────────────────────────────────────────┐
│                   MongoDB Database                     │
└────────────────────────────────────────────────────────┘
```

---

## 🎨 Frontend Deep-Dive (Angular 17)

The frontend delivers an ultra-smooth, responsive user experience optimized for desktop, tablet, and mobile devices.

### ✨ Core Features & UI Modules

#### 1. 🏠 Storefront & Home Page
- **Hero Banners & Carousels**: Dynamic promotional sliders for seasonal offers and new arrivals.
- **Category Explorer**: Visual grid and horizontal carousel to browse catalog departments.
- **Popular Brands**: Brand logos showcase with direct navigation to brand-specific catalogs.
- **Featured & Top Deals**: Live grid of trending products with sale badges and discount tags.

#### 2. 🔍 Product Catalog & Discovery
- **Real-Time Live Search**: Debounced search input that queries products instantly without page reloads.
- **Multi-Faceted Filtering**: Filter catalog by Category, Subcategory, Brand, and Price range sliders.
- **Dynamic Sorting**: Sort items by:
  - Highest Rated
  - Price: Low to High / High to Low
  - Top Selling
  - Newest Arrivals
- **Pagination & Loading**: Smooth pagination controls paired with PrimeNG skeleton loaders.

#### 3. 📦 Interactive Product Details
- **High-Resolution Gallery**: Image zoom and multi-thumbnail gallery.
- **Product Options**: Color variants, real-time stock availability, and quantity stepper.
- **Instant Coupon Calculator**: Users can test promo codes directly on the product card.
- **Reviews & Rating Engine**:
  - Interactive 5-star rating submission.
  - Customer review comments with user avatars and submission timestamps.

#### 4. 🛒 Dynamic Shopping Cart
- **Live Quantity Controls**: Increment, decrement, or remove items with automatic recalculation.
- **Discount Voucher Engine**: Promo code application with immediate cart balance adjustment.
- **Order Summary**: Clear breakdown of subtotal, shipping estimates, discount savings, and total payable amount.
- **One-Click Clear**: Option to empty the cart or proceed to checkout.

#### 5. 💳 Multi-Step Checkout Flow
- **Delivery Address Manager**: Select from saved addresses or add a new shipping destination on the fly.
- **Dual Payment Methods**:
  - **Cash on Delivery (COD)**: Instant order confirmation.
  - **Online Card Payment**: Redirects to **Stripe Checkout** for card payments.

#### 6. 📦 Orders History & Tracking
- **Order Timeline**: Visual status badges (`Pending`, `Paid`, `Delivered`).
- **Detailed Invoices**: View all purchased line items, quantities, shipping details, and payment statuses.

#### 7. ❤️ Wishlist & Favorites
- **One-Tap Heart Toggle**: Add or remove favorite products with instant heart animation.
- **Quick Move-to-Cart**: Transfer items from the wishlist directly into the shopping cart.

#### 8. 👤 User Account Hub
- **Profile Management**: Update personal info (Name, Email, Phone).
- **Password Security**: Change password with validation guards.
- **Address Book**: Manage multiple delivery addresses (Home, Work, etc.).

#### 9. 🔑 Developer API Keys Portal
- **API Key Management Dashboard**: Create scoped API keys for 3rd-party software or mobile apps.
- **Granular Route Permissions**: Restrict keys to specific routes (e.g., `/products`, `/categories`) and HTTP methods (`GET`, `POST`).
- **Key Expiration & Revocation**: Set custom expiration dates and revoke compromised keys immediately.

#### 10. 📊 Admin Analytics Dashboard & User Management
- **Analytics Metrics**: Real-time cards showing Total Sales, Net Revenue, Orders, Products, and User counts.
- **Recent Orders Stream**: Live feed of incoming customer orders.
- **User Management**: Search, promote to Manager/Admin, or deactivate platform accounts.

#### 11. 🔐 Authentication & Onboarding
- **User Registration**: Form validation (password confirmation, email regex).
- **Sign In**: JWT token issuance and persistent auth state.
- **Password Recovery Workflow**: Forgot password email trigger, 6-digit OTP verification screen, and new password setup.

---

### 🧩 UI/UX & Component System

- **PrimeNG 17**: Pre-styled enterprise UI components including Buttons, Dropdowns, Dialogs, Cards, Tables, Paginators, Rating widgets, and Toasts.
- **PrimeFlex**: Responsive utility CSS system providing flexbox layouts and responsive spacing across all screen sizes.
- **NgxSpinner**: Global animated spinner for seamless route transitions and asynchronous data loading.
- **Skeleton Loaders**: Content placeholders to eliminate layout shifts while data is loading.
- **Toast Notifications**: Non-intrusive feedback for cart additions, successful updates, and error alerts.

---

### 📂 Frontend Directory Structure

```text
frontend/src/app/
├── core/
│   ├── apiRoot/             # Base API URLs and environment configurations
│   ├── guards/              # Route protection (auth.guard, admin.guard)
│   ├── interceptors/        # HTTP interceptors (Token injection, Error handling)
│   ├── models/              # TypeScript interfaces (Product, User, Cart, Order)
│   ├── pipes/               # Custom data transform pipes
│   └── service/             # Injectable services (Auth, Cart, Product, Order, etc.)
├── layouts/                 # Master application layouts (Navbar, Footer, Auth Layout)
├── pages/                   # Application route views:
│   ├── home/                # Landing page & carousels
│   ├── products/            # Catalog, search, filters & sort
│   ├── details/             # Product details & reviews
│   ├── cart/                # Shopping cart & coupon
│   ├── checkout/            # Multi-address & payment gateway
│   ├── all-orders/          # Customer orders history
│   ├── orders-details/      # Detailed order breakdown
│   ├── favorite/            # User wishlist
│   ├── profile/             # Account management
│   ├── create-api-key/      # Developer API key generator
│   ├── dashboard/           # Admin metrics & statistics
│   ├── users-management/    # Admin user controls
│   ├── login/               # Sign in page
│   ├── register/            # Sign up page
│   ├── forgot-password/     # Password recovery email
│   ├── verify-code/         # OTP verification
│   └── reset-password/      # New password setup
└── shared/                  # Reusable components:
    ├── card/                # Product card with hover effects
    ├── search-bar/          # Live debounced search input
    ├── sort-dropdown/       # Catalog sort menu
    ├── skeleton-loader/     # Loading placeholders
    ├── checkout-form/       # Shipping address modal/form
    └── empty/               # Empty state graphics
```

---

### 🛡️ Guards, Interceptors & State Management

- **HTTP Auth Interceptor**: Automatically attaches `Authorization: Bearer <token>` to all protected API requests.
- **HTTP Error Interceptor**: Intercepts `401 Unauthorized`, `403 Forbidden`, and `500 Server Errors`, displaying PrimeNG Toast error messages.
- **Route Guards**:
  - `authGuard`: Protects profile, orders, checkout, and wishlist routes from unauthenticated access.
  - `adminGuard`: Restricts analytics dashboard and user management pages to users with `admin` or `manager` roles.
- **Reactive State (RxJS)**: BehaviorSubjects for live cart badge counts, wishlist indicators, and user authentication state.

---

## ⚙️ Backend REST API Overview

The backend is built with **Node.js**, **Express**, and **MongoDB**:
- **Authentication**: Stateless JWT + Granular route-restricted API Keys (`x-api-key`).
- **Role-Based Access Control**: `user`, `manager`, `admin`.
- **Payment Processing**: Stripe Checkout integration & Webhooks.
- **Security**: Multi-tier `express-rate-limit`, input sanitization, and CORS configuration.
- **Media Pipeline**: `Multer` + `Sharp` image compression and resizing.
- **Live Updates**: Server-Sent Events (SSE) notification stream.

---

## 🛡️ Security Deep-Dive: Refresh Token & Rate Limiting

### 🔄 1. Refresh Token & Silent Token Rotation
To provide high security without degrading user experience, the system utilizes a **dual-token authentication lifecycle**:
- **Access Token (Short-lived)**: Carried in the `Authorization: Bearer <token>` header for all authenticated requests.
- **Refresh Token (Long-lived)**: Stored securely and transmitted to `/api/v1/auth/refreshToken` to generate a brand-new access token without forcing the user to re-enter their credentials.

#### 🔄 Token Lifecycle Flow:
```
Client (Angular App)                            Server (Node.js/Express)
   │                                                        │
   ├────── POST /api/v1/auth/login ────────────────────────►│
   │◄───── Returns Access Token + Refresh Token ────────────┤
   │                                                        │
   │ (Time passes... Access Token expires)                  │
   │                                                        │
   ├────── GET /api/v1/orders (Expired Access Token) ──────►│
   │◄───── 401 Unauthorized ────────────────────────────────┤
   │                                                        │
   ├─ [Angular authInterceptor catches 401 silently]        │
   ├────── POST /api/v1/auth/refreshToken ─────────────────►│
   │◄───── Returns Brand New Access Token ──────────────────┤
   │                                                        │
   ├────── Re-sends GET /api/v1/orders (New Token) ─────────►│
   │◄───── 200 OK (User experience uninterrupted) ──────────┤
   ▼                                                        ▼
```

- **Frontend Interceptor Automation**: `authInterceptor` transparently intercepts `401 Unauthorized` responses, calls `/api/v1/auth/refreshToken` using the stored refresh token, updates storage, and replays the failed request with zero interruption.
- **Password Reset Safeguard**: If a user changes their password, all previously generated refresh tokens are immediately revoked by comparing token issuance time against `passwordChangedAt`.

---

### 🛑 2. Multi-Tier Rate Limiting (DDoS & Brute-Force Defense)
The API protects server resources and user accounts using tiered rate limiting via `express-rate-limit`:

| Limiter Layer | Applied Route | Threshold | Purpose |
|---|---|---|---|
| **Global API Limiter** | `/api/*` | **100 requests / 15 mins** | Mitigates DoS attacks, aggressive scraping bots, and server overload. |
| **Auth Strict Limiter** | `/api/v1/auth/*` | **20 requests / 15 mins** | Blocks brute-force dictionary attacks on Login, Signup, and OTP verification. |

#### Standard Response Headers & HTTP 429:
When requests exceed the limit, the server responds with **`429 Too Many Requests`**:
```json
{
  "status": "fail",
  "message": "Too many authentication requests from this IP, please try again after 15 minutes"
}
```
Client applications receive rate limit status via standard RFC headers:
- `RateLimit-Limit`: Maximum requests allowed in the 15-minute window.
- `RateLimit-Remaining`: Number of requests remaining.
- `RateLimit-Reset`: Time remaining until the rate limit window resets.

---

## 🚀 Getting Started & Installation

### 1. Prerequisites
- **Node.js**: v18.x or higher
- **npm**: v9.x or higher
- **MongoDB**: Local MongoDB instance or Atlas connection string

### 2. Clone & Install Dependencies
```bash
# Clone the repository
git clone https://github.com/ahmed-Basal/E-comerce-NodeJs.git
cd E-comerce-NodeJs/full-stack-master

# Install all dependencies (Frontend + Backend) in one step
npm run install:all
```

### 3. Setup Environment Variables
Create a `config.env` file in `web api/config.env`:
```env
PORT=8000
NODE_ENV=development
BASE_URL=http://localhost:8000
DB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ecommerce
JWT_SECRET_KEY=your_jwt_secret_key
JWT_EXPIRE_TIME=90d
STRIPE_SECRET_KEY=sk_test_...
```

### 4. Run Development Servers
You can launch both the frontend and backend concurrently with a single command:
```bash
# Start both Backend (Port 8000) and Frontend (Port 4200) concurrently
npm start
```

Or run them individually:
```bash
# Run Backend API
npm run start:backend

# Run Frontend Angular App
npm run start:frontend
```

Open your browser at:
👉 **`http://localhost:4200`**

---

## 👥 Seeded Test Accounts

The backend automatically creates default test users upon first startup:

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@gmail.com` | `password123` |
| **Manager** | `manager@gmail.com` | `password123` |
| **User** | `user@gmail.com` | `password123` |

Log in with `admin@gmail.com` to access the **Admin Analytics Dashboard** and **User Management** tools.

---

## 📜 Scripts Reference

In the `full-stack-master` directory:

| Script | Command | Description |
|---|---|---|
| `npm run install:all` | Installs dependencies for both `frontend` and `web api` |
| `npm start` | Concurrently runs backend on `:8000` and frontend on `:4200` |
| `npm run start:frontend` | Starts Angular development server with hot-reload |
| `npm run start:backend` | Starts Express server with Nodemon auto-restart |

---

## 📄 License
This project is open-source and distributed under the [MIT License](LICENSE).
