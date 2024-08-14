package com.example._0;

import com.example._0.model.Expense;
import com.example._0.repository.ExpenseRepository;
import java.math.BigDecimal;
import java.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class ProjectInit implements CommandLineRunner {
    private static final Logger logger = LoggerFactory.getLogger(ProjectInit.class);
    
    @Autowired
    private ExpenseRepository expenseRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        try {
            expenseRepository.deleteAll();

            Expense rent = new Expense("Rent", new BigDecimal("1000.00"), "2024-12-19", "Monthly");
            Expense groceries = new Expense("Groceries", new BigDecimal("150.00"), "2024-12-21", "Weekly");
            Expense utilities = new Expense("Utilities", new BigDecimal("200.00"), "2024-12-4", "Monthly");
            Expense subscription = new Expense("Netflix Subscription", new BigDecimal("15.99"), "2024-12-7", "Monthly");

            expenseRepository.save(rent);
            expenseRepository.save(groceries);
            expenseRepository.save(utilities);
            expenseRepository.save(subscription);

            Iterable<Expense> expenses = expenseRepository.findAll();
            expenses.forEach(expense -> logger.info(expense.toString()));
        } catch (Exception e) {
            logger.error("An error occurred during initialization", e);
        }
    }
}