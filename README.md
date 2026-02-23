# 💰 Personal Finance Management System – Frontend

A modern and responsive **Personal Finance Management System (PFMS)** built using **React, TypeScript, and Vite**. This application helps users manage income, expenses, savings goals, and financial analytics with interactive dashboards and AI-powered insights.

---

## 🚀 Features

* 🔐 User Authentication (Login / Profile Management)
* 📊 Interactive Dashboard Overview
* 💵 Income Management
* 💳 Expense Management
* 🎯 Financial Goals Tracking
* 📈 Analytics & Charts Visualization
* 🤖 AI Insights (Gemini Integration)
* 🌙 Modern UI with Sidebar Layout
* 🔄 API Integration with Backend Services

---

## 🛠️ Tech Stack

* **Frontend Framework:** React + TypeScript
* **Build Tool:** Vite
* **State Management:** Context API
* **Routing:** React Router
* **Charts & Analytics:** Custom Chart Components
* **API Handling:** Axios (via services layer)
* **Linting:** ESLint

---

## 📁 Project Structure

```
src/
 ├── Components/        # Reusable UI components
 ├── pages/             # Main application pages
 ├── services/          # API service layer
 ├── context/           # Authentication context
 ├── routes/            # Application routing
 ├── assets/            # Images & static assets
 ├── types.ts           # Type definitions
 ├── App.tsx            # Root component
 └── main.tsx           # Application entry point
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone <your-repository-url>
cd Personal-Finance-Management-System-FontEnd
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file in the root directory and configure:

```
VITE_API_BASE_URL=your_backend_api_url
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### 4️⃣ Run the Development Server

```bash
npm run dev
```

The app will run on:

```
http://localhost:5173
```

---

## 🏗️ Build for Production

```bash
npm run build
```

To preview production build:

```bash
npm run preview
```

---

## 🔌 API Integration

All API calls are handled inside the `services/` directory:

* `api.ts` – Base API configuration
* `auth.ts` – Authentication APIs
* `income.ts` – Income management
* `expenses.ts` – Expense management
* `goals.ts` – Goal tracking
* `user.ts` – User management
* `geminiService.ts` – AI financial insights

---

## 📊 Main Pages

* **Dashboard** – Overview of financial summary
* **Income Management** – Add & manage income records
* **Expense Management** – Track daily expenses
* **Goals** – Manage savings goals
* **Analytics** – Visual financial analysis
* **Insights** – AI-based recommendations
* **Profile** – User account details

---

## 🔐 Authentication

Authentication is handled using:

* Auth Context (`authContext.tsx`)
* Token-based API communication

---

## 🎯 Future Improvements

* Dark mode support
* Advanced financial forecasting
* Export reports (PDF/Excel)
* Budget limit alerts
* Multi-user financial comparison

---

## 👨‍💻 Author

**Shasidu Malshan Fernando**
Graduate Diploma in Software Engineering
IJSE – Institute of Software Engineering

---

## 📄 License

This project is for educational and portfolio purposes.

---
