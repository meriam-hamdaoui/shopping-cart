//check if the page is loading
if(document.re === 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}else {
    ready();
    
}

/*the ready function gonna set all the event
listner to all the items we need to react with*/
function ready(){
    //to call the item we're gonna add a function to it
    var removeCartItemButtons = document.getElementsByClassName('btn-danger');
    //console.log(removeCartItemButtons);//show the item

    /*now we're gonna loop throught all the buttons with this class name
        and add a event listner to click action*/
    for(let i=0; i< removeCartItemButtons.length; i++){
        var button = removeCartItemButtons[i];
        //the event listner always return an avent obj
        button.addEventListener('click', removeCartItem);
    }


    //now we're gonna make sure that our input quantity works
    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    //loop over all the quantity inputs
    for(let i=0; i< quantityInputs.length; i++){
        var input = quantityInputs[i];
        //add an event listner to the quantity input
        input.addEventListener('change', quantityChanged);
    }

    //now we're gonna aplicate the add to cart function
    var addToCartButtons = document.getElementsByClassName('shop-item-button');
    //loop over all add buttons
    for(let i=0; i< addToCartButtons.length; i++){
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    }

    //now we need to remove all theitem after clicking the buy it button
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyClicked);    
    
    //heart icon color
    let hearts = document.getElementsByClassName('fa-heart');
    // console.log(hearts)
    for (let heart of hearts){
        var button = heart;
        heart.addEventListener('click', heartIcon );

    }
    
}

/////////////////the functions below are our event to a click or change action on our items

//give color to the clicked heart
function  heartIcon(event){
    var heart = event.target;
    var shopItem = heart.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;    
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;    
    var imgSrc = shopItem.getElementsByClassName('shop-item-img')[0].src;
    console.log(title,price,imgSrc);
    if ( heart.style.color === "grey"){
            heart.style.color = "red";
            addItemToFavorite(title, price, imgSrc);
    } else {
            heart.style.color ="grey"
        }
}

//add item to favorite by clicking on the heart
function addItemToFavorite(title, price, imageSrc) {
    //this method will creat a div & add it to the html
    var favoriteRow = document.createElement('div');
    console.log(favoriteRow);
    favoriteRow.classList.add('row');
    favoriteRow.classList.add('favorite-row');
    favoriteRow.innerText = title;//verify our code 

    //for that we need to locate our favorite container
    var favoriteItems = document.getElementsByClassName('favorite-items')[0];

    //we need to check if the favorite item already added to the favorite container
    var favoriteItemNames = favoriteItems.getElementsByClassName('favorite-item-title');
    for (var i = 0; i < favoriteItemNames.length; i++) {
        if (favoriteItemNames[i].innerText == title) {
            alert('This item is already your favorite');
            return //leave the function without excute the code below
        }
    }

    //use the html code to generate our cart row
    var favoriteRowContents = `
        <div class="favorite-row">
            <div class="favorite-item favorite-colum">
                <img class="favorite-item-img" src="${imageSrc}" alt="" width="100" height="100">
                <span class="favorite-item-title shop-item-title">${title}</span>
            </div>
            <span class="favorite-price favorite-colum">${price}</span>
            <div class="favorite-quantity favorite-colum">                            
            <button class="btn btn-danger" type="button">REMOVE</button>
            </div>
        </div>`;
            
    //we're using htlml text this why we called innerHTML
    favoriteRow.innerHTML = favoriteRowContents;

    //then push it to the end of our favorite container
    favoriteItems.append(favoriteRow);
    // cartItems.prepend(cartRow);

    //add an event listner to the new remove button
    favoriteRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    favoriteRow.getElementsByClassName('shop-item-button')[0].addEventListener('click',addItemToCart,);
    // add an event listner to the quantity input as well
    // cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}


//the buy it function
function buyClicked(event){
    alert('Thank you for your trust, HAVE A NICE DAY');

    //select the conatiner of our cart to delete all the items
    var cartItems = document.getElementsByClassName('cart-items')[0];

    // loop inside all the children & since we don't know the length we're gonna use the while loop
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild);
    }
    //we have to update the total price
    updateCartTotal();
}


//add to cart function
function addToCartClicked(event){    
    var button = event.target;

    /*in here we're gonna add img, name, quantity and a remove button
    so we need to call all the divs od the clicked button*/
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;    
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;    
    var imgSrc = shopItem.getElementsByClassName('shop-item-img')[0].src;
    //console.log(title,price,imgSrc);

    //we need to add a row to our cart
    addItemToCart(title, price, imgSrc);//add
    updateCartTotal();//update total price
}

//the add item to cart function
function addItemToCart(title, price, imageSrc) {
    //this method will creat a div & add it to the html
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    //cartRow.innerText = title;//verify our code
    
    //for that we need to locate our cart container
    var cartItems = document.getElementsByClassName('cart-items')[0];

    //we need to check if the item already added to the cart
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart');
            return //leave the function without excute the code below
        }
    }
    //use the html code to generate our cart row
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`;
    
    //we're using htlml text this why we called innerHTML
    cartRow.innerHTML = cartRowContents;

    //then push it to the end of our cart
    cartItems.append(cartRow);    
    // cartItems.prepend(cartRow);

    //add an event listner to the new remove button
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    // add an event listner to the quantity input as well
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

//the quantity change function
function quantityChanged(event){
    var input = event.target;
    //check if the input is a valid value & no -numbers
    if(isNaN(input.value) || input.value <=0 ){
        input.value = 1;
    }
    updateCartTotal();
}


//make our code readable
function removeCartItem(event){
    console.log('clicked');
    /*we wanna remove the full row from our cart
     so we're gonna call the item by his parent 
     and this parent has a parent*/
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}


//this function will calculate our payment price
function updateCartTotal(){
    //we need to call the item container and select the first element 
    var carItemContainer = document.getElementsByClassName('cart-items')[0];

    //we need to access to all element inside container 
    var cartRows = carItemContainer.getElementsByClassName('cart-row');

    //to modify the total price in the cart
    var total = 0;
    for(let i=0; i< cartRows.length; i++){
        var cartRow = cartRows[i];
        //accesses to the price of the selected element
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];

        //accesses to the quantity of the selected element
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        
        //show the removed tag
        //console.log(priceElement,quantityElement );

        //remove the € from the price to be able of calculat it
        var price =parseFloat(priceElement.innerText.replace('€',''));

        //get the quantity from the quantity element
        var quantity = quantityElement.value
        total += price * quantity;
    }
    /*the computer may give us a not arrounded number (1.999999)
     we use this function*/
    total = Math.round(total * 100)/100;
    //set the new price in our cart 
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
}



