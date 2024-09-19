## Authentication Functionalities

| Method | Endpoint                        | Description                   | Status |
| ------ | ------------------------------- | ----------------------------- | ------ |
| POST   | /auth/register                  | Register a new user           | ✅     |
| POST   | /auth/login                     | Login a user                  | ✅     |
| POST   | /auth/logout                    | Logout a user                 | ✅     |
| POST   | /auth/forgot-password           | Send a password reset email   | ❌     |
| POST   | /auth/reset-password            | Reset a user's password       | ❌     |
| POST   | /auth/verify-email              | Verify a user's email address | ❌     |
| POST   | /auth/resend-verification-email | Resend a verification email   | ❌     |
| POST   | /auth/change-password           | Change a user's password      | ✅     |
| POST   | /auth/change-email              | Change a user's email address | ❌     |

## Users Functionalities

| Method | Endpoint           | Description    | Status |
| ------ | ------------------ | -------------- | ------ |
| GET    | /users             | Get all users  | ✅     |
| GET    | /users/:id         | Get a user     | ✅     |
| PUT    | /users/:id         | Update a user  | ✅     |
| DELETE | /users/:id         | Delete a user  | ✅     |
| PATCH  | /users/:id/block   | Block a user   | ❌     |
| PATCH  | /users/:id/unblock | Unblock a user | ❌     |

#### TODOS

- Create a function for Mongoid is valid [✅]
- Query Features (Fields, Filter, Sort, Pagination, Limiting, Search) [❌]
