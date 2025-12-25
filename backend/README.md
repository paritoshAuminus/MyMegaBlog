# MyMegaBlog Backend

Django backend for a blog platform. Handles blog creation and management by authenticated users, while allowing public (unauthenticated) access for reading blogs. Provides a REST API consumed by web clients.

---

## Overview

This service is responsible for:

* Creating, updating, and deleting blogs by their respective authors
* User authentication using JWT
* Serving blog content to anonymous users via public endpoints

It does **not** handle:

* Frontend rendering

---

## Tech Stack

* Python 3.11+
* Django 5.1+
* Django REST Framework
* djangorestframework-simplejwt (JWT authentication)
* SQLite (development)
* python-dotenv

---

## Prerequisites

* Python 3.11+
* Django 5.1+
* Django REST Framework 3.15+

---

## Setup

1. Clone the repository

```bash
git clone https://github.com/paritoshAuminus/MyMegaBlog/
```

2. Move to the backend directory

```bash
cd backend/
```

3. Install dependencies

```bash
pip install -r requirements.txt
```

4. Run database migrations

```bash
python manage.py migrate
```

5. Create a superuser

```bash
python manage.py createsuperuser
```

> **Note:** This project also includes a frontend. Refer to the `frontend/README.md` for frontend setup instructions.

---

## Configuration

The following environment variables are required:

| Variable     | Description       |
| ------------ | ----------------- |
| `DEBUG`      | Enable debug mode |
| `SECRET_KEY` | Django secret key |

---

## Running the Project

Start the development server:

```bash
python manage.py runserver
```

Access the admin panel:

```
http://localhost:8000/admin/
```

---

## API Documentation

**Base URL:** `http://localhost:8000/`

### Authentication

| Method | Endpoint          | Description       |
| ------ | ----------------- | ----------------- |
| POST   | `/auth/login/`    | User login        |
| POST   | `/auth/register/` | User registration |

Authentication is handled via JWT.
Include the token in requests requiring authentication:

```
Authorization: Bearer <access_token>
```

---

### Blogs

| Method | Endpoint           | Description       | Auth Required |
| ------ | ------------------ | ----------------- | ------------- |
| GET    | `/api/blogs/`      | List all blogs    | No            |
| POST   | `/api/blogs/`      | Create a new blog | Yes           |
| GET    | `/api/blogs/{id}/` | Retrieve a blog   | No            |
| PUT    | `/api/blogs/{id}/` | Update a blog     | Yes           |
| DELETE | `/api/blogs/{id}/` | Delete a blog     | Yes           |

> **Note:** Create, Update, and Delete operations require authentication.

---