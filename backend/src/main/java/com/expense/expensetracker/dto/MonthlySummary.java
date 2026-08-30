
package com.expense.expensetracker.dto;

import java.math.BigDecimal;
import java.util.Map;

public class MonthlySummary {

    private int month;

    private int year;

    private BigDecimal totalSpent;

    private long totalTransactions;

    private BigDecimal averageExpense;

    private Map<String, BigDecimal>
            categoryWiseSpending;


    public MonthlySummary() {
    }


    public int getMonth() {

        return month;

    }


    public void setMonth(
            int month
    ) {

        this.month = month;

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


    public BigDecimal getAverageExpense() {

        return averageExpense;

    }


    public void setAverageExpense(
            BigDecimal averageExpense
    ) {

        this.averageExpense =
                averageExpense;

    }


    public Map<String, BigDecimal>
    getCategoryWiseSpending() {

        return categoryWiseSpending;

    }


    public void setCategoryWiseSpending(

            Map<String, BigDecimal>
                    categoryWiseSpending

    ) {

        this.categoryWiseSpending =
                categoryWiseSpending;

    }

}

