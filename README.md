# Fully Functional REST API for Ecommerce Website

> Class - Structure = Functions

Yes! Although my project using classes without any planning or structure, i mentions that.

my goal is to enhance my skills in OOP and design code, so I will try to refactor my project in next phase.

This is a fully functional REST API for an Ecommerce website. It is built using Node/Express. It has all the necessary features required for an Ecommerce website. It has the following features:

1. User Authentication
2. Product Management
3. Cart Management
4. Order Management
5. Payment Gateway Integration
6. User Profile Management
7. Admin Panel
8. User Reviews and Ratings
9. Search and Filter
10. Pagination
11. Email Notifications
12. Password Reset
13. User Roles
14. File Upload
15. User Address Management
16. Wishlist
17. Coupon System
18. Order Tracking
19. User Activity Tracking
20. User Recommendations
21. User Notifications
22. User Chat System

## Installation

1. Clone the repository
2. Run `npm install`
3. Create a `.env` file and add the following environment variables:

```
NODE_ENV=development

SERVER_PORT=3000
SERVER_DOMAIN=http://localhost

DB_USERNAME=
DB_PASSWORD=
DB_ATLAS_URI=mongodb+srv:

SECRET_KEY=
REFRESH_TOKEN_KEY=

MAIL_ACCOUNT=
MAIL_PASSWORD_APP=

```

## Usage

Run `npm run dev2` to start the server. The server will start at `http://localhost:3000`

## API Documentation

Link API: https://documenter.getpostman.com/view/23054100/2sAXqv61r7

## Authentication Functionalities

| Method | Endpoint                        | Description                   | Status |
| ------ | ------------------------------- | ----------------------------- | ------ |
| POST   | /auth/register                  | Register a new user           | ✅     |
| POST   | /auth/login                     | Login a user                  | ✅     |
| POST   | /auth/logout                    | Logout a user                 | ✅     |
| POST   | /auth/forgot-password           | Send a password reset email   | ✅     |
| POST   | /auth/reset-password            | Reset a user's password       | ✅     |
| POST   | /auth/verify-email              | Verify a user's email address | ❌     |
| POST   | /auth/resend-verification-email | Resend a verification email   | ❌     |
| POST   | /auth/change-password           | Change a user's password      | ✅     |
| POST   | /auth/change-email              | Change a user's email address | ❌     |
| POST   | /auth/refresh                   | Refresh a user's token        | ✅     |

## Users Functionalities

| Method | Endpoint           | Description    | Status |
| ------ | ------------------ | -------------- | ------ |
| GET    | /users             | Get all users  | ✅     |
| GET    | /users/:id         | Get a user     | ✅     |
| PUT    | /users/:id         | Update a user  | ✅     |
| DELETE | /users/:id         | Delete a user  | ✅     |
| POST   | /users/:id/block   | Block a user   | ✅     |
| POST   | /users/:id/unblock | Unblock a user | ✅     |

#### TODOS (General)

- Create a function for Mongoid is valid [✅]
- Review Auth Cycle (Specifically the refresh token) [❌]
- Query Features (Fields, Filter, Sort, Pagination, Limiting, Search) [✅]

## Brands Functionalities

| Method | Endpoint    | Description    | Status |
| ------ | ----------- | -------------- | ------ |
| GET    | /brands     | Get all brands | ✅     |
| GET    | /brands/:id | Get a brand    | ✅     |
| POST   | /brands     | Create a brand | ✅     |
| PATCH  | /brands/:id | Update a brand | ✅     |
| DELETE | /brands/:id | Delete a brand | ✅     |

## Categories Functionalities

| Method | Endpoint        | Description        | Status |
| ------ | --------------- | ------------------ | ------ |
| GET    | /categories     | Get all categories | ✅     |
| GET    | /categories/:id | Get a category     | ✅     |
| POST   | /categories     | Create a category  | ✅     |
| PATCH  | /categories/:id | Update a category  | ✅     |
| DELETE | /categories/:id | Delete a category  | ✅     |

## Products Functionalities

| Method | Endpoint      | Description      | Status |
| ------ | ------------- | ---------------- | ------ |
| GET    | /products     | Get all products | ✅     |
| GET    | /products/:id | Get a product    | ✅     |
| POST   | /products     | Create a product | ✅     |
| PATCH  | /products/:id | Update a product | ✅     |
| DELETE | /products/:id | Delete a product | ❌     |

## TODOS
