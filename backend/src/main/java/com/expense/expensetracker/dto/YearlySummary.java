
package com.expense.expensetracker.dto;

import java.math.BigDecimal;
import java.util.Map;

public class YearlySummary {

    private int year;

    private BigDecimal totalSpent;

    private long totalTransactions;

    private BigDecimal averageMonthlyExpense;

    private Map<String, BigDecimal>
            monthlySpending;


    public YearlySummary() {
    }


    public int getYear() {

        return year;

    }


    public void setYear(
            int year
    ) {

        this.year = year;

    }


    public BigDecimal getTotalSpent() {

        return totalSpent;

    }


    public void setTotalSpent(
            BigDecimal totalSpent
    ) {

        this.totalSpent = totalSpent;

    }


    public long getTotalTransactions() {

        return totalTransactions;

    }


    public void setTotalTransactions(
            long totalTransactions
    ) {

        this.totalTransactions =
                totalTransactions;

    }


    public BigDecimal getAverageMonthlyExpense() {

        return averageMonthlyExpense;

    }


    public void setAverageMonthlyExpense(
            BigDecimal averageMonthlyExpense
    ) {

        this.averageMonthlyExpense =
                averageMonthlyExpense;

    }


    public Map<String, BigDecimal>
    getMonthlySpending() {

        return monthlySpending;

    }


    public void setMonthlySpending(

            Map<String, BigDecimal>
                    monthlySpending

    ) {

        this.monthlySpending =
                monthlySpending;

    }

}

