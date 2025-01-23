const products = [
    { id: 1, name: 'Wireless Headphones', price: 99.99, image: 'https://m.media-amazon.com/images/I/31ztpzzaDSL._SX300_SY300_QL70_FMwebp_.jpg' },
    { id: 2, name: 'Smartwatch', price: 199.99, image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQeNU3QJvYWE8vls-HBoehcAM1mPzmPYdL5IxfWILh8Z0CeTu9Wl_Y1tiCB4630aDfEYILAIWo-IT3KLdKeXQF_Zz17xXeZZj3QzAllv5mD7MBfuLiZlrSNFQ' },
    { id: 3, name: 'Bluetooth Speaker', price: 79.99, image: 'https://m.media-amazon.com/images/I/51CV7YPyrGL._SX300_SY300_QL70_FMwebp_.jpg' },
    { id: 4, name: 'Laptop Backpack', price: 49.99, image: 'https://m.media-amazon.com/images/I/51FuoR3MLUL._SX679_.jpg' },
    { id: 5, name: 'Gaming Mouse', price: 59.99, image: 'https://m.media-amazon.com/images/I/41yrgK99ahL._SX300_SY300_QL70_FMwebp_.jpg' },
    { id: 6, name: 'Mechanical Keyboard', price: 129.99, image: 'https://elitehubs.com/cdn/shop/products/rz03-03490100-r3m1-image-main-600x600-1-2.jpg?v=1683971858&width=360' }
];

// Shopping cart state
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let promoApplied = false;

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
    updateCart();

    // Set up search functionality
    document.querySelector('.search-bar').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts);
    });

    // Set up promo code functionality
    document.querySelector('.apply-promo').addEventListener('click', () => {
        const promoCode = document.querySelector('.promo-input').value;
        if (promoCode === 'DISCOUNT20' && !promoApplied) {
            promoApplied = true;
            alert('20% discount applied!');
            updateCart();
        } else if (promoApplied) {
            alert('Promo code already applied!');
        } else {
            alert('Invalid promo code!');
        }
    });

    // Set up checkout functionality
    document.querySelector('.checkout-btn').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        alert('Proceeding to checkout...');
        // Here you would typically redirect to a checkout page
    });
});

function displayProducts(productsToDisplay) {
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = productsToDisplay.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-name">${product.name}</div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <input type="number" min="1" value="1" class="quantity-input" id="qty-${product.id}">
            <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const quantity = parseInt(document.querySelector(`#qty-${productId}`).value);

    if (quantity < 1) {
        alert('Please enter a valid quantity');
        return;
    }

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }

    updateCart();
    saveCart();
}

function updateCart() {
    const cartItems = document.querySelector('.cart-items');
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>${item.name}</div>
            <input type="number" min="1" value="${item.quantity}" 
                onchange="updateQuantity(${item.id}, this.value)">
            <div>$${(item.price * item.quantity).toFixed(2)}</div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">×</button>
        </div>
    `).join('');

    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (promoApplied) {
        total *= 0.8; // 20% discount
    }
    document.querySelector('.cart-total').textContent = `Total: $${total.toFixed(2)}`;
}

function updateQuantity(productId, newQuantity) {
    const quantity = parseInt(newQuantity);
    if (quantity < 1) {
        alert('Please enter a valid quantity');
        updateCart();
        return;
    }

    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = quantity;
        updateCart();
        saveCart();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    saveCart();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}