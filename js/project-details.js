/* ===================================
   SECTION 1: Counter Animations
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Constants
    const ANIMATION_START_DELAY = 500; // Delay before starting counter animations (ms)
    
    // Counter Animation using requestAnimationFrame for smoother performance
    function animateCounter(element, target, duration = 2000) {
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1); // Ensure we don't exceed 1
            const current = progress * target;
            
            // Format the number
            if (target < 10) {
                // For decimal numbers like 1.22
                element.textContent = current.toFixed(2);
            } else {
                // For whole numbers like 141
                element.textContent = Math.floor(current);
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                // Ensure final value is exact
                element.textContent = target < 10 ? target.toFixed(2) : Math.floor(target);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // Initialize counters
    function initCounters() {
        const counters = document.querySelectorAll('.stat-value[data-target]');
        
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            
            // Start animation after a short delay
            setTimeout(() => {
                animateCounter(counter, target);
            }, ANIMATION_START_DELAY);
        });
    }
    
    // Run counter animation
    initCounters();
    
    // Walkthrough button interaction (placeholder)
    const walkthroughBtn = document.querySelector('.walkthrough-btn');
    if (walkthroughBtn) {
        walkthroughBtn.addEventListener('click', function() {
            // Placeholder for walkthrough video/modal
            console.log('Walkthrough clicked');
            // You can add a lightbox or video modal here
        });
    }

    /* ===================================
       SECTION 2: Tab Switching
       =================================== */

    // Tab switching functionality
    function initTabSwitching() {
        const tabs = document.querySelectorAll('.project-tab');
        const images = document.querySelectorAll('.content-image');
        const contentTitle = document.querySelector('.content-title');

        // Tab data
        const tabData = {
            symphony: {
                title: 'SYMPHONY APARTMENT',
                range: '2800 TO 2500'
            },
            sonata: {
                title: 'SONATA APARTMENT',
                range: '2500 TO 1500'
            },
            opera: {
                title: 'OPERA APARTMENT',
                range: '1500 TO 1200'
            },
            aria: {
                title: 'ARIA APARTMENT',
                range: '1100 TO 850'
            }
        };

        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabName = this.getAttribute('data-tab');

                // Remove active class from all tabs
                tabs.forEach(t => t.classList.remove('active'));

                // Add active class to clicked tab
                this.classList.add('active');

                // Hide all images
                images.forEach(img => img.classList.remove('active'));

                // Show corresponding image
                const activeImage = document.querySelector(`.content-image[data-content="${tabName}"]`);
                if (activeImage) {
                    activeImage.classList.add('active');
                }

                // Update content title and range
                if (contentTitle && tabData[tabName]) {
                    contentTitle.textContent = tabData[tabName].title;
                    
                    // Update the range in the text content
                    const contentText = document.querySelector('.content-text');
                    if (contentText) {
                        const currentText = contentText.innerHTML;
                        const updatedText = currentText.replace(
                            /<strong>\d+ TO \d+<\/strong>/,
                            `<strong>${tabData[tabName].range}</strong>`
                        );
                        contentText.innerHTML = updatedText;
                    }
                }
            });
        });
    }

    // Initialize tab switching
    initTabSwitching();

    /* ===================================
       SECTION 3: Amenities Swiper Slider
       =================================== */

    // Wait for DOM and scripts to be fully loaded
    setTimeout(function() {
        // Check if Swiper is available
        if (typeof Swiper !== 'undefined') {
            // Initialize amenities slider with Swiper
            const amenitiesSlider = new Swiper('.amenities-swiper', {
                slidesPerView: 1.2,
                spaceBetween: 20,
                speed: 600,
                loop: true,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: '.amenities-nav-next',
                    prevEl: '.amenities-nav-prev',
                },
                breakpoints: {
                    480: {
                        slidesPerView: 1.5,
                        spaceBetween: 20,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 25,
                    },
                    768: {
                        slidesPerView: 2.5,
                        spaceBetween: 25,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1200: {
                        slidesPerView: 3.5,
                        spaceBetween: 30,
                    },
                    1400: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    }
                }
            });
            console.log('Amenities slider initialized with Swiper');
        } else if (typeof VanillaSlider !== 'undefined') {
            // Fallback to vanilla slider
            const amenitiesSlider = new VanillaSlider('.amenities-swiper', {
                slidesPerView: 4,
                spaceBetween: 30,
                speed: 600,
                loop: true,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: '.amenities-nav-next',
                    prevEl: '.amenities-nav-prev',
                },
                breakpoints: {
                    480: {
                        slidesPerView: 1.5,
                        spaceBetween: 20,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 25,
                    },
                    768: {
                        slidesPerView: 2.5,
                        spaceBetween: 25,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1200: {
                        slidesPerView: 3.5,
                        spaceBetween: 30,
                    }
                }
            });
            console.log('Amenities slider initialized with VanillaSlider');
        } else {
            console.log('No slider library available for amenities slider');
        }
    }, 100);
});
