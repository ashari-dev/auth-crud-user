# Auth and CRUD users

This project is an API backend built using Node.js and PostgreSQL, providing authentication (login and register) and user management (create, update, delete, edit) features.

## Manual Installation

Clone the repo:

```bash
git https://github.com/ashari-dev/auth-crud-user.git
cd auth-crud-user
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env
```

open .env

```bash
HOST_PORT =

DB_HOST =
DB_PORT =
DB_USER =
DB_NAME =
DB_PASSWORD =

JWT_SECRET =
JWT_EXP =
```

set the Makefile

```bash
host ?= # set the host database
port ?= # set the port database
user ?= # set the username database
pass ?= # set the password database
db ?= # set the database name
```

### API Endpoints

List of available routes:

**Auth routes**:\
`POST auth/signup` - Signup\
`POST auth/signin` - Signin\\

**User routes**:\
`POST user/` - Create a user\
`GET user/` - Get all users\
`GET user/:id` - Get user\
`PUT user/:id` - Update user\
`DELETE user/:id` - Delete user
