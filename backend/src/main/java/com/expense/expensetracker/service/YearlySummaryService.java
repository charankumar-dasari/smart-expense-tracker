
package com.expense.expensetracker.service;

import com.expense.expensetracker.dto.YearlySummary;
import com.expense.expensetracker.entity.Expense;
import com.expense.expensetracker.repository.ExpenseRepository;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.Year;
import java.time.format.TextStyle;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;


@Service
public class YearlySummaryService {

    private final ExpenseRepository expenseRepository;


    public YearlySummaryService(
            ExpenseRepository expenseRepository
    ) {

        this.expenseRepository =
                expenseRepository;

    }


    public YearlySummary getYearlySummary(
            int year
    ) {

        LocalDate startDate =
                Year.of(year)
                        .atDay(1);


        LocalDate endDate =
                Year.of(year)
                        .atMonth(12)
                        .atEndOfMonth();


        List<Expense> expenses =
                expenseRepository.findByDateBetween(
                        startDate,
                        endDate
                );


        BigDecimal totalSpent =
                BigDecimal.ZERO;


        Map<String, BigDecimal>
                monthlySpending =
                new LinkedHashMap<>();


        /*
         * Initialize all 12 months
         * so the frontend can display
         * months with zero expenses too.
         */
        for (int month = 1;
             month <= 12;
             month++) {

            String monthName =
                    java.time.Month
                            .of(month)
                            .getDisplayName(
                                    TextStyle.FULL,
                                    Locale.ENGLISH
                            );

            monthlySpending.put(
                    monthName,
                    BigDecimal.ZERO
            );

        }


        /*
         * Calculate total and
         * month-wise spending
         */
        for (Expense expense : expenses) {

            BigDecimal amount =
                    BigDecimal.valueOf(
                            expense.getAmount()
                    );


            totalSpent =
                    totalSpent.add(amount);


            String monthName =
                    expense.getDate()
                            .getMonth()
                            .getDisplayName(
                                    TextStyle.FULL,
                                    Locale.ENGLISH
                            );


            monthlySpending.merge(
                    monthName,
                    amount,
                    BigDecimal::add
            );

        }


        long totalTransactions =
                expenses.size();


        /*
         * Average monthly expense
         *
         * We divide by 12 because
         * this is a yearly average.
         */
        BigDecimal averageMonthlyExpense =
                totalSpent.divide(
                        BigDecimal.valueOf(12),
                        2,
                        RoundingMode.HALF_UP
                );


        YearlySummary summary =
                new YearlySummary();


        summary.setYear(year);

        summary.setTotalSpent(
                totalSpent
        );

        summary.setTotalTransactions(
                totalTransactions
        );

        summary.setAverageMonthlyExpense(
                averageMonthlyExpense
        );

        summary.setMonthlySpending(
                monthlySpending
        );


        return summary;

    }

}

