# 🛒 eCommerce Backend Design (MERN Stack)

![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=flat-square&logo=react)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Status](https://img.shields.io/badge/Status-Active_Development-orange?style=flat-square)

Welcome to the **ecommerce-backend-design** repository! This project is being developed as part of the Backend Development Internship at **Developershub**. 

This repository houses a fully functional, full-stack eCommerce application built from the ground up using the **MERN** stack (MongoDB, Express.js, React.js, Node.js). The goal is to integrate a provided frontend design template with a robust, scalable backend, ensuring seamless dynamic content rendering and responsive desktop/mobile views.

---

## 🏗️ System Design & Architecture

Unlike traditional server-rendered applications (e.g., using EJS), this project utilizes a modern, decoupled architecture. This separates the client-side presentation from the server-side business logic, allowing for better scalability and developer experience.

### High-Level Architecture
1. **Frontend (Client):**
   - Built with **React.js**.
   - Handles the User Interface, responsive design (mobile/desktop), state management, and routing.
   - Communicates with the backend via RESTful API calls.
2. **Backend (Server):**
   - Built with **Node.js** and **Express.js**.
   - Acts as the API Gateway. Handles routing, business logic, user authentication, and data validation.
3. **Database:**
   - **MongoDB** (NoSQL database).
   - Stores dynamic data such as Products (ID, name, price, category, image, description, stock) and User credentials.
4. **Authentication:**
   - **JSON Web Tokens (JWT)** for secure, stateless user authentication and role-based access control (Admin routes).

### Data Flow
`[Client (React)] <--(JSON via HTTP/REST)--> [API Server (Express)] <--(Mongoose)--> [Database (MongoDB)]`

---

## 🚀 Features Roadmap

The development of this platform is divided into three core phases:

### Phase 1: Static Integration & Server Foundation
- [ ] Node.js & Express.js server setup with MVC folder structure.
- [ ] Static routes initialized (`/`, `/products`, `/products/:id`).
- [ ] React.js frontend setup serving Home, Product Listing, and Product Details pages.
- [ ] Mobile and desktop responsive UI integration using the provided assets.

### Phase 2: Database Integration & Dynamic Content
- [ ] MongoDB connection established via Mongoose.
- [ ] Product Schema designed and database seeded with sample data.
- [ ] Dynamic data rendering on React frontend (Featured products, Grid layouts).
- [ ] Server-side Search functionality to filter products by name/category.

### Phase 3: Authentication & Admin Features
- [ ] JWT-based user authentication (Login/Signup).
- [ ] Protected Admin routes for adding new products via forms.
- [ ] Pagination implemented on the Product Listing page for large datasets.
- [ ] Final deployment of the application (e.g., Vercel for Frontend, Render for Backend).

---

## 💻 Tech Stack

**Frontend:**
* React.js
* Vite (Build Tool)
* CSS3 / Tailwind CSS (Responsive Design)

**Backend:**
* Node.js
* Express.js
* JSON Web Tokens (JWT)
* bcrypt.js (Password Hashing)

**Database:**
* MongoDB
* Mongoose (ODM)

---

## 🛠️ Getting Started (Local Development)

### Prerequisites
Make sure you have the following installed on your local machine:
* [Node.js](https://nodejs.org/) (v16 or higher)
* [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas URI)
* [Git](https://git-scm.com/)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/ecommerce-backend-design.git](https://github.com/your-username/ecommerce-backend-design.git)
   cd ecommerce-backend-design
