
package com.expense.expensetracker.repository;

import com.expense.expensetracker.entity.Expense;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;


public interface ExpenseRepository
        extends JpaRepository<Expense, Long> {


    // Filter expenses by category
    List<Expense> findByCategoryIgnoreCase(
            String category
    );


    // Search expenses by title
    List<Expense> findByTitleContainingIgnoreCase(
            String title
    );


    // Get expenses between two dates
    // Used for Monthly Summary and Reports
    List<Expense> findByDateBetween(
            LocalDate startDate,
            LocalDate endDate
    );


}

