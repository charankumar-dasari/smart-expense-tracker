
package com.expense.expensetracker.service;

import com.expense.expensetracker.entity.RecurringExpense;
import com.expense.expensetracker.repository.RecurringExpenseRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class RecurringExpenseService {

    private final RecurringExpenseRepository
            recurringExpenseRepository;


    public RecurringExpenseService(
            RecurringExpenseRepository
                    recurringExpenseRepository
    ) {

        this.recurringExpenseRepository =
                recurringExpenseRepository;

    }


    /* =========================
       CREATE RECURRING EXPENSE
    ========================= */

    public RecurringExpense createRecurringExpense(
            RecurringExpense recurringExpense
    ) {

        validateRecurringExpense(
                recurringExpense
        );


        recurringExpense.setTitle(
                recurringExpense
                        .getTitle()
                        .trim()
        );


        /*
         If next due date is not provided,
         calculate it from start date.
        */

        if (
                recurringExpense
                        .getNextDueDate()
                        == null
        ) {

            recurringExpense.setNextDueDate(

                    calculateNextDueDate(
                            recurringExpense
                                    .getStartDate(),

                            recurringExpense
                                    .getFrequency()
                    )

            );

        }


        recurringExpense.setActive(true);


        return recurringExpenseRepository
                .save(recurringExpense);

    }


    /* =========================
       GET ALL
    ========================= */

    public List<RecurringExpense>
    getAllRecurringExpenses() {

        return recurringExpenseRepository
                .findAll();

    }


    /* =========================
       GET BY ID
    ========================= */

    public RecurringExpense
    getRecurringExpenseById(
            Long id
    ) {

        return recurringExpenseRepository
                .findById(id)
                .orElseThrow(
                        () ->
                                new RuntimeException(
                                        "Recurring expense not found"
                                )
                );

    }


    /* =========================
       GET ACTIVE EXPENSES
    ========================= */

    public List<RecurringExpense>
    getActiveRecurringExpenses() {

        return recurringExpenseRepository
                .findByActive(true);

    }


    /* =========================
       UPDATE RECURRING EXPENSE
    ========================= */

    public RecurringExpense
    updateRecurringExpense(
            Long id,
            RecurringExpense updatedExpense
    ) {

        RecurringExpense existingExpense =
                getRecurringExpenseById(id);


        validateRecurringExpense(
                updatedExpense
        );


        existingExpense.setTitle(
                updatedExpense
                        .getTitle()
                        .trim()
        );

        existingExpense.setAmount(
                updatedExpense
                        .getAmount()
        );

        existingExpense.setCategory(
                updatedExpense
                        .getCategory()
        );

        existingExpense.setCurrency(
                updatedExpense
                        .getCurrency()
        );

        existingExpense.setFrequency(
                updatedExpense
                        .getFrequency()
        );

        existingExpense.setStartDate(
                updatedExpense
                        .getStartDate()
        );

        existingExpense.setDescription(
                updatedExpense
                        .getDescription()
        );

        existingExpense.setActive(
                updatedExpense.isActive()
        );


        /*
         Recalculate next due date
         when updating.
        */

        existingExpense.setNextDueDate(

                calculateNextDueDate(

                        existingExpense
                                .getStartDate(),

                        existingExpense
                                .getFrequency()

                )

        );


        return recurringExpenseRepository
                .save(existingExpense);

    }


    /* =========================
       TOGGLE ACTIVE STATUS
    ========================= */

    public RecurringExpense
    toggleActiveStatus(
            Long id
    ) {

        RecurringExpense expense =
                getRecurringExpenseById(id);


        expense.setActive(
                !expense.isActive()
        );


        return recurringExpenseRepository
                .save(expense);

    }


    /* =========================
       DELETE
    ========================= */

    public void deleteRecurringExpense(
            Long id
    ) {

        RecurringExpense expense =
                getRecurringExpenseById(id);


        recurringExpenseRepository
                .delete(expense);

    }


    /* =========================
       VALIDATION
    ========================= */

    private void validateRecurringExpense(
            RecurringExpense expense
    ) {

        if (
                expense.getTitle() == null
                        ||
                expense.getTitle()
                        .trim()
                        .isEmpty()
        ) {

            throw new RuntimeException(
                    "Expense title is required"
            );

        }


        if (
                expense.getAmount() == null
                        ||
                expense.getAmount()
                        .doubleValue() <= 0
        ) {

            throw new RuntimeException(
                    "Amount must be greater than zero"
            );

        }


        if (
                expense.getCategory() == null
                        ||
                expense.getCategory()
                        .trim()
                        .isEmpty()
        ) {

            throw new RuntimeException(
                    "Category is required"
            );

        }


        if (
                expense.getCurrency() == null
                        ||
                expense.getCurrency()
                        .trim()
                        .isEmpty()
        ) {

            throw new RuntimeException(
                    "Currency is required"
            );

        }


        if (
                expense.getFrequency() == null
                        ||
                expense.getFrequency()
                        .trim()
                        .isEmpty()
        ) {

            throw new RuntimeException(
                    "Frequency is required"
            );

        }


        if (
                expense.getStartDate() == null
        ) {

            throw new RuntimeException(
                    "Start date is required"
            );

        }

    }


    /* =========================
       CALCULATE NEXT DUE DATE
    ========================= */

    private LocalDate calculateNextDueDate(

            LocalDate date,
            String frequency

    ) {

        if (
                frequency.equalsIgnoreCase(
                        "DAILY"
                )
        ) {

            return date.plusDays(1);

        }


        if (
                frequency.equalsIgnoreCase(
                        "WEEKLY"
                )
        ) {

            return date.plusWeeks(1);

        }


        if (
                frequency.equalsIgnoreCase(
                        "MONTHLY"
                )
        ) {

            return date.plusMonths(1);

        }


        if (
                frequency.equalsIgnoreCase(
                        "YEARLY"
                )
        ) {

            return date.plusYears(1);

        }


        /*
         Default frequency
        */

        return date.plusMonths(1);

    }

}

