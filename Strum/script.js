document.addEventListener("DOMContentLoaded", function () {
  const aboutSection = document.getElementById("about");

  window.addEventListener("scroll", function () {
    let sectionPos = aboutSection.getBoundingClientRect().top;
    let screenPos = window.innerHeight / 1.5;

    if (sectionPos < screenPos) {
      aboutSection.classList.add("visible");
    }
  });
});

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Thank you for reaching out! We'll get back to you soon.");
    this.reset();
  });

document.addEventListener("DOMContentLoaded", function () {
  const cartToggle = document.getElementById("cart-toggle");
  const cartSidebar = document.getElementById("cart-sidebar");
  const cartClose = document.getElementById("cart-close");
  const cartOverlay = document.getElementById("cart-overlay");
  const cartList = document.getElementById("cart-list");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");
  const emptyCartMsg = document.querySelector(".empty-cart");

  let cart = [];

  // Open Cart
  cartToggle.addEventListener("click", function (event) {
    event.preventDefault();
    cartSidebar.classList.add("active");
    cartOverlay.classList.add("active");
  });

  // Close Cart
  cartClose.addEventListener("click", function () {
    cartSidebar.classList.remove("active");
    cartOverlay.classList.remove("active");
  });

  cartOverlay.addEventListener("click", function () {
    cartSidebar.classList.remove("active");
    cartOverlay.classList.remove("active");
  });

  // Function to Update Cart Display
  function updateCart() {
    cartList.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      emptyCartMsg.style.display = "block";
    } else {
      emptyCartMsg.style.display = "none";
    }

    cart.forEach((item, index) => {
      let li = document.createElement("li");
      li.innerHTML = `${item.name} - $${item.price} 
            <button class="remove-item" data-index="${index}">&times;</button>`;
      cartList.appendChild(li);
      total += parseFloat(item.price);
    });

    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.length;

    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        cart.splice(index, 1);
        updateCart();
      });
    });
  }

  // Function to Add Items to Cart (Example)
  function addToCart(itemName, itemPrice) {
    cart.push({ name: itemName, price: itemPrice });
    updateCart();
  }

  // Example: Add Items to Cart on Click (Attach This Event to Buttons in Products)
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", function () {
      const itemName = this.querySelector("p").textContent;
      const itemPrice = (Math.random() * (200 - 50) + 50).toFixed(2); // Random price between $50 and $200
      addToCart(itemName, itemPrice);
    });
  });
});
