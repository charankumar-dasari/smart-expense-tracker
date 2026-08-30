# Smart Expense Tracker & Bill Splitting System

A full-stack web application for managing personal expenses, tracking monthly budgets, splitting bills with friends, and analyzing spending patterns.

## 🚀 Project Status

Currently developing the project using an incremental module-based development approach.

The project is being built module by module. Each completed module is tested, documented, committed to GitHub, and then the next module is started.

## ✅ Completed Modules

### Expense Management Module

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

### Budget Tracking Module

* Create monthly budget
* Update existing monthly budget
* Select month and year
* Calculate total expenses for the selected month
* Calculate remaining budget
* Calculate budget usage percentage
* SAFE budget status
* WARNING budget status
* EXCEEDED budget status
* Budget progress bar
* Budget summary updates after adding or updating expenses

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

├── backend/
│   └── Spring Boot REST API
│       ├── controller/
│       ├── dto/
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

### Budget Tracking

Users can:

* Set a monthly budget
* Select month and year
* Update an existing budget
* View total monthly budget
* View total amount spent
* View remaining budget
* View budget usage percentage
* Check budget status

The budget status is calculated based on the percentage of the budget used:

* SAFE - Less than 80% of the budget is used
* WARNING - 80% or more of the budget is used
* EXCEEDED - 100% or more of the budget is used

## 📂 Supported Categories

* Food
* Travel
* Shopping
* Rent
* Entertainment
* Bills
* Health
* Other

## 💱 Supported Currencies

* INR
* USD
* EUR

## 🔌 Current REST APIs

### Expense APIs

| Method | Endpoint                            | Description                 |
| ------ | ----------------------------------- | --------------------------- |
| POST   | `/api/expenses`                     | Create expense              |
| GET    | `/api/expenses`                     | Get all expenses            |
| GET    | `/api/expenses/{id}`                | Get expense by ID           |
| PUT    | `/api/expenses/{id}`                | Update expense              |
| DELETE | `/api/expenses/{id}`                | Delete expense              |
| GET    | `/api/expenses/search?keyword=`     | Search expenses             |
| GET    | `/api/expenses/category/{category}` | Filter expenses by category |

### Budget APIs

| Method | Endpoint                                         | Description             |
| ------ | ------------------------------------------------ | ----------------------- |
| POST   | `/api/budgets`                                   | Create or update budget |
| GET    | `/api/budgets/summary?month={month}&year={year}` | Get budget summary      |
| DELETE | `/api/budgets/{id}`                              | Delete budget           |

## 💾 Database

Database Name:

`expense_tracker_db`

Current tables:

* `expenses`
* `budgets`

The `expenses` table stores personal expense details such as title, amount, category, currency, date, and description.

The `budgets` table stores the monthly budget amount along with the selected month and year.

## ▶️ How to Run the Backend

### 1. Create the MySQL database

```sql
CREATE DATABASE expense_tracker_db;
```

### 2. Update database credentials

Update the database username and password in:

```text
backend/src/main/resources/application.properties
```

### 3. Run the Spring Boot application

From the backend directory:

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

The frontend will usually run on:

`http://localhost:5173`

## 📋 Development Process

The project is being developed incrementally using a module-based workflow.

Each module follows this process:

1. Plan the module requirements
2. Create backend entities and database structure
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
* [x] Budget Tracking
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

The goal of this application is to provide a simple and practical system for managing personal finances.

The application will help users:

* Track daily expenses
* Manage monthly budgets
* Monitor spending
* Split bills with friends
* Calculate who owes whom
* Analyze spending patterns

The project is being developed as a full-stack application using Java, Spring Boot, MySQL, React, and REST APIs.
