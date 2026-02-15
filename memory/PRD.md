# AlphaView AI - Product Requirements Document

## Original Problem Statement
Build a modern, beautiful, accessible, mobile-first **static front-end** for the AlphaView AI website - an "Interview Assistant" application. The static site should have professional UI with proper styling and functionality.

## Tech Stack
- **Frontend**: Static HTML, CSS, Vanilla JavaScript
- **Backend**: FastAPI (for potential API routes - currently unused)
- **Styling**: Custom CSS with CSS Variables for theming
- **Serving**: React dev server (renders null, serves static files from /public)

## Pages
1. **index.html** - Landing/marketing page with:
   - Header with navigation
   - Hero section with animations
   - Features section
   - Supported Platforms section (with video modal on click)
   - Testimonials section (auto-scrolling horizontal cards)
   - Pricing section
   - FAQ accordion
   - Footer

2. **download.html** - Post-login dashboard with three-panel layout
3. **past-interviews.html** - Table view of past interviews with view/delete actions
4. **resumes.html** - File upload area and resume list with view/delete options

## Key Features Implemented

### Completed (December 15, 2025)
- [x] **Auto-scrolling Testimonials**
  - CSS marquee animation (40s linear infinite loop)
  - Pauses on hover for readability
  - 12 testimonial cards with unique users
  
- [x] **Randomized User Names** - Varied names that don't match roles stereotypically:
  - Alex Turner @alexcodes (Software Engineer @ Flipkart)
  - Maya Johnson @maya_tech (Product Manager, Singapore)
  - Chris Anderson @chris_cloud (Cloud Architect @ TCS)
  - Marcus Lee @marcusbuilds (Full Stack Developer, USA)
  - Ravi Krishnan @ravi_analyst (Data Analyst, Canada)
  - Sophie Martinez @sophie_designs (UI/UX Designer @ Razorpay)
  - Daniel Park @dan_invests (Financial Analyst, UK)
  - Sam Wilson @samcodes_api (Backend Developer @ Swiggy)
  - Emma Chen @emma_react (Frontend Engineer, Australia)
  - Tanya Brooks @tanya_growth (Marketing Manager @ Zerodha)
  - Kevin Tanaka @kevin_consults (Business Consultant, Korea)
  - Nikita Sharma @nikita_2024 (Fresh Graduate @ IIT Delhi)

- [x] **UI Polish & Improvements**
  - Disabled Tailwind CSS preflight that was conflicting
  - Clean inline styles for testimonials
  - Consistent data-testid attributes across all pages
  - Mobile responsive layout verified

- [x] **Resumes Page (resumes.html)**
  - Upload dropzone with drag & drop support
  - "Your Resumes" section with empty state
  - Resume card design with view/download/delete buttons
  - LocalStorage persistence for uploads
  - Delete confirmation
  - Toast notifications

- [x] **Past Interviews Page (past-interviews.html)**
  - Table view with columns: Title, Description, Duration, AI Usage, Created At, Actions
  - Empty state when no interviews
  - View button opens transcript modal
  - Delete button with confirmation
  - Transcript modal with tabs (Transcript, Ask AI)

### Previously Completed
- [x] Static website structure
- [x] Hero section with wolf logo
- [x] Features section
- [x] Supported Platforms section with video modals
- [x] Pricing section with discounted prices
- [x] FAQ accordion section
- [x] Cookie consent banner

## File Structure
```
/app/frontend/
├── public/                 # ALL STATIC FILES HERE
│   ├── index.html          # Main landing page
│   ├── download.html       # Dashboard page
│   ├── past-interviews.html # Past interviews (redesigned)
│   ├── resumes.html        # Resume management (redesigned)
│   ├── styles.css          # Main stylesheet
│   └── app.js              # JavaScript for interactions
├── src/
│   ├── App.js              # Renders null (disabled)
│   ├── index.js            # Entry point
│   └── index.css           # Minimal CSS (Tailwind disabled)
```

## Test Results (100% Pass)
- Landing page hero section ✅
- Testimonials auto-scroll ✅
- Testimonials varied names ✅
- Testimonials pause on hover ✅
- Resumes page upload dropzone ✅
- Resumes page empty state ✅
- Past interviews table headers ✅
- Past interviews empty state ✅
- Navigation between pages ✅
- Mobile responsive layout ✅

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
- React app renders null to prevent conflicts
- Tailwind CSS disabled in index.css due to preflight conflicts
- Video modals have placeholders - user will upload videos later
- CSS uses CSS Variables for consistent theming
- Inline styles used for testimonials to ensure proper display
- LocalStorage used for persisting resume and interview data

## URLs
- Preview: https://interview-assistant-3.preview.emergentagent.com
- Resumes: https://interview-assistant-3.preview.emergentagent.com/resumes.html
- Past Interviews: https://interview-assistant-3.preview.emergentagent.com/past-interviews.html
