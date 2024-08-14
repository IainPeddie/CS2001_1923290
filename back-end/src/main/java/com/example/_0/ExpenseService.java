package com.example._0;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example._0.model.Expense;
import com.example._0.repository.ExpenseRepository;
import com.example._0.ResourceNotFoundException;

@Service
public class ExpenseService {
	@Autowired
    ExpenseRepository expenseRepository;
	
	public ExpenseService() {
		super();
	}
	
	
	public List<Expense> getExpense() {
		return (List<Expense>) expenseRepository.findAll();
	}

	public void addExpense(Expense newExpense) {
		expenseRepository.save(newExpense);
	}
	
	public Optional<Expense> findByID(Long id) {
		 return expenseRepository.findById(id);
	}
	
	public void deleteExpense(Long id) {
		Expense expense = expenseRepository.findById(id)
				  .orElseThrow(() -> new ResourceNotFoundException("Expense", "id", id));
		expenseRepository.delete(expense);
	}
	
	public Expense findByExpense(String expense) {
		return expenseRepository.findByExpense(expense);
	}

}
