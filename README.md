# Laravel + Vue 3 (Vite) Authentication with JWT

This project is a **full-stack web application** built with **Laravel 12 (API backend)** and **Vue 3 (frontend)** using **JWT (JSON Web Token)** authentication.  
It includes a simple login/register system, protected routes, and a clean dashboard layout.

---

## 🚀 Features

- **Laravel 12** backend (API-only)
- **Vue 3 + Vite** frontend
- **JWT Authentication** using `tymon/jwt-auth`
- User **Login**, **Register**, and **Logout**
- Protected routes (both API and Vue router)
- **Axios** for HTTP requests
- **Tailwind CSS** for styling
- **Pinia** for state management (optional but recommended)
- Example dashboard after login

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-------------|
| Backend | Laravel 12 |
| Frontend | Vue 3 + Vite |
| Auth | JWT (`tymon/jwt-auth`) |
| Styling | Tailwind CSS |
| HTTP | Axios |
| State | Pinia |
| Database | MySQL |

---

## ⚙️ Prerequisites

Make sure you have these installed:

- PHP >= 8.1
- Composer
- Node.js & npm
- MySQL or another supported database
- (Optional) Docker + Laravel Sail

---

## 🧩 Installation

# Clone the repository
git clone https://github.com/Kennethwastaken123/trs_technical_exam.git

# Go to the project folder
cd trs_technical_exam

# Update docker-compose.yml
# (Make sure the volume path points to your local backend folder, e.g.)
# ./backend:/var/www/html

# Start Docker containers
docker-compose up --build -d

# In Docker Desktop, ensure both `laravel-app` and `mysql` containers are running

# Open a terminal in the `laravel-app` container
docker exec -it laravel-app bash

# Install dependencies
composer install

# Copy example environment file and generate app key
cp .env.example .env
php artisan key:generate

# Run database migrations
php artisan migrate

# (Optional) Seed the database
php artisan db:seed

# Exit the container
exit

# In another terminal, set up the frontend
cd frontend
npm install
npm run dev


