# Smart Expense Tracker & Bill Splitting System

A full-stack web application for managing personal expenses, tracking budgets, splitting bills with friends, and analyzing spending patterns.

## 🚀 Project Status

Currently implementing the project using an incremental module-based development approach.

### Completed Modules

#### ✅ Expense Management Module

* Add new expenses
* View all expenses
* Update expenses
* Delete expenses
* Expense categories
* Multiple currency support
* Search expenses
* Filter expenses by category
* Input validation
* MySQL database integration
* Spring Boot REST APIs
* React frontend integration

## 🛠️ Technology Stack

### Backend

* Java 17
* Spring Boot
* Spring Data JPA
* Hibernate
* MySQL
* Maven

### Frontend

* React
* Vite
* Axios
* CSS

## 🏗️ Project Architecture

```text
smart-expense-tracker/
│
├── backend/
│   └── Spring Boot REST API
│       ├── controller/
│       ├── entity/
│       ├── repository/
│       └── service/
│
├── frontend/
│   └── React Application
│       ├── components/
│       └── services/
│
└── README.md
```

## 📦 Current Features

### Expense Management

Users can:

* Create a new expense
* Enter expense title and description
* Add an expense amount
* Select an expense category
* Select a currency
* Select an expense date
* View all expenses
* Search expenses by title
* Filter expenses by category
* Update existing expenses
* Delete expenses

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

## 🔌 Current REST APIs

| Method | Endpoint                            | Description        |
| ------ | ----------------------------------- | ------------------ |
| POST   | `/api/expenses`                     | Create expense     |
| GET    | `/api/expenses`                     | Get all expenses   |
| GET    | `/api/expenses/{id}`                | Get expense by ID  |
| PUT    | `/api/expenses/{id}`                | Update expense     |
| DELETE | `/api/expenses/{id}`                | Delete expense     |
| GET    | `/api/expenses/search?keyword=`     | Search expenses    |
| GET    | `/api/expenses/category/{category}` | Filter by category |

## 💾 Database

Database Name:

`expense_tracker_db`

Current main table:

`expenses`

## ▶️ How to Run the Backend

1. Create the MySQL database:

```sql
CREATE DATABASE expense_tracker_db;
```

2. Update the database credentials in:

`backend/src/main/resources/application.properties`

3. Run the Spring Boot application:

```bash
mvnw.cmd spring-boot:run
```

The backend will run on:

`http://localhost:8080`

## ▶️ How to Run the Frontend

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the application:

```bash
npm run dev
```

## 📋 Development Process

The project is being developed incrementally using a module-based workflow.

Each module follows this process:

1. Plan the module requirements
2. Create the backend entities and database structure
3. Implement repository and service layers
4. Develop REST APIs
5. Test backend APIs
6. Build the React frontend
7. Integrate frontend with backend
8. Test complete functionality
9. Update README documentation
10. Commit completed work to GitHub
11. Push the changes

This approach keeps the development process organized and provides a clear Git commit history.

## 🔄 Planned Modules

* [x] Expense Management
* [ ] Budget Tracking
* [ ] Bill Splitting
* [ ] Who Owes Whom Calculation
* [ ] Recurring Expense Management
* [ ] Monthly Summary
* [ ] Yearly Summary
* [ ] Reports and Analytics
* [ ] PDF Report Export
* [ ] Final UI Improvements
* [ ] Deployment

## 🎯 Project Goal

The goal of this application is to provide a simple and practical system for managing personal finances, tracking expenses, controlling budgets, splitting shared bills, and analyzing spending patterns.
