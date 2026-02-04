/**
 * Scroll Animation for #medleys section
 * Vanilla JavaScript implementation (no external dependencies)
 * 
 * Animation: .elevating-background scales from initial state to fill viewport
 * Trigger: #medleys section scroll progress
 * Behavior: scrubbed to scroll (scroll down progresses, scroll up reverses)
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        initialScale: 0.6,
        finalScale: 1,
        mobileBreakpoint: 768
    };

    /**
     * Linear interpolation
     */
    function lerp(start, end, progress) {
        return start + (end - start) * progress;
    }

    /**
     * Clamp value between min and max
     */
    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    /**
     * Calculate scroll progress of an element
     * Returns 0 when top of element reaches top of viewport
     * Returns 1 when bottom of element reaches top of viewport
     */
    function getScrollProgress(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementHeight = rect.height;
        
        // Start: element top at viewport top (progress = 0)
        // End: element bottom at viewport top (progress = 1)
        const scrollStart = 0;
        const scrollEnd = elementHeight;
        const currentScroll = -rect.top;
        
        const progress = (currentScroll - scrollStart) / (scrollEnd - scrollStart);
        return clamp(progress, 0, 1);
    }

    /**
     * Apply transform to element
     */
    function applyTransform(element, scale) {
        element.style.transform = `scale(${scale})`;
    }

    /**
     * Main scroll animation controller
     */
    function ScrollAnimation() {
        this.section = document.querySelector('#medleys');
        this.background = document.querySelector('.elevating-background');
        this.isActive = false;
        this.rafId = null;
        
        if (!this.section || !this.background) {
            console.warn('Required elements not found for scroll animation');
            return;
        }

        this.init();
    }

    ScrollAnimation.prototype.init = function() {
        // Check if mobile
        if (window.innerWidth <= CONFIG.mobileBreakpoint) {
            // Mobile: Show final state (fully scaled)
            applyTransform(this.background, CONFIG.finalScale);
            return;
        }

        // Set initial state
        applyTransform(this.background, CONFIG.initialScale);
        this.background.style.transformOrigin = 'center center';

        // Bind methods
        this.onScroll = this.onScroll.bind(this);
        this.onResize = this.onResize.bind(this);

        // Add event listeners
        window.addEventListener('scroll', this.onScroll, { passive: true });
        window.addEventListener('resize', this.onResize, { passive: true });

        // Initial update
        this.update();
        this.isActive = true;
    };

    ScrollAnimation.prototype.onScroll = function() {
        if (!this.rafId) {
            this.rafId = requestAnimationFrame(() => {
                this.update();
                this.rafId = null;
            });
        }
    };

    ScrollAnimation.prototype.update = function() {
        if (!this.isActive) return;

        const progress = getScrollProgress(this.section);
        const scale = lerp(CONFIG.initialScale, CONFIG.finalScale, progress);
        
        applyTransform(this.background, scale);
    };

    ScrollAnimation.prototype.onResize = function() {
        const isMobile = window.innerWidth <= CONFIG.mobileBreakpoint;
        
        if (isMobile && this.isActive) {
            // Switch to mobile: show final state
            this.destroy();
            applyTransform(this.background, CONFIG.finalScale);
        } else if (!isMobile && !this.isActive) {
            // Switch to desktop: reinitialize
            this.init();
        }
    };

    ScrollAnimation.prototype.destroy = function() {
        this.isActive = false;
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }
        window.removeEventListener('scroll', this.onScroll);
        window.removeEventListener('resize', this.onResize);
    };

    // Initialize when DOM is ready
    function initScrollAnimation() {
        new ScrollAnimation();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollAnimation);
    } else {
        initScrollAnimation();
    }
})();
