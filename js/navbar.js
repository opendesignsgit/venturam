// Navbar scroll and mobile menu functionality
(function() {
    'use strict';
    
    // Get DOM elements
    const navbar = document.querySelector('.navbar');
    const navbarToggle = document.querySelector('.navbar-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu .nav-link');
    
    // Mega menu elements
    const megaMenuTrigger = document.getElementById('medleys-trigger');
    const megaMenu = document.getElementById('mega-menu');
    
    // Secondary offcanvas menu elements
    const secondaryMenuBtn = document.getElementById('secondary-menu-toggle');
    const offcanvasMenu = document.getElementById('offcanvas-menu');
    const offcanvasClose = document.getElementById('offcanvas-close');
    const offcanvasOverlay = document.getElementById('offcanvas-overlay');
    const offcanvasLinks = document.querySelectorAll('.offcanvas-link');
    
    // Exit early if required elements don't exist
    if (!navbar) {
        console.warn('Navbar element not found');
        return;
    }
    
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
        if (!navbarToggle || !mobileMenu) return;
        
        navbarToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        // Prevent body scroll when menu is open
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }
    
    // Close mobile menu
    function closeMobileMenu() {
        if (!navbarToggle || !mobileMenu) return;
        
        navbarToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Mega menu functionality
    function toggleMegaMenu(e) {
        if (!megaMenu || !megaMenuTrigger) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        megaMenuTrigger.classList.toggle('active');
        megaMenu.classList.toggle('active');
    }
    
    function closeMegaMenu() {
        if (!megaMenu || !megaMenuTrigger) return;
        
        megaMenuTrigger.classList.remove('active');
        megaMenu.classList.remove('active');
    }
    
    // Offcanvas menu functionality
    function openOffcanvas() {
        if (!offcanvasMenu || !offcanvasOverlay) return;
        
        offcanvasMenu.classList.add('active');
        offcanvasOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeOffcanvas() {
        if (!offcanvasMenu || !offcanvasOverlay) return;
        
        offcanvasMenu.classList.remove('active');
        offcanvasOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Event listeners
    window.addEventListener('scroll', handleScroll);
    
    if (navbarToggle) {
        navbarToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Close menu when clicking on a menu item
    if (mobileMenuLinks.length > 0) {
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }
    
    // Mega menu event listeners
    if (megaMenuTrigger) {
        megaMenuTrigger.addEventListener('click', toggleMegaMenu);
        
        // Also handle hover for desktop
        megaMenuTrigger.addEventListener('mouseenter', function() {
            if (window.innerWidth > 968) {
                megaMenuTrigger.classList.add('active');
                megaMenu.classList.add('active');
            }
        });
    }
    
    if (megaMenu) {
        // Keep menu open when hovering over it
        megaMenu.addEventListener('mouseenter', function() {
            if (window.innerWidth > 968) {
                megaMenuTrigger.classList.add('active');
                megaMenu.classList.add('active');
            }
        });
        
        megaMenu.addEventListener('mouseleave', function() {
            if (window.innerWidth > 968) {
                closeMegaMenu();
            }
        });
        
        // Close mega menu when clicking on a link inside
        const megaMenuLinks = megaMenu.querySelectorAll('.mega-menu-link');
        megaMenuLinks.forEach(link => {
            link.addEventListener('click', closeMegaMenu);
        });
    }
    
    // Close mega menu when mouse leaves the trigger area (for hover)
    if (megaMenuTrigger) {
        megaMenuTrigger.addEventListener('mouseleave', function(e) {
            if (window.innerWidth > 968) {
                // Small delay to allow moving to mega menu
                setTimeout(() => {
                    if (!megaMenu.matches(':hover') && !megaMenuTrigger.matches(':hover')) {
                        closeMegaMenu();
                    }
                }, 100);
            }
        });
    }
    
    // Close mega menu when clicking outside
    document.addEventListener('click', function(e) {
        if (megaMenu && megaMenuTrigger) {
            if (!megaMenu.contains(e.target) && !megaMenuTrigger.contains(e.target)) {
                closeMegaMenu();
            }
        }
    });
    
    // Secondary offcanvas menu event listeners
    if (secondaryMenuBtn) {
        secondaryMenuBtn.addEventListener('click', openOffcanvas);
    }
    
    if (offcanvasClose) {
        offcanvasClose.addEventListener('click', closeOffcanvas);
    }
    
    if (offcanvasOverlay) {
        offcanvasOverlay.addEventListener('click', closeOffcanvas);
    }
    
    // Close offcanvas when clicking on a link
    if (offcanvasLinks.length > 0) {
        offcanvasLinks.forEach(link => {
            link.addEventListener('click', closeOffcanvas);
        });
    }
    
    // Close offcanvas on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeOffcanvas();
            closeMegaMenu();
        }
    });
    
    // Initial check on page load
    handleScroll();
})();
