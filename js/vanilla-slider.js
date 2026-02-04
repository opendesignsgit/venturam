/**
 * Vanilla Slider - Simple slider implementation without external dependencies
 * Fallback for when Swiper.js cannot be loaded
 */

(function() {
    'use strict';

    // Simple Slider Class
    class VanillaSlider {
        constructor(container, options = {}) {
            this.container = typeof container === 'string' ? document.querySelector(container) : container;
            if (!this.container) return;
            
            this.wrapper = this.container.querySelector('.swiper-wrapper');
            if (!this.wrapper) return;
            
            this.slides = Array.from(this.wrapper.querySelectorAll('.swiper-slide'));
            this.currentIndex = 0;
            this.totalSlides = this.slides.length;
            
            this.options = {
                effect: options.effect || 'fade',
                speed: options.speed || 600,
                loop: options.loop !== false,
                autoplay: options.autoplay || false,
                slidesPerView: options.slidesPerView || 1,
                spaceBetween: options.spaceBetween || 0,
                navigation: options.navigation || {},
                onSlideChange: options.onSlideChange || null,
                ...options
            };
            
            this.init();
        }
        
        init() {
            this.setupSlides();
            this.setupNavigation();
            if (this.options.autoplay) {
                this.startAutoplay();
            }
        }
        
        setupSlides() {
            const isFade = this.options.effect === 'fade';
            
            this.slides.forEach((slide, index) => {
                if (isFade) {
                    slide.style.position = index === 0 ? 'relative' : 'absolute';
                    slide.style.top = '0';
                    slide.style.left = '0';
                    slide.style.width = '100%';
                    slide.style.opacity = index === 0 ? '1' : '0';
                    slide.style.transition = `opacity ${this.options.speed}ms ease`;
                    slide.style.zIndex = index === 0 ? '1' : '0';
                }
            });
            
            if (isFade) {
                this.wrapper.style.position = 'relative';
            }
            
            this.container.style.overflow = 'hidden';
        }
        
        setupNavigation() {
            const { nextEl, prevEl } = this.options.navigation;
            
            if (nextEl) {
                const nextBtns = document.querySelectorAll(nextEl);
                nextBtns.forEach(btn => {
                    btn.addEventListener('click', () => this.next());
                });
            }
            
            if (prevEl) {
                const prevBtns = document.querySelectorAll(prevEl);
                prevBtns.forEach(btn => {
                    btn.addEventListener('click', () => this.prev());
                });
            }
        }
        
        goTo(index) {
            const isFade = this.options.effect === 'fade';
            const prevIndex = this.currentIndex;
            
            // Handle loop
            if (this.options.loop) {
                if (index < 0) index = this.totalSlides - 1;
                if (index >= this.totalSlides) index = 0;
            } else {
                if (index < 0 || index >= this.totalSlides) return;
            }
            
            this.currentIndex = index;
            
            if (isFade) {
                this.slides.forEach((slide, i) => {
                    slide.style.opacity = i === index ? '1' : '0';
                    slide.style.zIndex = i === index ? '1' : '0';
                    slide.style.position = i === index ? 'relative' : 'absolute';
                });
            } else {
                // Slide effect
                const slideWidth = this.slides[0].offsetWidth + this.options.spaceBetween;
                this.wrapper.style.transform = `translateX(-${index * slideWidth}px)`;
                this.wrapper.style.transition = `transform ${this.options.speed}ms ease`;
            }
            
            // Callback
            if (this.options.onSlideChange) {
                this.options.onSlideChange(this.currentIndex, prevIndex);
            }
        }
        
        next() {
            this.goTo(this.currentIndex + 1);
        }
        
        prev() {
            this.goTo(this.currentIndex - 1);
        }
        
        slideTo(index) {
            this.goTo(index);
        }
        
        get realIndex() {
            return this.currentIndex;
        }
        
        startAutoplay() {
            const delay = typeof this.options.autoplay === 'object' 
                ? this.options.autoplay.delay 
                : 5000;
            
            this.autoplayInterval = setInterval(() => {
                this.next();
            }, delay);
        }
        
        stopAutoplay() {
            if (this.autoplayInterval) {
                clearInterval(this.autoplayInterval);
            }
        }
    }
    
    // Initialize sliders when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        // Check if Swiper is already available
        if (typeof Swiper !== 'undefined') {
            console.log('Swiper.js is available, using it instead of vanilla slider');
            return;
        }
        
        console.log('Using Vanilla Slider fallback');
        
        // Voices of Partners Slider
        new VanillaSlider('.voices-slider', {
            effect: 'fade',
            speed: 600,
            loop: true,
            autoplay: { delay: 5000 },
            navigation: {
                nextEl: '.voices-next',
                prevEl: '.voices-prev'
            }
        });
        
        // Venturam Experience Slider
        new VanillaSlider('.experience-slider-new', {
            effect: 'fade',
            speed: 800,
            loop: true,
            autoplay: { delay: 6000 },
            navigation: {
                nextEl: '.experience-next-new',
                prevEl: '.experience-prev-new'
            }
        });
        
        // Why Clients Choose Us - Text Slider
        const whyTextSlider = new VanillaSlider('.why-choose-text-slider', {
            effect: 'fade',
            speed: 600,
            loop: true
        });
        
        // Why Clients Choose Us - Image Slider
        new VanillaSlider('.why-choose-slider-new', {
            effect: 'fade',
            speed: 600,
            loop: true,
            autoplay: { delay: 5000 },
            navigation: {
                nextEl: '.why-choose-next-new',
                prevEl: '.why-choose-prev-new'
            },
            onSlideChange: function(current, prev) {
                // Sync text slider - handle loop mode consistently
                if (whyTextSlider) {
                    whyTextSlider.goTo(current);
                }
                // Update counter
                const counterEl = document.querySelector('.counter-current');
                if (counterEl) {
                    counterEl.textContent = (current + 1).toString().padStart(2, '0');
                }
            }
        });
        
        // Excellence Awards Slider
        new VanillaSlider('.awards-slider-new', {
            effect: 'slide',
            speed: 600,
            loop: true,
            autoplay: { delay: 4500 },
            navigation: {
                nextEl: '.awards-next-new',
                prevEl: '.awards-prev-new'
            }
        });
    });
    
    // Expose VanillaSlider globally
    window.VanillaSlider = VanillaSlider;
    
})();
