package com.expense.expensetracker.dto;

public class SettlementResponse {

    private String fromMember;
    private String toMember;
    private Double amount;

    public SettlementResponse() {
    }

    public SettlementResponse(
            String fromMember,
            String toMember,
            Double amount
    ) {
        this.fromMember = fromMember;
        this.toMember = toMember;
        this.amount = amount;
    }

    public String getFromMember() {
        return fromMember;
    }

    public void setFromMember(String fromMember) {
        this.fromMember = fromMember;
    }

    public String getToMember() {
        return toMember;
    }

    public void setToMember(String toMember) {
        this.toMember = toMember;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }
}