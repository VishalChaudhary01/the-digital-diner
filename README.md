# 🍽️ The Digital Diner

The Digital Diner is a full-stack restaurant ordering platform where customers can browse categorized menus, place pickup orders, and track their order history.

---

## 🚀 Tech Stack

### Backend

- **Node.js**, **Express.js** for the server framework
- **TypeScript** for static typing and maintainability
- **Prisma ORM** with **PostgreSQL** for managing Orders and Users — chosen for its structured, relational, and transactional capabilities, ideal for consistent data and reporting
- **Mongoose** with **MongoDB** for Menu Items — used due to the flexible and evolving data structure (e.g., customizable food options)
- **Zod** for request schema validation
- **JWT** for authentication via secure cookies
- **Bcrypt** for password hashing

---

## ✅ Key Features

### 🔐 Authentication & Authorization

- Secure cookie-based JWT authentication
- Role-based access control with `USER` and `ADMIN` roles
- Route-level guards enforce permissions
- Only `ADMIN`s can:
  - Add, update, or delete menu items
  - Update order status
  - View all orders

### 🧾 Order Management

- Users can place orders with one or more menu items
- Orders store a `priceAtOrder` snapshot for historical accuracy
- Supported order statuses: `PENDING`, `DELIVERED`, `CANCEL`
- Only `PENDING` orders are cancellable by users
- Admins can update order statuses (except to `CANCEL`)

### 🚨 Error Handling

- Centralized error-handling middleware
- Custom exception classes for consistent API responses
- Zod-powered input validation returns user-friendly messages
- Example error types:
  - `UnauthorizedException` — missing or invalid token
  - `NotFoundException` — invalid ID for order or menu item
  - `BadRequestException` — invalid state transition (e.g., cancelling a delivered order)

### 🗂️ Searching, Filtering, Sorting, and Pagination

- Menu items support advanced querying:
  - Category-based filtering (e.g., `?category=DESSERTS`)
  - Price-based sorting (e.g., `?sort=price-lowtohigh`)
  - Name-based searching
  - Pagination support for scalable item browsing
- All logic is handled server-side for performance and control

---

## 🔮 Future Additions

- Full integration with the React framework (currently in development)
- OTP-based phone number verification
- Enhanced role flexibility by introducing an `OWNER` role:
  - The `OWNER` has exclusive rights to invite `ADMIN`s via SMS
  - Invited `ADMIN`s can create their accounts through the invitation link
  - `ADMIN`s will have permissions to manage order statuses and menu items, but cannot invite other admins
- Admin dashboard featuring analytics and order reports

---
