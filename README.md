# Smart Expense Tracker & Bill Splitting System

A full-stack web application for managing personal expenses, tracking monthly budgets, splitting bills with friends, calculating settlements, managing recurring expenses, and analyzing spending patterns.

The project is being developed incrementally using a module-based development process. Each module is implemented, tested, documented, and committed before moving to the next feature.

---

## Project Status

### Completed Features

* Expense Management
* Budget Tracking
* Member Management
* Shared Bill Management
* Bill Splitting
* Who Owes Whom Calculation
* Recurring Expense Management
* Monthly Summary
* Yearly Summary
* Reports and Analytics

### Currently Being Added

* PDF Expense Report Export

### Remaining Work

* Final UI improvements
* Complete end-to-end testing
* Deployment

---

# Features

## 1. Expense Management

Users can:

* Add a new expense
* View all expenses
* Update an existing expense
* Delete an expense
* Add expense title and description
* Enter expense amount
* Select expense category
* Select currency
* Select expense date
* Search expenses by title
* Filter expenses by category
* Validate expense input data

### Supported Categories

* Food
* Travel
* Shopping
* Rent
* Entertainment
* Bills
* Health
* Other

### Supported Currencies

* INR
* USD
* EUR

---

## 2. Budget Tracking

Users can:

* Set a monthly budget
* Update an existing budget
* View monthly budget amount
* View total spending
* View remaining budget
* View budget usage percentage
* Check current budget status

The budget information automatically updates when expenses are added or modified.

---

## 3. Member Management

Users can manage members who participate in shared expenses.

Features include:

* Add a member
* View all members
* Update member details
* Delete a member

This module is used by the shared bill and bill splitting features.

---

## 4. Shared Bill Management

Users can create and manage shared bills.

A shared bill can include:

* Bill title
* Total amount
* Description
* Date
* Participating members

Users can also update and delete shared bills.

---

## 5. Bill Splitting

The application supports splitting shared bills between multiple members.

The system can:

* Add members to a shared bill
* Calculate individual shares
* Store member participation
* Manage bill split information

This helps users track shared expenses between friends, roommates, or groups.

---

## 6. Who Owes Whom Calculation

The application calculates settlements between members.

The system helps determine:

* Who paid money
* Who owes money
* How much each member owes
* Settlement information between members

This feature simplifies shared expense calculations.

---

## 7. Recurring Expense Management

Recurring expenses can be managed for regular payments such as:

* Rent
* Subscription payments
* Utility bills
* Insurance payments
* Monthly services

Users can manage recurring expense details and track regular spending.

---

## 8. Monthly Summary

The Monthly Summary module provides an overview of spending for a selected month.

It displays:

* Total amount spent
* Total number of transactions
* Average expense amount
* Category-wise spending

Users can select:

* Month
* Year

The system calculates the summary using expense data stored in the MySQL database.

---

## 9. Yearly Summary

The Yearly Summary module provides an overview of expenses for an entire year.

It displays:

* Total yearly spending
* Total transactions
* Average monthly expense
* Month-wise spending from January to December

The system also displays months with zero spending.

---

## 10. Reports and Analytics

The Reports and Analytics dashboard provides insights into spending patterns.

Features include:

* Category-wise spending analysis
* Category spending percentage
* Highest spending category
* Highest category spending amount
* Highest spending month
* Highest monthly spending amount
* Yearly spending trend
* Month and year filters
* Progress-based visual indicators

The analytics dashboard reuses the Monthly Summary and Yearly Summary APIs.

---

## 11. PDF Report Export

PDF report export is currently being added.

The report will include:

* Expense details
* Expense title
* Category
* Currency
* Amount
* Date
* Description
* Total expense amount
* Report generation date

The frontend uses `jsPDF` and `jspdf-autotable` for PDF generation.

---

# Technology Stack

## Backend

* Java 17
* Spring Boot
* Spring Data JPA
* Hibernate
* MySQL
* Maven

## Frontend

* React
* Vite
* Axios
* CSS
* jsPDF
* jspdf-autotable

## Development Tools

* IntelliJ IDEA / VS Code
* MySQL Workbench
* Postman
* Git
* GitHub

---

# Project Architecture

```text
smart-expense-tracker/

├── backend/
│
│   └── src/main/java/
│       └── com/expense/expensetracker/
│
│           ├── controller/
│           │
│           ├── dto/
│           │
│           ├── entity/
│           │
│           ├── repository/
│           │
│           └── service/
│
├── frontend/
│
│   └── src/
│       │
│       ├── components/
│       │
│       └── services/
│
└── README.md
```

---

# Current REST APIs

## Expense APIs

| Method | Endpoint                            | Description        |
| ------ | ----------------------------------- | ------------------ |
| POST   | `/api/expenses`                     | Create expense     |
| GET    | `/api/expenses`                     | Get all expenses   |
| GET    | `/api/expenses/{id}`                | Get expense by ID  |
| PUT    | `/api/expenses/{id}`                | Update expense     |
| DELETE | `/api/expenses/{id}`                | Delete expense     |
| GET    | `/api/expenses/search?keyword=`     | Search expenses    |
| GET    | `/api/expenses/category/{category}` | Filter by category |

---

## Monthly Summary API

| Method | Endpoint                                         | Description                 |
| ------ | ------------------------------------------------ | --------------------------- |
| GET    | `/api/summary/monthly?month={month}&year={year}` | Get monthly expense summary |

Example:

```text
GET /api/summary/monthly?month=8&year=2026
```

---

## Yearly Summary API

| Method | Endpoint                          | Description                |
| ------ | --------------------------------- | -------------------------- |
| GET    | `/api/summary/yearly?year={year}` | Get yearly expense summary |

Example:

```text
GET /api/summary/yearly?year=2026
```

---

# Database

Database Name:

```text
expense_tracker_db
```

The application stores data for:

* Expenses
* Budgets
* Members
* Shared bills
* Bill splitting
* Recurring expenses

The database is managed using Spring Data JPA and Hibernate.

---

# How to Run the Backend

## 1. Create the MySQL Database

```sql
CREATE DATABASE expense_tracker_db;
```

## 2. Configure Database Credentials

Update:

```text
backend/src/main/resources/application.properties
```

Add your MySQL configuration.

## 3. Run the Backend

From the backend directory:

```bash
mvnw.cmd spring-boot:run
```

The Spring Boot application will run on:

```text
http://localhost:8080
```

---

# How to Run the Frontend

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Install PDF export dependencies:

```bash
npm install jspdf jspdf-autotable
```

Start the frontend:

```bash
npm run dev
```

The React application normally runs on:

```text
http://localhost:5173
```

---

# Development Process

The project follows an incremental module-based development workflow.

Each module is completed using the following process:

1. Identify module requirements
2. Plan the backend structure
3. Create entities and database structure
4. Implement repositories
5. Implement service layer logic
6. Create REST APIs
7. Test backend functionality
8. Build React components
9. Integrate frontend and backend
10. Test complete module functionality
11. Update the README
12. Commit the completed module
13. Push changes to GitHub

This development approach helps keep the project organized and provides a clear Git history showing how features were developed incrementally.

---

# Development Progress

* [x] Project Setup
* [x] Expense Management
* [x] Expense Search and Category Filter
* [x] Budget Tracking
* [x] Member Management
* [x] Shared Bill Management
* [x] Bill Splitting
* [x] Who Owes Whom Calculation
* [x] Recurring Expense Management
* [x] Monthly Summary
* [x] Yearly Summary
* [x] Reports and Analytics
* [x] PDF Report Export Implementation
* [ ] Final UI Improvements
* [ ] Complete End-to-End Testing
* [ ] Deployment

---

# Project Goal

The goal of this project is to provide a practical personal finance management system that allows users to:

* Track daily expenses
* Control monthly budgets
* Manage recurring expenses
* Split shared bills with friends
* Calculate settlements between members
* Analyze monthly spending
* Analyze yearly spending
* Identify spending patterns
* Generate expense reports

The application demonstrates a full-stack architecture using Java, Spring Boot, React, REST APIs, and MySQL.
