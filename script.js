// all carts of 9.
const products = [
    {
        id: 1,
        name: "Gaming Laptop",
        category: "Laptops",
        price:1299,
        actualPrice: 1499.99,
        stock: 15,
        rating: 4.5,
        description: "High-performance gaming laptop with RTX graphics",
        image: "https://saudewala.in/cdn/shop/collections/Laptop.jpg?v=1732216115&width=875"
    },
    {
        id: 2,
        name: "Wireless Headphones",
        category: "Audio",
        price: 199.99,
        actualPrice: 249.99,
        stock: 25,
        rating: 4.8,
        description: "Premium wireless headphones with noise cancellation",
        image: "https://m.media-amazon.com/images/I/31MCV0u8S0L._SX300_SY300_QL70_FMwebp_.jpg"
    },
    {
        id: 3,
        name: "Smartphone Pro",
        category: "Phones",
        price: 899.99,
        actualPrice: 999.99,
        stock: 20,
        rating: 4.7,
        description: "Latest smartphone with advanced camera system",
        image: "https://ikall.in/wp-content/uploads/2023/06/51sJmHfw92L._SL1000_-600x600.jpg"
    },
    {
        id:4,
        name:"telivision",
        category:"video",
        brand:"sony",
        price:800,
        actualPrice: 999.99,
        stock:200,
        description:"become an integral part of households worldwide.",
        image:"./public/image/download (1).webp"   
    },
    {
        id: 5,
        name: "mobile",
        category:"phnoe",
        brand:"apple",
        price:800,
        actualPrice: 1000,
        stock:120,
        description:"Both models are powered by the A18 processor.",
        image:"./public/image/downloadss.jpg"  
    },
    {
       id:6,
       name:"watch",
       category:"watch",
       brand:"delta",
       price:99,
       actualPrice: 129,
       stock:500,
       description:"A watch is a timekeeping device worn on the wrist.",
       image:"./public/image/download.jpg"
    },
    {
        id:7,
        name:"ZARA",
        category:"clothes(shirt)",
        brand:"ZARA",
        price:49,
        stock:5000,
        description:"Fast Fashion approach, emphasizing trendy.",
        image:"./public/image/downloadd.jpg"
     },
     {
        id:8,
        name:"sports",
        category:"cricket",
        brand:"mrf",
        price:12,
        actualPrice: 50,
        stock:50,
        description:"the brand's strength, durability, and reliability.",
        image:"./public/image/downloaddd.webp"
     },
     {
        id:9,
        name:"food",
        category:"protein",
        brand:"MB",
        price:230,
        actualPrice: 350,
        stock:50,
        description:"the protein which gives you strenght and energy ",
        image:"./public/image/MB.webp"
     }
];

// Cart state
let cart = [];
let quantities = {};

// DOM Elements
const productContainer = document.getElementById('productcontainer');
const productTemplate = document.getElementById('productTemplate');
const cartIcon = document.querySelector('.fa-cart-shopping');

// Initialize products
function initializeProducts() {
    products.forEach(product => {
        const productCard = createProductCard(product);
        productContainer.appendChild(productCard);
    });
}

// Create product card
function createProductCard(product) {
    const template = productTemplate.content.cloneNode(true);
    
    // Set product details
    template.querySelector('.productImage').src = product.image;
    template.querySelector('.productName').textContent = product.name;
    template.querySelector('.category').textContent = product.category;
    template.querySelector('.productdescription').textContent = product.description;
    template.querySelector('.productPrice').textContent = `$${product.price}`;
    template.querySelector('.productActuallPrice').textContent = `$${product.actualPrice}`;
    template.querySelector('.productStock').textContent = product.stock;
    
    // Set up quantity controls
    const quantityElement = template.querySelector('.productQuantity');
    const incrementBtn = template.querySelector('.cartIncrement');
    const decrementBtn = template.querySelector('.cartDecrement');
    quantities[product.id] = 1;

    // Add event listeners
    incrementBtn.addEventListener('click', () => {
        if (quantities[product.id] < product.stock) {
            quantities[product.id]++;
            quantityElement.textContent = quantities[product.id];
        }
    });

    decrementBtn.addEventListener('click', () => {
        if (quantities[product.id] > 1) {
            quantities[product.id]--;
            quantityElement.textContent = quantities[product.id];
        }
    });

    // Add to cart functionality
    const addToCartBtn = template.querySelector('.add-to-cart-button');
    addToCartBtn.addEventListener('click', () => {
        addToCart(product);
    });

    return template;
}

// Add to cart function
function addToCart(product) {
    const quantity = quantities[product.id];
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity
        });
    }

    updateCartIcon();
    saveCartToLocalStorage();
    showNotification(`Added ${quantity} ${product.name} to cart`);
}

// Update cart icon
function updateCartIcon() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartIcon.textContent = ` ${totalItems}`;
}

// Save cart to local storage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from local storage
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartIcon();
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 15px;
        border-radius: 5px;
        z-index: 1000;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initializeProducts();
    loadCartFromLocalStorage();
});
const mobileToggle = document.querySelector('.mobile-toggle');
        const navbar = document.querySelector('.navbar');

        mobileToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
            mobileToggle.innerHTML = navbar.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.section-navbar')) {
                navbar.classList.remove('active');
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });

        // Update cart count (example functionality)
        let cartCount = 0;
        const cartButton = document.querySelector('.add-to-cart-button i');
        
        function updateCartCount(count) {
            cartCount = count;
            cartButton.innerHTML = ` ${cartCount} `;
        }

        document.addEventListener('DOMContentLoaded', function() {
            // Add intersection observer for animation on scroll
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('loaded');
                    }
                });
            }, {
                threshold: 0.1
            });
        
            // Observe all product cards
            document.querySelectorAll('.div-extra').forEach(card => {
                observer.observe(card);
            });
        
            // Show/hide "show more" buttons
            document.querySelectorAll('.div-extra').forEach(card => {
                card.addEventListener('mouseenter', () => {
                    const showMore = card.querySelector('.show-more');
                    if (showMore) {
                        showMore.style.display = 'inline-block';
                    }
                });
        
                card.addEventListener('mouseleave', () => {
                    const showMore = card.querySelector('.show-more');
                    if (showMore) {
                        showMore.style.display = 'none';
                    }
                });
            });
        });