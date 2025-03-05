document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const checkoutForm = document.getElementById("checkout-form");
    const loadingMessageElement = document.getElementById("loading-message");

      // Load cart items from localStorage with error handling
      function loadCart() {
        try {
            let savedCart = JSON.parse(localStorage.getItem("cart"));
            return savedCart || [];
        } catch (error) {
            console.error("Error loading cart from localStorage:", error);
            return [];
        }
    }

    function displayCartItems() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        } else {
            cart.forEach(item => {
                const itemElement = document.createElement("div");
                itemElement.classList.add("cart-item");
                itemElement.innerHTML = `<p>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</p>`;
                cartItemsContainer.appendChild(itemElement);
                total += item.price * item.quantity;
            });
        }
        totalPriceElement.textContent = `$${total.toFixed(2)}`;
    }

    displayCartItems();

    // Handle checkout form submission
    checkoutForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const address = document.getElementById("address").value.trim();
        const paymentMethod = document.getElementById("payment-method").value;

        if (!name || !email || !phone || !address) {
            alert("Please fill in all required fields.");
            return;
        }

        // Simulate order placement
        alert(`Thank you, ${name}! Your order has been placed successfully.`);

        // Clear cart and redirect (optional)
        localStorage.removeItem("cart");
        window.location.href = "thank-you.html";
    });
    function removeItemFromCart(index) {
        // Remove item from cart array
        cart.splice(index, 1);
        // Update localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
        // Re-render cart items
        displayCartItems();
    }

    let cart = loadCart();  // Load the cart safely
    displayCartItems();

    // Form validation
    checkoutForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Show loading message
        loadingMessageElement.textContent = "Processing...";

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const address = document.getElementById("address").value.trim();
        const paymentMethod = document.getElementById("payment-method").value;

        // Basic validation for required fields
        if (!name || !email || !phone || !address) {
            alert("Please fill in all required fields.");
            loadingMessageElement.textContent = "";
            return;
        }

        // Email format validation (basic regex)
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            loadingMessageElement.textContent = "";
            return;
        }

        // Phone number format validation (basic regex for numbers)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            alert("Please enter a valid 10-digit phone number.");
            loadingMessageElement.textContent = "";
            return;
        }

        // Simulate order placement
        setTimeout(() => {
            alert(`Thank you, ${name}! Your order has been placed successfully.`);
            localStorage.removeItem("cart");
            window.location.href = "thank-you.html";
        }, 2000);  // Simulate delay of 2 seconds for processing
    });
});

