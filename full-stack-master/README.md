# 🛒 E-Commerce RESTful Backend API

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/Auth-JWT%20%26%20API%20Keys-black?style=for-the-badge&logo=JSON%20web%20tokens)](https://jwt.io/)
[![Stripe](https://img.shields.io/badge/Payments-Stripe%20API-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)
[![Apidog Ready](https://img.shields.io/badge/API%20Testing-Apidog%20%2F%20Postman%20Ready-F05032?style=for-the-badge&logo=postman&logoColor=white)](https://apidog.com/)

> **Notice:** This repository houses the **Backend RESTful Web API Engine** for a modern, scalable E-Commerce platform. It delivers full business logic, security layers, database modeling, payment gateways, and real-time messaging, serving web and mobile client applications.

---

## 📑 Table of Contents
- [Project Overview](#-project-overview)
- [Key Architectural Features](#-key-architectural-features)
- [Tech Stack](#-tech-stack)
- [API Modules & Endpoints](#-api-modules--endpoints)
- [Apidog & Postman Integration](#-apidog--postman-integration)
- [Project Structure](#-project-structure)
- [Environment Configuration](#-environment-configuration)
- [Getting Started](#-getting-started)
- [Seeded Test Accounts](#-seeded-test-accounts)
- [License](#-license)

---

## 🌟 Project Overview

This project is an enterprise-ready, production-grade **RESTful Backend API** designed to power end-to-end e-commerce operations. Built on **Node.js**, **Express**, and **MongoDB (Mongoose)**, it follows strict **MVC architecture** principles, Clean Code standards, robust data validation, and multi-tier security.

---

## 🚀 Key Architectural Features

- **Dual Authentication System**:
  - **JWT (JSON Web Tokens)**: Secure token-based auth with access tokens, refresh tokens, and password reset workflows via email tokens.
  - **Granular Scoped API Keys**: Custom API Key generator (`x-api-key`) with route-level and HTTP-method-level access control, active/revoked states, and expiration dates.
- **Role-Based Access Control (RBAC)**: Hierarchical permission guards (`user`, `manager`, `admin`).
- **Advanced Query Engine (API Features)**:
  - Automatic pagination (`page`, `limit`).
  - Rich comparison filtering (`[gte]`, `[gt]`, `[lte]`, `[lt]`, regex searching).
  - Dynamic multi-field sorting (`sort=-price,sold`).
  - Selective field projection (`fields=title,price,ratingsAverage`).
- **Cart & Order Processing**:
  - Dynamic cart calculation and multi-tier coupon redemption engine.
  - Cash on delivery order creation.
  - Card payments via **Stripe Checkout Sessions**.
  - Order state tracking (`isPaid`, `isDelivered`, delivery timestamps).
- **High-Performance Aggregations**:
  - Real-time admin analytics dashboard pipeline calculating total revenue, active orders, and sales distribution.
- **Real-Time Live Events**:
  - **Server-Sent Events (SSE)** endpoint (`/api/v1/notifications/stream`) pushing live notifications to connected clients.
- **Security & Reliability**:
  - Brute-force & DDoS mitigation via `express-rate-limit`.
  - Request body sanitation and Express Validator validation layers.
  - Compression middleware for reduced bandwidth and rapid TTFB.
  - Production-ready error handling (Operational vs. Programming errors).
- **Media Processing Pipeline**:
  - Multi-file image uploads via `Multer` with automated buffer resizing and WebP/JPEG formatting via `Sharp`.

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **Node.js** | Server runtime environment |
| **Express.js** | Web framework and REST routing |
| **MongoDB & Mongoose** | NoSQL database, ODM, schema indexing & aggregation |
| **JSON Web Tokens (JWT)** | Stateless authentication |
| **bcryptjs** | Salted hashing for credentials and API keys |
| **Stripe SDK** | Online credit/debit card processing |
| **Nodemailer** | Transactional emails and OTP reset verification |
| **Sharp & Multer** | Media handling and image compression |
| **Winston & Morgan** | Observability, structured logging, and HTTP profiling |

---

## 🔌 API Modules & Endpoints

Base URL: `http://localhost:8000/api/v1`

### 1. Authentication (`/auth`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/auth/signup` | Register a new customer account | No |
| `POST` | `/auth/login` | Sign in and receive JWT access token | No |
| `POST` | `/auth/refreshToken` | Exchange refresh token for new access token | No |
| `POST` | `/auth/forgotPassword` | Request password reset code via email | No |
| `POST` | `/auth/verifyResetCode`| Verify 6-digit password reset code | No |
| `PUT`  | `/auth/resetPassword`  | Set new password using verified email | No |

### 2. Scoped API Keys (`/apikeys`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST`   | `/apikeys` | Generate a new granular API key | Bearer (User/Admin) |
| `GET`    | `/apikeys` | View all active API keys for logged-in user | Bearer (User/Admin) |
| `DELETE` | `/apikeys/:id` | Revoke/delete an API key | Bearer (User/Admin) |

### 3. Products Catalog (`/products`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET`    | `/products` | List all products (Pagination, Filters, Search) | Public |
| `GET`    | `/products/:id` | Get product details by ID | Public |
| `POST`   | `/products` | Create product (Multipart with images) | Admin |
| `PUT`    | `/products/:id` | Update product details | Admin |
| `DELETE` | `/products/:id` | Remove a product | Admin |
| `POST`   | `/products/:id/apply-coupon` | Calculate discounted product price | User |
| `GET`    | `/products/:productId/reviews` | Get reviews specifically for product | Public |

### 4. Categories & Subcategories (`/categories`, `/subcategories`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET`    | `/categories` | List all parent categories | Public |
| `POST`   | `/categories` | Create category with image | Admin / Manager |
| `GET`    | `/categories/:id` | Get category by ID | Public |
| `PUT`    | `/categories/:id` | Update category | Admin / Manager |
| `DELETE` | `/categories/:id` | Delete category | Admin |
| `GET`    | `/categories/:categoryId/subcategories` | Get subcategories of category | Public |
| `GET`    | `/subcategories` | List all subcategories | Public |
| `POST`   | `/subcategories` | Create new subcategory | Admin / Manager |
| `PUT`    | `/subcategories/:id` | Update subcategory | Admin / Manager |
| `DELETE` | `/subcategories/:id` | Delete subcategory | Admin |

### 5. Brands (`/brands`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET`    | `/brands` | List all brands | Public |
| `POST`   | `/brands` | Create new brand | Admin / Manager |
| `GET`    | `/brands/:id` | Get brand by ID | Public |
| `PUT`    | `/brands/:id` | Update brand details | Admin / Manager |
| `DELETE` | `/brands/:id` | Delete brand | Admin |

### 6. Shopping Cart (`/cart`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET`    | `/cart` | Retrieve user cart & total price | Bearer / API Key (User) |
| `POST`   | `/cart` | Add product item to cart | Bearer / API Key (User) |
| `PUT`    | `/cart/:itemId` | Update quantity of cart item | Bearer / API Key (User) |
| `PUT`    | `/cart/applyCoupon` | Apply discount coupon to cart | Bearer / API Key (User) |
| `DELETE` | `/cart/:itemId` | Remove single item from cart | Bearer / API Key (User) |
| `DELETE` | `/cart` | Clear entire shopping cart | Bearer / API Key (User) |

### 7. Orders & Checkout (`/orders`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST`   | `/orders/:cartId` | Create Cash on Delivery order | Bearer / API Key (User) |
| `POST`   | `/orders/checkout-session/:cartId` | Create Stripe card checkout session | Bearer / API Key (User) |
| `GET`    | `/orders` | View orders (User: own orders, Admin: all) | Bearer / API Key |
| `GET`    | `/orders/:id` | View specific order details | Bearer / API Key |
| `PUT`    | `/orders/:id/pay` | Mark order as paid | Admin / Manager |
| `PUT`    | `/orders/:id/deliver` | Mark order as delivered | Admin / Manager |

### 8. Coupons (`/coupons`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET`    | `/coupons` | Get all active coupons | Admin / Manager |
| `POST`   | `/coupons` | Create a new discount coupon | Admin / Manager |
| `GET`    | `/coupons/:id` | Get specific coupon | Admin / Manager |
| `PUT`    | `/coupons/:id` | Update coupon expiration/discount | Admin / Manager |
| `DELETE` | `/coupons/:id` | Delete coupon | Admin / Manager |

### 9. Reviews & Ratings (`/reviews`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET`    | `/reviews` | List all product reviews | Public |
| `POST`   | `/reviews` | Submit a review & rating (1-5) | Bearer / API Key (User) |
| `GET`    | `/reviews/:id` | Get single review | Public |
| `PUT`    | `/reviews/:id` | Update own review | Bearer / API Key (User) |
| `DELETE` | `/reviews/:id` | Delete review | User / Admin / Manager |

### 10. Wishlist (`/wishlist`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET`    | `/wishlist` | Get logged user's favorite products | Bearer / API Key (User) |
| `POST`   | `/wishlist` | Add product to wishlist | Bearer / API Key (User) |
| `DELETE` | `/wishlist/:productId` | Remove product from wishlist | Bearer / API Key (User) |

### 11. User Addresses (`/addresses`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET`    | `/addresses` | List saved delivery addresses | Bearer / API Key (User) |
| `POST`   | `/addresses` | Add a new address (alias, city, phone) | Bearer / API Key (User) |
| `PUT`    | `/addresses/:addressId` | Edit existing address | Bearer / API Key (User) |
| `DELETE` | `/addresses/:addressId` | Remove address | Bearer / API Key (User) |

### 12. User Profile & Admin Management (`/users`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET`    | `/users/getMe` | View current logged-in user profile | Bearer / API Key |
| `PUT`    | `/users/updateMe` | Update profile info (name, email, phone) | Bearer / API Key |
| `PUT`    | `/users/changeMyPassword` | Change own password | Bearer / API Key |
| `DELETE` | `/users/deleteMe` | Deactivate own account | Bearer / API Key |
| `GET`    | `/users` | List all platform users | Admin / Manager |
| `POST`   | `/users` | Create user with explicit role | Admin |
| `GET`    | `/users/:id` | Get user by ID | Admin / Manager |
| `PUT`    | `/users/:id` | Update user data/role | Admin / Manager |
| `DELETE` | `/users/:id` | Delete user | Admin |
| `PUT`    | `/users/changePassword/:id` | Admin change user password | Admin |

### 13. Dashboard & Analytics (`/dashboard`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET`    | `/dashboard/stats` | Aggregated counts, total revenue, recent orders | Admin / Manager |

### 14. Real-time Live Notifications (`/notifications`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET`    | `/notifications/stream` | Server-Sent Events (SSE) live notifications stream | Bearer (User/Admin) |

---

## 🐶 Apidog & Postman Integration

The repository includes pre-built API specifications ready for **instant 1-click import into [Apidog](https://apidog.com/) or Postman**:

- **Apidog / Postman Collection**: [`apidog_collection.json`](./apidog_collection.json) *(Postman v2.1 standard format with folders, environment variables, preconfigured bearer tokens, and JSON schemas)*.
- **OpenAPI 3.0 Specification**: [`openapi_spec.json`](./openapi_spec.json) *(Standard OAS 3.0.3 definition)*.

### How to Import into Apidog:
1. Open **Apidog** and select or create a project.
2. Click **Import** (Settings ➔ Import Data or click the `+` icon).
3. Select **Postman** (or **OpenAPI/Swagger**).
4. Drag and drop `apidog_collection.json` (or `openapi_spec.json`).
5. All 15 modules and 50+ endpoints will automatically load with headers, query parameters, request bodies, and authentication setups.

### Preconfigured Environment Variables:
| Variable | Description | Default Value |
|---|---|---|
| `BASE_URL` | Base API route | `http://localhost:8000/api/v1` |
| `JWT_TOKEN` | Bearer JWT access token | *(Obtained from `/auth/login`)* |
| `API_KEY` | Machine-to-machine key | *(Obtained from `/apikeys`)* |

---

## 📁 Project Structure

```text
├── web api/
│   ├── config/              # MongoDB connection & configurations
│   ├── middlewares/         # Global error handler, upload & auth middlewares
│   ├── models/              # Mongoose schemas (User, Product, Order, Cart, etc.)
│   ├── routes/              # Express route declarations (15 modular routes)
│   ├── services/            # Controller & business logic layer
│   ├── utils/               # ApiFeatures, validators, tokens, logger, seeders
│   ├── uploads/             # Image storage (products, categories, users)
│   ├── config.env           # Environment variables
│   ├── server.js            # Main Express app initialization
│   ├── apidog_collection.json # Apidog / Postman Collection
│   └── openapi_spec.json    # OpenAPI 3.0 specification
├── apidog_collection.json   # Root-level Apidog Collection copy
├── openapi_spec.json        # Root-level OpenAPI specification copy
└── README.md                # Documentation
```

---

## ⚙️ Environment Configuration

Create or update `web api/config.env`:

```env
PORT=8000
NODE_ENV=development
BASE_URL=http://localhost:8000

# Database
DB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/ecommerce?retryWrites=true&w=majority

# JWT Authentication
JWT_SECRET_KEY=your_super_secret_jwt_key_here
JWT_EXPIRE_TIME=90d
REFRESH_TOKEN_SECRET_KEY=your_refresh_secret_key
REFRESH_TOKEN_EXPIRE_TIME=30d

# Stripe Payment
STRIPE_SECRET_KEY=sk_test_...

# Email Service (Nodemailer for password recovery)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18 or higher
- **npm**: v9 or higher
- **MongoDB**: Local MongoDB instance or MongoDB Atlas URI

### 2. Install Dependencies
```bash
cd "web api"
npm install
```

### 3. Run Development Server
```bash
npm run start:dev
```

Server will start on:
```text
App running on port 8000
Database Connected: cluster0.mongodb.net
```

---

## 👥 Seeded Test Accounts

Upon server startup, the system automatically checks and seeds default accounts if they do not already exist:

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@gmail.com` | `password123` |
| **Manager** | `manager@gmail.com` | `password123` |
| **User** | `user@gmail.com` | `password123` |

You can immediately test any endpoint by logging in with these credentials!

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
