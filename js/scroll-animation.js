/**
 * Scroll Collage Animation
 * Reusable, position-agnostic scroll-triggered animation using GSAP + ScrollTrigger
 * 
 * BEHAVIOR:
 * - Scrubbed to scroll (no autoplay, no looping)
 * - Scroll down progresses animation
 * - Scroll up reverses animation
 * - Scroll stop freezes animation
 * 
 * CENTER IMAGE:
 * - Scales toward viewport center
 * - Ends filling the section
 * - No rotation or opacity change
 * 
 * OTHER IMAGES:
 * - Translate outward
 * - Do not scale
 * - Never overlap center image
 */

(function() {
    'use strict';

    // Wait for GSAP and ScrollTrigger to be available
    function initScrollCollage() {
        // Check if GSAP and ScrollTrigger are available
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.warn('GSAP or ScrollTrigger not loaded. Scroll animation disabled.');
            return;
        }

        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Get elements
        const scrollSection = document.getElementById('scroll-collage');
        if (!scrollSection) {
            console.warn('Scroll collage section not found.');
            return;
        }

        const centerImage = scrollSection.querySelector('.collage-item-3');
        const topImage = scrollSection.querySelector('.collage-item-1');
        const leftImage = scrollSection.querySelector('.collage-item-2');
        const rightImage = scrollSection.querySelector('.collage-item-4');
        const bottomLeftImage = scrollSection.querySelector('.collage-item-5');
        const bottomRightImage = scrollSection.querySelector('.collage-item-6');

        if (!centerImage) {
            console.warn('Center image not found.');
            return;
        }

        // Calculate scale factor needed for center image to fill viewport
        function getScaleFactor() {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const imageRect = centerImage.getBoundingClientRect();
            
            // Calculate scale needed to cover viewport
            const scaleX = (viewportWidth * 1.1) / imageRect.width;
            const scaleY = (viewportHeight * 1.1) / imageRect.height;
            
            // Use the larger scale to ensure full coverage
            return Math.max(scaleX, scaleY);
        }

        // Get translation distances for outer images
        function getTranslationDistances() {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            
            return {
                top: -viewportHeight * 0.8,      // Move up and out
                left: -viewportWidth * 0.6,      // Move left and out
                right: viewportWidth * 0.6,      // Move right and out
                bottomLeft: {
                    x: -viewportWidth * 0.5,
                    y: viewportHeight * 0.5
                },
                bottomRight: {
                    x: viewportWidth * 0.5,
                    y: viewportHeight * 0.5
                }
            };
        }

        // Create the main timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#scroll-collage',
                start: 'top top',           // Animation starts when section top hits viewport top
                end: 'bottom top',          // Animation ends when section bottom hits viewport top
                scrub: true,                // Scrubbed to scroll
                pin: false,                 // No pinning - sticky CSS handles this
                anticipatePin: 0
            }
        });

        // Calculate initial values
        let scaleFactor = getScaleFactor();
        let distances = getTranslationDistances();

        // Center image: Scale up to fill viewport
        // The center image starts at its initial position and scales up
        tl.to(centerImage, {
            scale: scaleFactor,
            ease: 'none',
            duration: 1
        }, 0);

        // Top image: Translate up and fade out
        if (topImage) {
            tl.to(topImage, {
                y: distances.top,
                opacity: 0,
                ease: 'none',
                duration: 1
            }, 0);
        }

        // Left image: Translate left and fade out
        if (leftImage) {
            tl.to(leftImage, {
                x: distances.left,
                opacity: 0,
                ease: 'none',
                duration: 1
            }, 0);
        }

        // Right image: Translate right and fade out
        if (rightImage) {
            tl.to(rightImage, {
                x: distances.right,
                opacity: 0,
                ease: 'none',
                duration: 1
            }, 0);
        }

        // Bottom left image: Translate down-left and fade out
        if (bottomLeftImage) {
            tl.to(bottomLeftImage, {
                x: distances.bottomLeft.x,
                y: distances.bottomLeft.y,
                opacity: 0,
                ease: 'none',
                duration: 1
            }, 0);
        }

        // Bottom right image: Translate down-right and fade out
        if (bottomRightImage) {
            tl.to(bottomRightImage, {
                x: distances.bottomRight.x,
                y: distances.bottomRight.y,
                opacity: 0,
                ease: 'none',
                duration: 1
            }, 0);
        }

        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                // Recalculate values
                scaleFactor = getScaleFactor();
                distances = getTranslationDistances();
                
                // Update timeline end values (GSAP will recalculate)
                ScrollTrigger.refresh();
            }, 250);
        });

        // Refresh ScrollTrigger after all images load
        window.addEventListener('load', function() {
            ScrollTrigger.refresh();
        });

        console.log('Scroll collage animation initialized');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollCollage);
    } else {
        initScrollCollage();
    }
})();
