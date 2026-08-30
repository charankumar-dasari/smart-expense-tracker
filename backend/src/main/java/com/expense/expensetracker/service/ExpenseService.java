package com.expense.expensetracker.service;

import com.expense.expensetracker.entity.Expense;
import com.expense.expensetracker.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public Expense createExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    public Expense getExpenseById(Long id) {
        return expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found with id: " + id));
    }

    public Expense updateExpense(Long id, Expense updatedExpense) {

        Expense expense = getExpenseById(id);

        expense.setTitle(updatedExpense.getTitle());
        expense.setAmount(updatedExpense.getAmount());
        expense.setCategory(updatedExpense.getCategory());
        expense.setCurrency(updatedExpense.getCurrency());
        expense.setDate(updatedExpense.getDate());
        expense.setDescription(updatedExpense.getDescription());

        return expenseRepository.save(expense);
    }

    public void deleteExpense(Long id) {

        Expense expense = getExpenseById(id);
        expenseRepository.delete(expense);
    }

    public List<Expense> searchExpenses(String keyword) {
        return expenseRepository.findByTitleContainingIgnoreCase(keyword);
    }

    public List<Expense> getExpensesByCategory(String category) {
        return expenseRepository.findByCategoryIgnoreCase(category);
    }
}