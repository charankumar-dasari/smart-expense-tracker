package com.expense.expensetracker.controller;

import com.expense.expensetracker.dto.SharedBillRequest;
import com.expense.expensetracker.entity.SharedBill;
import com.expense.expensetracker.service.SharedBillService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.expense.expensetracker.dto.BillSplitResponse;
import com.expense.expensetracker.dto.SettlementResponse;

import java.util.List;

@RestController
@RequestMapping("/api/shared-bills")
@CrossOrigin(origins = "http://localhost:5173")
public class SharedBillController {

    private final SharedBillService sharedBillService;

    public SharedBillController(
            SharedBillService sharedBillService
    ) {
        this.sharedBillService = sharedBillService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SharedBill createBill(
            @RequestBody SharedBillRequest request
    ) {
        return sharedBillService.createBill(request);
    }

    @GetMapping
    public List<SharedBill> getAllBills() {
        return sharedBillService.getAllBills();
    }

    @GetMapping("/{id}")
    public SharedBill getBillById(
            @PathVariable Long id
    ) {
        return sharedBillService.getBillById(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBill(
            @PathVariable Long id
    ) {
        sharedBillService.deleteBill(id);
    }

    @GetMapping("/{id}/split")
    public BillSplitResponse calculateSplit(
        @PathVariable Long id
    ) {
    return sharedBillService.calculateSplit(id);
    }

    @GetMapping("/{id}/settlements")
    public List<SettlementResponse> getSettlements(
        @PathVariable Long id
    ) {

    return sharedBillService.getSettlements(id);
    }
    @PutMapping("/{id}")
    public SharedBill updateBill(
        @PathVariable Long id,
        @RequestBody SharedBillRequest request
    ) {

    return sharedBillService
            .updateBill(id, request);
    }
}