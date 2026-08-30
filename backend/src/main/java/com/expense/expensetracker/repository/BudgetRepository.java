package com.expense.expensetracker.repository;

import com.expense.expensetracker.entity.Budget;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BudgetRepository extends JpaRepository<Budget, Long> {

    Optional<Budget> findByMonthAndYear(Integer month, Integer year);
}