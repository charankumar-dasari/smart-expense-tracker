package com.expense.expensetracker.repository;

import com.expense.expensetracker.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByCategoryIgnoreCase(String category);

    List<Expense> findByTitleContainingIgnoreCase(String title);

    List<Expense> findByDateBetween(
            LocalDate startDate,
            LocalDate endDate
    );
}