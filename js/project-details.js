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
});
