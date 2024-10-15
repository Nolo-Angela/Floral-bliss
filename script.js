const checkout = 0;
const cart = 0;
const Items = 0;

const checkoutButton = document.querySelector("#checkout_btn");
const shopNow = document.querySelector("#shop-btn");
const cartButton = document.querySelector(".cart_btn");
const clearButton = document.getElementById("#clear");

// initializing buttons
cartButton.onclick = goCheckout;
checkoutButton.onclick = addItems;
shopNow.onclick = [];

function addItems() {
  for () {
    if (items >= 1) {
      cart += 1
    }else {
    break;
    }
  } 
}

function shopNow(){
  
}

const cart = () => {
  addItems();
  
}

const checkout = () => {
  
}

const validation () {
  
}

const goCheckout = () => {
  if (cart >= 1) {
    
  }
}

function clearForm () {
  const inputInformation = Array.from(document.querySelector());

  for (const signIn of inputInformation) {
    signIn.innerHTML = "";
  }
}

clearButton.addEventListener("click", clearForm);
