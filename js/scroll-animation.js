/**
 * Scroll Collage Animation
 * Uses GSAP + ScrollTrigger for scroll-driven animation
 * - Center image scales to fill section
 * - Other images translate outward
 * - scrub: true for scroll-bound animation
 * - Reusable: Works with class .scroll-collage-section
 */

document.addEventListener('DOMContentLoaded', function() {
    // Ensure GSAP is loaded
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded. Scroll animation disabled.');
        return;
    }
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize all scroll collage sections (supports multiple instances)
    const scrollSections = document.querySelectorAll('.scroll-collage-section');
    
    scrollSections.forEach(function(scrollSection) {
        initScrollCollage(scrollSection);
    });
    
    // Refresh ScrollTrigger after all animations are set up
    // This ensures proper calculation regardless of section position
    ScrollTrigger.refresh();
    
    /**
     * Initialize scroll animation for a single collage section
     * @param {HTMLElement} scrollSection - The scroll collage section element
     */
    function initScrollCollage(scrollSection) {
        const stickyContainer = scrollSection.querySelector('.scroll-collage-sticky');
        const centerImage = scrollSection.querySelector('.collage-center');
        const topImage = scrollSection.querySelector('.collage-top');
        const leftImage = scrollSection.querySelector('.collage-left');
        const rightImage = scrollSection.querySelector('.collage-right');
        const bottomLeftImage = scrollSection.querySelector('.collage-bottom-left');
        const bottomRightImage = scrollSection.querySelector('.collage-bottom-right');
        const headerContent = scrollSection.querySelector('.scroll-collage-header');
        const elevatingContent = scrollSection.querySelector('.scroll-collage-elevating');
        
        // Skip if required elements are missing
        if (!stickyContainer || !centerImage) {
            console.warn('Scroll collage section missing required elements');
            return;
        }
        
        // Create the main timeline with ScrollTrigger
        // invalidateOnRefresh: true ensures animation recalculates when position changes
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: scrollSection,
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
                pin: stickyContainer,
                anticipatePin: 1,
                invalidateOnRefresh: true  // Recalculate on refresh/resize
            }
        });
        
        // Fade out header content
        if (headerContent) {
            tl.to(headerContent, {
                opacity: 0,
                yPercent: -20,
                duration: 0.3
            }, 0);
        }
        
        // Center image scales to fill the section
        tl.to(centerImage, {
            scale: 2.5,
            duration: 1
        }, 0);
        
        // Top image moves up and out (using percentage for relative movement)
        if (topImage) {
            tl.to(topImage, {
                yPercent: -150,
                opacity: 0,
                duration: 1
            }, 0);
        }
        
        // Left image moves left and out
        if (leftImage) {
            tl.to(leftImage, {
                xPercent: -150,
                opacity: 0,
                duration: 1
            }, 0);
        }
        
        // Right image moves right and out
        if (rightImage) {
            tl.to(rightImage, {
                xPercent: 150,
                opacity: 0,
                duration: 1
            }, 0);
        }
        
        // Bottom left image moves down-left and out
        if (bottomLeftImage) {
            tl.to(bottomLeftImage, {
                xPercent: -100,
                yPercent: 150,
                opacity: 0,
                duration: 1
            }, 0);
        }
        
        // Bottom right image moves down-right and out
        if (bottomRightImage) {
            tl.to(bottomRightImage, {
                xPercent: 100,
                yPercent: 150,
                opacity: 0,
                duration: 1
            }, 0);
        }
        
        // Fade in elevating content in the second half of the animation
        if (elevatingContent) {
            tl.to(elevatingContent, {
                opacity: 1,
                duration: 0.5
            }, 0.5);
        }
    }
});
