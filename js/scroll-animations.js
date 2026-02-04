// Scroll Trigger Animation for Project Gallery Section
// This creates a smooth scroll-triggered animation where:
// 1. Gallery images converge/move closer together as user scrolls
// 2. The elevating section overlaps and covers the project section

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
        const item3 = document.querySelector('.gallery-item-3'); // Center (main building)
        const item4 = document.querySelector('.gallery-item-4'); // Right
        const item5 = document.querySelector('.gallery-item-5'); // Bottom left
        const item6 = document.querySelector('.gallery-item-6'); // Bottom right

        if (!item1 || !item2 || !item3 || !item4 || !item5 || !item6) {
            console.warn('Gallery items not found');
            return;
        }

        // Create wrapper for scroll animation
        createScrollWrapper(projectSection, elevatingSection);
        
        // Set up the scroll animation
        setupGalleryAnimation(projectSection, item1, item2, item3, item4, item5, item6);
    }

    function createScrollWrapper(projectSection, elevatingSection) {
        // Create a wrapper div for the scroll animation
        const wrapper = document.createElement('div');
        wrapper.className = 'scroll-animation-wrapper';
        
        // Insert wrapper before project section
        projectSection.parentNode.insertBefore(wrapper, projectSection);
        
        // Move both sections into the wrapper
        wrapper.appendChild(projectSection);
        wrapper.appendChild(elevatingSection);
        
        // Style the wrapper
        gsap.set(wrapper, {
            position: 'relative',
            overflow: 'hidden'
        });
        
        // Style the elevating section for overlap effect
        gsap.set(elevatingSection, {
            position: 'relative',
            zIndex: 20
        });
    }

    function setupGalleryAnimation(projectSection, item1, item2, item3, item4, item5, item6) {
        // Create a timeline for the scroll animation with pinning
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: projectSection,
                start: 'top top',
                end: '+=100%', // Animation extends 100% of the trigger element's height
                scrub: 0.5, // Smooth scrubbing (lower = more responsive)
                pin: true, // Pin the section during animation
                anticipatePin: 1,
                invalidateOnRefresh: true
            }
        });

        // Animation - Images converge toward center
        // Top image moves down toward center
        tl.to(item1, {
            y: 100,
            ease: 'none',
            duration: 1
        }, 0);

        // Left image moves right and slightly down
        tl.to(item2, {
            x: 130,
            y: 60,
            ease: 'none',
            duration: 1
        }, 0);

        // Center image scales up slightly
        tl.to(item3, {
            scale: 1.08,
            ease: 'none',
            duration: 1
        }, 0);

        // Right image moves left and slightly down
        tl.to(item4, {
            x: -130,
            y: 60,
            ease: 'none',
            duration: 1
        }, 0);

        // Bottom left moves right and up toward center
        tl.to(item5, {
            x: 100,
            y: -60,
            ease: 'none',
            duration: 1
        }, 0);

        // Bottom right moves left and up toward center
        tl.to(item6, {
            x: -100,
            y: -60,
            ease: 'none',
            duration: 1
        }, 0);
    }

})();
