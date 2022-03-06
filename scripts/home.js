window.onload=function(){

    var myForm = "inscription-form.html";
    document.getElementById("btn1f").addEventListener('click' , function () {
        window.location.replace(myForm);
    });
    
    var myShop = "cart.html";
    document.getElementById("btn2s").addEventListener('click' , function () {
        window.location.replace(myShop);
    });
    
    // redirect my third button
    var myGoogle = "http://www.google.com";
    document.getElementById("btn3g").addEventListener('click' , function () {
        window.location.replace(myGoogle);
    });
}