
package com.expense.expensetracker.service;

import com.expense.expensetracker.dto.MonthlySummary;
import com.expense.expensetracker.entity.Expense;
import com.expense.expensetracker.repository.ExpenseRepository;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;


@Service
public class MonthlySummaryService {

    private final ExpenseRepository expenseRepository;


    public MonthlySummaryService(
            ExpenseRepository expenseRepository
    ) {

        this.expenseRepository = expenseRepository;

    }


    public MonthlySummary getMonthlySummary(
            int month,
            int year
    ) {

        YearMonth yearMonth =
                YearMonth.of(year, month);


        LocalDate startDate =
                yearMonth.atDay(1);


        LocalDate endDate =
                yearMonth.atEndOfMonth();


        List<Expense> expenses =
                expenseRepository.findByDateBetween(
                        startDate,
                        endDate
                );


        BigDecimal totalSpent =
                BigDecimal.ZERO;


        Map<String, BigDecimal> categoryWiseSpending =
                new LinkedHashMap<>();


        for (Expense expense : expenses) {

            BigDecimal amount =
               BigDecimal.valueOf(
                expense.getAmount()
              );


            if (amount == null) {

                amount = BigDecimal.ZERO;

            }


            totalSpent =
                    totalSpent.add(amount);


            String category =
                    expense.getCategory();


            if (category == null ||
                    category.isBlank()) {

                category = "Other";

            }


            categoryWiseSpending.merge(
                    category,
                    amount,
                    BigDecimal::add
            );

        }


        long totalTransactions =
                expenses.size();


        BigDecimal averageExpense =
                BigDecimal.ZERO;


        if (totalTransactions > 0) {

            averageExpense =
                    totalSpent.divide(
                            BigDecimal.valueOf(
                                    totalTransactions
                            ),
                            2,
                            RoundingMode.HALF_UP
                    );

        }


        MonthlySummary summary =
                new MonthlySummary();


        summary.setMonth(month);

        summary.setYear(year);

        summary.setTotalSpent(totalSpent);

        summary.setTotalTransactions(
                totalTransactions
        );

        summary.setAverageExpense(
                averageExpense
        );

        summary.setCategoryWiseSpending(
                categoryWiseSpending
        );


        return summary;

    }

}
