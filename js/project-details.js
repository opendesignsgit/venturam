// ===================================
// PROJECT DETAILS PAGE JAVASCRIPT
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Constants
    const FRAME_DURATION_MS = 16; // 60fps
    const COUNT_ANIMATION_DURATION = 2000; // 2 seconds
    const VISIBILITY_THRESHOLD = 0.3;
    const PARALLAX_SPEED = 0.5;
    
    // ===================================
    // COUNT UP ANIMATION FOR STATISTICS
    // ===================================
    function countUpAnimation() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseFloat(stat.getAttribute('data-target'));
            const increment = target / (COUNT_ANIMATION_DURATION / FRAME_DURATION_MS);
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
        }, { threshold: VISIBILITY_THRESHOLD });
        
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
    // ACCORDION FUNCTIONALITY (Mobile) - Section 2
    // ===================================
    function createProjectAccordion() {
        const projectTabsNav = document.querySelector('.tabs-navigation');
        const projectTabsContent = document.querySelector('.tabs-content');
        
        if (!projectTabsNav || !projectTabsContent) return;
        
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
        projectTabsContent.parentNode.insertBefore(accordion, projectTabsContent.nextSibling);
    }
    
    // Create accordion on page load
    createProjectAccordion();
    
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
                        const yPos = (scrolled - sectionTop) * PARALLAX_SPEED;
                        background.style.transform = `translateY(${yPos}px)`;
                    }
                }
            });
        });
    }
    
    parallaxEffect();
    
    // ===================================
    // LOCATION HIGHLIGHTS TABS
    // ===================================
    const locationTabBtns = document.querySelectorAll('.location-tab-btn');
    const locationTabPanes = document.querySelectorAll('.location-tab-pane');
    
    locationTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            locationTabBtns.forEach(b => b.classList.remove('active'));
            locationTabPanes.forEach(pane => pane.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
    
    // ===================================
    // SPECIFICATIONS VERTICAL TABS
    // ===================================
    const specTabBtns = document.querySelectorAll('.spec-tab-btn');
    const specPanes = document.querySelectorAll('.spec-pane');
    
    specTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetSpec = btn.getAttribute('data-spec');
            
            specTabBtns.forEach(b => b.classList.remove('active'));
            specPanes.forEach(pane => pane.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(targetSpec).classList.add('active');
        });
    });
    
    // ===================================
    // FLOOR PLAN VERTICAL TABS
    // ===================================
    const floorplanTabBtns = document.querySelectorAll('.floorplan-tab-btn');
    const floorplanPanes = document.querySelectorAll('.floorplan-pane');
    
    floorplanTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetPlan = btn.getAttribute('data-plan');
            
            floorplanTabBtns.forEach(b => b.classList.remove('active'));
            floorplanPanes.forEach(pane => pane.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(targetPlan + '-plan').classList.add('active');
        });
    });
    
    // ===================================
    // GALLERY LIGHTBOX
    // ===================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    const galleryImages = [];
    
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        galleryImages.push(img.src);
        
        item.addEventListener('click', () => {
            currentImageIndex = index;
            showLightbox();
        });
    });
    
    function showLightbox() {
        if (galleryImages.length > 0) {
            lightbox.classList.add('active');
            lightboxImage.src = galleryImages[currentImageIndex];
            document.body.style.overflow = 'hidden';
        }
    }
    
    function hideLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    lightboxClose.addEventListener('click', hideLightbox);
    
    lightboxPrev.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        lightboxImage.src = galleryImages[currentImageIndex];
    });
    
    lightboxNext.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        lightboxImage.src = galleryImages[currentImageIndex];
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            hideLightbox();
        }
    });
    
    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') hideLightbox();
        if (e.key === 'ArrowLeft') lightboxPrev.click();
        if (e.key === 'ArrowRight') lightboxNext.click();
    });
    
    // ===================================
    // CONSTRUCTION UPDATES TABS
    // ===================================
    const constructionTabBtns = document.querySelectorAll('.construction-tab-btn');
    const constructionTabPanes = document.querySelectorAll('.construction-tab-pane');
    
    constructionTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetMonth = btn.getAttribute('data-month');
            
            constructionTabBtns.forEach(b => b.classList.remove('active'));
            constructionTabPanes.forEach(pane => pane.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(targetMonth).classList.add('active');
        });
    });
    
    // ===================================
    // CONTACT FORM VALIDATION
    // ===================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const firstName = document.getElementById('firstName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!firstName || !email || !phone || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Phone validation (basic)
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(phone.replace(/[\s-]/g, ''))) {
                alert('Please enter a valid 10-digit phone number');
                return;
            }
            
            // Form is valid
            alert('Thank you for your inquiry! We will contact you soon.');
            contactForm.reset();
        });
    }
    
    // ===================================
    // VENTURAM EXPERIENCE SLIDER
    // ===================================
    if (typeof Swiper !== 'undefined') {
        const experienceSlider = new Swiper('.experience-slider-new', {
            slidesPerView: 1,
            loop: true,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.experience-next-new',
                prevEl: '.experience-prev-new',
            },
        });
    }
});
