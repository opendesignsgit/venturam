/* =============================================
   SECTION 2 — Tab Switching Logic
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {
    // Section 2 Tabs
    const tabs = document.querySelectorAll('.section-2-tab');
    const tabContents = document.querySelectorAll('.section-2-tab-content');

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            var target = this.getAttribute('data-tab');

            // Remove active from all tabs
            tabs.forEach(function (t) {
                t.classList.remove('active');
            });

            // Remove active from all contents
            tabContents.forEach(function (c) {
                c.classList.remove('active');
            });

            // Activate clicked tab
            this.classList.add('active');

            // Activate corresponding content
            var content = document.getElementById(target);
            if (content) {
                content.classList.add('active');
            }
        });
    });
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
       SECTION 2: Tab Switching Functionality
       =================================== */
    
    // Tab content data
    const tabData = {
        symphony: {
            title: 'SYMPHONY',
            range: '2800 TO 2500',
            image: 'project-detail-page/asset/intro-img-1.jpg'
        },
        sonata: {
            title: 'SONATA',
            range: '2500 TO 1500',
            image: 'project-detail-page/asset/intro-img-2.jpg'
        },
        opera: {
            title: 'OPERA',
            range: '1500 TO 1200',
            image: 'project-detail-page/asset/intro-img-1.jpg'
        },
        aria: {
            title: 'ARIA',
            range: '1100 TO 850',
            image: 'project-detail-page/asset/intro-img-2.jpg'
        }
    };

    // Initialize tab functionality
    function initTabs() {
        const tabs = document.querySelectorAll('.project-tab');
        const tabContentTitle = document.querySelector('.tab-content-title');
        const apartmentImage = document.getElementById('apartmentImage');
        const apartmentDescription = document.querySelector('.apartment-description');

        if (!tabs.length) return;

        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                tabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');

                // Get tab data
                const tabName = this.getAttribute('data-tab');
                const data = tabData[tabName];

                // Update content
                if (tabContentTitle && data) {
                    tabContentTitle.textContent = data.title;
                }

                // Update image
                if (apartmentImage && data.image) {
                    apartmentImage.src = data.image;
                }

                // Update description with the range
                if (apartmentDescription && data) {
                    const paragraphs = apartmentDescription.querySelectorAll('p');
                    if (paragraphs.length > 0) {
                        paragraphs[0].innerHTML = `Lorem Ipsum is simply dummy Ipsum is simply dummy text of the printingtext of the printing and typesetting industry. Lorem Ipsum has been the ndustry's  standard dummy Lorem Ipsum is <strong>${data.range} SQ.FT RANGE</strong> is simply ummy text of the printingtext of he printing and typesetting industry. Lorem Ipsum has been the ndustry's standard dummy Lorem Ipsum has been the ndustry's`;
                    }
                }
            });
        });
    }

    // Run tab initialization
    initTabs();
});
