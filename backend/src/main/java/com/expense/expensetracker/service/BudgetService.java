package com.expense.expensetracker.service;

import com.expense.expensetracker.dto.BudgetSummary;
import com.expense.expensetracker.entity.Budget;
import com.expense.expensetracker.entity.Expense;
import com.expense.expensetracker.repository.BudgetRepository;
import com.expense.expensetracker.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BudgetService {

    private final BudgetRepository budgetRepository;
    private final ExpenseRepository expenseRepository;

    public BudgetService(
            BudgetRepository budgetRepository,
            ExpenseRepository expenseRepository
    ) {
        this.budgetRepository = budgetRepository;
        this.expenseRepository = expenseRepository;
    }

    public Budget createOrUpdateBudget(Budget budget) {

        return budgetRepository
                .findByMonthAndYear(
                        budget.getMonth(),
                        budget.getYear()
                )
                .map(existingBudget -> {

                    existingBudget.setAmount(budget.getAmount());

                    return budgetRepository.save(existingBudget);

                })
                .orElseGet(() ->
                        budgetRepository.save(budget)
                );
    }

    public BudgetSummary getBudgetSummary(
            Integer month,
            Integer year
    ) {

        Budget budget = budgetRepository
                .findByMonthAndYear(month, year)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Budget not found for selected month"
                        )
                );

        LocalDate startDate =
                LocalDate.of(year, month, 1);

        LocalDate endDate =
                startDate.withDayOfMonth(
                        startDate.lengthOfMonth()
                );

        List<Expense> expenses =
                expenseRepository.findByDateBetween(
                        startDate,
                        endDate
                );

        double totalSpent = expenses.stream()
                .mapToDouble(Expense::getAmount)
                .sum();

        double remaining =
                budget.getAmount() - totalSpent;

        double percentage =
                budget.getAmount() > 0
                        ? (totalSpent / budget.getAmount()) * 100
                        : 0;

        String status;

        if (percentage >= 100) {
            status = "EXCEEDED";
        } else if (percentage >= 80) {
            status = "WARNING";
        } else {
            status = "SAFE";
        }

        return new BudgetSummary(
                budget.getAmount(),
                totalSpent,
                remaining,
                percentage,
                status
        );
    }

    public void deleteBudget(Long id) {

        if (!budgetRepository.existsById(id)) {

            throw new RuntimeException(
                    "Budget not found"
            );
        }

        budgetRepository.deleteById(id);
    }
}