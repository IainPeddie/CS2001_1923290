import React, {useRef} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import './Layout.css';


export default function Input(){
    const income=useRef();
    const payday=useRef();
    const tos=useRef();

    const validateForm = () => {
        let formValid = false;

        if (income.current.validity.valueMissing || payday.current.validity.valueMissing ){
                alert("Fill out all of the boxes, please.");
        }
        else if (payday.current.validity.date){
            alert("Invalid date. Please enter a valid date.");
        } else if (tos.current.validity.valueMissing){
            alert("Please agree to the Terms and Conditions, and Privacy Policy.")
        }else{
            formValid = true;
        }
        return formValid;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if(validateForm()){
            


            axios.post(' https://reqres.in/api/users',{
                income: income.current.value,
                payday: payday.current.value,
            }).then(response=>{
                console.log(response);
                if (response.status === 201){
                    alert("Details Submitted.")
                }
            }).then(()=>{
                income.current.value="";
                payday.current.value="";
                tos.current.checked=false;
                window.location.href = "/Expenses"
            })
            .catch(error=>{
                console.log(error);
            })
        }
      }

    return (
        <form className="income" noValidate onSubmit={handleSubmit}>
            <br></br>
            <label className="InputLabel">Income: £</label>
            <input type="number" min="1" step="any" ref={income} required/><br/><br/>

            <label className="InputLabel">Payday: </label>
            <input type="date" ref={payday} name="payday" size="50" required/><br/><br/>

            <input type="checkbox" ref={tos} name="tos" value="tos" required/>
            <label>I agree to the Terms of Use and Privacy Policy.</label>
            <br/><br/>

            <input type="submit" value="Submit"/>

        </form>
        
    )

    
}