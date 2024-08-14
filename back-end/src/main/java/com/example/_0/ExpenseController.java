package com.example._0;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example._0.model.Expense;
import com.example._0.ExpensePostDTO;
import com.example._0.ExpenseService;
import com.example._0.ExpenseType;

@RestController
@CrossOrigin("http://localhost:3000")


public class ExpenseController {
	
	@Autowired
	ExpenseService expenseService;
		
	@GetMapping("/expense")
    public List<Expense> getExpense() {
        return expenseService.getExpense();
    }
	@PostMapping("/expense")
    public ResponseEntity<Optional<Expense>> addExpense(@RequestBody ExpensePostDTO newExpenseDTO) {
    	
    	if (newExpenseDTO.getExpense()==null || 
    		newExpenseDTO.getCost()==null ||
    		newExpenseDTO.getDate()==null ||
    		newExpenseDTO.getFrequency()==null) {
            return new ResponseEntity<>(Optional.ofNullable(null), HttpStatus.BAD_REQUEST);
        }
    	
    	Expense newExpense = new Expense(newExpenseDTO.getExpense(), newExpenseDTO.getCost(),
    			newExpenseDTO.getDate(), newExpenseDTO.getFrequency());
    	expenseService.addExpense(newExpense);
    	return new ResponseEntity<>(Optional.ofNullable(newExpense),HttpStatus.CREATED);

    }
	 
    
    // Get Expense by ID
    @GetMapping("/expense/{id}")
    public Optional<Expense> getExpenseById(@PathVariable(value = "id") long Id) {
        return expenseService.findByID(Id);
    }
    
    
    //Delete a Expense by ID
    @DeleteMapping("/expense/{id}")
    public String deleteExpense(@PathVariable(value = "id") long Id) {
        expenseService.deleteExpense(Id);
        return "Expense Deleted"; 
    }
    
    //Get Expense by expense name
    @GetMapping("/expense/findByExpense")
    public Optional<Expense> getExpenseByName(@RequestParam String expense) {
    	return Optional.ofNullable(expenseService.findByExpense(expense));
    }
	

	
}
