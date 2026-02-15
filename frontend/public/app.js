// AlphaView AI - Client-side JavaScript for UI interactions

(function() {
    'use strict';
    
    // State management
    const state = {
        isAuthenticated: false,
        user: null,
        sidebarOpen: false,
        resumes: [],
        interviews: []
    };
    
    // Initialize app
    function init() {
        setupHeaderScroll();
        setupMobileMenu();
        setupAuthButtons();
        setupCookieBanner();
        setupDashboardSidebar();
        setupTabs();
        setupModals();
        setupUpload();
        setupPlatformSelector();
        setupKeyboardNavigation();
        setupTestimonialsMarquee();
        setupSectionAnimations();
        checkAuthState();
        loadResumes();
        loadInterviews();
    }
    
    // Setup testimonials marquee with duplication for seamless loop
    function setupTestimonialsMarquee() {
        const track = document.querySelector('.testimonials-track');
        if (!track) return;
        
        // Clone testimonial cards for seamless infinite scroll
        const cards = track.querySelectorAll('.testimonial-card-social');
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            track.appendChild(clone);
        });
    }
    
    // Setup section entrance animations
    function setupSectionAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe section elements
        document.querySelectorAll('.feature-card, .step-card, .platform-verify-card, .pricing-card').forEach(el => {
            el.classList.add('animate-ready');
            observer.observe(el);
        });
    }
    
    // Header scroll effect
    function setupHeaderScroll() {
        const header = document.querySelector('.site-header');
        if (!header) return;
        
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }
    
    // Mobile menu toggle
    function setupMobileMenu() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const nav = document.querySelector('.main-nav');
        
        if (!toggle || !nav) return;
        
        toggle.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', isOpen);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!toggle.contains(e.target) && !nav.contains(e.target)) {
                nav.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // Authentication buttons
    function setupAuthButtons() {
        // Sign in buttons
        const signInButtons = document.querySelectorAll('#btn-signin, #btn-signin-2');
        signInButtons.forEach(btn => {
            btn.addEventListener('click', handleSignIn);
        });
        
        // Sign out buttons
        const signOutButtons = document.querySelectorAll('#btn-signout, #btn-signout-2, .nav-signout');
        signOutButtons.forEach(btn => {
            btn.addEventListener('click', handleSignOut);
        });
        
        // Download buttons
        const downloadButtons = document.querySelectorAll('#btn-download, #btn-download-2, #btn-download-windows, #btn-download-mac');
        downloadButtons.forEach(btn => {
            btn.addEventListener('click', handleDownload);
        });
    }
    
    // Handle sign in (placeholder - integrate with your backend)
    function handleSignIn(e) {
        e.preventDefault();
        
        // Simulate Google OAuth sign-in
        // In production, integrate with Google OAuth API and your backend
        console.log('Initiating Google sign-in...');
        
        // Simulated successful sign-in
        setTimeout(() => {
            state.isAuthenticated = true;
            state.user = {
                email: 'user@example.com',
                name: 'User'
            };
            
            updateAuthUI();
            
            // Redirect to dashboard if on landing page
            if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
                window.location.href = 'download.html';
            }
        }, 500);
    }
    
    // Handle sign out
    function handleSignOut(e) {
        e.preventDefault();
        
        state.isAuthenticated = false;
        state.user = null;
        
        updateAuthUI();
        
        // Redirect to home page
        window.location.href = 'index.html';
    }
    
    // Handle download
    function handleDownload(e) {
        e.preventDefault();
        
        const platform = state.selectedPlatform || 'windows';
        console.log(`Downloading for ${platform}...`);
        
        // Show download notification
        showNotification('Download started! Check your downloads folder.', 'success');
        
        // In production, trigger actual download
        // window.location.href = `/api/download/${platform}`;
    }
    
    // Update UI based on auth state
    function updateAuthUI() {
        const downloadAreas = document.querySelectorAll('#download-area, #download-area-2');
        const signInButtons = document.querySelectorAll('#btn-signin, #btn-signin-2');
        const userEmailElements = document.querySelectorAll('#user-email-panel');
        const userNameElements = document.querySelectorAll('#user-name');
        
        if (state.isAuthenticated) {
            downloadAreas.forEach(area => area.style.display = 'flex');
            signInButtons.forEach(btn => btn.style.display = 'none');
            
            if (state.user) {
                userEmailElements.forEach(el => el.textContent = state.user.email);
                userNameElements.forEach(el => el.textContent = state.user.name);
            }
        } else {
            downloadAreas.forEach(area => area.style.display = 'none');
            signInButtons.forEach(btn => btn.style.display = 'inline-flex');
        }
    }
    
    // Check authentication state
    function checkAuthState() {
        // In production, check with your backend
        const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
        
        if (isAuthenticated) {
            state.isAuthenticated = true;
            state.user = {
                email: sessionStorage.getItem('userEmail') || 'user@example.com',
                name: sessionStorage.getItem('userName') || 'User'
            };
            updateAuthUI();
        }
    }
    
    // Cookie banner
    function setupCookieBanner() {
        const banner = document.getElementById('cookie-banner');
        if (!banner) return;
        
        const cookieAccepted = localStorage.getItem('cookieAccepted');
        
        if (!cookieAccepted) {
            setTimeout(() => {
                banner.classList.add('show');
            }, 1000);
        }
        
        document.getElementById('cookie-accept')?.addEventListener('click', () => {
            localStorage.setItem('cookieAccepted', 'true');
            banner.classList.remove('show');
        });
        
        document.getElementById('cookie-manage')?.addEventListener('click', () => {
            // Open cookie settings modal
            console.log('Open cookie settings');
        });
    }
    
    // Dashboard sidebar toggle
    function setupDashboardSidebar() {
        const sidebar = document.querySelector('.dashboard-sidebar');
        const toggle = document.querySelector('.sidebar-toggle');
        
        if (!sidebar || !toggle) return;
        
        toggle.addEventListener('click', () => {
            state.sidebarOpen = !state.sidebarOpen;
            sidebar.classList.toggle('open', state.sidebarOpen);
        });
    }
    
    // Tabs functionality
    function setupTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.dataset.tab;
                
                // Remove active class from all tabs and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Add active class to clicked tab and corresponding content
                button.classList.add('active');
                document.getElementById(`${tabId}-tab`)?.classList.add('active');
            });
        });
    }
    
    // Modal functionality
    function setupModals() {
        // Open modal
        document.querySelectorAll('[data-modal]').forEach(trigger => {
            trigger.addEventListener('click', () => {
                const modalId = trigger.dataset.modal;
                openModal(modalId);
            });
        });
        
        // Close modal buttons
        document.querySelectorAll('.modal-close').forEach(closeBtn => {
            closeBtn.addEventListener('click', () => {
                const modal = closeBtn.closest('.modal');
                closeModal(modal);
            });
        });
        
        // Close modal on backdrop click
        document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
            backdrop.addEventListener('click', () => {
                const modal = backdrop.closest('.modal');
                closeModal(modal);
            });
        });
        
        // Close modal on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.modal.show');
                if (openModal) closeModal(openModal);
            }
        });
    }
    
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Focus trap
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }
    }
    
    function closeModal(modal) {
        if (!modal) return;
        
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    // File upload
    function setupUpload() {
        const fileInput = document.getElementById('resume-file-input');
        const uploadBtn = document.getElementById('resume-upload-btn');
        const fileNameDisplay = document.getElementById('file-name');
        const uploadProgress = document.getElementById('upload-progress');
        const uploadSuccess = document.getElementById('upload-success');
        
        if (!fileInput || !uploadBtn) return;
        
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                fileNameDisplay.textContent = file.name;
                uploadBtn.disabled = false;
            }
        });
        
        uploadBtn.addEventListener('click', () => {
            const file = fileInput.files[0];
            if (!file) return;
            
            // Show progress
            uploadProgress.style.display = 'block';
            uploadSuccess.style.display = 'none';
            
            // Simulate upload progress
            let progress = 0;
            const progressFill = uploadProgress.querySelector('.progress-fill');
            const progressPercent = document.getElementById('progress-percent');
            
            const interval = setInterval(() => {
                progress += 10;
                progressFill.style.width = `${progress}%`;
                progressPercent.textContent = `${progress}%`;
                
                if (progress >= 100) {
                    clearInterval(interval);
                    
                    // Show success
                    setTimeout(() => {
                        uploadProgress.style.display = 'none';
                        uploadSuccess.style.display = 'flex';
                        
                        // Reset
                        setTimeout(() => {
                            fileInput.value = '';
                            fileNameDisplay.textContent = '';
                            uploadBtn.disabled = true;
                            uploadSuccess.style.display = 'none';
                            
                            // Add resume to list
                            addResumeToList(file.name);
                        }, 2000);
                    }, 500);
                }
            }, 200);
            
            // In production, upload to your backend
            // uploadFile(file);
        });
        
        // Drag and drop
        const dropzone = document.querySelector('.upload-dropzone');
        if (dropzone) {
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                dropzone.addEventListener(eventName, preventDefaults, false);
            });
            
            function preventDefaults(e) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            ['dragenter', 'dragover'].forEach(eventName => {
                dropzone.addEventListener(eventName, () => {
                    dropzone.style.borderColor = 'var(--color-primary)';
                    dropzone.style.backgroundColor = 'var(--color-primary-light)';
                });
            });
            
            ['dragleave', 'drop'].forEach(eventName => {
                dropzone.addEventListener(eventName, () => {
                    dropzone.style.borderColor = '';
                    dropzone.style.backgroundColor = '';
                });
            });
            
            dropzone.addEventListener('drop', (e) => {
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    fileInput.files = files;
                    fileInput.dispatchEvent(new Event('change'));
                }
            });
        }
    }
    
    function addResumeToList(fileName) {
        const resumesList = document.getElementById('resumes-list');
        if (!resumesList) return;
        
        // Remove empty state
        const emptyState = resumesList.querySelector('.empty-state-card');
        if (emptyState) emptyState.remove();
        
        // Generate unique ID
        const id = 'resume_' + Date.now();
        
        // Create resume card with modern design
        const card = document.createElement('div');
        card.className = 'resume-card-item';
        card.dataset.id = id;
        card.innerHTML = `
            <div class="resume-card-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M20 4H8a3 3 0 00-3 3v18a3 3 0 003 3h16a3 3 0 003-3V11l-7-7z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M20 4v7h7M17 17H10M17 21H10M12 13h-2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </div>
            <div class="resume-card-content">
                <h3 class="resume-card-title">${fileName}</h3>
                <p class="resume-card-meta">Uploaded just now</p>
            </div>
            <div class="resume-card-actions">
                <button class="btn btn-ghost btn-small resume-view-btn" data-testid="view-resume-${id}">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3C3 3 1 8 1 8s2 5 7 5 7-5 7-5-2-5-7-5z" stroke="currentColor" stroke-width="1.5"/>
                        <circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.5"/>
                    </svg>
                    View
                </button>
                <button class="btn btn-ghost btn-small resume-download-btn" data-testid="download-resume-${id}">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 2v8M8 10l-3-3M8 10l3-3M2 14h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <button class="btn btn-danger btn-small resume-delete-btn" data-testid="delete-resume-${id}">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2 4h12M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1M12 4v9a1 1 0 01-1 1H5a1 1 0 01-1-1V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        `;
        
        // Add event listeners
        card.querySelector('.resume-delete-btn').addEventListener('click', () => {
            deleteResume(id, fileName);
        });
        
        card.querySelector('.resume-download-btn').addEventListener('click', () => {
            showNotification(`Downloading ${fileName}...`, 'success');
        });
        
        card.querySelector('.resume-view-btn').addEventListener('click', () => {
            showNotification(`Opening ${fileName}...`, 'info');
        });
        
        resumesList.appendChild(card);
        
        // Save to state
        state.resumes.push({ id, fileName, uploadedAt: new Date() });
        saveResumes();
    }
    
    // Delete resume with confirmation
    function deleteResume(id, fileName) {
        if (confirm(`Are you sure you want to delete "${fileName}"? This action cannot be undone.`)) {
            const card = document.querySelector(`.resume-card-item[data-id="${id}"]`);
            if (card) {
                card.classList.add('deleting');
                setTimeout(() => {
                    card.remove();
                    state.resumes = state.resumes.filter(r => r.id !== id);
                    saveResumes();
                    showNotification(`"${fileName}" has been deleted.`, 'success');
                    
                    // Show empty state if no resumes left
                    const resumesList = document.getElementById('resumes-list');
                    if (resumesList && state.resumes.length === 0) {
                        resumesList.innerHTML = `
                            <div class="empty-state-card">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                    <path d="M28 8H12a4 4 0 00-4 4v24a4 4 0 004 4h24a4 4 0 004-4V20L28 8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M28 8v12h12M24 26h-8M28 18h-8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                                <p>No resumes yet</p>
                                <p class="empty-state-help">Upload your first resume to get started</p>
                            </div>
                        `;
                    }
                }, 300);
            }
        }
    }
    
    // Save resumes to localStorage
    function saveResumes() {
        localStorage.setItem('alphaview_resumes', JSON.stringify(state.resumes));
    }
    
    // Load resumes from localStorage
    function loadResumes() {
        const saved = localStorage.getItem('alphaview_resumes');
        if (saved) {
            state.resumes = JSON.parse(saved);
            const resumesList = document.getElementById('resumes-list');
            if (resumesList && state.resumes.length > 0) {
                resumesList.innerHTML = '';
                state.resumes.forEach(resume => {
                    addResumeToListFromStorage(resume);
                });
            }
        }
    }
    
    // Add resume from storage (helper function)
    function addResumeToListFromStorage(resume) {
        const resumesList = document.getElementById('resumes-list');
        if (!resumesList) return;
        
        const emptyState = resumesList.querySelector('.empty-state-card');
        if (emptyState) emptyState.remove();
        
        const card = document.createElement('div');
        card.className = 'resume-card-item';
        card.dataset.id = resume.id;
        
        const uploadDate = new Date(resume.uploadedAt);
        const timeAgo = getTimeAgo(uploadDate);
        
        card.innerHTML = `
            <div class="resume-card-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M20 4H8a3 3 0 00-3 3v18a3 3 0 003 3h16a3 3 0 003-3V11l-7-7z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M20 4v7h7M17 17H10M17 21H10M12 13h-2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </div>
            <div class="resume-card-content">
                <h3 class="resume-card-title">${resume.fileName}</h3>
                <p class="resume-card-meta">Uploaded ${timeAgo}</p>
            </div>
            <div class="resume-card-actions">
                <button class="btn btn-ghost btn-small resume-view-btn" data-testid="view-resume-${resume.id}">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3C3 3 1 8 1 8s2 5 7 5 7-5 7-5-2-5-7-5z" stroke="currentColor" stroke-width="1.5"/>
                        <circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.5"/>
                    </svg>
                    View
                </button>
                <button class="btn btn-ghost btn-small resume-download-btn" data-testid="download-resume-${resume.id}">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 2v8M8 10l-3-3M8 10l3-3M2 14h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <button class="btn btn-danger btn-small resume-delete-btn" data-testid="delete-resume-${resume.id}">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2 4h12M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1M12 4v9a1 1 0 01-1 1H5a1 1 0 01-1-1V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        `;
        
        card.querySelector('.resume-delete-btn').addEventListener('click', () => {
            deleteResume(resume.id, resume.fileName);
        });
        
        card.querySelector('.resume-download-btn').addEventListener('click', () => {
            showNotification(`Downloading ${resume.fileName}...`, 'success');
        });
        
        card.querySelector('.resume-view-btn').addEventListener('click', () => {
            showNotification(`Opening ${resume.fileName}...`, 'info');
        });
        
        resumesList.appendChild(card);
    }
    
    // Interview management functions
    function loadInterviews() {
        const saved = localStorage.getItem('alphaview_interviews');
        if (saved) {
            state.interviews = JSON.parse(saved);
            renderInterviews();
        }
    }
    
    function renderInterviews() {
        const tbody = document.getElementById('past-interviews-tbody');
        if (!tbody) return;
        
        if (state.interviews.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="empty-state">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                            <circle cx="24" cy="24" r="20" stroke="currentColor" stroke-width="2" opacity="0.2"/>
                            <path d="M24 16v12M24 32h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                        <p>No interviews yet</p>
                        <p class="empty-state-help">Your past interview sessions will appear here</p>
                    </td>
                </tr>
            `;
            return;
        }
        
        tbody.innerHTML = state.interviews.map(interview => `
            <tr data-interview-id="${interview.id}" data-testid="interview-row-${interview.id}">
                <td><strong>${interview.title}</strong></td>
                <td>${interview.description || '-'}</td>
                <td>${interview.duration || '-'}</td>
                <td>${interview.aiUsage || '0 min'}</td>
                <td>${getTimeAgo(new Date(interview.createdAt))}</td>
                <td>
                    <div class="table-actions">
                        <button class="btn btn-ghost btn-small interview-view-btn" data-id="${interview.id}" data-testid="view-interview-${interview.id}">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8 3C3 3 1 8 1 8s2 5 7 5 7-5 7-5-2-5-7-5z" stroke="currentColor" stroke-width="1.5"/>
                                <circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.5"/>
                            </svg>
                            View
                        </button>
                        <button class="btn btn-danger btn-small interview-delete-btn" data-id="${interview.id}" data-testid="delete-interview-${interview.id}">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M2 4h12M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1M12 4v9a1 1 0 01-1 1H5a1 1 0 01-1-1V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
        
        // Add event listeners
        tbody.querySelectorAll('.interview-view-btn').forEach(btn => {
            btn.addEventListener('click', () => viewInterview(btn.dataset.id));
        });
        
        tbody.querySelectorAll('.interview-delete-btn').forEach(btn => {
            btn.addEventListener('click', () => deleteInterview(btn.dataset.id));
        });
    }
    
    function viewInterview(id) {
        const interview = state.interviews.find(i => i.id === id);
        if (!interview) return;
        
        const modal = document.getElementById('transcript-modal');
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function deleteInterview(id) {
        const interview = state.interviews.find(i => i.id === id);
        if (!interview) return;
        
        if (confirm(`Are you sure you want to delete "${interview.title}"? This action cannot be undone.`)) {
            state.interviews = state.interviews.filter(i => i.id !== id);
            localStorage.setItem('alphaview_interviews', JSON.stringify(state.interviews));
            renderInterviews();
            showNotification(`"${interview.title}" has been deleted.`, 'success');
        }
    }
    
    // Time ago helper
    function getTimeAgo(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
        
        if (seconds < 60) return 'just now';
        if (seconds < 3600) return Math.floor(seconds / 60) + ' min ago';
        if (seconds < 86400) return Math.floor(seconds / 3600) + ' hours ago';
        if (seconds < 604800) return Math.floor(seconds / 86400) + ' days ago';
        
        return date.toLocaleDateString();
    }
    
    // Platform selector
    function setupPlatformSelector() {
        const platformButtons = document.querySelectorAll('.platform-btn');
        
        platformButtons.forEach(button => {
            button.addEventListener('click', () => {
                platformButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                state.selectedPlatform = button.dataset.platform;
                
                // Update download button text
                const downloadButton = document.getElementById('btn-download-windows');
                if (downloadButton) {
                    const platformName = state.selectedPlatform === 'windows' ? 'Windows' : 'Mac';
                    downloadButton.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 10l-3-3h2V3h2v4h2l-3 3zM2 13h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Download for ${platformName}
                    `;
                }
            });
        });
    }
    
    // Keyboard navigation
    function setupKeyboardNavigation() {
        // Tab trapping in modals is handled in setupModals
        
        // Skip to main content
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'sr-only';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add main content id
        const mainContent = document.querySelector('.hero, .dashboard-main');
        if (mainContent) {
            mainContent.id = 'main-content';
        }
    }
    
    // Show notification
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 24px;
            right: 24px;
            padding: 16px 24px;
            background-color: var(--color-${type === 'success' ? 'success' : 'primary'});
            color: white;
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // FAQ Accordion
    setupFAQ();
    
    function setupFAQ() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.closest('.faq-item');
                const isActive = faqItem.classList.contains('active');
                
                // Close all other FAQs
                document.querySelectorAll('.faq-item').forEach(item => {
                    if (item !== faqItem) {
                        item.classList.remove('active');
                    }
                });
                
                // Toggle current FAQ
                if (isActive) {
                    faqItem.classList.remove('active');
                } else {
                    faqItem.classList.add('active');
                }
            });
        });
    }
    
    // Expose video modal functions to global scope
    window.openVideoModal = openVideoModal;
    window.closeVideoModal = closeVideoModal;
    
    // Platform names mapping
    const platformNames = {
        'zoom': 'Zoom',
        'teams': 'Microsoft Teams',
        'meet': 'Google Meet',
        'webex': 'Webex',
        'chime': 'Amazon Chime',
        'coderpad': 'CoderPad.io',
        'hackerrank': 'HackerRank',
        'discord': 'Discord',
        'lark': 'Lark/Feishu',
        'slack': 'Slack Huddles'
    };
    
    // Video URLs storage - will be populated when videos are uploaded
    const platformVideos = {
        'zoom': null,
        'teams': null,
        'meet': null,
        'webex': null,
        'chime': null,
        'coderpad': null,
        'hackerrank': null,
        'discord': null,
        'lark': null,
        'slack': null
    };
    
    function openVideoModal(platform) {
        const modal = document.getElementById('videoModal');
        const title = document.getElementById('videoModalTitle');
        const subtitle = document.getElementById('videoModalSubtitle');
        const videoContainer = document.getElementById('videoContainer');
        
        if (!modal) return;
        
        // Update modal content
        const platformName = platformNames[platform] || platform;
        title.textContent = `${platformName} Demo`;
        subtitle.textContent = `Watch AlphaView AI in action on ${platformName}`;
        
        // Check if video exists for this platform
        const videoUrl = platformVideos[platform];
        
        if (videoUrl) {
            videoContainer.innerHTML = `
                <video controls autoplay>
                    <source src="${videoUrl}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
        } else {
            videoContainer.innerHTML = `
                <div class="video-placeholder">
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                        <circle cx="40" cy="40" r="38" stroke="currentColor" stroke-width="3" opacity="0.3"/>
                        <path d="M32 24v32l24-16-24-16z" fill="currentColor" opacity="0.5"/>
                    </svg>
                    <p>Video demo coming soon</p>
                    <span>Upload your demo video to showcase AlphaView AI on ${platformName}</span>
                </div>
            `;
        }
        
        // Show modal
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    function closeVideoModal() {
        const modal = document.getElementById('videoModal');
        const videoContainer = document.getElementById('videoContainer');
        
        if (!modal) return;
        
        // Stop any playing video
        const video = videoContainer.querySelector('video');
        if (video) {
            video.pause();
        }
        
        // Hide modal
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    // Close video modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeVideoModal();
        }
    });
})();