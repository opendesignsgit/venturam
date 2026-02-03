// Navbar scroll and mobile menu functionality
(function() {
    'use strict';
    
    // Get DOM elements
    const navbar = document.querySelector('.navbar');
    const navbarToggle = document.querySelector('.navbar-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu .nav-link');
    
    // Scroll handler for navbar background
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Mobile menu toggle
    function toggleMobileMenu() {
        navbarToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        // Prevent body scroll when menu is open
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }
    
    // Close mobile menu
    function closeMobileMenu() {
        navbarToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Event listeners
    window.addEventListener('scroll', handleScroll);
    
    if (navbarToggle) {
        navbarToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Close menu when clicking on a menu item
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Initial check on page load
    handleScroll();
})();
