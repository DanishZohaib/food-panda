// Main JavaScript file for foodpanda website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeLocationSearch();
    initializeCuisineFilters();
    initializeMobileMenu();
    initializeCartFunctionality();
    initializeSmoothScrolling();
    initializeAnimations();
    initializeTestimonialsCarousel();
    initializeFormValidation();
    initializeTabs();
    initializeQuantitySelectors();
    initializeFavoriteButtons();
    initializeFilters();
    initializeOrderTracking();
    initializeProfileFeatures();
});

// Location search functionality
function initializeLocationSearch() {
    const locationInput = document.getElementById('location-input');
    const findRestaurantsBtn = document.querySelector('.btn-find');

    if (locationInput && findRestaurantsBtn) {
        findRestaurantsBtn.addEventListener('click', function() {
            if(locationInput.value.trim() !== '') {
                // In a real app, this would redirect to restaurant listing page
                // For demo purposes, simulate redirect
                window.location.href = 'pages/restaurants.html';
            } else {
                showNotification('Please enter a location', 'error');
            }
        });

        locationInput.addEventListener('keypress', function(e) {
            if(e.key === 'Enter') {
                findRestaurantsBtn.click();
            }
        });
    }
}

// Cuisine filter buttons
function initializeCuisineFilters() {
    const cuisineButtons = document.querySelectorAll('.cuisine-btn');
    cuisineButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            cuisineButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
        });
    });
}

// Mobile menu toggle
function initializeMobileMenu() {
    const header = document.querySelector('header');
    if (!header) return;

    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.setAttribute('aria-label', 'Toggle menu');

    // Add mobile menu button to header
    const headerActions = header.querySelector('.header-actions');
    if (headerActions) {
        headerActions.parentNode.insertBefore(mobileMenuBtn, headerActions);
    }

    mobileMenuBtn.addEventListener('click', function() {
        document.body.classList.toggle('mobile-menu-open');
    });
}

// Cart functionality
function initializeCartFunctionality() {
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart, .add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const menuCard = this.closest('.menu-item');
            if (menuCard) {
                const itemName = menuCard.querySelector('h4').textContent;
                showNotification(`Added ${itemName} to cart`, 'success');
            } else {
                const restaurantCard = this.closest('.restaurant-card');
                if (restaurantCard) {
                    const restaurantName = restaurantCard.querySelector('h3').textContent;
                    showNotification(`Added item from ${restaurantName}`, 'success');
                }
            }

            // Update cart count visually
            updateCartCount();
        });
    });

    // Update cart count
    function updateCartCount() {
        const cartIcon = document.querySelector('.cart-icon');
        if (cartIcon) {
            const badge = cartIcon.querySelector('.cart-count') || document.createElement('span');
            if (!badge.classList.contains('cart-count')) {
                badge.classList.add('cart-count');
                cartIcon.appendChild(badge);
            }
            let count = parseInt(badge.textContent) || 0;
            count++;
            badge.textContent = count;
        }
    }
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize animations when elements come into view
function initializeAnimations() {
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.classList.add('animated', 'fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements that should animate in
        document.querySelectorAll('.feature-card, .step, .cuisine-card, .restaurant-card, .testimonial-card').forEach(el => {
            observer.observe(el);
        });
    }
}

// Initialize testimonials carousel
function initializeTestimonialsCarousel() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length === 0) return;

    let currentIndex = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }

    // Initialize first testimonial
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === 0 ? 'block' : 'none';
    });

    // Auto rotate testimonials
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }, 5000);
}

// Form validation
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Basic validation
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });

            if (isValid) {
                showNotification('Form submitted successfully!', 'success');
                // In a real app, you would submit the form
                form.reset();
            } else {
                showNotification('Please fill in all required fields', 'error');
            }
        });
    });

    // Add error styling to required fields
    const requiredFields = document.querySelectorAll('input[required], select[required], textarea[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
            }
        });
    });
}

// Tab navigation
function initializeTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');

            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // Hide all tab content sections
            document.querySelectorAll('.menu-section, .about-section, .reviews-section, .photos-section').forEach(section => {
                section.classList.remove('active');
            });

            // Show the selected tab content
            const tabContent = document.getElementById(tabId);
            if (tabContent) {
                tabContent.classList.add('active');
            }
        });
    });
}

// Quantity selectors
function initializeQuantitySelectors() {
    const quantityContainers = document.querySelectorAll('.quantity-selector');
    quantityContainers.forEach(container => {
        const minusBtn = container.querySelector('.quantity-minus');
        const plusBtn = container.querySelector('.quantity-plus');
        const amountDisplay = container.querySelector('.quantity-amount');

        if (!minusBtn || !plusBtn || !amountDisplay) return;

        minusBtn.addEventListener('click', function() {
            let amount = parseInt(amountDisplay.textContent);
            if (amount > 1) {
                amount--;
                amountDisplay.textContent = amount;
            }
        });

        plusBtn.addEventListener('click', function() {
            let amount = parseInt(amountDisplay.textContent);
            amount++;
            amountDisplay.textContent = amount;
        });
    });
}

// Favorite buttons
function initializeFavoriteButtons() {
    const favoriteBtns = document.querySelectorAll('.favorite-btn, .btn-heart');
    favoriteBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('favorited');
            const icon = this.querySelector('i');
            if (this.classList.contains('favorited')) {
                icon.classList.remove('far');
                icon.classList.add('fas', 'favorited');
            } else {
                icon.classList.remove('fas', 'favorited');
                icon.classList.add('far');
            }
        });
    });
}

// Filters functionality
function initializeFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    filterOptions.forEach(option => {
        option.addEventListener('click', function() {
            const input = this.querySelector('input');
            if (input) {
                input.checked = !input.checked;
            }
        });
    });

    // Apply filters button
    const applyBtn = document.querySelector('.btn-primary');
    if (applyBtn && applyBtn.textContent.includes('Apply')) {
        applyBtn.addEventListener('click', function() {
            showNotification('Filters applied!', 'success');
        });
    }
}

// Order tracking functionality
function initializeOrderTracking() {
    const placeOrderBtn = document.querySelector('.btn-place-order');
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', function() {
            if (document.getElementById('terms') && !document.getElementById('terms').checked) {
                showNotification('Please agree to the terms and conditions', 'error');
                return;
            }

            // Simulate order placement
            showNotification('Order placed successfully! Redirecting to tracking page...', 'success');

            // Redirect after delay
            setTimeout(() => {
                window.location.href = 'pages/order-tracking.html';
            }, 2000);
        });
    }
}

// Profile features
function initializeProfileFeatures() {
    const saveBtn = document.querySelector('.btn-primary');
    if (saveBtn && saveBtn.textContent.includes('Save')) {
        saveBtn.addEventListener('click', function() {
            showNotification('Profile updated successfully!', 'success');
        });
    }

    // Navigation in profile page
    const profileNavLinks = document.querySelectorAll('.nav-menu a');
    profileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all links and sections
            profileNavLinks.forEach(l => l.classList.remove('active'));
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            // Show corresponding section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
}

// Utility function to show notification
function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existing = document.querySelectorAll('.notification');
    existing.forEach(note => note.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        z-index: 10000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        animation: slideInRight 0.3s ease;
    `;

    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#4CAF50';
            break;
        case 'error':
            notification.style.backgroundColor = '#F44336';
            break;
        case 'warning':
            notification.style.backgroundColor = '#FF9800';
            break;
        default:
            notification.style.backgroundColor = '#2196F3';
    }

    // Add to page
    document.body.appendChild(notification);

    // Remove after delay
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 3000);

    // Add animation CSS if not present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Add cart icon with count if it doesn't exist
function initializeCartIcon() {
    // This function can be called when needed to add cart icon to header
    const headerActions = document.querySelector('.header-actions');
    if (headerActions) {
        const cartIcon = document.createElement('div');
        cartIcon.classList.add('cart-icon');
        cartIcon.innerHTML = '<i class="fas fa-shopping-cart"></i><span class="cart-count">0</span>';
        headerActions.insertBefore(cartIcon, headerActions.firstChild);
    }
}

// Additional utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}