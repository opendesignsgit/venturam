/**
 * Scroll Collage Animation
 * Uses GSAP + ScrollTrigger for scroll-driven animation
 * - Center image scales to fill section
 * - Other images translate outward
 * - scrub: true for scroll-bound animation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Get scroll collage elements
    const scrollSection = document.getElementById('scroll-collage');
    if (!scrollSection) return;
    
    const stickyContainer = scrollSection.querySelector('.scroll-collage-sticky');
    const centerImage = scrollSection.querySelector('.collage-center');
    const topImage = scrollSection.querySelector('.collage-top');
    const leftImage = scrollSection.querySelector('.collage-left');
    const rightImage = scrollSection.querySelector('.collage-right');
    const bottomLeftImage = scrollSection.querySelector('.collage-bottom-left');
    const bottomRightImage = scrollSection.querySelector('.collage-bottom-right');
    const headerContent = scrollSection.querySelector('.scroll-collage-header');
    const elevatingContent = scrollSection.querySelector('.scroll-collage-elevating');
    
    // Create the main timeline
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: scrollSection,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            pin: stickyContainer,
            pinSpacing: false
        }
    });
    
    // Fade out header content
    tl.to(headerContent, {
        opacity: 0,
        y: -50,
        duration: 0.3
    }, 0);
    
    // Center image scales to fill the section
    tl.to(centerImage, {
        scale: 2.5,
        duration: 1
    }, 0);
    
    // Top image moves up and out
    tl.to(topImage, {
        y: '-150%',
        opacity: 0,
        duration: 1
    }, 0);
    
    // Left image moves left and out
    tl.to(leftImage, {
        x: '-150%',
        opacity: 0,
        duration: 1
    }, 0);
    
    // Right image moves right and out
    tl.to(rightImage, {
        x: '150%',
        opacity: 0,
        duration: 1
    }, 0);
    
    // Bottom left image moves down-left and out
    tl.to(bottomLeftImage, {
        x: '-100%',
        y: '150%',
        opacity: 0,
        duration: 1
    }, 0);
    
    // Bottom right image moves down-right and out
    tl.to(bottomRightImage, {
        x: '100%',
        y: '150%',
        opacity: 0,
        duration: 1
    }, 0);
    
    // Fade in elevating content in the second half of the animation
    tl.to(elevatingContent, {
        opacity: 1,
        duration: 0.5
    }, 0.5);
});
