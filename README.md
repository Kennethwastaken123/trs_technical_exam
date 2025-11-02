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

🚀 Installation
1️⃣ Clone the Repository
git clone https://github.com/Kennethwastaken123/trs_technical_exam.git

2️⃣ Go to the Project Folder
cd trs_technical_exam

3️⃣ Update docker-compose.yml

Make sure the volume path points to your local backend folder:

./backend:/var/www/html

4️⃣ Start Docker Containers
docker-compose up --build -d

5️⃣ Verify Containers

In Docker Desktop, ensure both containers are running:

laravel-app

mysql

6️⃣ Access the Laravel Container
docker exec -it laravel-app bash

7️⃣ Install Dependencies
composer install

8️⃣ Copy Environment File and Generate App Key
cp .env.example .env
php artisan key:generate

9️⃣ Run Database Migrations
php artisan migrate

🔟 (Optional) Seed the Database
php artisan db:seed

1️⃣1️⃣ Exit the Container
exit

1️⃣2️⃣ Set Up the Frontend
cd frontend
npm install
npm run dev



