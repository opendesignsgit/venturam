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
       SECTION 3: Amenities Masonry Grid Slider
       =================================== */

    // Initialize amenities slider
    setTimeout(function() {
        // Check if Swiper is available
        if (typeof Swiper !== 'undefined') {
            // Initialize amenities masonry grid slider with Swiper
            const amenitiesSlider = new Swiper('.amenities-swiper', {
                slidesPerView: 1,
                spaceBetween: 0,
                speed: 800,
                effect: 'fade',
                fadeEffect: {
                    crossFade: true
                },
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: '.amenities-nav-next',
                    prevEl: '.amenities-nav-prev',
                }
            });
            console.log('Amenities masonry grid slider initialized with Swiper');
        } else if (typeof VanillaSlider !== 'undefined') {
            // Fallback to vanilla slider
            const amenitiesSlider = new VanillaSlider('.amenities-swiper', {
                slidesPerView: 1,
                spaceBetween: 0,
                speed: 800,
                effect: 'fade',
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: '.amenities-nav-next',
                    prevEl: '.amenities-nav-prev',
                }
            });
            console.log('Amenities masonry grid slider initialized with VanillaSlider');
        } else {
            console.log('No slider library available for amenities slider');
        }
    }, 100);

    /* ===================================
       SECTION 4: Location Highlights Tab Switching
       =================================== */

    function initLocationTabs() {
        const locationTabs = document.querySelectorAll('.location-tab');
        const locationMarkers = document.querySelectorAll('.location-markers');

        locationTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabName = this.getAttribute('data-tab');

                // Remove active class from all tabs
                locationTabs.forEach(t => t.classList.remove('active'));

                // Add active class to clicked tab
                this.classList.add('active');

                // Note: In a full implementation, you would show/hide different markers
                // based on the tab. For now, we're just showing the tab is active.
                console.log('Location tab switched to:', tabName);
            });
        });
    }

    // Initialize location tabs
    initLocationTabs();

    /* ===================================
       SECTION 5: Specifications Tab Switching
       =================================== */

    function initSpecificationsTabs() {
        const specTabs = document.querySelectorAll('.spec-tab');
        const specContents = document.querySelectorAll('.spec-content');

        specTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabName = this.getAttribute('data-tab');

                // Remove active class from all tabs and contents
                specTabs.forEach(t => t.classList.remove('active'));
                specContents.forEach(c => c.classList.remove('active'));

                // Add active class to clicked tab
                this.classList.add('active');

                // Show corresponding content
                const activeContent = document.querySelector(`.spec-content[data-content="${tabName}"]`);
                if (activeContent) {
                    activeContent.classList.add('active');
                }

                console.log('Specification tab switched to:', tabName);
            });
        });
    }

    // Initialize specifications tabs
    initSpecificationsTabs();

    /* ===================================
       SECTION 6: Floor Plan Tab Switching
       =================================== */

    function initFloorPlanTabs() {
        const floorTabs = document.querySelectorAll('.floor-tab');

        // Floor plan data
        const floorPlans = {
            'site-plan': {
                sqft: '2800 - 2500 SQ.FT',
                image: 'project-detail-page/asset/intro-img-1.jpg',
                image2d: 'project-detail-page/asset/intro-img-2.jpg'
            },
            'symphony': {
                sqft: '2800 - 2500 SQ.FT',
                image: 'project-detail-page/asset/intro-img-1.jpg',
                image2d: 'project-detail-page/asset/intro-img-2.jpg'
            },
            'sonata': {
                sqft: '2500 - 1800 SQ.FT',
                image: 'project-detail-page/asset/intro-img-2.jpg',
                image2d: 'project-detail-page/asset/intro-img-1.jpg'
            },
            'opera': {
                sqft: '1500 - 1200 SQ.FT',
                image: 'project-detail-page/asset/intro-img-1.jpg',
                image2d: 'project-detail-page/asset/intro-img-2.jpg'
            },
            'aria': {
                sqft: '1100 - 850 SQ.FT',
                image: 'project-detail-page/asset/intro-img-2.jpg',
                image2d: 'project-detail-page/asset/intro-img-1.jpg'
            }
        };

        floorTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabName = this.getAttribute('data-tab');

                // Remove active class from all tabs
                floorTabs.forEach(t => t.classList.remove('active'));

                // Add active class to clicked tab
                this.classList.add('active');

                // Update floor plan display
                if (floorPlans[tabName]) {
                    const sqftElement = document.querySelector('.floor-sqft');
                    const image3d = document.querySelector('.floor-3d-plan');
                    const image2d = document.querySelector('.floor-2d-plan img');

                    if (sqftElement) {
                        sqftElement.textContent = floorPlans[tabName].sqft;
                    }
                    if (image3d) {
                        image3d.src = floorPlans[tabName].image;
                    }
                    if (image2d) {
                        image2d.src = floorPlans[tabName].image2d;
                    }
                }

                console.log('Floor plan tab switched to:', tabName);
            });
        });
    }

    // Initialize floor plan tabs
    initFloorPlanTabs();
});
