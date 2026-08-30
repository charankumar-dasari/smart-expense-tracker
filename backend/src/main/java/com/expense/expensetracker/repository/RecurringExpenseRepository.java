
package com.expense.expensetracker.repository;

import com.expense.expensetracker.entity.RecurringExpense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecurringExpenseRepository
        extends JpaRepository<RecurringExpense, Long> {

    List<RecurringExpense> findByActive(boolean active);

}

