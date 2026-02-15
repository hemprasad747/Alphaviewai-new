# AlphaView AI - Static Website

Modern, accessible, mobile-first static front-end for AlphaView AI interview assistant platform.

## 📁 Files Structure

```
/app/static/
├── index.html              # Landing page (marketing)
├── download.html           # Dashboard (post-login)
├── past-interviews.html    # Interview history & transcripts
├── resumes.html           # Resume management
├── styles.css             # Complete stylesheet with design tokens
├── app.js                 # Client-side UI interactions
└── README.md              # This file
```

## 🎨 Style Guide

### Design Tokens

All design values are defined as CSS custom properties in `:root` for easy customization:

#### Colors
- **Primary**: `#10b981` (Green) - CTAs, links, active states
- **Secondary**: `#6366f1` (Indigo) - Alternative actions
- **Text Primary**: `#111827` (Near black)
- **Text Secondary**: `#6b7280` (Gray)
- **Background**: `#ffffff` (White)
- **Surface**: `#f9fafb` (Light gray)
- **Border**: `#e5e7eb` (Light gray)

#### Typography
- **Font Family**: Plus Jakarta Sans (via Google Fonts)
- **Font Sizes**: 
  - xs: 0.75rem (12px)
  - sm: 0.875rem (14px)
  - base: 1rem (16px)
  - lg: 1.125rem (18px)
  - xl: 1.25rem (20px)
  - 2xl: 1.5rem (24px)
  - 3xl: 1.875rem (30px)
  - 4xl: 2.25rem (36px)
  - 5xl: 3rem (48px)
- **Font Weights**: 300 (light), 400 (normal), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold)

#### Spacing
Based on 0.25rem (4px) increments:
- xs: 0.5rem (8px)
- sm: 0.75rem (12px)
- base: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)
- 2xl: 3rem (48px)
- 3xl: 4rem (64px)
- 4xl: 6rem (96px)

#### Border Radius
- sm: 0.375rem (6px)
- base: 0.5rem (8px)
- lg: 0.75rem (12px)
- xl: 1rem (16px)
- 2xl: 1.5rem (24px)
- full: 9999px (pill shape)

#### Shadows
- sm: Subtle shadow for cards
- base: Default card shadow
- md: Elevated elements
- lg: Prominent elevation
- xl: Maximum elevation (modals)

#### Transitions
- fast: 150ms - Micro-interactions
- base: 250ms - Standard transitions
- slow: 350ms - Complex animations

### Component Library

#### Buttons
```html
<!-- Primary Button -->
<button class="btn btn-primary">Primary Action</button>

<!-- Secondary Button -->
<button class="btn btn-secondary">Secondary</button>

<!-- Outline Button -->
<button class="btn btn-outline">Outline</button>

<!-- Ghost Button -->
<button class="btn btn-ghost">Ghost</button>

<!-- Danger Button -->
<button class="btn btn-danger">Delete</button>

<!-- Sizes -->
<button class="btn btn-primary btn-small">Small</button>
<button class="btn btn-primary">Default</button>
<button class="btn btn-primary btn-large">Large</button>

<!-- With Icon -->
<button class="btn btn-primary">
    <svg width="16" height="16">...</svg>
    Button Text
</button>
```

#### Cards
```html
<!-- Feature Card -->
<div class="feature-card">
    <div class="feature-icon">
        <svg width="24" height="24">...</svg>
    </div>
    <h3 class="feature-title">Feature Title</h3>
    <p class="feature-description">Description text...</p>
</div>

<!-- Status Card -->
<div class="status-card">
    <div class="status-label">Label</div>
    <div class="status-value">Value</div>
    <p class="status-help">Help text</p>
</div>
```

#### Forms
```html
<!-- Text Input with Label -->
<label for="input-id" class="form-label">Label</label>
<input type="text" id="input-id" class="form-input" placeholder="Placeholder...">

<!-- Textarea -->
<label for="textarea-id" class="form-label">Label</label>
<textarea id="textarea-id" class="form-textarea" rows="3" placeholder="Placeholder..."></textarea>

<!-- File Upload -->
<input type="file" id="file-input" accept=".pdf,.doc,.docx" style="display: none;">
<label for="file-input" class="upload-dropzone">
    <!-- Upload UI -->
</label>
```

#### Modals
```html
<div id="modal-id" class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <div class="modal-backdrop"></div>
    <div class="modal-content">
        <div class="modal-header">
            <h2 id="modal-title" class="modal-title">Modal Title</h2>
            <button class="modal-close" aria-label="Close modal">
                <svg width="24" height="24">...</svg>
            </button>
        </div>
        <div class="modal-body">
            <!-- Content -->
        </div>
    </div>
</div>
```

#### Tables
```html
<div class="table-container">
    <table class="data-table">
        <thead>
            <tr>
                <th>Column 1</th>
                <th>Column 2</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Data 1</td>
                <td>Data 2</td>
            </tr>
        </tbody>
    </table>
</div>
```

## 🔌 JavaScript Integration Points

### Required IDs/Classes for Existing JS

**Authentication:**
- `#btn-signin` - Sign in button (header)
- `#btn-signin-2` - Sign in button (hero)
- `#btn-signout` - Sign out button (header)
- `#btn-signout-2` - Sign out button (hero)
- `#download-area` - Download area (hidden until signed in)
- `#download-area-2` - Download area in hero
- `#user-avatar-panel` - User avatar container
- `#user-email-panel` - User email display
- `#user-name` - User name display

**Dashboard:**
- `#status-free-mins` - Available minutes display
- `#status-credits-desc` - Credits count display
- `#btn-download-windows` - Windows download button
- `#btn-download-status` - Download status text

**Past Interviews:**
- `#past-interviews-tbody` - Table body for interviews
- `#transcript-modal` - Transcript modal
- `#transcript-tab` - Transcript tab content
- `#transcript-download-btn` - Download transcript button
- `#ask-ai-submit-btn` - Ask AI button
- `#ask-ai-custom-prompt` - AI prompt textarea
- `#ask-ai-response` - AI response container
- `#ask-ai-status` - AI loading status

**Resumes:**
- `#resume-file-input` - File input
- `#resume-upload-btn` - Upload button
- `#resumes-list` - Resumes list container
- `#upload-progress` - Upload progress indicator
- `#upload-success` - Upload success message

### JavaScript API

The `app.js` file provides these functions:

```javascript
// Authentication
handleSignIn()      // Triggers sign-in flow
handleSignOut()     // Signs out user
checkAuthState()    // Checks if user is authenticated

// UI State
updateAuthUI()      // Updates UI based on auth state
openModal(id)       // Opens modal by ID
closeModal(element) // Closes modal element

// Notifications
showNotification(message, type) // Shows toast notification

// File Upload
addResumeToList(fileName) // Adds resume to list
```

### Data Attributes

Use these for dynamic content:

```html
<!-- Session items -->
<tr data-session-id="123" data-type="interview">...</tr>

<!-- Resume items -->
<div data-resume-id="456" data-filename="resume.pdf">...</div>

<!-- Platform selector -->
<button class="platform-btn" data-platform="windows">...</button>

<!-- Tabs -->
<button class="tab-btn" data-tab="transcript">...</button>

<!-- Modals -->
<button data-modal="transcript-modal">Open Modal</button>
```

## ♿ Accessibility Features

### Semantic HTML
- Proper heading hierarchy (h1 → h2 → h3)
- Semantic elements: `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`
- Form labels associated with inputs
- ARIA landmarks and roles

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Focus states visible with `outline`
- Tab order follows visual flow
- Modal focus trap implemented
- ESC key closes modals
- Skip to main content link

### ARIA Attributes
- `role="dialog"` on modals
- `aria-modal="true"` for modal dialogs
- `aria-label` on icon buttons
- `aria-expanded` on toggles
- `aria-labelledby` for modal titles

### Color Contrast
- Text: minimum 4.5:1 contrast ratio
- Interactive elements: 3:1 contrast ratio
- Tested against WCAG AA standards

### Screen Reader Support
- `.sr-only` class for screen reader only text
- Descriptive link text
- Alt text on images/SVGs
- Status messages announced

## 📱 Responsive Design

### Breakpoints
- **Desktop**: 1024px+
- **Tablet**: 768px - 1023px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

### Mobile Optimizations
- Hamburger menu on mobile
- Collapsible sidebar on dashboard
- Stacked layouts for cards/grids
- Touch-friendly button sizes (min 44x44px)
- Reduced spacing on small screens
- Horizontal scroll for tables

## 🚀 Performance

### Optimizations
- Minimal CSS (no framework bloat)
- SVG icons inline (no icon font)
- Google Fonts preconnect
- CSS animations use `transform` and `opacity`
- Efficient selectors
- No render-blocking resources

### Best Practices
- Lazy load images (add `loading="lazy"` attribute)
- Optimize images before upload
- Use WebP format where possible
- Minify CSS/JS for production
- Enable gzip compression

## 🔧 Customization

### Changing Colors
Edit CSS variables in `styles.css`:

```css
:root {
    --color-primary: #10b981;        /* Your brand color */
    --color-secondary: #6366f1;      /* Secondary color */
    --color-text-primary: #111827;   /* Main text color */
    /* ... */
}
```

### Changing Fonts
Replace Google Fonts link in HTML `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

Update CSS variable:

```css
:root {
    --font-family: 'Your Font', sans-serif;
}
```

### Changing Spacing
Adjust spacing scale in CSS variables:

```css
:root {
    --spacing-base: 1rem;    /* Base unit */
    --spacing-lg: 1.5rem;    /* 1.5x base */
    /* ... */
}
```

## 🧪 Browser Support

- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅
- Mobile browsers (iOS Safari, Chrome Mobile) ✅

### Fallbacks
- CSS Grid with flexbox fallback
- CSS custom properties with fallback values
- Backdrop filter with solid background fallback

## 📦 Integration with Backend

### Authentication Flow
1. User clicks "Sign in with Google"
2. Redirect to Google OAuth: `/api/auth/google`
3. Backend handles OAuth callback
4. Set session cookie/JWT token
5. Redirect to `download.html`

### API Endpoints (Example)
```javascript
// Sign in
POST /api/auth/google/callback
Response: { token, user: { email, name } }

// Download app
GET /api/download/windows
Response: Binary file download

// Upload resume
POST /api/resumes/upload
Body: FormData with file
Response: { id, filename, uploadedAt }

// Get interviews
GET /api/interviews
Response: [{ id, title, description, createdAt, ... }]
```

### Connecting JavaScript to Backend
Update `app.js` functions to call your API:

```javascript
async function handleSignIn() {
    try {
        // Redirect to OAuth
        window.location.href = '/api/auth/google';
    } catch (error) {
        console.error('Sign in failed:', error);
    }
}

async function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch('/api/resumes/upload', {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    });
    
    return response.json();
}
```

## 🎯 Next Steps

1. **Connect to Backend**: Replace mock functions in `app.js` with real API calls
2. **Add Real Content**: Replace placeholder text and images with actual content
3. **SEO Optimization**: Add meta tags, Open Graph, structured data
4. **Analytics**: Add Google Analytics or other tracking
5. **Testing**: Test on real devices and browsers
6. **Performance**: Run Lighthouse audit and optimize
7. **Security**: Add CSP headers, sanitize user input
8. **Deployment**: Minify files, enable caching, CDN

## 📞 Support

For questions or issues with the static front-end:
- Documentation: This README
- Design Tokens: See `:root` in `styles.css`
- Component Examples: See each HTML file

---

**Built with ❤️ for AlphaView AI**
