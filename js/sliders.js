/**
 * Venturam Sliders - Swiper.js Configuration
 * Handles all slider functionality with fade animations
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // Check if Swiper is available
    if (typeof Swiper === 'undefined') {
        console.log('Swiper not available, vanilla-slider.js will handle sliders');
        return;
    }
    
    // Voices of Partners Slider - Vertical with Fade Effect
    const voicesSlider = new Swiper('.voices-slider', {
        direction: 'vertical',
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 600,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.voices-next',
            prevEl: '.voices-prev',
        }
    });
    
    // ============================================
    // NEW Venturam Experience Slider - Full Width with Fade
    // ============================================
    const experienceSliderNew = new Swiper('.experience-slider-new', {
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 800,
        loop: true,
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.experience-next-new',
            prevEl: '.experience-prev-new',
        }
    });
    
    // ============================================
    // NEW Why Clients Choose Us - Synced Sliders
    // ============================================
    const whyChooseTextSlider = new Swiper('.why-choose-text-slider', {
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 600,
        loop: true,
        allowTouchMove: false,
    });
    
    const whyChooseImageSlider = new Swiper('.why-choose-slider-new', {
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 600,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.why-choose-next-new',
            prevEl: '.why-choose-prev-new',
        },
        on: {
            slideChange: function() {
                // Sync text slider with image slider
                whyChooseTextSlider.slideTo(this.realIndex);
                // Update counter
                updateWhyChooseCounter(this.realIndex + 1);
            }
        }
    });
    
    // Update counter function
    function updateWhyChooseCounter(current) {
        const counterEl = document.querySelector('.counter-current');
        if (counterEl) {
            counterEl.textContent = current.toString().padStart(2, '0');
        }
    }
    
    // ============================================
    // NEW Excellence Awards Slider
    // ============================================
    const awardsSliderNew = new Swiper('.awards-slider-new', {
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 600,
        loop: true,
        autoplay: {
            delay: 4500,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.awards-next-new',
            prevEl: '.awards-prev-new',
        },
        breakpoints: {
            640: {
                slidesPerView: 1.5,
                spaceBetween: 25,
            },
            968: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1200: {
                slidesPerView: 2.3,
                spaceBetween: 35,
            }
        }
    });
    
});
