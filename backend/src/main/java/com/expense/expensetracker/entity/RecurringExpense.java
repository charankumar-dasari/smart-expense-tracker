
package com.expense.expensetracker.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "recurring_expenses")
public class RecurringExpense {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(
            nullable = false,
            precision = 10,
            scale = 2
    )
    private BigDecimal amount;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String currency;

    @Column(nullable = false)
    private String frequency;

    @Column(nullable = false)
    private LocalDate startDate;

    private LocalDate nextDueDate;

    @Column(nullable = false)
    private boolean active = true;

    private String description;


    public RecurringExpense() {
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(
            BigDecimal amount
    ) {
        this.amount = amount;
    }


    public String getCategory() {
        return category;
    }

    public void setCategory(
            String category
    ) {
        this.category = category;
    }


    public String getCurrency() {
        return currency;
    }

    public void setCurrency(
            String currency
    ) {
        this.currency = currency;
    }


    public String getFrequency() {
        return frequency;
    }

    public void setFrequency(
            String frequency
    ) {
        this.frequency = frequency;
    }


    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(
            LocalDate startDate
    ) {
        this.startDate = startDate;
    }


    public LocalDate getNextDueDate() {
        return nextDueDate;
    }

    public void setNextDueDate(
            LocalDate nextDueDate
    ) {
        this.nextDueDate = nextDueDate;
    }


    public boolean isActive() {
        return active;
    }

    public void setActive(
            boolean active
    ) {
        this.active = active;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(
            String description
    ) {
        this.description = description;
    }

}

