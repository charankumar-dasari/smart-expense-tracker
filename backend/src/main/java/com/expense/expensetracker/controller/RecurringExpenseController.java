
package com.expense.expensetracker.controller;

import com.expense.expensetracker.entity.RecurringExpense;
import com.expense.expensetracker.service.RecurringExpenseService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recurring-expenses")
@CrossOrigin(origins = "http://localhost:5173")
public class RecurringExpenseController {

    private final RecurringExpenseService
            recurringExpenseService;


    public RecurringExpenseController(
            RecurringExpenseService
                    recurringExpenseService
    ) {

        this.recurringExpenseService =
                recurringExpenseService;

    }


    /* =========================
       CREATE RECURRING EXPENSE

       POST
       /api/recurring-expenses
    ========================= */

    @PostMapping
    public ResponseEntity<RecurringExpense>
    createRecurringExpense(
            @RequestBody
            RecurringExpense recurringExpense
    ) {

        RecurringExpense createdExpense =
                recurringExpenseService
                        .createRecurringExpense(
                                recurringExpense
                        );

        return ResponseEntity
                .ok(createdExpense);

    }


    /* =========================
       GET ALL RECURRING EXPENSES

       GET
       /api/recurring-expenses
    ========================= */

    @GetMapping
    public ResponseEntity<
            List<RecurringExpense>
            >
    getAllRecurringExpenses() {

        return ResponseEntity.ok(

                recurringExpenseService
                        .getAllRecurringExpenses()

        );

    }


    /* =========================
       GET ACTIVE RECURRING EXPENSES

       GET
       /api/recurring-expenses/active
    ========================= */

    @GetMapping("/active")
    public ResponseEntity<
            List<RecurringExpense>
            >
    getActiveRecurringExpenses() {

        return ResponseEntity.ok(

                recurringExpenseService
                        .getActiveRecurringExpenses()

        );

    }


    /* =========================
       GET RECURRING EXPENSE BY ID

       GET
       /api/recurring-expenses/{id}
    ========================= */

    @GetMapping("/{id}")
    public ResponseEntity<RecurringExpense>
    getRecurringExpenseById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(

                recurringExpenseService
                        .getRecurringExpenseById(
                                id
                        )

        );

    }


    /* =========================
       UPDATE RECURRING EXPENSE

       PUT
       /api/recurring-expenses/{id}
    ========================= */

    @PutMapping("/{id}")
    public ResponseEntity<RecurringExpense>
    updateRecurringExpense(

            @PathVariable Long id,

            @RequestBody
            RecurringExpense recurringExpense

    ) {

        RecurringExpense updatedExpense =

                recurringExpenseService
                        .updateRecurringExpense(

                                id,
                                recurringExpense

                        );


        return ResponseEntity.ok(
                updatedExpense
        );

    }


    /* =========================
       TOGGLE ACTIVE STATUS

       PATCH
       /api/recurring-expenses/{id}/toggle
    ========================= */

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<RecurringExpense>
    toggleActiveStatus(
            @PathVariable Long id
    ) {

        RecurringExpense updatedExpense =

                recurringExpenseService
                        .toggleActiveStatus(
                                id
                        );


        return ResponseEntity.ok(
                updatedExpense
        );

    }


    /* =========================
       DELETE RECURRING EXPENSE

       DELETE
       /api/recurring-expenses/{id}
    ========================= */

    @DeleteMapping("/{id}")
    public ResponseEntity<Void>
    deleteRecurringExpense(
            @PathVariable Long id
    ) {

        recurringExpenseService
                .deleteRecurringExpense(
                        id
                );


        return ResponseEntity
                .noContent()
                .build();

    }

}

