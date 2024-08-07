import React, {useRef} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import './Layout.css';


export default function Expenses(){
    const expense=useRef();
    const expenseCost=useRef();
    const expenseDate=useRef();
    const expenseFrequency=useRef();

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
            axios.post(' https://reqres.in/api/users',{
                expense: expense.current.value,
                expenseCost: expenseCost.current.value,
                expenseDate: expenseDate.current.value,
                expenseFrequency: expenseFrequency.current.value,
            }).then(response=>{
                console.log(response);
                if (response.status === 201){
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

    return (
        <form className="expense" noValidate onSubmit={handleSubmit}>
            <br></br>
            <label className="InputLabel">Expense: </label>
            <input type="string" name="expense" ref={expense} required/><br/><br/>

            <label className="InputLabel">Expense Cost: £</label>
            <input type="number" min="1" step="any" name="expenseCost" ref={expenseCost} required/><br/><br/>

            <label className="InputLabel">Date of Expense: </label>
            <input type="date" ref={expenseDate} name="payday" size="50" required/><br/><br/>

            <label for="expenseFrequency">Expense Frequency: </label>
            <select id="expenseFrequency" name="cars" ref ={expenseFrequency}>
                <option value="7">1 Week</option>
                <option value="14">2 Weeks</option>
                <option value="30">Monthly</option>
                <option value="90">3 Months</option>
                <option value="182">6 Months</option>
                <option value="365">Yearly</option>
                </select>
            
            <br></br>
            <br></br>

            

            <br/><br/>

            <input type="submit" value="Submit"/>

        </form>

    )

    
}