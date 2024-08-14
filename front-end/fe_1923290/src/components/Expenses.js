import React, {useRef, useState, useEffect} from "react";
import {Link} from "react-router-dom";
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
            axios.post(' http://localhost:8080/expense',{
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

    const fetchExpenses = () => {
        axios.get('http://localhost:8080/expense')
            .then(response => {
                setExpenses(response.data);  // Set fetched data to state
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleDelete = (id) => {
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
                <option value="TV Liscense">TV Liscence</option>
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
                <option value="Bianually">Bianually</option>
                <option value="Anually">Anually</option>
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
                        <th>Date</th>
                        <th>Frequency</th>
                        <th>Actions</th> {/* New column for actions */}
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense, index) => (
                        <tr key={index}>
                            <td>{expense.expense}</td>
                            <td>£{expense.cost}</td>
                            <td>{expense.date}</td>
                            <td>{expense.frequency}</td>
                            <td>
                                <button onClick={() => handleDelete(expense.id)}>Delete</button> {/* Delete button */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )

    
}