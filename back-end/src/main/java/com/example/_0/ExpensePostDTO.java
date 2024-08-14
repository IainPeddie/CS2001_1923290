package com.example._0;

import java.math.BigDecimal;

public class ExpensePostDTO {
	String expense;
	BigDecimal cost;
	String date;
	String frequency;
	
	public ExpensePostDTO(String expense, BigDecimal cost, String date, String frequency) {
		super();
		this.expense = expense;
		this.cost = cost;
		this.date = date;
		this.frequency = frequency;
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

}
