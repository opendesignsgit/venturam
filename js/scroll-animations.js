// Scroll Trigger Animation for Project Gallery Section
// HERO TAKEOVER ANIMATION:
// 1. Center image SCALES UP to fill the section (hero takeover)
// 2. Outer images DRIFT OUTWARD and EXIT with fade
// 3. Section transitions upward into the next section

(function() {
    'use strict';

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        initScrollAnimations();
    });

    function initScrollAnimations() {
        // Check if GSAP and ScrollTrigger are available
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.warn('GSAP or ScrollTrigger not loaded');
            return;
        }

        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Get elements
        const projectSection = document.querySelector('.project-section');
        const elevatingSection = document.querySelector('.elevating-section');
        const galleryGrid = document.querySelector('.gallery-grid');
        
        if (!projectSection || !elevatingSection || !galleryGrid) {
            console.warn('Required elements not found for scroll animation');
            return;
        }

        // Get the gallery items by their class
        const item1 = document.querySelector('.gallery-item-1'); // Top center
        const item2 = document.querySelector('.gallery-item-2'); // Left
        const item3 = document.querySelector('.gallery-item-3'); // Center (hero image)
        const item4 = document.querySelector('.gallery-item-4'); // Right
        const item5 = document.querySelector('.gallery-item-5'); // Bottom left
        const item6 = document.querySelector('.gallery-item-6'); // Bottom right

        if (!item1 || !item2 || !item3 || !item4 || !item5 || !item6) {
            console.warn('Gallery items not found');
            return;
        }

        // Set up the hero takeover scroll animation
        setupHeroTakeoverAnimation(projectSection, item1, item2, item3, item4, item5, item6);
    }

    function setupHeroTakeoverAnimation(projectSection, item1, item2, item3, item4, item5, item6) {
        // Set initial z-index for center image to be on top
        gsap.set(item3, { 
            zIndex: 10,
            transformOrigin: 'center center' // Set transform origin for proper scaling
        });
        
        // Create a timeline for the scroll animation with pinning
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: projectSection,
                start: 'top top',
                end: '+=150%', // Extended scroll distance for smooth animation
                scrub: 0.8, // Smooth scrubbing
                pin: true, // Pin the section during animation
                anticipatePin: 1,
                invalidateOnRefresh: true
            }
        });

        // ===== CENTER IMAGE: SCALE UP TO FILL (Hero Takeover) =====
        tl.to(item3, {
            scale: 2.5, // Scale up significantly to fill the section
            ease: 'none',
            duration: 1
        }, 0);

        // ===== TOP IMAGE: DRIFT UP AND OUT =====
        tl.to(item1, {
            y: -300, // Move UP (exit upward)
            opacity: 0, // Fade out
            ease: 'none',
            duration: 1
        }, 0);

        // ===== LEFT IMAGE: DRIFT LEFT AND OUT =====
        tl.to(item2, {
            x: -350, // Move LEFT (exit leftward)
            y: -100, // Slight upward drift
            opacity: 0, // Fade out
            ease: 'none',
            duration: 1
        }, 0);

        // ===== RIGHT IMAGE: DRIFT RIGHT AND OUT =====
        tl.to(item4, {
            x: 350, // Move RIGHT (exit rightward)
            y: -100, // Slight upward drift
            opacity: 0, // Fade out
            ease: 'none',
            duration: 1
        }, 0);

        // ===== BOTTOM LEFT IMAGE: DRIFT DOWN-LEFT AND OUT =====
        tl.to(item5, {
            x: -250, // Move LEFT
            y: 200, // Move DOWN (exit downward-left)
            opacity: 0, // Fade out
            ease: 'none',
            duration: 1
        }, 0);

        // ===== BOTTOM RIGHT IMAGE: DRIFT DOWN-RIGHT AND OUT =====
        tl.to(item6, {
            x: 250, // Move RIGHT
            y: 200, // Move DOWN (exit downward-right)
            opacity: 0, // Fade out
            ease: 'none',
            duration: 1
        }, 0);
    }

})();
