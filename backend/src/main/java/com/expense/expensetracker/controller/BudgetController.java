package com.expense.expensetracker.controller;

import com.expense.expensetracker.dto.BudgetSummary;
import com.expense.expensetracker.entity.Budget;
import com.expense.expensetracker.service.BudgetService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/budgets")
@CrossOrigin(origins = "http://localhost:5173")
public class BudgetController {

    private final BudgetService budgetService;

    public BudgetController(
            BudgetService budgetService
    ) {
        this.budgetService = budgetService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Budget createOrUpdateBudget(
            @RequestBody Budget budget
    ) {
        return budgetService
                .createOrUpdateBudget(budget);
    }

    @GetMapping("/summary")
    public BudgetSummary getBudgetSummary(
            @RequestParam Integer month,
            @RequestParam Integer year
    ) {
        return budgetService
                .getBudgetSummary(month, year);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBudget(
            @PathVariable Long id
    ) {
        budgetService.deleteBudget(id);
    }
}