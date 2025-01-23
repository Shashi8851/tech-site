const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all product cards
document.querySelectorAll('.div-extra').forEach(card => {
    observer.observe(card);
});

// Add click event listeners to cards
document.querySelectorAll('.div-extra').forEach(card => {
    card.addEventListener('click', function(e) {
        if (!e.target.classList.contains('show-more')) {
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 200);
        }
    });
});