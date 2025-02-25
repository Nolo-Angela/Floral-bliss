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
    
    // Cart Functionality
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
    });
    
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
