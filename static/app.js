// AlphaView AI - Client-side JavaScript for UI interactions

(function() {
    'use strict';
    
    // State management
    const state = {
        isAuthenticated: false,
        user: null,
        sidebarOpen: false
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
        checkAuthState();
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
        const downloadButtons = document.querySelectorAll('#btn-download, #btn-download-2, #btn-download-windows');
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
        
        // Create resume card
        const card = document.createElement('div');
        card.className = 'resume-card';
        card.innerHTML = `
            <div class="resume-info">
                <h3>${fileName}</h3>
                <p>Uploaded just now</p>
            </div>
            <div class="resume-actions">
                <button class="btn btn-outline btn-small">Download</button>
                <button class="btn btn-danger btn-small">Delete</button>
            </div>
        `;
        
        resumesList.appendChild(card);
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
})();