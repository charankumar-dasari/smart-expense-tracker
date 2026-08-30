
package com.expense.expensetracker.controller;

import com.expense.expensetracker.dto.YearlySummary;
import com.expense.expensetracker.service.YearlySummaryService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/summary")
@CrossOrigin(origins = "http://localhost:5173")
public class YearlySummaryController {

    private final YearlySummaryService yearlySummaryService;


    public YearlySummaryController(
            YearlySummaryService yearlySummaryService
    ) {

        this.yearlySummaryService =
                yearlySummaryService;

    }


    /*
     * GET
     *
     * /api/summary/yearly?year=2026
     */

    @GetMapping("/yearly")
    public ResponseEntity<YearlySummary>
    getYearlySummary(

            @RequestParam int year

    ) {

        YearlySummary summary =
                yearlySummaryService
                        .getYearlySummary(year);


        return ResponseEntity.ok(
                summary
        );

    }

}
