/**
 * Scroll Collage Animation
 * Vanilla JavaScript scroll-triggered animation (GSAP fallback)
 * 
 * Behavior:
 * - Animation is scrubbed to scroll (not autoplay)
 * - Center image scales to fill the viewport
 * - Other images translate outward and exit
 * - Scroll down progresses animation
 * - Scroll up reverses animation
 * - Scroll stop freezes animation
 */

(function() {
    'use strict';

    function initScrollCollage() {
        // Get section elements
        var section = document.querySelector('#scroll-collage');
        var stickyContainer = document.querySelector('.scroll-collage-sticky');
        var grid = document.querySelector('.scroll-collage-grid');
        
        if (!section || !stickyContainer || !grid) {
            console.warn('Scroll collage elements not found.');
            return;
        }

        // Get all image items
        var centerImage = document.querySelector('.scroll-item-center');
        var topImage = document.querySelector('.scroll-item-top');
        var leftImage = document.querySelector('.scroll-item-left');
        var rightImage = document.querySelector('.scroll-item-right');
        var bottomLeftImage = document.querySelector('.scroll-item-bottom-left');
        var bottomRightImage = document.querySelector('.scroll-item-bottom-right');

        if (!centerImage) {
            console.warn('Center image not found.');
            return;
        }

        // Check if GSAP and ScrollTrigger are available
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            initWithGSAP(section, stickyContainer, centerImage, topImage, leftImage, rightImage, bottomLeftImage, bottomRightImage);
        } else {
            // Fallback to vanilla JS implementation
            initVanillaScroll(section, stickyContainer, centerImage, topImage, leftImage, rightImage, bottomLeftImage, bottomRightImage);
        }
    }

    // GSAP Implementation
    function initWithGSAP(section, stickyContainer, centerImage, topImage, leftImage, rightImage, bottomLeftImage, bottomRightImage) {
        gsap.registerPlugin(ScrollTrigger);

        function getScaleFactor() {
            var viewportWidth = window.innerWidth;
            var viewportHeight = window.innerHeight;
            var centerWidth = centerImage.offsetWidth;
            var centerHeight = centerImage.offsetHeight;
            var scaleX = (viewportWidth * 1.2) / centerWidth;
            var scaleY = (viewportHeight * 1.2) / centerHeight;
            return Math.max(scaleX, scaleY);
        }

        function getExitDistances() {
            var viewportWidth = window.innerWidth;
            var viewportHeight = window.innerHeight;
            return {
                top: -viewportHeight * 0.8,
                left: -viewportWidth * 0.6,
                right: viewportWidth * 0.6,
                bottomLeft: { x: -viewportWidth * 0.5, y: viewportHeight * 0.6 },
                bottomRight: { x: viewportWidth * 0.5, y: viewportHeight * 0.6 }
            };
        }

        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
                invalidateOnRefresh: true
            }
        });

        var scaleFactor = getScaleFactor();
        var exits = getExitDistances();

        tl.to(centerImage, { scale: scaleFactor, duration: 1, ease: 'none' }, 0);
        if (topImage) tl.to(topImage, { y: exits.top, opacity: 0, duration: 0.7, ease: 'none' }, 0);
        if (leftImage) tl.to(leftImage, { x: exits.left, opacity: 0, duration: 0.8, ease: 'none' }, 0);
        if (rightImage) tl.to(rightImage, { x: exits.right, opacity: 0, duration: 0.8, ease: 'none' }, 0);
        if (bottomLeftImage) tl.to(bottomLeftImage, { x: exits.bottomLeft.x, y: exits.bottomLeft.y, opacity: 0, duration: 0.75, ease: 'none' }, 0);
        if (bottomRightImage) tl.to(bottomRightImage, { x: exits.bottomRight.x, y: exits.bottomRight.y, opacity: 0, duration: 0.75, ease: 'none' }, 0);
        tl.to(stickyContainer, { y: '-10vh', duration: 0.3, ease: 'none' }, 0.7);

        var resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() { ScrollTrigger.refresh(); }, 250);
        });
    }

    // Vanilla JavaScript Implementation (fallback)
    function initVanillaScroll(section, stickyContainer, centerImage, topImage, leftImage, rightImage, bottomLeftImage, bottomRightImage) {
        
        // Store initial positions and calculate animation values
        var animationState = {
            scaleFactor: 1,
            exitDistances: {}
        };

        function calculateAnimationValues() {
            var viewportWidth = window.innerWidth;
            var viewportHeight = window.innerHeight;
            var centerWidth = centerImage.offsetWidth;
            var centerHeight = centerImage.offsetHeight;
            
            // Scale factor for center image to fill viewport
            var scaleX = (viewportWidth * 1.2) / centerWidth;
            var scaleY = (viewportHeight * 1.2) / centerHeight;
            animationState.scaleFactor = Math.max(scaleX, scaleY);
            
            // Exit distances for outer images
            animationState.exitDistances = {
                top: -viewportHeight * 0.8,
                left: -viewportWidth * 0.6,
                right: viewportWidth * 0.6,
                bottomLeftX: -viewportWidth * 0.5,
                bottomLeftY: viewportHeight * 0.6,
                bottomRightX: viewportWidth * 0.5,
                bottomRightY: viewportHeight * 0.6
            };
        }

        // Calculate scroll progress within the section
        function getScrollProgress() {
            var rect = section.getBoundingClientRect();
            var sectionHeight = section.offsetHeight;
            var viewportHeight = window.innerHeight;
            
            // Section starts when top hits viewport top
            // Section ends when bottom hits viewport bottom
            var scrollableDistance = sectionHeight - viewportHeight;
            
            if (scrollableDistance <= 0) return 0;
            
            // Calculate progress (0 to 1)
            var scrolled = -rect.top;
            var progress = scrolled / scrollableDistance;
            
            return Math.max(0, Math.min(1, progress));
        }

        // Apply transforms based on scroll progress
        function applyTransforms(progress) {
            var exits = animationState.exitDistances;
            var maxScale = animationState.scaleFactor;
            
            // Center image: scale from 1 to maxScale
            var scale = 1 + (maxScale - 1) * progress;
            centerImage.style.transform = 'translateX(-50%) scale(' + scale + ')';
            
            // Top image: move up and fade
            if (topImage) {
                var topY = exits.top * Math.min(progress * 1.4, 1);
                var topOpacity = 1 - Math.min(progress * 1.4, 1);
                topImage.style.transform = 'translateX(-50%) translateY(' + topY + 'px)';
                topImage.style.opacity = topOpacity;
            }
            
            // Left image: move left and fade
            if (leftImage) {
                var leftX = exits.left * Math.min(progress * 1.25, 1);
                var leftOpacity = 1 - Math.min(progress * 1.25, 1);
                leftImage.style.transform = 'translateX(' + leftX + 'px)';
                leftImage.style.opacity = leftOpacity;
            }
            
            // Right image: move right and fade
            if (rightImage) {
                var rightX = exits.right * Math.min(progress * 1.25, 1);
                var rightOpacity = 1 - Math.min(progress * 1.25, 1);
                rightImage.style.transform = 'translateX(' + rightX + 'px)';
                rightImage.style.opacity = rightOpacity;
            }
            
            // Bottom-left image: move down-left and fade
            if (bottomLeftImage) {
                var blX = exits.bottomLeftX * Math.min(progress * 1.33, 1);
                var blY = exits.bottomLeftY * Math.min(progress * 1.33, 1);
                var blOpacity = 1 - Math.min(progress * 1.33, 1);
                bottomLeftImage.style.transform = 'translateX(calc(-100% - 10px + ' + blX + 'px)) translateY(' + blY + 'px)';
                bottomLeftImage.style.opacity = blOpacity;
            }
            
            // Bottom-right image: move down-right and fade
            if (bottomRightImage) {
                var brX = exits.bottomRightX * Math.min(progress * 1.33, 1);
                var brY = exits.bottomRightY * Math.min(progress * 1.33, 1);
                var brOpacity = 1 - Math.min(progress * 1.33, 1);
                bottomRightImage.style.transform = 'translateX(calc(10px + ' + brX + 'px)) translateY(' + brY + 'px)';
                bottomRightImage.style.opacity = brOpacity;
            }
            
            // Sticky container: shift upward at end of animation
            if (progress > 0.7) {
                var containerProgress = (progress - 0.7) / 0.3;
                var containerY = -10 * containerProgress; // -10vh
                stickyContainer.style.transform = 'translateY(' + containerY + 'vh)';
            } else {
                stickyContainer.style.transform = 'translateY(0)';
            }
        }

        // Scroll handler with requestAnimationFrame for performance
        var ticking = false;
        function onScroll() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    var progress = getScrollProgress();
                    applyTransforms(progress);
                    ticking = false;
                });
                ticking = true;
            }
        }

        // Resize handler
        var resizeTimeout;
        function onResize() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                calculateAnimationValues();
                var progress = getScrollProgress();
                applyTransforms(progress);
            }, 250);
        }

        // Initialize
        calculateAnimationValues();
        
        // Add scroll listener
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize, { passive: true });
        
        // Initial state
        applyTransforms(getScrollProgress());
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollCollage);
    } else {
        initScrollCollage();
    }
})();
