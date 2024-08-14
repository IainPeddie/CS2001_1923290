package com.example._0.model;

import java.math.BigDecimal;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Expense {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String expense;
	private BigDecimal cost;
	private String date;
	private String frequency;

    public Expense() {
    }

    public Expense(String name, BigDecimal cost, String date, String frequency) {
        this.expense = name;
        this.cost = cost;
        this.date = date;
        this.frequency = frequency;
    }

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getExpense() {
        return expense;
    }

    public void setExpense(String expense) {
        this.expense = expense;
    }

    public BigDecimal getCost() {
        return cost;
    }

    public void setCost(BigDecimal cost) {
        this.cost = cost;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getFrequency() {
        return frequency;
    }

    public void setFrequency(String frequency) {
        this.frequency = frequency;
    }

    @Override
    public String toString() {
        return "Expense{" +
                "id=" + id +
                ", name='" + expense + '\'' +
                ", cost=" + cost +
                ", date=" + date +
                ", frequency='" + frequency + '\'' +
                '}';
    }
}