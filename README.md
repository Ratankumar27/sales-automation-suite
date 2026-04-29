# Sales Automation Suite

🚀 **Enterprise-Grade Full Stack Sales & Commerce Platform** developed to automate modern business workflows including customer onboarding, secure payments, product lifecycle management, intelligent order processing, admin operations, and automated communication systems.

Built using **Spring Boot, React, MySQL, JWT Security, Razorpay Integration, JavaMail Sender, REST APIs**, this project reflects real-world scalable architecture used in production business systems.

---

# 📌 Executive Overview

Sales Automation Suite is a comprehensive digital platform that enables businesses to manage complete sales pipelines — from user registration to payment confirmation, order fulfillment, notifications, and admin governance.

The system reduces manual effort by automating critical workflows such as:

- Customer onboarding  
- Secure authentication  
- Product publishing  
- Smart cart processing  
- Razorpay payment transactions  
- Order lifecycle tracking  
- Email notification system  
- Admin monitoring & control  

---

# 🔥 Core Business Workflows Implemented

## 1️⃣ Customer Acquisition Workflow

Register → Email/Login Authentication → Profile Creation → Product Discovery

- Secure user signup & login
- JWT token generation
- Session-based access flow
- Role-based authorization

---

## 2️⃣ Product Purchase Workflow

Browse Products → Add to Cart → Quantity Update → Checkout → Razorpay Payment → Order Confirmation

- Real-time cart management
- Seamless checkout pipeline
- Dynamic order total generation
- Successful payment capture

---

## 3️⃣ Razorpay Payment Gateway Workflow

Create Order → Generate Razorpay Order ID → Frontend Payment Popup → Payment Verification → Order Placement

### Payment Capabilities

- Razorpay API Integration
- Secure online transactions
- Order payment verification
- Payment success/failure handling
- Transaction linked to order records

---

## 4️⃣ Email Automation Workflow

Registration Success → Welcome Mail  
Order Placed → Confirmation Mail  
Payment Success → Receipt Mail

Implemented using **JavaMailSender** for automated communication.

### Email Features

- Welcome emails
- Order confirmation notifications
- Payment success alerts
- Transaction acknowledgement mails

---

## 5️⃣ Admin Operations Workflow

Admin Login → Dashboard → Manage Users → Manage Products → Monitor Orders → Business Control

### Admin Modules

- User management
- Product CRUD operations
- Business monitoring dashboard
- Order visibility & control
- System governance

---

# ✨ Major Functional Modules

## 🔐 Authentication & Security

- JWT Authentication
- Spring Security
- Role-Based Access Control
- Token validation filters
- Protected REST APIs

## 🛍 Product Management

- Product catalog system
- Categories management
- Product image handling
- Admin product controls

## 🛒 Smart Cart Engine

- Add/remove cart items
- Quantity updates
- Dynamic totals
- Session continuity

## 📦 Order Lifecycle System

- Order placement
- Order item mapping
- Status management
- Order history tracking

## 💳 Digital Payments

- Razorpay Integration
- Payment verification
- Secure checkout flow

## 📧 Notification Engine

- JavaMailSender integration
- Automated transactional emails

---

# 🛠 Technology Stack

## Frontend

- React.js
- Vite
- JavaScript
- CSS

## Backend

- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate ORM
- RESTful APIs

## Database

- MySQL

## Integrations

- Razorpay Payment Gateway
- JavaMailSender SMTP Service

## Tools

- Maven
- Git
- GitHub
- IntelliJ IDEA
- VS Code

---

# 📁 Architecture Structure

sales-automation-suite/  
│── backend/     Spring Boot Microservice Layer  
│── frontend/    React Client Application

---

# ⚙️ Run Locally

## Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
