# Scroll-Triggered Overlap Section

## Overview
This section implements a scroll-driven overlapping image collage animation that appears immediately after the Hero section. The animation is powered by GSAP ScrollTrigger and creates a smooth, reversible animation tied to scroll progress.

## Implementation Details

### Files Created
- `css/scroll-collage.css` - Styling for the scroll collage section
- `js/scroll-collage.js` - GSAP ScrollTrigger animation logic
- `assets/images/medleys-nest/` - Placeholder SVG images for the collage

### Key Features
1. **Scroll-Driven Animation**: Uses GSAP ScrollTrigger with `scrub: true` for smooth, reversible scrolling
2. **Sticky Container**: Section uses CSS `position: sticky` to keep content centered during animation
3. **Extended Scroll Space**: Section has `min-height: 200vh` to provide sufficient scroll distance
4. **Image Overlap Effect**: Images translate inward and overlap at the center as user scrolls
5. **Responsive Design**: Adapts to tablet and mobile with scaled-down layouts

### Technologies Used
- **GSAP 3.12.5** - Animation library
- **ScrollTrigger** - Scroll-driven animation plugin
- **Vanilla JavaScript** - No frameworks
- **CSS3** - Modern CSS features (sticky positioning, transforms)

## Structure

```html
<section class="scroll-collage-section">
  <div class="scroll-collage-sticky">
    <div class="scroll-collage-header">
      <!-- Title and description -->
    </div>
    <div class="scroll-collage-images">
      <!-- 8 absolutely positioned images -->
    </div>
  </div>
</section>
```

## Animation Behavior

### Initial State (scroll-section-initial.png)
- Images are spread out in a non-overlapping grid pattern
- Center image (image-3) is prominent
- Side images are positioned symmetrically

### Target State (scroll-section-to-overlap.png)
- Side images translate inward toward center
- Images overlap smoothly
- Center images scale up slightly
- Animation progresses with scroll position

### Scroll Mechanics
- **Trigger**: Section enters viewport
- **Start**: `top top` - animation begins when section reaches top of viewport
- **End**: `bottom bottom` - animation completes when section exits viewport
- **Scrub**: `true` - animation is tied to scroll position
- **Reversible**: Scroll up reverses the animation smoothly

## Responsive Breakpoints

- **Desktop** (>1024px): Full animation with all images
- **Tablet** (768px - 1024px): Scaled-down version with proportional sizing
- **Mobile** (<768px): Further scaled with reduced scroll height (150vh)
- **Small Mobile** (<480px): Minimal height (100vh) with compact layout

## Browser Support
- Modern browsers with support for:
  - CSS `position: sticky`
  - CSS Transforms
  - ES6 JavaScript
  - GSAP 3.x

## Customization

### Adjusting Animation Speed
In `js/scroll-collage.js`, modify the `scrub` value:
```javascript
scrollTrigger: {
  scrub: true, // Instant follow
  // or
  scrub: 1, // 1 second smooth delay
}
```

### Modifying Image Positions
Edit the animation targets in `js/scroll-collage.js`:
```javascript
tl.to('.collage-image-2', {
  x: '+=200', // Horizontal movement
  y: '+=50',  // Vertical movement
  duration: 1
}, 0);
```

### Changing Colors
Update CSS variables or colors in `css/scroll-collage.css`:
```css
.scroll-collage-section {
  background: #2b5f4f; /* Deep teal/forest green */
}

.scroll-collage-title {
  color: #d4af37; /* Gold */
}
```

## Performance Optimization
- Uses `will-change: transform` on animated elements
- GSAP's optimized rendering engine
- No layout thrashing (only transforms, no reflows)
- Efficient ScrollTrigger updates

## Testing
To test the implementation:
1. Open `index.html` in a modern browser
2. Scroll down past the hero section
3. Observe the smooth image overlap animation
4. Scroll up to see the animation reverse

## Future Enhancements
- Replace placeholder SVG images with actual project photos
- Add loading states for images
- Consider lazy loading for better performance
- Add accessibility features (reduced motion preference)
