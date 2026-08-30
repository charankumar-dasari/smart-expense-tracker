# Smart Expense Tracker

A full-stack web application built to help users manage daily expenses, plan monthly budgets, organize shared bills, and understand spending patterns through monthly and yearly reports.

The project was developed feature by feature using a modular approach. Each feature was implemented by connecting a React frontend with Spring Boot REST APIs and a MySQL database.

---

## Project Overview

Managing personal expenses manually can make it difficult to understand where money is being spent and how much is remaining from a monthly budget.

Smart Expense Tracker provides a single application where users can:

- Record and manage daily expenses
- Search and filter expenses
- Set monthly budgets
- Track budget usage
- Manage members for shared expenses
- Create and split shared bills
- View monthly spending summaries
- View yearly spending summaries
- Analyze spending patterns
- Export expense information as a PDF report

The application is designed as a full-stack project using Java, Spring Boot, React, REST APIs, and MySQL.

---

# Features

## 1. Expense Management

The Expense Management module allows users to manage their daily financial transactions.

Users can:

- Add a new expense
- View all expenses
- Edit an existing expense
- Delete an expense
- Add an expense title
- Add an expense description
- Enter the expense amount
- Select an expense category
- Select a currency
- Select the expense date
- Search expenses by title
- Filter expenses by category

### Supported Categories

- Food
- Travel
- Shopping
- Rent
- Entertainment
- Bills
- Health
- Other

### Supported Currencies

- INR
- USD
- EUR

---

## 2. Budget Tracking

The Budget Tracking module helps users plan their monthly spending.

Users can select a month and year and create or update a monthly budget.

The module displays:

- Monthly budget amount
- Total amount spent
- Remaining budget
- Budget usage percentage
- Current budget status

The budget summary is updated based on the expense data for the selected month.

---

## 3. Member Management

The Member Management module is used to manage people who participate in shared expenses.

Users can:

- Add a new member
- View all members
- Remove a member

Each member can be used when creating and splitting shared bills.

---

## 4. Shared Bill Management

The Shared Bill module allows users to create expenses that are shared between multiple people.

A shared bill can include:

- Bill title
- Total amount
- Bill date
- Person who paid the bill
- Participating members

The application calculates how the bill should be divided among the selected participants.

---

## 5. Bill Splitting

The Bill Splitting feature divides the total amount of a shared bill between selected members.

The application calculates:

- Total bill amount
- Number of participants
- Amount per participant

This makes it easier to manage expenses shared between friends, roommates, or groups.

---

## 6. Settlement Calculation

The application includes functionality to help determine settlement information between members.

The system can be used to understand:

- Who paid for a shared expense
- Which members participated
- How much each participant should contribute
- Settlement information between members

---

## 7. Recurring Expense Management

The application includes support for managing recurring expenses.

Recurring expenses can represent regular payments such as:

- Rent
- Utility bills
- Subscription payments
- Insurance payments
- Other regular expenses

This feature helps organize expenses that occur repeatedly.

---

## 8. Monthly Summary

The Monthly Summary module provides an overview of spending for a selected month.

Users can select:

- Month
- Year

The summary displays:

- Total amount spent
- Total number of transactions
- Average expense amount
- Category-wise spending

The information is calculated from expense data stored in the database.

---

## 9. Yearly Summary

The Yearly Summary module provides an overview of spending for an entire year.

The module displays:

- Total yearly spending
- Total number of transactions
- Average monthly expense
- Month-wise spending

The application can display spending information from January through December.

---

## 10. Reports and Analytics

The Reports and Analytics module provides a detailed view of spending patterns.

The analytics section includes:

- Category-wise spending analysis
- Category spending percentage
- Highest spending category
- Highest category spending amount
- Highest spending month
- Highest monthly spending amount
- Yearly spending trend
- Month and year based analysis

This module helps users understand where most of their money is being spent.

---

## 11. PDF Expense Report

The application supports generating expense reports in PDF format.

The generated report can include:

- Expense title
- Category
- Currency
- Amount
- Date
- Description
- Total expense amount
- Report generation details

The frontend uses `jsPDF` and `jspdf-autotable` for PDF generation.

---

# Technology Stack

## Backend

- Java 17
- Spring Boot
- Spring Data JPA
- Hibernate
- MySQL
- Maven

## Frontend

- React
- Vite
- React Router
- Axios
- CSS
- Recharts
- jsPDF
- jspdf-autotable

## Development Tools

- IntelliJ IDEA
- Visual Studio Code
- MySQL Workbench
- Postman
- Git
- GitHub

---

# Project Architecture

```text
smart-expense-tracker/
│
├── backend/
│   │
│   └── src/
│       └── main/
│           ├── java/
│           │   └── com/
│           │       └── expense/
│           │           └── expensetracker/
│           │               │
│           │               ├── controller/
│           │               ├── dto/
│           │               ├── entity/
│           │               ├── repository/
│           │               └── service/
│           │
│           └── resources/
│               └── application.properties
│
├── frontend/
│   │
│   ├── src/
│   │   │
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
└── README.md
Application Flow

The basic flow of the application is:

React Frontend
      │
      ▼
Axios HTTP Requests
      │
      ▼
Spring Boot REST APIs
      │
      ▼
Service Layer
      │
      ▼
Spring Data JPA
      │
      ▼
MySQL Database

The React frontend handles the user interface and sends requests to the backend.

The Spring Boot application processes the requests and communicates with the MySQL database using Spring Data JPA and Hibernate.

Main Modules

The project is organized around the following modules:

Expense Management
Budget Tracking
Member Management
Shared Bill Management
Bill Splitting
Settlement Calculation
Recurring Expense Management
Monthly Summary
Yearly Summary
Reports and Analytics
PDF Report Generation
REST APIs
Expense APIs
Method	Endpoint	Description
POST	/api/expenses	Create a new expense
GET	/api/expenses	Get all expenses
GET	/api/expenses/{id}	Get an expense by ID
PUT	/api/expenses/{id}	Update an expense
DELETE	/api/expenses/{id}	Delete an expense
GET	/api/expenses/search?keyword=	Search expenses
GET	/api/expenses/category/{category}	Filter expenses by category
Monthly Summary API
Method	Endpoint	Description
GET	/api/summary/monthly?month={month}&year={year}	Get monthly expense summary

Example:

GET /api/summary/monthly?month=8&year=2026
Yearly Summary API
Method	Endpoint	Description
GET	/api/summary/yearly?year={year}	Get yearly expense summary

Example:

GET /api/summary/yearly?year=2026
Database

The project uses MySQL as the primary database.

Example database name:

expense_tracker_db

The database stores information related to:

Expenses
Monthly budgets
Members
Shared bills
Bill participation and splitting
Recurring expenses

Spring Data JPA and Hibernate are used to manage database operations.

Running the Project Locally
Prerequisites

Before running the project, make sure the following are installed:

Java 21
MySQL
Maven
Node.js
npm
Backend Setup
1. Create the Database

Create a MySQL database:

CREATE DATABASE expense_tracker_db;
2. Configure Database Properties

Open:

backend/src/main/resources/application.properties

Configure your MySQL database connection.

Example:

spring.datasource.url=jdbc:mysql://localhost:3306/expense_tracker_db
spring.datasource.username=your_username
spring.datasource.password=your_password

Update the values according to your local MySQL configuration.

3. Run the Backend

Navigate to the backend directory and run:

mvnw.cmd spring-boot:run

The Spring Boot application will run on:

http://localhost:8080
Frontend Setup
1. Navigate to the Frontend Directory
cd frontend
2. Install Dependencies
npm install
3. Start the Frontend Application
npm run dev

The Vite development server will normally run on:

http://localhost:5173
Frontend Dependencies

The project uses the following main frontend libraries:

react
react-dom
react-router-dom
axios
recharts
jspdf
jspdf-autotable

Axios is used for communication between the React frontend and Spring Boot backend.

Recharts is used for data visualization and analytics.

jsPDF and jspdf-autotable are used for generating PDF reports.

Development Approach

The project was developed using a module-based approach.

Instead of building the complete application at once, features were developed incrementally.

The general development process followed this pattern:

Requirement
    ↓
Backend Design
    ↓
Database Entity
    ↓
Repository
    ↓
Service Layer
    ↓
REST API
    ↓
API Testing
    ↓
React Component
    ↓
Frontend Integration
    ↓
Feature Testing
    ↓
UI Improvements

This approach helped keep the project organized and made it easier to develop and test individual modules.

Development Progress
 Project Setup
 Expense Management
 Expense Search
 Expense Category Filter
 Budget Tracking
 Member Management
 Shared Bill Management
 Bill Splitting
 Settlement Calculation
 Recurring Expense Management
 Monthly Summary
 Yearly Summary
 Reports and Analytics
 PDF Report Export
 Responsive UI Improvements
 Complete End-to-End Testing
 Production Deployment
Project Goal

The goal of Smart Expense Tracker is to provide a practical application for managing both personal and shared expenses.

The application helps users:

Track daily spending
Organize expenses by category
Monitor monthly budgets
Understand spending habits
Manage shared expenses
Split bills between members
Review monthly financial activity
Review yearly spending trends
Generate expense reports

The project also demonstrates the integration of a React frontend with a Spring Boot backend and MySQL database using REST APIs.

Future Improvements

Possible future improvements include:

User authentication and authorization
Individual user accounts
JWT based security
Expense notifications
Budget limit alerts
Advanced charts and dashboards
Export reports in additional formats
Mobile application support
Cloud deployment
Automated testing
Improved error handling and validation
Author

Developed as a full-stack application using:

Java | Spring Boot | React | MySQL | REST APIs

Project Status

The core features of the application have been implemented.

The remaining work mainly includes:

Final end-to-end testing
Production deployment
Additional UI refinements