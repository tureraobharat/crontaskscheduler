#  Cron Task Scheduler (Angular)

A modern **Cron Task Scheduler Dashboard** built using **Angular** and **Reactive Forms**.
This project allows users to create, update, manage, and monitor scheduled background tasks with a clean dashboard UI.

---

##  Project Overview

The **Cron Task Scheduler** is a frontend application that simulates task scheduling management similar to real enterprise systems.

Users can:

✅ Create scheduled tasks
✅ Edit existing tasks
✅ Delete tasks
✅ Pause / Activate tasks
✅ Search & filter tasks
✅ View dashboard statistics
✅ Persist data using LocalStorage

---

##  Key Features

### Dashboard

* Task statistics cards
* Active / Paused task count
* Next scheduled run preview
* Real-time updates using RxJS

### Task Management

* Create Task Form
* Edit Task Form
* Cron Expression presets
* Human readable schedule preview

###  Search & Filter

* Search by task name
* Filter by task status
* Reactive Form filtering

### State Management

* Global state using **BehaviorSubject**
* Shared data across components
* No backend API required

---

##  Tech Stack

* **Angular**
* **TypeScript**
* **RxJS**
* **Reactive Forms**
* **Component Architecture**
* **LocalStorage Persistence**
* **CSS3 Modern UI**

---

## 📂 Project Architecture

```
src/app
│
├── core
│   ├── models
│   └── services
│
├── shared
│   └── reusable components
│
└── features
    ├── dashboard
    ├── task-list
    └── task-form
```

---

##  Installation & Setup

### 1️⃣ Clone Repository


### 2️⃣ Navigate to Project

```bash
cd cron-task-scheduler
```

### 3️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Run Application

```bash
ng serve
```

Open browser:

```
http://localhost:4200
```

---

##  Core Concepts Implemented

* Lazy Loading Modules
* Reactive Forms
* Angular Routing
* Component Communication
* Service-Based State Management
* RxJS BehaviorSubject
* Smart & Presentational Components

##  Future Improvements

* Backend API Integration
* Authentication & Authorization
* Real Cron Parser Integration
* Task Execution Logs
* Dark Mode UI
* Role Based Access

---

## Author

**Bharat Turerao**

Frontend Developer | Angular Developer

* HTML
* CSS
* JavaScript
* Angular
* RxJS

---
