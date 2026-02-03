/**
 * Scroll Collage Animation
 * Implements scroll-linked animation for masonry grid collapsing into center image
 * Uses vanilla JavaScript with scroll-driven transforms
 */

(function() {
    'use strict';
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollCollage);
    } else {
        initScrollCollage();
    }
    
    function initScrollCollage() {
        const section = document.querySelector('.scroll-collage-section');
        if (!section) return; // Exit if section doesn't exist
        
        const wrapper = document.querySelector('.collage-wrapper');
        const centerImage = document.querySelector('.collage-image-5');
        const surroundingImages = document.querySelectorAll(
            '.collage-image-1, .collage-image-2, .collage-image-3, .collage-image-4, ' +
            '.collage-image-6, .collage-image-7, .collage-image-8, .collage-image-9'
        );
        
        // Check if we're on mobile - disable animation
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            return; // Exit early on mobile - CSS handles static state
        }
        
        // Animation configuration
        const config = {
            // Center image scaling factor (1 = original, 3.5 = fills viewport)
            centerScaleEnd: 3.5,
            
            // Section upward movement (in pixels)
            sectionMoveDistance: 150,
            
            // Outward movement distances for surrounding images
            outwardDistance: {
                1: { x: -300, y: -200 },  // Top-left
                2: { x: -250, y: -200 },  // Top-center-left
                3: { x: 300, y: -250 },   // Top-right
                4: { x: 350, y: -180 },   // Top-far-right
                6: { x: -300, y: 250 },   // Bottom-left
                7: { x: -200, y: 280 },   // Bottom-center-left
                8: { x: 250, y: 250 },    // Bottom-center-right
                9: { x: 350, y: 300 }     // Bottom-right
            }
        };
        
        // Scroll event handler with throttling
        let ticking = false;
        
        function updateAnimation() {
            const rect = section.getBoundingClientRect();
            const sectionHeight = section.offsetHeight;
            const windowHeight = window.innerHeight;
            
            // Calculate scroll progress (0 to 1)
            // Progress starts when section enters viewport and ends when it exits
            const scrollStart = rect.top;
            const scrollRange = sectionHeight - windowHeight;
            let progress = 1 - (scrollStart / scrollRange);
            
            // Clamp progress between 0 and 1
            progress = Math.max(0, Math.min(1, progress));
            
            // Apply easing for smoother animation
            const easedProgress = easeOutCubic(progress);
            
            // Transform center image - scale up
            const centerScale = 1 + (config.centerScaleEnd - 1) * easedProgress;
            centerImage.style.transform = `translate(-50%, -50%) scale(${centerScale})`;
            
            // Transform surrounding images - move outward
            surroundingImages.forEach((img, index) => {
                const imageNumber = parseInt(img.classList[0].split('-')[2]);
                const movement = config.outwardDistance[imageNumber];
                
                if (movement) {
                    const x = movement.x * easedProgress;
                    const y = movement.y * easedProgress;
                    
                    // Also fade out slightly as they move
                    const opacity = 1 - (easedProgress * 0.7);
                    
                    img.style.transform = `translate(${x}px, ${y}px)`;
                    img.style.opacity = opacity;
                }
            });
            
            // Move section upward
            const moveY = -config.sectionMoveDistance * easedProgress;
            wrapper.style.transform = `translateY(${moveY}px)`;
            
            ticking = false;
        }
        
        // Easing function for smooth animation
        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }
        
        // Throttled scroll listener
        function onScroll() {
            if (!ticking) {
                window.requestAnimationFrame(updateAnimation);
                ticking = true;
            }
        }
        
        // Initialize
        window.addEventListener('scroll', onScroll, { passive: true });
        
        // Run once on load to set initial state
        updateAnimation();
        
        // Handle window resize - reinitialize if needed
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                const newIsMobile = window.innerWidth <= 768;
                if (newIsMobile !== isMobile) {
                    // Reload page if switching between mobile/desktop
                    // This ensures proper state
                    window.location.reload();
                } else {
                    updateAnimation();
                }
            }, 250);
        });
    }
})();
