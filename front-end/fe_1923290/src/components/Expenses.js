import React, {useRef, useState, useEffect} from "react";
import axios from "axios";
import './Layout.css';


export default function Expenses(){
    const expense=useRef();
    const expenseCost=useRef();
    const expenseDate=useRef();
    const expenseFrequency=useRef();
    const [expenses, setExpenses] = useState([]);
    
    const validateForm = () => {
        let formValid = false;

        if (expense.current.validity.valueMissing || expenseCost.current.validity.valueMissing || expenseDate.current.validity.valueMissing || expenseFrequency.current.validity.valueMissing){
                alert("Fill out all of the boxes, please.");
        }
        else if (expenseCost.current.value <= 0){
            alert("Input must be greater than 0. Enter a valid cost")
        }
        else if (expenseDate.current.validity.date){
            alert("Invalid date. Please enter a valid date.");
        }else{
            formValid = true;
        }
        return formValid;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if(validateForm()){
            axios.post(' http://localhost:8080/expense',{ //Database address
                expense: expense.current.value,
                cost: expenseCost.current.value,
                date: expenseDate.current.value,
                frequency: expenseFrequency.current.value,
            }).then(response=>{
                console.log(response);
                if (response.status === 201){
                    fetchExpenses();// Refreshes the table if the input is submitted.
                    alert("Expense Submitted.")
                }
            }).then(()=>{
                expense.current.value="";
                expenseCost.current.value="";
                expenseDate.current.value="";
                expenseFrequency.current.value="";
            })
            .catch(error=>{
                console.log(error);
            })

            
        }
      }

    const fetchExpenses = () => { //Gets the data back from the datbase to put in a table.
        axios.get('http://localhost:8080/expense')
            .then(response => {
                setExpenses(response.data);  
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleDelete = (id) => {//Delete button for users, deletes the expense with the corresponding id.
        const confirmed = window.confirm("Are you sure you want to delete this expense?");
        if (confirmed) {
            axios.delete(`http://localhost:8080/expense/${id}`)
                .then(response => {
                    if (response.status === 200) {
                        alert("Expense Deleted.");
                        fetchExpenses();
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    useEffect(() => {
        fetchExpenses(); 
    }, [])

    const calculateMonthlyTotal = () => {//Calculates the total that is spent each year, adds up the inputs.
        return expenses.reduce((total, exp) => {
            let monthlyCost = parseFloat(exp.cost);
    
            switch (exp.frequency) {
                case "Weekly":
                    monthlyCost *= 4.35; //Not sure how to be accurate with this since some months are longer than others.
                    break;
                case "Fortnightly":
                    monthlyCost *= 2.17; //Half of monthly
                    break;
                case "Monthly":
                    monthlyCost *= 1;
                    break;
                default:
                    monthlyCost = 0;
                    break;
            }
    
            return total + monthlyCost;
        }, 0)
    }

    const calculateYearlyTotal = () => { // Messy creating two of the same thing, but hard to account for Trimonthly and Bianunally
        return expenses.reduce((total, exp) => {
            let annualizedCost = parseFloat(exp.cost);

            switch (exp.frequency) {
                case "Weekly":
                    annualizedCost *= 52;
                    break;
                case "Fortnightly":
                    annualizedCost *= 26;
                    break;
                case "Monthly":
                    annualizedCost *= 12;
                    break;
                case "Trimonthly":
                    annualizedCost *= 4;
                    break;
                case "Biannually":
                    annualizedCost *= 2;
                    break;
                case "Annually":
                    annualizedCost *= 1;
                    break;
                default:
                    annualizedCost = 0;
                    break;
            }

            return total + annualizedCost;
        }, 0)
    }

    const monthlyTotal = calculateMonthlyTotal();
    const yearlyTotal = calculateYearlyTotal();

    const calculateNextPaymentDate = (startDate, frequency) => {// Loops until the nextPaymentDate is greater than today.
        let nextPaymentDate = new Date(startDate);
        const today = new Date();

        while (nextPaymentDate <= today) {
            switch (frequency) {
                case "Weekly":
                    nextPaymentDate.setDate(nextPaymentDate.getDate() + 7);
                    break;
                case "Fortnightly":
                    nextPaymentDate.setDate(nextPaymentDate.getDate() + 14);
                    break;
                case "Monthly":
                    nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
                    break;
                case "Trimonthly":
                    nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 3);
                    break;
                case "Biannually":
                    nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 6);
                    break;
                case "Annually":
                    nextPaymentDate.setFullYear(nextPaymentDate.getFullYear() + 1);
                    break;
                default:
                    return "N/A";
            }
        }

        return nextPaymentDate.toISOString().split('T')[0]; // Converts result to string, the splits it into the correct format.
    }

    const averageCosts = { // Filler Averages
        "Car Lease": 800,
        "Car Tax": 190,
        "Insurance": 550,
        "Internet": 50,
        "Groceries": 100,
        "Mortgage": 1500,
        "Phone Bill": 60,
        "Rent": 800,
        "Savings": 50,
        "Subscriptions": 20,
        "TV License": 169.51,
    };

    const compareExpense = (expenseName, cost) => {// compares the cost of an expense to the average and return a percentage.
        const averageCost = averageCosts[expenseName];
        if (!averageCost) return "No Data";

        const difference = ((cost - averageCost) / averageCost) * 100;

        return `${difference >= 0 ? "+" : ""}${difference.toFixed(2)}%`;
    }



    return (
        <div>
        <form className="expense" noValidate onSubmit={handleSubmit}>
            <br></br>
            <label className="InputLabel" for="InputLabel">Expense: </label>
            <select type="string" id="expense" name ="expense" ref ={expense}>
                <option value="Car Lease">Car Lease</option>
                <option value="Car Tax">Car Tax</option>
                <option value="Insurance">Insurance</option>
                <option value="Internet">Internet</option>
                <option value="Groceries">Groceries</option>
                <option value="Mortgage">Mortgage</option>
                <option value="Phone Bill">Phone Bill</option>
                <option value="Rent">Rent</option>
                <option value="Savings">Savings</option>
                <option value="Subscriptions">Subscriptions</option>
                <option value="TV License">TV Licence</option>
            </select><br></br><br></br>

            <label className="InputLabel">Expense Cost: £</label>
            <input type="number" min="1" step="any" name="expenseCost" ref={expenseCost} required/><br/><br/>

            <label className="InputLabel">Date of Expense: </label>
            <input type="date" ref={expenseDate} name="payday" size="50" required/><br/><br/>

            <label for="expenseFrequency">Expense Frequency: </label>
            <select id="expenseFrequency" ref ={expenseFrequency}>
                <option value="Weekly">Weekly</option>
                <option value="Fortnightly">Fortnightly</option>
                <option value="Monthly">Monthly</option>
                <option value="Trimonthly">Trimonthly</option>
                <option value="Biannually">Biannually</option>
                <option value="Annually">Anunally</option>
            </select>

            <br/><br/>

            <input type="submit" value="Submit"/>

        </form>
        <br></br>
        <table className="Table">
                <thead>
                    <tr>
                        <th>Expense</th>
                        <th>Cost</th>
                        <th>Start Date</th>
                        <th>Frequency</th>
                        <th>Next Payment Date</th>
                        <th>Spending Comparison</th>
                        <th>Actions</th> 
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense, index) => (
                        <tr key={index}>
                            <td>{expense.expense}</td>
                            <td>£{parseFloat(expense.cost).toFixed(2)}</td>
                            <td>{expense.date}</td>
                            <td>{expense.frequency}</td>
                            <td>{calculateNextPaymentDate(expense.date, expense.frequency)}</td>
                            <td>{compareExpense(expense.expense, parseFloat(expense.cost))}</td>
                            <td>
                                <button onClick={() => handleDelete(expense.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                   
                    
                </tbody>
            </table>
            <br></br>
            <br></br>
            <table className="Table">
                <thead>
                    <th>Annual Total</th>
                    <th>Monthly Total</th>
                </thead>
                <tr>
                    <td>£{yearlyTotal.toFixed(2)}</td>
                    <td>£{monthlyTotal.toFixed(2)}</td>
                </tr>
            </table>
        </div>

    )

    
}