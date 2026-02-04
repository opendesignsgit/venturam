/**
 * Venturam Sliders - Swiper.js Configuration
 * Handles all slider functionality with fade animations
 */

document.addEventListener('DOMContentLoaded', function() {
    
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
    
    // Venturam Experience Slider - Horizontal Cards
    const experienceSlider = new Swiper('.experience-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 500,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.experience-next',
            prevEl: '.experience-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                effect: 'slide',
            },
            968: {
                slidesPerView: 3,
                effect: 'slide',
            },
            1200: {
                slidesPerView: 4,
                effect: 'slide',
            }
        }
    });
    
    // Why Clients Choose Us Slider
    const whyChooseSlider = new Swiper('.why-choose-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 500,
        loop: true,
        autoplay: {
            delay: 4500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.why-choose-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.why-choose-next',
            prevEl: '.why-choose-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                effect: 'slide',
            },
            968: {
                slidesPerView: 3,
                effect: 'slide',
            }
        }
    });
    
    // Excellence Awards Slider
    const awardsSlider = new Swiper('.awards-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 500,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.awards-next',
            prevEl: '.awards-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                effect: 'slide',
            },
            968: {
                slidesPerView: 3,
                effect: 'slide',
            },
            1200: {
                slidesPerView: 4,
                effect: 'slide',
            }
        }
    });
    
});
