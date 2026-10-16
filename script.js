
function toggleTheme() {
    const body = document.body;
    if (body.style.backgroundColor === "rgb(255, 255, 255)") {
        body.style.backgroundColor = "#0a0a0a";
        body.style.color = "#ffffff";
    } else {
        body.style.backgroundColor = "#ffffff";
        body.style.color = "#000000";
    }
}


function showDetails() {
    const infoText = document.getElementById("recipeInfoText");
    const card = document.getElementById("recipeCard");
    if (infoText && card) {
        infoText.innerHTML = `
            <strong style="color: #ffb300; display: block; margin-bottom: 5px;">WHAT GOES INTO YOUR BOWL:</strong>
            <span style="color: #fff;">01 Slow-simmered pork broth · 02 Fresh wheat noodles · 03 Tender chashu pork · 04 Ajitsuke tamago · 05 Spring onions · 06 Roasted nori</span>
        `;
        card.style.borderColor = "#c82323";
    }
}


function hideDetails() {
    const infoText = document.getElementById("recipeInfoText");
    const card = document.getElementById("recipeCard");
    if (infoText && card) {
        infoText.innerHTML = "+ Hover over the card to discover the ingredients.";
        card.style.borderColor = "#222";
    }
}

function changeMenuCategory() {
    const selectedCategory = document.getElementById("menuSelect").value;
    const sections = document.querySelectorAll(".menu-catalog-section");

    sections.forEach(section => {
        if (selectedCategory === "all") {
            section.style.display = "block"; 
        } else if (section.getAttribute("data-category") === selectedCategory) {
            section.style.display = "block"; 
            section.scrollIntoView({ behavior: 'smooth' });
        } else {
            section.style.display = "none"; 
        }
    });
}


let cartItems = [];


function addToOrder(itemName, itemPrice) {
    cartItems.push({ name: itemName, price: itemPrice });
    updateCartUI();

    
    const notification = document.getElementById("orderNotification");
    if (notification) {
        notification.textContent = `Added ${itemName} (₱${itemPrice}) to your cart!`;
        notification.style.display = "block";
        
        setTimeout(() => {
            notification.style.display = "none";
        }, 3000);
    }
}


function updateCartUI() {
    const cartCounter = document.getElementById("cartCount");
    if (cartCounter) {
        cartCounter.textContent = `🛒 ${cartItems.length}`;
        cartCounter.style.color = cartItems.length > 0 ? "#ffb300" : "#999999";
    }
}


function openCart() {
    if (cartItems.length === 0) {
        alert("Your cart is currently empty, boi! Pick some delicious ramen from the menu first.");
        return;
    }

    let message = "--- YOUR CART ITEMS ---\n\n";
    let total = 0;

    cartItems.forEach((item, index) => {
        message += `${index + 1}. ${item.name} - ₱${item.price}\n`;
        total += item.price;
    });

    message += `\nTotal: ₱${total}\n\n[OK] - Proceed to Checkout / Order\n[Cancel] - Clear / Reset Cart`;

    
    const proceedOrder = confirm(message);
    
    if (proceedOrder) {
        
        alert(`🎉 Thank you for ordering!\n\nWe have received your order totaling ₱${total}. We'll prepare your delicious ramen right away! 🍜`);
        resetCart(); 
    } else {
       
        const clearCart = confirm("Do you want to clear or cancel your selected items?");
        if (clearCart) {
            resetCart();
        }
    }
}

function resetCart() {
    cartItems = [];
    updateCartUI();
    alert("Your cart has been cleared. You can start adding items again!");
}