# AlphaView AI - Product Requirements Document

## Original Problem Statement
Build a modern, beautiful, accessible, mobile-first **static front-end** for the AlphaView AI website - an "Interview Assistant" application. The static site should have professional UI with proper styling and functionality.

## Tech Stack
- **Frontend**: Static HTML, CSS, Vanilla JavaScript
- **Backend**: FastAPI (for serving static files and API routes)
- **Styling**: Custom CSS with CSS Variables for theming

## Pages
1. **index.html** - Landing/marketing page with:
   - Header with navigation
   - Hero section
   - Features section
   - Supported Platforms section (with video modal on click)
   - Testimonials section (horizontal scrolling cards)
   - Pricing section
   - FAQ accordion
   - Footer

2. **download.html** - Post-login dashboard with three-panel layout
3. **past-interviews.html** - Table view of past interviews
4. **resumes.html** - File upload area and resume list

## Key Features Implemented

### Completed (December 2025)
- [x] Static website structure in `/app/static/` directory
- [x] Hero section with wolf logo and compelling copy
- [x] Features section highlighting key capabilities
- [x] **Supported Platforms section** with 10 platforms (Zoom, Teams, Meet, Webex, Chime, CoderPad, HackerRank, Discord, Lark/Feishu, Slack)
  - Each platform card is clickable
  - Shows "Undetectable, checked Xh ago" status
  - Video modal opens on click (placeholder for video upload)
- [x] **Testimonials section** - Social media style horizontal scrolling cards
  - Real stock photos for profile pictures
  - Twitter-style handles (@username)
  - Mix of Indian and global names
  - Casual, authentic testimonial text
  - Star ratings
- [x] Pricing section with discounted prices
- [x] FAQ accordion section
- [x] Cookie consent banner
- [x] React app modified to serve static content

## File Structure
```
/app/static/
├── index.html          # Main landing page
├── download.html       # Dashboard page
├── past-interviews.html # Past interviews table
├── resumes.html        # Resume management
├── styles.css          # Main stylesheet
├── app.js              # JavaScript for interactions
└── README.md           # Documentation

/app/frontend/public/   # Mirror of static files for React serving
├── index.html
├── styles.css
└── app.js
```

## Backlog (P1)
- [ ] Add product screenshots or GIF walkthrough
- [ ] Implement sticky CTA button on scroll
- [ ] Add social proof badges/logos

## Future Tasks (P2)
- [ ] Dark mode toggle
- [ ] Demo/explainer video
- [ ] Live chat widget
- [ ] Exit-intent popup

## Technical Notes
- Static files are served via React's public folder
- Video modals have placeholders - user will upload videos later
- CSS uses CSS Variables for consistent theming
- Inline styles used for testimonial cards to override Tailwind CSS reset

## URLs
- Preview: https://interview-assistant-3.preview.emergentagent.com
- API: https://interview-assistant-3.preview.emergentagent.com/api/
