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
       SECTION 3: Amenities Slider
       =================================== */

    // Amenities slider functionality
    function initAmenitiesSlider() {
        const prevBtn = document.querySelector('.amenities-nav-prev');
        const nextBtn = document.querySelector('.amenities-nav-next');
        const gridContainer = document.querySelector('.amenities-grid-container');
        const grid = document.querySelector('.amenities-grid');

        if (!prevBtn || !nextBtn || !gridContainer || !grid) return;

        let currentPosition = 0;
        const scrollAmount = 400; // pixels to scroll

        // Initially disable prev button
        prevBtn.style.opacity = '0.5';
        prevBtn.style.cursor = 'not-allowed';

        function updateButtons() {
            const maxScroll = grid.scrollWidth - gridContainer.clientWidth;
            
            // Update prev button
            if (currentPosition <= 0) {
                prevBtn.style.opacity = '0.5';
                prevBtn.style.cursor = 'not-allowed';
            } else {
                prevBtn.style.opacity = '1';
                prevBtn.style.cursor = 'pointer';
            }

            // Update next button
            if (currentPosition >= maxScroll) {
                nextBtn.style.opacity = '0.5';
                nextBtn.style.cursor = 'not-allowed';
            } else {
                nextBtn.style.opacity = '1';
                nextBtn.style.cursor = 'pointer';
            }
        }

        prevBtn.addEventListener('click', function() {
            if (currentPosition > 0) {
                currentPosition = Math.max(0, currentPosition - scrollAmount);
                gridContainer.scrollTo({
                    left: currentPosition,
                    behavior: 'smooth'
                });
                setTimeout(updateButtons, 300);
            }
        });

        nextBtn.addEventListener('click', function() {
            const maxScroll = grid.scrollWidth - gridContainer.clientWidth;
            if (currentPosition < maxScroll) {
                currentPosition = Math.min(maxScroll, currentPosition + scrollAmount);
                gridContainer.scrollTo({
                    left: currentPosition,
                    behavior: 'smooth'
                });
                setTimeout(updateButtons, 300);
            }
        });

        // Update buttons on window resize
        window.addEventListener('resize', updateButtons);
        
        // Initial button state
        updateButtons();
    }

    // Initialize amenities slider
    initAmenitiesSlider();
});
