/* ===================================
   SECTION 1: Counter Animations
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Counter Animation
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16); // 60fps
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format the number
            if (target < 10) {
                // For decimal numbers like 1.22
                element.textContent = current.toFixed(2);
            } else {
                // For whole numbers like 141
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // Initialize counters
    function initCounters() {
        const counters = document.querySelectorAll('.stat-value[data-target]');
        
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            
            // Start animation after a short delay
            setTimeout(() => {
                animateCounter(counter, target);
            }, 500);
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
