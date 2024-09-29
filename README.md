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

#### TODOS

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

#### TODOS

## Categories Functionalities

| Method | Endpoint        | Description        | Status |
| ------ | --------------- | ------------------ | ------ |
| GET    | /categories     | Get all categories | ✅     |
| GET    | /categories/:id | Get a category     | ✅     |
| POST   | /categories     | Create a category  | ✅     |
| PATCH  | /categories/:id | Update a category  | ✅     |
| DELETE | /categories/:id | Delete a category  | ✅     |

#### TODOS

## Products Functionalities

| Method | Endpoint      | Description      | Status |
| ------ | ------------- | ---------------- | ------ |
| GET    | /products     | Get all products | ✅     |
| GET    | /products/:id | Get a product    | ✅     |
| POST   | /products     | Create a product | ✅     |
| PATCH  | /products/:id | Update a product | ✅     |
| DELETE | /products/:id | Delete a product | ❌     |

#### TODOS

## Blogs Functionalities

| Method | Endpoint   | Description   | Status |
| ------ | ---------- | ------------- | ------ |
| GET    | /blogs     | Get all blogs | ✅     |
| GET    | /blogs/:id | Get a blog    | ✅     |
| POST   | /blogs     | Create a blog | ✅     |
| PATCH  | /blogs/:id | Update a blog | ✅     |
| DELETE | /blogs/:id | Delete a blog | ✅     |

#### TODOS

- Add Validations Layer before Controller [❌]
- Add Check for User if owner who update or delete [❌]
