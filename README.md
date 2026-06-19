# Automated Attendance System 🚀 (v2.0)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Python](https://img.shields.io/badge/Python-3.x-blue.svg)](https://www.python.org/)
[![Django](https://img.shields.io/badge/Django-Backend-092e20.svg)](https://www.djangoproject.com/)
[![React](https://img.shields.io/badge/React-Frontend-61dafb.svg)](https://reactjs.org/)

## 📌 Overview

The **Automated Attendance System** is a full-stack web application that helps students instantly access their attendance information without manually navigating through the college portal.

The system securely retrieves attendance data, calculates overall attendance automatically, and presents both overall and subject-wise statistics through a clean and responsive interface.

This project was developed to eliminate the repetitive and time-consuming process of checking attendance through traditional college management systems.

---

## 🛑 Problem Statement

Students often face several challenges while checking their attendance:

* Login to the college portal every time.
* Navigate through multiple pages and menus.
* Check attendance for each subject separately.
* Manually calculate overall attendance percentage.
* Spend unnecessary time repeating the same process.

The traditional workflow is slow, inconvenient, and prone to calculation errors.

---

## 💡 Solution

The Automated Attendance System streamlines the entire process by:

* Fetching attendance data automatically.
* Calculating overall attendance instantly.
* Displaying subject-wise attendance statistics.
* Providing results within seconds.
* Offering a mobile-friendly and user-friendly experience.

---

## ⚡ Performance Improvements

| Feature               | Version 1.0         | Version 2.0               |
| --------------------- | ------------------- | ------------------------- |
| Data Retrieval        | Selenium Automation | Optimized Scraping Engine |
| Average Response Time | 25–30 Seconds       | 1–3 Seconds               |
| Resource Usage        | High                | Optimized                 |
| User Experience       | Basic               | Modern & Responsive       |
| Performance           | Good                | Significantly Improved    |

---

## ✨ Features

* Instant attendance retrieval.
* Automatic overall attendance calculation.
* Subject-wise attendance breakdown.
* Responsive design for mobile, tablet, and desktop.
* Clean and intuitive user interface.
* Fast backend processing.
* Real-time data retrieval.
* Error-free attendance calculations.

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* HTML5
* CSS3

### Backend

* Django
* Python

### Data Processing

* Optimized Attendance Scraping Engine

### Tools

* Git
* GitHub
* REST APIs

---
## 🖼️ Project Walkthrough

### Step 1: Landing Page

The user visits the application and is presented with a clean and responsive interface.

#### Features

* Modern UI Design
* Mobile Responsive Layout
* Fast Loading Experience

![Landing Page](screenshots/landing-page.png)

---

### Step 2: Login with College Credentials

Students enter their college credentials to access their attendance information securely.

#### Process

1. Enter Roll Number
2. Enter Password
3. Click "Check Attendance"

The system validates the credentials and begins fetching attendance data.

![Login Page](screenshots/login-page.png)

---

### Step 3: Automated Attendance Retrieval

After authentication, the backend automatically accesses the attendance portal and retrieves attendance records.

#### What Happens Behind The Scenes?

* User credentials are received securely.
* Attendance data is fetched automatically.
* Subject-wise attendance is extracted.
* Overall attendance is calculated.
* Process completes within seconds.

![Loading Screen](screenshots/loading-screen.png)

---

### Step 4: Attendance Dashboard

The application displays attendance information in an easy-to-understand format.

#### Dashboard Information

* Overall Attendance Percentage
* Subject-wise Attendance
* Attendance Statistics
* Total Classes Conducted
* Classes Attended

![Dashboard](screenshots/dashboard.png)

---

### Step 5: Subject-wise Breakdown

Students can view detailed attendance information for each individual subject.

#### Benefits

* Identify low-attendance subjects
* Monitor attendance trends
* Take action before attendance shortages occur

![Subject Breakdown](screenshots/subject-wise.png)

---

### Step 6: Mobile Experience

The application is fully responsive and works seamlessly across devices.

#### Supported Devices

* Mobile Phones
* Tablets
* Laptops
* Desktop Systems

![Mobile View](screenshots/mobile-view.png)

---

## ⚙️ System Workflow

```text
Student
   │
   ▼
Login Page
   │
   ▼
Enter Credentials
   │
   ▼
Backend Processing
   │
   ▼
Attendance Retrieval
   │
   ▼
Attendance Calculation
   │
   ▼
Dashboard Display
   │
   ▼
Subject-wise Analysis
```

---

## 📊 Project Impact

### Before

* Manual Login
* Multiple Navigation Steps
* Manual Calculations
* Time Consuming

### After

* Single Login
* Automated Retrieval
* Instant Calculations
* Results in Seconds

---

## 🏗️ Architecture Overview

```text
React Frontend
      │
      ▼
Django REST API
      │
      ▼
Attendance Scraper Engine
      │
      ▼
College Attendance Portal
      │
      ▼
Processed Attendance Data
      │
      ▼
Student Dashboard
```


## 📂 Project Structure

```text
Automated-Attendance-System/
│
├── backend/
│   ├── attendance/
│   │   ├── scraper.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   └── urls.py
│   │
│   ├── core/
│   └── manage.py
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── index.css
│   │
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
python manage.py runserver
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🎯 Key Highlights

* Reduced attendance checking time from minutes to seconds.
* Automated attendance calculations.
* Improved system performance by replacing heavy browser automation with optimized data retrieval techniques.
* Designed with scalability and user experience in mind.
* Mobile-first responsive interface.

---

## 📈 Future Enhancements

* Attendance history tracking.
* Attendance trend analytics.
* Subject-wise performance charts.
* Notifications and alerts.
* Export attendance reports as PDF.

---

## 👨‍💻 Developer

**Syed Mohammed Umar**

Full Stack Developer | MERN Stack | Django | Python

LinkedIn:
https://www.linkedin.com/in/syed-mohammed-umar/

GitHub:
https://github.com/syedmohammedumarumar

---

## ⭐ Support

If you found this project useful, consider giving it a star on GitHub.

It helps others discover the project and motivates further development.

---

Built with ❤️ to simplify attendance tracking for students.
