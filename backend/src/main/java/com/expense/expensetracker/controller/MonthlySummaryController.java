
package com.expense.expensetracker.controller;

import com.expense.expensetracker.dto.MonthlySummary;
import com.expense.expensetracker.service.MonthlySummaryService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/summary")
@CrossOrigin(origins = "http://localhost:5173")
public class MonthlySummaryController {

    private final MonthlySummaryService
            monthlySummaryService;


    public MonthlySummaryController(
            MonthlySummaryService
                    monthlySummaryService
    ) {

        this.monthlySummaryService =
                monthlySummaryService;

    }


    /*
       GET
       /api/summary/monthly?month=8&year=2026
    */

    @GetMapping("/monthly")
    public ResponseEntity<MonthlySummary>
    getMonthlySummary(

            @RequestParam int month,

            @RequestParam int year

    ) {

        MonthlySummary summary =
                monthlySummaryService
                        .getMonthlySummary(
                                month,
                                year
                        );


        return ResponseEntity.ok(
                summary
        );

    }

}

