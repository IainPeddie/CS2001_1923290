//Let's define some variables to represent the form data
//At the beginning, the form is empty, and therefore, not valid

//Data to send
var formData = {
    username: "",
    email: "",
    password: "",
    buyer: false,
    seller: false
}

//This data would not be sent
var formValid= false;
var repPassword="";
var tosCheckBox=false;

//Function to read the form
function readForm(){
    //ToDo: This function should read the form inputs, and assign their
    //values to the variables defined above; 
    //See Lecture slides on JS inputs
    //You can get elements by ID: https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
    //You can get elements by tag name: https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByTagName 
    //Read username, email, password, repPassword, and tosCheckBox fields
    formData.username = document.getElementById("name").value;
    formData.email = document.getElementById("email").value;
    formData.password = document.getElementById("password").value;
  
    repPassword = document.getElementById("repPassword").value;

    //Read the buyer and seller checkboxes 
    formData.buyer = document.getElementById("buyer").checked;
    formData.seller = document.getElementById("seller").checked;

    tosCheckBox = document.getElementById("tos").checked;
}

//Function to validate the form
function validateForm() {
    formValid = false;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //accepts: cigdem.sengul@brunel.ac.uk; cigdem@brunel.com

     //ToDo: Fill in the conditions to check the validity of the form.
    //For example, you need to check if any of the text fields are empty
    //You can also follow HTML5 validation here: https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation
    //and see if you can use the validity field - for example, username.validity 
    //to check if the form input is valid
    if ((formData.username.length==0) || 
        (formData.email.length==0)  ||
        (formData.password.length==0) ||
        (repPassword.length == 0) ){/*ToDo: Add the correct condition to check no text field is empty*/
            alert("Please fill in all text fields.");
    } else if (!formData.email.match(mailformat)){/*ToDo: Add the correct condition to check email is of correct form*/
        alert("Invalid e-mail address. Please enter your e-mail again.");
    } else if (formData.password.length < 8){/*ToDo: Add the correct password condition*/
        alert("Password is too short. Please select another password");
    } else if(formData.password !== repPassword) {/*ToDo: Check if passwords match*/
        alert("Passwords do not match. Please retry");
    } else if(!formData.buyer && !formData.seller){
        alert("Please check at least one checkbox to be a seller or a buyer.")
    } else if (!tosCheckBox){ /*ToDo: Add Condition to check Term and Conditions checked*/
        alert("Please agree to the Terms and Conditions, and Privacy Policy.")
    }else {
        formValid = true;
    }
}

//Function to write the Registration success on the page
function createNewParagraph(content){
    var text = document.createTextNode(content);
    var paragraph = document.createElement("p");
    paragraph.appendChild(text);
    paragraph.style = "white-space: pre;"
    paragraph.id ="hiddenParagraph";

    var element = document.getElementById("hiddenSection");
    var existingParagraph = document.getElementById("hiddenParagraph")
    element.replaceChild(paragraph, existingParagraph);
}

//Function  to submit the form, this should be called by the Register button
//on click
function submitForm(){
    readForm();
    validateForm();
    if (formValid){
        var formText = formData.username + " registered as:\n"; 
            formText += formData.buyer?"- buyer\n":""
            formText += formData.seller?"-seller":"";

        createNewParagraph(formText);
    }
}

//Sending the form to a fake endpoint
function submitFormtoReqRes(){
    readForm();
    validateForm();
    
    if (formValid){

        fetch('https://reqres.in/api/users',{
            method:'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body:JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(responseJSON => {
          console.log('Success',responseJSON);
          createNewParagraph(JSON.stringify(responseJSON, ['username','buyer', 'seller']));
        })
      .catch(err => console.log(err));
    }
  }