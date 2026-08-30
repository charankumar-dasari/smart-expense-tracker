package com.expense.expensetracker.dto;

public class BudgetSummary {

    private Double budgetAmount;
    private Double totalSpent;
    private Double remainingAmount;
    private Double usagePercentage;
    private String status;

    public BudgetSummary(
            Double budgetAmount,
            Double totalSpent,
            Double remainingAmount,
            Double usagePercentage,
            String status
    ) {
        this.budgetAmount = budgetAmount;
        this.totalSpent = totalSpent;
        this.remainingAmount = remainingAmount;
        this.usagePercentage = usagePercentage;
        this.status = status;
    }

    public Double getBudgetAmount() {
        return budgetAmount;
    }

    public Double getTotalSpent() {
        return totalSpent;
    }

    public Double getRemainingAmount() {
        return remainingAmount;
    }

    public Double getUsagePercentage() {
        return usagePercentage;
    }

    public String getStatus() {
        return status;
    }
}