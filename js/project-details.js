// ===================================
// PROJECT DETAILS PAGE JAVASCRIPT
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // COUNT UP ANIMATION FOR STATISTICS
    // ===================================
    function countUpAnimation() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseFloat(stat.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCount = () => {
                current += increment;
                if (current < target) {
                    // Check if decimal number
                    if (target % 1 !== 0) {
                        stat.textContent = current.toFixed(1);
                    } else {
                        stat.textContent = Math.floor(current);
                    }
                    requestAnimationFrame(updateCount);
                } else {
                    // Set final value
                    if (target % 1 !== 0) {
                        stat.textContent = target.toFixed(1);
                    } else {
                        stat.textContent = target;
                    }
                }
            };
            
            updateCount();
        });
    }
    
    // Trigger count up when section is in view
    const projectIntroSection = document.querySelector('.project-intro-section');
    if (projectIntroSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    countUpAnimation();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(projectIntroSection);
    }
    
    // ===================================
    // TABS FUNCTIONALITY
    // ===================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
    
    // ===================================
    // ACCORDION FUNCTIONALITY (Mobile)
    // ===================================
    function createAccordion() {
        const projectDetailsSection = document.querySelector('.project-details-section');
        const tabsContent = document.querySelector('.tabs-content');
        
        if (!projectDetailsSection || !tabsContent) return;
        
        // Check if accordion already exists
        if (document.querySelector('.project-accordion')) return;
        
        // Create accordion container
        const accordion = document.createElement('div');
        accordion.className = 'project-accordion';
        
        // Get all tab panes
        const tabPanes = document.querySelectorAll('.tab-pane');
        
        tabPanes.forEach((pane, index) => {
            const tabId = pane.id;
            const tabButton = document.querySelector(`[data-tab="${tabId}"]`);
            const tabTitle = tabButton ? tabButton.textContent : `Tab ${index + 1}`;
            
            // Create accordion item
            const accordionItem = document.createElement('div');
            accordionItem.className = 'accordion-item';
            
            // Create accordion header
            const accordionHeader = document.createElement('button');
            accordionHeader.className = 'accordion-header';
            if (index === 0) accordionHeader.classList.add('active');
            accordionHeader.textContent = tabTitle;
            
            // Create accordion content
            const accordionContent = document.createElement('div');
            accordionContent.className = 'accordion-content';
            if (index === 0) accordionContent.classList.add('active');
            
            const accordionContentInner = document.createElement('div');
            accordionContentInner.className = 'accordion-content-inner';
            accordionContentInner.innerHTML = pane.innerHTML;
            
            accordionContent.appendChild(accordionContentInner);
            
            // Add click event
            accordionHeader.addEventListener('click', () => {
                const isActive = accordionHeader.classList.contains('active');
                
                // Close all accordion items
                document.querySelectorAll('.accordion-header').forEach(header => {
                    header.classList.remove('active');
                });
                document.querySelectorAll('.accordion-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    accordionHeader.classList.add('active');
                    accordionContent.classList.add('active');
                }
            });
            
            accordionItem.appendChild(accordionHeader);
            accordionItem.appendChild(accordionContent);
            accordion.appendChild(accordionItem);
        });
        
        // Insert accordion after tabs content
        tabsContent.parentNode.insertBefore(accordion, tabsContent.nextSibling);
    }
    
    // Create accordion on page load
    createAccordion();
    
    // ===================================
    // AMENITIES SWIPER SLIDER
    // ===================================
    if (typeof Swiper !== 'undefined') {
        const amenitiesSwiper = new Swiper('.amenities-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.amenities-next',
                prevEl: '.amenities-prev',
            },
        });
    }
    
    // ===================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ===================================
    // PARALLAX EFFECT FOR BACKGROUNDS
    // ===================================
    function parallaxEffect() {
        const parallaxSections = document.querySelectorAll('.project-intro-section, .amenities-section');
        
        window.addEventListener('scroll', () => {
            parallaxSections.forEach(section => {
                const scrolled = window.pageYOffset;
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrolled > sectionTop - window.innerHeight && scrolled < sectionTop + sectionHeight) {
                    const background = section.querySelector('.project-intro-background img, .amenities-background img');
                    if (background) {
                        const yPos = (scrolled - sectionTop) * 0.5;
                        background.style.transform = `translateY(${yPos}px)`;
                    }
                }
            });
        });
    }
    
    parallaxEffect();
});
