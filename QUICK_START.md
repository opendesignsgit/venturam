# Quick Start Guide

## 🚀 Getting Started

### View the Implementation

1. **Open in Browser**
   ```bash
   # Start a simple HTTP server
   python3 -m http.server 8080
   
   # Or use any other local server
   # Then navigate to http://localhost:8080/index.html
   ```

2. **Scroll to See the Animation**
   - Scroll down past the Hero section
   - Watch the images smoothly overlap as you scroll
   - Scroll up to see the animation reverse

### File Structure

```
index.html                    # Main page with scroll section
css/scroll-collage.css       # Scroll section styles
js/scroll-collage.js         # GSAP animation logic
assets/images/medleys-nest/  # Placeholder images (SVG)
```

## 🎨 What You'll See

### Hero Section
- Full-screen hero with "The Art of Elevated Living" text
- Gradient overlay

### Scroll Collage Section (NEW)
- Title: "MEDLEY'S NEST"
- 8 images in a collage layout
- **Scroll down**: Images move inward and overlap
- **Scroll up**: Animation reverses smoothly

### Animation Behavior

```
┌─────────────────────┐
│   Initial State     │ ← Images spread out
│   (on page load)    │
└─────────────────────┘
         ↓ scroll down
┌─────────────────────┐
│   Animating...      │ ← Images moving inward
│   (during scroll)   │
└─────────────────────┘
         ↓ scroll down
┌─────────────────────┐
│   Final State       │ ← Images overlapped
│   (end of section)  │
└─────────────────────┘
         ↑ scroll up (reverses)
```

## 🛠️ Customization

### Change Animation Speed

Edit `js/scroll-collage.js`:
```javascript
scrollTrigger: {
  scrub: 1,  // Increase for slower, decrease for faster
}
```

### Change Colors

Edit `css/scroll-collage.css`:
```css
.scroll-collage-section {
  background: #2b5f4f;  /* Change background color */
}

.scroll-collage-title {
  color: #d4af37;  /* Change title color */
}
```

### Replace Placeholder Images

Replace files in `assets/images/medleys-nest/`:
- Use JPG or PNG format
- Recommended sizes: 400x300px for most images
- Optimize for web (compress images)

## 📱 Responsive Testing

Test on different screen sizes:
- **Desktop**: >1024px - Full animation
- **Tablet**: 768-1024px - Scaled animation
- **Mobile**: 480-768px - Compact animation
- **Small**: <480px - Minimal animation

## 🔍 Troubleshooting

### Images Not Loading
- Check file paths in `index.html`
- Ensure SVG files exist in `assets/images/medleys-nest/`

### Animation Not Working
- Open browser console (F12)
- Check for GSAP errors
- Verify GSAP CDN is accessible

### Styling Issues
- Clear browser cache
- Check if `scroll-collage.css` is linked in `index.html`
- Verify CSS file exists

## 📚 Documentation

- `SCROLL_SECTION_README.md` - Technical details
- `IMPLEMENTATION_SUMMARY.md` - Overview
- `VERIFICATION_CHECKLIST.md` - Quality checks

## 🎯 Next Steps

1. **Test in Browser**: Open `index.html` and scroll
2. **Replace Images**: Add actual project photos
3. **Fine-tune**: Adjust animation to match reference GIF
4. **Deploy**: Push to production when ready

## ⚡ Quick Reference

### Dependencies
- GSAP 3.12.5 (CDN)
- ScrollTrigger (CDN)

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Performance
- Lightweight: ~700 lines of code
- Fast: SVG placeholders load instantly
- Smooth: GSAP optimized rendering

---

**Need Help?**
Check the documentation files or browser console for errors.
