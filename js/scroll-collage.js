/**
 * Scroll Collage Animation
 * Implements scroll-driven overlapping image animation using GSAP ScrollTrigger
 */

// Wait for DOM and GSAP to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Check if GSAP and ScrollTrigger are loaded
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.error('GSAP or ScrollTrigger not loaded');
        return;
    }
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize scroll animation
    initScrollCollageAnimation();
});

function initScrollCollageAnimation() {
    // Get the section element
    const section = document.querySelector('.scroll-collage-section');
    if (!section) {
        console.warn('Scroll collage section not found');
        return;
    }
    
    // Create a timeline for the animation
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true, // Smooth scrubbing, takes 1 second to "catch up" to the scrollbar
            markers: false, // Set to true for debugging
            pin: false // We're using CSS sticky instead
        }
    });
    
    // Define the overlap target positions
    // These values create the overlapping effect shown in scroll-section-to-overlap.png
    
    // Images move inward and overlap at the center
    // Left side images move right
    tl.to('.collage-image-2', {
        x: '+=200',
        y: '+=50',
        duration: 1
    }, 0);
    
    tl.to('.collage-image-5', {
        x: '+=250',
        y: '-=50',
        duration: 1
    }, 0);
    
    tl.to('.collage-image-6', {
        x: '+=150',
        y: '-=30',
        duration: 1
    }, 0);
    
    // Right side images move left
    tl.to('.collage-image-4', {
        x: '-=200',
        y: '+=50',
        duration: 1
    }, 0);
    
    tl.to('.collage-image-8', {
        x: '-=250',
        y: '-=50',
        duration: 1
    }, 0);
    
    tl.to('.collage-image-7', {
        x: '-=150',
        y: '-=30',
        duration: 1
    }, 0);
    
    // Center images scale and adjust slightly
    tl.to('.collage-image-1', {
        scale: 1.1,
        y: '+=20',
        duration: 1
    }, 0);
    
    tl.to('.collage-image-3', {
        scale: 1.15,
        duration: 1
    }, 0);
    
    // Add z-index animations to create proper overlap
    // Center images should be on top when overlapped
    tl.to('.collage-image-3', {
        zIndex: 10,
        duration: 0.5
    }, 0);
    
    // Tablet and mobile adjustments
    if (window.innerWidth <= 1024) {
        // Adjust animation values for smaller screens
        ScrollTrigger.refresh();
    }
}

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        ScrollTrigger.refresh();
    }, 250);
});

// Ensure ScrollTrigger updates on page load
window.addEventListener('load', function() {
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
});
