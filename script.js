document.addEventListener("DOMContentLoaded", () => {
    // Mobile Navigation Toggle
    const menuToggle = document.createElement("div");
    menuToggle.id = "menu-toggle";
    menuToggle.innerHTML = "&#9776;";
    document.getElementById("header").prepend(menuToggle);
    
    const navbar = document.getElementById("navbar");
    menuToggle.addEventListener("click", () => {
        navbar.classList.toggle("active");
    });
    
    // Close menu on link click (mobile)
    document.querySelectorAll("#navbar a").forEach(link => {
        link.addEventListener("click", () => {
            navbar.classList.remove("active");
        });
    });
    
   /* // Cart Functionality
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.querySelectorAll(".pro button").forEach((button, index) => {
        button.addEventListener("click", () => {
            const product = button.parentElement;
            const name = product.querySelector("h5").innerText;
            const price = product.querySelector("h4").innerText;
            const imgSrc = product.previousElementSibling.src;
            
            const item = { name, price, imgSrc };
            cart.push(item);
            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Added to cart!");
        });
    }); */
    
    // Responsive Image & Grid Handling
    const resizeImages = () => {
        document.querySelectorAll(".pro img").forEach(img => {
            img.style.width = window.innerWidth < 768 ? "100%" : "auto";
        });
    };
    window.addEventListener("resize", resizeImages);
    resizeImages();
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(anchor.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });
});

// JavaScript for full cart and checkout functionality

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    loadCart(); // Load cart items from local storage
    updateCartTotal();
    setupEventListeners();
});

// Load cart items from local storage
function loadCart() {
    const cartContainer = document.getElementById("cart-items");
    if (!cartContainer) return;
    cartContainer.innerHTML = "";
    
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.forEach((item, index) => {
        let cartRow = document.createElement("div");
        cartRow.classList.add("cart-row");
        cartRow.innerHTML = `
            <div>${item.name}</div>
            <div>R${item.price}</div>
            <input type='number' value='${item.quantity}' min='1' class='cart-quantity' data-index='${index}'>
            <button class='remove-item' data-index='${index}'>Remove</button>
        `;
        cartContainer.appendChild(cartRow);
    });
}

// Add event listeners for cart actions
function setupEventListeners() {
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", addToCart);
    });
    document.getElementById("cart-items")?.addEventListener("click", handleCartActions);
    document.getElementById("checkout-form")?.addEventListener("submit", processCheckout);
}

// Add item to cart
function addToCart(event) {
    let button = event.target;
    let product = button.parentElement;
    let name = product.querySelector("h5").innerText;
    let price = parseFloat(product.querySelector("h4").innerText.replace("R", ""));
    
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateCartTotal();
}

// Handle cart actions (remove/update quantity)
function handleCartActions(event) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (event.target.classList.contains("remove-item")) {
        let index = event.target.dataset.index;
        cart.splice(index, 1);
    } else if (event.target.classList.contains("cart-quantity")) {
        let index = event.target.dataset.index;
        let newQuantity = parseInt(event.target.value);
        if (newQuantity > 0) cart[index].quantity = newQuantity;
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateCartTotal();
}

// Update total cart price
function updateCartTotal() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById("cart-total")?.innerText = `Total: R${total.toFixed(2)}`;
}

// Process checkout form
function processCheckout(event) {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    if (!name || !email || !address || cart.length === 0) {
        alert("Please fill in all fields and add items to the cart before checking out.");
        return;
    }
    
    alert("Order placed successfully! Thank you for shopping with us.");
    localStorage.removeItem("cart"); // Clear cart after successful checkout
    window.location.href = "index.html";
}
