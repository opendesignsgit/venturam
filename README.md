# Venturam - Pixel-Perfect UI Implementation

A pixel-perfect implementation of the Venturam website navbar and hero section using raw HTML, CSS, and JavaScript.

## 🚀 Quick Start

Simply open `index.html` in a web browser or serve via a local HTTP server:

```bash
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## 📁 Project Structure

```
/
├── index.html          # Main HTML structure
├── css/
│   ├── base.css       # CSS resets, variables, and base styles
│   ├── navbar.css     # Navbar styles and responsive behavior
│   └── hero.css       # Hero section styles and responsive behavior
├── js/
│   └── navbar.js      # Navbar scroll detection and mobile menu logic
└── assets/
    └── images/
        └── hero-bg.jpg # Hero section background image
```

## ✨ Features

### Navbar
- **Transparent-to-Solid Scroll Behavior**: Navbar starts transparent and transitions to solid dark teal background on scroll
- **Centered Logo**: Logo with icon and text positioned in center
- **Symmetrical Navigation**: Left nav (About Us, Medleys, Projects) and right nav (Career, Testimonials, Contact Us)
- **Mobile Responsive**: Hamburger menu with full-screen overlay on mobile devices
- **Smooth Transitions**: CSS-only transitions for all state changes

### Hero Section
- **Full Viewport Height**: 100vh hero section with background image
- **Dual Text Layout**: Left-aligned main headline, right-aligned secondary headline
- **Dark Gradient Overlay**: Top and bottom gradient for better text readability
- **Fully Responsive**: Adapts layout for mobile, tablet, and desktop

## 🎨 Design Implementation

The implementation follows the pixel-perfect designs from:
- `/nav-bar.png` - Navbar reference design
- `/hero-section.png` - Hero section reference design

### Color Palette
- **Cream/Beige Text**: `#E8D5B7`
- **Dark Teal Background**: `rgba(20, 60, 60, 0.95)`
- **Transparent**: Initial navbar state

### Typography
- **Navigation**: Sans-serif, 0.875rem, uppercase with letter-spacing
- **Hero Headline**: Serif (Georgia), 4rem, uppercase
- **Hero Subheadline**: Serif (Georgia), 3rem, uppercase
- **Hero Location**: Serif (Georgia), 1.5rem, uppercase with wide letter-spacing

## 📱 Responsive Breakpoints

- **Desktop**: > 968px (full navigation visible)
- **Tablet**: 768px - 968px (hamburger menu, adjusted typography)
- **Mobile**: < 768px (mobile layout, stacked text)

## ⚠️ Important Notes

### Background Image
**NOTE**: The provided `hero-section.png` contains pre-rendered text overlay. For a production implementation, a clean background photo (without text) should be provided to avoid text duplication. The current implementation uses the reference image as a placeholder.

To replace with a clean background:
1. Place the new image in `/assets/images/hero-bg.jpg`
2. Ensure it's a high-resolution photo suitable for full-screen display
3. The image should not contain any text overlays

## 🔧 Customization

### Updating Text Content
All text content is in `index.html` and can be easily modified:
- Navbar links: Update text and href attributes
- Hero headline: Modify the `<h1>` content
- Hero subheadline: Modify the `<h2>` content
- Hero location: Modify the `<p>` content

### Updating Colors
Colors are defined as CSS variables in `css/base.css`:
```css
:root {
    --color-cream: #E8D5B7;
    --color-navbar-solid: rgba(20, 60, 60, 0.95);
    /* ... */
}
```

### Adjusting Scroll Trigger
In `js/navbar.js`, modify the scroll threshold:
```javascript
if (window.scrollY > 50) { // Change 50 to desired pixel value
    navbar.classList.add('scrolled');
}
```

## 🚫 Technology Constraints

This implementation adheres to strict requirements:
- ✅ Raw HTML, CSS, JavaScript only
- ✅ No frameworks (React, Vue, Angular)
- ✅ No build tools (Webpack, Vite, Parcel)
- ✅ No CSS frameworks (Tailwind, Bootstrap)
- ✅ Small utility libraries only when necessary

## 🔮 Future Sections

The code is structured to allow adding new sections without refactoring:
- Each section has its own CSS file
- Navbar and hero are independent components
- JavaScript is modular and extendable
- No coupling between sections

To add a new section:
1. Create `css/[section-name].css`
2. Add section HTML in `index.html`
3. Link CSS file in HTML `<head>`
4. Add JavaScript if needed in `js/[section-name].js`

## 🧪 Browser Support

Tested and working in:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

Copyright © Venturam. All rights reserved.
