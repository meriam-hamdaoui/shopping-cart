window.onload=function(){
    //call all the aelemnt we're gonna add listner to
    const form = document.getElementById('form');
    // console.log(form);
    const userName = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const password2 = document.getElementById('password2');
    // console.log(userName, email, password, password2);
    form.addEventListener('click', (e) => {
        e.preventDefault();
        var myShop = "cart.html";
        document.getElementById("access").addEventListener('click' , function () {
            if(checkInputs()){
                window.location.replace(myShop);
            } else {              
                alert('please retry inscription');            
            }    
        });
    });

    //check inputs function
    function checkInputs(){
        /*get the values from the inputs
         the trim function does not allow space in string*/
        const userNameValue = userName.value.trim();    
        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();
        const password2Value = password2.value.trim();
        let isValid = true;

        //check name input
        if (userNameValue === ''){
            setErrorFor(userName, 'this field can not be empty');
            isValid =false;
        } else {
            setSuccessFor(userName);
        }

        //check email input
        if (emailValue === ''){
            setErrorFor(email, 'this field can not be empty');
            isValid =false;
        } else if (!isEmail(emailValue)){
            setErrorFor(email, 'Email is not valid');
            isValid =false;
        } else{
            setSuccessFor(email);
        }

        //check the password
        if (passwordValue === ''){
            setErrorFor(password, 'this field can not be empty');
            isValid =false;
        } else {
            setSuccessFor(password);
        }
        if (password2Value === ''){
            setErrorFor(password2, 'this field can not be empty');
            isValid =false;
        } else if (passwordValue !== password2Value){
            setErrorFor(password2, 'password does not match');
            isValid =false;
        }else {
            setSuccessFor(password2);
        }

        //this value will be used to redirect us to the cart.html
        return isValid;
    }

    function setErrorFor(input, message){
        const formControl = input.parentElement; //.form-control    
        console.log(formControl);
        const small = formControl.querySelector('small');
        console.log(small);
        //add error message inside small tag
        small.innerText = message;

        //add error class
        formControl.className = 'form-control error';
    }

    function setSuccessFor(input){
        const formControl = input.parentElement; //.form-control    
        formControl.className = 'form-control success';
    }

    function isEmail(email){
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }
}