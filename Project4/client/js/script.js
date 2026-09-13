/**
 * ==========================================================================
 * NEXORA - VANILLA JAVASCRIPT ENGINE
 * Full Stack & Frontend Architecture Fundamentals
 * ==========================================================================
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. APPLICATION STATE & DATA
     ========================================================================== */

  // Engineering Tracks Catalog Data
  const API_BASE_URL = window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://api.myprod.com';
  let TRACKS_DATA = [];

  // Career Roadmap Stages Data
  const ROADMAP_STAGES = [
    {
      badge: 'Phase 01 · Core Milestone',
      title: 'Frontend Foundations & Clean Web Standards',
      desc: 'Focuses on writing semantic, zero-dependency HTML5/CSS3 and modular Vanilla JavaScript. You build accessible UI components, handle asynchronous API requests, and follow mobile-first responsive architecture principles.',
      skills: [
        'Accessible DOM & Semantic HTML5 Structure',
        'Modern CSS Grid, Flexbox & Fluid Typography (clamp)',
        'Asynchronous Fetch, Event Delegation & Local Storage',
        'Cross-Browser Compatibility & Responsive Audits'
      ],
      capstone: 'Signature Project: Responsive Design System & Interactive Application Catalog with full keyboard navigability and WCAG AA compliance.',
      time: 'Estimated Timeline: 4 - 6 Weeks dedicated practice'
    },
    {
      badge: 'Phase 02 · Mid-Level Milestone',
      title: 'Backend Systems, Data Modeling & API Design',
      desc: 'Design and deploy robust server-side applications. Master asynchronous event loops, relational database normalization, indexing, distributed caching with Redis, and enterprise authentication.',
      skills: [
        'Node.js Asynchronous Runtime & Non-blocking Streams',
        'PostgreSQL Query Optimization, Transactions & Indexing',
        'RESTful API Versioning, Error Handling & Validation',
        'JWT, OAuth2, Session Security & CORS Protocols'
      ],
      capstone: 'Signature Project: High-Throughput RESTful & GraphQL Microservice with Redis Cache Layer and automated integration tests.',
      time: 'Estimated Timeline: 6 - 8 Weeks dedicated practice'
    },
    {
      badge: 'Phase 03 · Senior Milestone',
      title: 'Cloud Infrastructure, Containers & Microservices',
      desc: 'Containerize multi-tier systems, orchestrate scalable workloads on Kubernetes clusters, and automate zero-downtime deployment pipelines with full telemetry and alerting.',
      skills: [
        'Docker Multi-Stage Builds & Container Security Hardening',
        'Kubernetes Deployments, Ingress, ConfigMaps & Persistent Volumes',
        'CI/CD Pipelines (GitHub Actions / GitLab) with automated testing',
        'Prometheus & Grafana Observability Dashboards'
      ],
      capstone: 'Signature Project: Multi-Node Kubernetes Production Cluster with automated blue/green rolling releases.',
      time: 'Estimated Timeline: 6 - 8 Weeks dedicated practice'
    },
    {
      badge: 'Phase 04 · Staff Architect Milestone',
      title: 'Distributed Systems & Engineering Leadership',
      desc: 'Architect high-scale, fault-tolerant distributed platforms. Design for high availability, disaster recovery, data consistency (CAP theorem), performance benchmarking, and team code rubrics.',
      skills: [
        'Distributed Consensus, Event-Driven Architecture & Message Queues',
        'High-Availability Cloud Architecture (AWS / GCP / Bare Metal)',
        'Comprehensive System Architecture Auditing & Threat Modeling',
        'Engineering Mentorship, Code Standards & Tech Strategy'
      ],
      capstone: 'Signature Project: End-to-End Enterprise SaaS Infrastructure with Multi-Region Failover & Automated Disaster Recovery.',
      time: 'Estimated Timeline: 8 - 10 Weeks dedicated practice'
    }
  ];

  // Retrieve stored bookmark IDs
  const initialSavedTracks = JSON.parse(
    localStorage.getItem('nexora_saved_tracks') || 
    localStorage.getItem('decodelabs_saved_tracks') || 
    '[]'
  );

  // Application State
  const state = {
    searchQuery: '',
    selectedCategory: 'all',
    selectedDifficulty: 'all',
    onlySaved: false,
    savedTrackIds: initialSavedTracks,
    activeModal: null,
    lastFocusedElement: null
  };

  /* ==========================================================================
     2. DOM ELEMENTS CACHE
     ========================================================================== */
  const DOM = {
    // Header & Navigation
    siteHeader: document.getElementById('site-header'),
    menuToggleBtn: document.getElementById('menu-toggle-btn'),
    mobileNavDrawer: document.getElementById('mobile-nav-drawer'),
    mobileNavBackdrop: document.getElementById('mobile-nav-backdrop'),
    drawerCloseBtn: document.getElementById('drawer-close-btn'),
    drawerLinks: document.querySelectorAll('.drawer-link'),
    navLinks: document.querySelectorAll('.nav-link'),
    bookmarkTrayBtn: document.getElementById('bookmark-tray-btn'),
    bookmarkCount: document.getElementById('bookmark-count'),
    savedFilterCount: document.getElementById('saved-filter-count'),

    // Catalog & Filter Elements
    searchInput: document.getElementById('track-search-input'),
    clearSearchBtn: document.getElementById('clear-search-btn'),
    categoryPills: document.querySelectorAll('.category-pills .pill-btn'),
    difficultyFilter: document.getElementById('difficulty-filter'),
    bookmarkFilterBtn: document.getElementById('bookmark-filter-btn'),
    resultsCountText: document.getElementById('results-count-text'),
    resetAllFiltersBtn: document.getElementById('reset-all-filters-btn'),
    tracksGrid: document.getElementById('tracks-grid'),
    tracksEmptyState: document.getElementById('tracks-empty-state'),
    emptyStateResetBtn: document.getElementById('empty-state-reset-btn'),

    // Curriculum Readiness & Tabs
    readinessPercent: document.getElementById('readiness-percent'),
    readinessStatus: document.getElementById('readiness-status'),
    readinessProgressFill: document.getElementById('readiness-progress-fill'),
    skillCheckboxes: document.querySelectorAll('.skill-checkbox'),
    tabButtons: document.querySelectorAll('.tab-btn'),
    tabPanels: document.querySelectorAll('.tab-panel'),

    // Career Roadmap Elements
    roadmapStepBtns: document.querySelectorAll('.step-btn'),
    roadmapBadge: document.getElementById('roadmap-badge'),
    roadmapTitle: document.getElementById('roadmap-title'),
    roadmapDesc: document.getElementById('roadmap-desc'),
    roadmapSkills: document.getElementById('roadmap-skills'),
    roadmapCapstone: document.getElementById('roadmap-capstone'),
    roadmapTime: document.getElementById('roadmap-time'),

    // FAQ Accordion Elements
    accordionTriggers: document.querySelectorAll('.accordion-trigger'),

    // Form Elements
    consultationForm: document.getElementById('consultation-form'),
    fullnameInput: document.getElementById('fullname'),
    emailInput: document.getElementById('email'),
    trackSelect: document.getElementById('preferred-track'),
    experienceRadios: document.querySelectorAll('input[name="experience"]'),
    messageTextarea: document.getElementById('message'),
    messageCharCount: document.getElementById('message-char-count'),
    termsCheckbox: document.getElementById('terms'),
    submitBtn: document.getElementById('submit-btn'),
    newsletterForm: document.getElementById('newsletter-form'),
    newsletterEmail: document.getElementById('newsletter-email'),
    newsletterFeedback: document.getElementById('newsletter-feedback'),

    // Modals
    modalBackdrop: document.getElementById('modal-backdrop'),
    trackModal: document.getElementById('track-modal'),
    modalCloseBtn: document.getElementById('modal-close-btn'),
    modalTrackTags: document.getElementById('modal-track-tags'),
    modalTrackTitle: document.getElementById('modal-track-title'),
    modalTrackDesc: document.getElementById('modal-track-desc'),
    modalTrackSpecs: document.getElementById('modal-track-specs'),
    modalTrackOutcomes: document.getElementById('modal-track-outcomes'),
    modalTrackCapstone: document.getElementById('modal-track-capstone'),
    modalBookmarkBtn: document.getElementById('modal-bookmark-btn'),
    modalBookmarkText: document.getElementById('modal-bookmark-text'),
    modalEnrollBtn: document.getElementById('modal-enroll-btn'),

    heroPreviewBtn: document.getElementById('hero-preview-btn'),
    tourModal: document.getElementById('tour-modal'),
    tourCloseBtn: document.getElementById('tour-close-btn'),
    tourDismissBtn: document.getElementById('tour-dismiss-btn'),
    tourExploreBtn: document.getElementById('tour-explore-btn'),

    bookmarksModal: document.getElementById('bookmarks-modal'),
    bookmarksCloseBtn: document.getElementById('bookmarks-close-btn'),
    bookmarksListContainer: document.getElementById('bookmarks-list-container'),
    clearAllBookmarksBtn: document.getElementById('clear-all-bookmarks-btn'),
    bookmarksDoneBtn: document.getElementById('bookmarks-done-btn'),

    // Toast Container & Back to Top
    toastContainer: document.getElementById('toast-container'),
    backToTopBtn: document.getElementById('back-to-top-btn'),
    currentYearSpan: document.getElementById('current-year')
  };

  /* ==========================================================================
     3. UTILITY FUNCTIONS
     ========================================================================== */

  // Debounce function for smooth search typing
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // Toast Notification Trigger
  function showToast(message, type = 'success') {
    if (!DOM.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'status');

    const iconSvg = type === 'success'
      ? `<svg class="toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
      : `<svg class="toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6C63FF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;

    toast.innerHTML = `
      ${iconSvg}
      <span class="toast-message">${escapeHtml(message)}</span>
    `;

    DOM.toastContainer.appendChild(toast);

    // Auto remove after 3.5 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 3500);
  }

  // HTML escaping utility for security
  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* ==========================================================================
     4. TRACK CATALOG RENDERING & FILTERING
     ========================================================================== */

  // Save/Unsave Track
  async function toggleTrackBookmark(trackId) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/bookmarks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackId })
      });
      const data = await res.json();
      
      const isBookmarked = data.data.bookmarked;
      
      if (isBookmarked) {
        if (!state.savedTrackIds.includes(trackId)) state.savedTrackIds.push(trackId);
        showToast('Track saved to your bookmarks', 'success');
      } else {
        state.savedTrackIds = state.savedTrackIds.filter(id => id !== trackId);
        showToast('Track removed from bookmarks', 'info');
      }
      
      localStorage.setItem('nexora_saved_tracks', JSON.stringify(state.savedTrackIds));
      updateBookmarkBadges();
      renderTracks();
      if (state.activeModal === DOM.trackModal) {
        updateModalBookmarkBtn(trackId);
      }
    } catch (err) {
      showToast('Error toggling bookmark', 'error');
    }
  } else {
      state.savedTrackIds.push(trackId);
      isSaved = true;
      showToast('Track saved to your NEXORA bookmarks!', 'success');
    }

    // Persist to localStorage
    localStorage.setItem('nexora_saved_tracks', JSON.stringify(state.savedTrackIds));
    try {
      const bookRes = await fetch(`${API_BASE_URL}/api/v1/bookmarks`);
      const bookData = await bookRes.json();
      if (bookData.status === 'success') {
        state.savedTrackIds = bookData.data.bookmarks.map(b => b.track.trackId);
        localStorage.setItem('nexora_saved_tracks', JSON.stringify(state.savedTrackIds));
      }
    } catch(e) {}
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/tracks`);
      const data = await res.json();
      if (data.status === 'success') {
        TRACKS_DATA = data.data.tracks;
      }
    } catch (e) {
      console.error(e);
    }
    updateBookmarkBadges();
    renderTracks();
    updateModalBookmarkBtn(trackId);
    renderBookmarksTray();
  }

  // Update Badge Counters
  function updateBookmarkBadges() {
    const count = state.savedTrackIds.length;
    if (DOM.bookmarkCount) {
      DOM.bookmarkCount.textContent = count;
      DOM.bookmarkTrayBtn.setAttribute('aria-label', `View saved bookmarks (${count} items)`);
    }
    if (DOM.savedFilterCount) {
      DOM.savedFilterCount.textContent = count;
    }
  }

  // Render Track Cards
  function renderTracks() {
    if (!DOM.tracksGrid) return;

    // Filter track list
    const filteredTracks = TRACKS_DATA.filter((track) => {
      // Category filter
      if (state.selectedCategory !== 'all' && track.category !== state.selectedCategory) {
        return false;
      }

      // Difficulty filter
      if (state.selectedDifficulty !== 'all') {
        if (state.selectedDifficulty === 'beginner' && !track.level.includes('beginner')) return false;
        if (state.selectedDifficulty === 'intermediate' && track.level !== 'intermediate') return false;
        if (state.selectedDifficulty === 'advanced' && track.level !== 'advanced') return false;
      }

      // Saved filter
      if (state.onlySaved && !state.savedTrackIds.includes(track.id)) {
        return false;
      }

      // Search Query
      if (state.searchQuery.trim() !== '') {
        const query = state.searchQuery.toLowerCase().trim();
        const matchesTitle = track.title.toLowerCase().includes(query);
        const matchesDesc = track.description.toLowerCase().includes(query);
        const matchesTags = track.tags.some(tag => tag.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDesc && !matchesTags) {
          return false;
        }
      }

      return true;
    });

    // Handle results count and empty states
    const hasResults = filteredTracks.length > 0;
    const isFiltered = state.searchQuery !== '' || state.selectedCategory !== 'all' || state.selectedDifficulty !== 'all' || state.onlySaved;

    if (DOM.resultsCountText) {
      DOM.resultsCountText.textContent = `Showing ${filteredTracks.length} of ${TRACKS_DATA.length} engineering tracks`;
    }

    if (DOM.resetAllFiltersBtn) {
      DOM.resetAllFiltersBtn.hidden = !isFiltered;
    }

    if (!hasResults) {
      DOM.tracksGrid.innerHTML = '';
      DOM.tracksEmptyState.hidden = false;
      return;
    }

    DOM.tracksEmptyState.hidden = true;

    // Render cards HTML
    DOM.tracksGrid.innerHTML = filteredTracks.map((track) => {
      const isBookmarked = state.savedTrackIds.includes(track.id);

      return `
        <article class="track-card" data-track-id="${track.id}" aria-labelledby="title-${track.id}">
          <div>
            <div class="track-card-header">
              <div class="card-badges">
                <span class="tag-badge tag-${track.category}">${escapeHtml(track.category)}</span>
                <span class="level-badge">${escapeHtml(track.levelLabel)}</span>
              </div>
              <button type="button" class="card-bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" data-bookmark-id="${track.id}" aria-label="${isBookmarked ? 'Remove' : 'Save'} ${escapeHtml(track.title)}">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </button>
            </div>

            <div class="track-card-body">
              <h3 class="track-card-title" id="title-${track.id}">${escapeHtml(track.title)}</h3>
              <p class="track-card-desc">${escapeHtml(track.description)}</p>
              <div class="track-card-specs">
                <span class="spec-item">⏱ ${escapeHtml(track.duration)}</span>
                <span class="spec-item">📚 ${escapeHtml(track.modules)}</span>
                <span class="spec-item">🛠 ${escapeHtml(track.projectsCount)}</span>
              </div>
            </div>
          </div>

          <div class="track-card-footer">
            <div class="card-rating" aria-label="Rated ${track.rating} out of 5 stars with ${track.ratingCount} reviews">
              <svg class="star-icon" width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <span>${track.rating}</span>
              <span class="rating-count">(${track.ratingCount})</span>
            </div>
            <button type="button" class="btn btn-secondary view-track-btn" data-view-id="${track.id}">
              View Syllabus
            </button>
          </div>
        </article>
      `;
    }).join('');

    // Attach Event Listeners to rendered cards
    DOM.tracksGrid.querySelectorAll('.card-bookmark-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-bookmark-id');
        toggleTrackBookmark(id);
      });
    });

    DOM.tracksGrid.querySelectorAll('.view-track-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-view-id');
        openTrackModal(id, btn);
      });
    });
  }

  // Reset Filters
  function resetAllFilters() {
    state.searchQuery = '';
    state.selectedCategory = 'all';
    state.selectedDifficulty = 'all';
    state.onlySaved = false;

    if (DOM.searchInput) DOM.searchInput.value = '';
    if (DOM.clearSearchBtn) DOM.clearSearchBtn.hidden = true;
    if (DOM.difficultyFilter) DOM.difficultyFilter.value = 'all';
    if (DOM.bookmarkFilterBtn) {
      DOM.bookmarkFilterBtn.classList.remove('active');
      DOM.bookmarkFilterBtn.setAttribute('aria-pressed', 'false');
    }

    DOM.categoryPills.forEach((pill) => {
      const isAll = pill.getAttribute('data-category') === 'all';
      pill.classList.toggle('active', isAll);
      pill.setAttribute('aria-selected', isAll ? 'true' : 'false');
    });

    renderTracks();
    showToast('Filters cleared to default catalog.', 'info');
  }

  /* ==========================================================================
     5. MODAL SYSTEM & FOCUS TRAPPING
     ========================================================================== */

  function openModal(modalElement, triggerElement) {
    if (!modalElement) return;

    // Ensure all other modals are hidden
    if (DOM.trackModal && DOM.trackModal !== modalElement) DOM.trackModal.hidden = true;
    if (DOM.tourModal && DOM.tourModal !== modalElement) DOM.tourModal.hidden = true;
    if (DOM.bookmarksModal && DOM.bookmarksModal !== modalElement) DOM.bookmarksModal.hidden = true;

    state.lastFocusedElement = triggerElement || document.activeElement;
    state.activeModal = modalElement;

    // Show backdrop & modal
    DOM.modalBackdrop.hidden = false;
    modalElement.hidden = false;
    document.body.style.overflow = 'hidden';

    // Trap focus inside modal
    const focusableElements = modalElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length > 0) {
      setTimeout(() => focusableElements[0].focus(), 50);
    }

    document.addEventListener('keydown', handleModalKeyDown);
  }

  function closeModal() {
    if (DOM.trackModal) DOM.trackModal.hidden = true;
    if (DOM.tourModal) DOM.tourModal.hidden = true;
    if (DOM.bookmarksModal) DOM.bookmarksModal.hidden = true;
    if (DOM.modalBackdrop) DOM.modalBackdrop.hidden = true;

    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleModalKeyDown);

    // Restore focus to triggering element
    if (state.lastFocusedElement && typeof state.lastFocusedElement.focus === 'function') {
      state.lastFocusedElement.focus();
    }

    state.activeModal = null;
  }

  function handleModalKeyDown(e) {
    if (e.key === 'Escape') {
      closeModal();
      return;
    }

    if (e.key === 'Tab' && state.activeModal) {
      const focusable = state.activeModal.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const firstElement = focusable[0];
      const lastElement = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  }

  // Populate & Open Track Modal
  function openTrackModal(trackId, triggerElement) {
    const track = TRACKS_DATA.find(t => t.id === trackId);
    if (!track) return;

    DOM.modalTrackTags.innerHTML = `
      <span class="tag-badge tag-${track.category}">${escapeHtml(track.category)}</span>
      <span class="level-badge">${escapeHtml(track.levelLabel)}</span>
    `;

    DOM.modalTrackTitle.textContent = track.title;
    DOM.modalTrackDesc.textContent = track.description;

    DOM.modalTrackSpecs.innerHTML = `
      <div class="modal-spec-card">
        <div class="modal-spec-label">Duration</div>
        <div class="modal-spec-value">${escapeHtml(track.duration)}</div>
      </div>
      <div class="modal-spec-card">
        <div class="modal-spec-label">Course Load</div>
        <div class="modal-spec-value">${escapeHtml(track.modules)}</div>
      </div>
      <div class="modal-spec-card">
        <div class="modal-spec-label">Capstones</div>
        <div class="modal-spec-value">${escapeHtml(track.projectsCount)}</div>
      </div>
      <div class="modal-spec-card">
        <div class="modal-spec-label">Student Rating</div>
        <div class="modal-spec-value">${track.rating} / 5.0</div>
      </div>
    `;

    DOM.modalTrackOutcomes.innerHTML = track.outcomes.map(outcome => `
      <li>${escapeHtml(outcome)}</li>
    `).join('');

    DOM.modalTrackCapstone.textContent = track.capstone;

    updateModalBookmarkBtn(track.id);

    DOM.modalBookmarkBtn.onclick = (e) => {
      e.stopPropagation();
      toggleTrackBookmark(track.id);
    };

    DOM.modalEnrollBtn.onclick = (e) => {
      e.stopPropagation();
      closeModal();
      if (DOM.trackSelect) {
        DOM.trackSelect.value = track.category === 'cloud' ? 'cloud' : (track.category === 'fullstack' ? 'fullstack' : track.category);
      }
    };

    openModal(DOM.trackModal, triggerElement);
  }

  function updateModalBookmarkBtn(trackId) {
    const isBookmarked = state.savedTrackIds.includes(trackId);
    if (DOM.modalBookmarkText) {
      DOM.modalBookmarkText.textContent = isBookmarked ? 'Bookmarked (Saved)' : 'Save Track';
    }
  }

  // Render Saved Bookmarks Tray
  function renderBookmarksTray() {
    if (!DOM.bookmarksListContainer) return;

    if (state.savedTrackIds.length === 0) {
      DOM.bookmarksListContainer.innerHTML = `
        <div style="text-align: center; padding: 2rem 1rem; color: var(--color-text-muted);">
          <p>You haven't saved any tracks yet.</p>
          <p style="font-size: 0.85rem; color: var(--color-text-light);">Click the bookmark icon on any track card in the catalog to pin it here.</p>
        </div>
      `;
      return;
    }

    const savedTracks = TRACKS_DATA.filter(t => state.savedTrackIds.includes(t.id));

    DOM.bookmarksListContainer.innerHTML = savedTracks.map(track => `
      <div class="bookmark-item-row">
        <div>
          <div class="bookmark-item-title">${escapeHtml(track.title)}</div>
          <span style="font-size: 0.75rem; color: var(--color-text-muted);">${escapeHtml(track.levelLabel)} · ${escapeHtml(track.duration)}</span>
        </div>
        <button type="button" class="bookmark-remove-btn" data-remove-id="${track.id}">Remove</button>
      </div>
    `).join('');

    DOM.bookmarksListContainer.querySelectorAll('.bookmark-remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-remove-id');
        toggleTrackBookmark(id);
      });
    });
  }

  /* ==========================================================================
     6. CURRICULUM READINESS & TABS
     ========================================================================== */

  function updateReadinessScore() {
    let totalScore = 0;
    DOM.skillCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        totalScore += parseInt(checkbox.getAttribute('data-weight') || '10', 10);
      }
    });

    // Cap at 100%
    const score = Math.min(100, totalScore);

    if (DOM.readinessPercent) {
      DOM.readinessPercent.textContent = `${score}%`;
    }
    if (DOM.readinessProgressFill) {
      DOM.readinessProgressFill.style.width = `${score}%`;
    }

    // Update Status Label
    if (DOM.readinessStatus) {
      if (score === 0) DOM.readinessStatus.textContent = 'Explorer Stage';
      else if (score < 40) DOM.readinessStatus.textContent = 'Foundation Stage';
      else if (score < 80) DOM.readinessStatus.textContent = 'Practitioner Level';
      else DOM.readinessStatus.textContent = 'Production Ready Architect! 🎉';
    }
  }

  function handleTabClick(targetBtn) {
    DOM.tabButtons.forEach((btn) => {
      const isActive = btn === targetBtn;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      btn.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    const targetPanelId = targetBtn.getAttribute('aria-controls');
    DOM.tabPanels.forEach((panel) => {
      const isMatch = panel.id === targetPanelId;
      panel.classList.toggle('active', isMatch);
      panel.hidden = !isMatch;
    });
  }

  // Keyboard navigation for Tabs (Left / Right Arrow Keys)
  function handleTabKeyDown(e) {
    const tabList = Array.from(DOM.tabButtons);
    const currentIndex = tabList.indexOf(document.activeElement);

    if (currentIndex === -1) return;

    let nextIndex = currentIndex;
    if (e.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % tabList.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + tabList.length) % tabList.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = tabList.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    tabList[nextIndex].focus();
    handleTabClick(tabList[nextIndex]);
  }

  /* ==========================================================================
     7. CAREER ROADMAP PROGRESSION
     ========================================================================== */

  function setRoadmapStage(stageIndex) {
    const stage = ROADMAP_STAGES[stageIndex];
    if (!stage) return;

    DOM.roadmapStepBtns.forEach((btn, idx) => {
      const isActive = idx === stageIndex;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    if (DOM.roadmapBadge) DOM.roadmapBadge.textContent = stage.badge;
    if (DOM.roadmapTitle) DOM.roadmapTitle.textContent = stage.title;
    if (DOM.roadmapDesc) DOM.roadmapDesc.textContent = stage.desc;

    if (DOM.roadmapSkills) {
      DOM.roadmapSkills.innerHTML = stage.skills.map(s => `<li>${escapeHtml(s)}</li>`).join('');
    }
    if (DOM.roadmapCapstone) {
      DOM.roadmapCapstone.innerHTML = `<strong>Signature Deliverable:</strong> ${escapeHtml(stage.capstone)}`;
    }
    if (DOM.roadmapTime) {
      DOM.roadmapTime.innerHTML = `<strong>Timeline:</strong> ${escapeHtml(stage.time)}`;
    }
  }

  /* ==========================================================================
     8. FAQ ACCORDION
     ========================================================================== */

  function handleAccordionToggle(trigger) {
    const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
    const panelId = trigger.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);
    const parentItem = trigger.closest('.accordion-item');

    // Close all other panels for clean accordion UX
    DOM.accordionTriggers.forEach((otherTrigger) => {
      if (otherTrigger !== trigger) {
        otherTrigger.setAttribute('aria-expanded', 'false');
        const otherPanelId = otherTrigger.getAttribute('aria-controls');
        const otherPanel = document.getElementById(otherPanelId);
        if (otherPanel) otherPanel.hidden = true;
        const otherParent = otherTrigger.closest('.accordion-item');
        if (otherParent) otherParent.classList.remove('active');
      }
    });

    // Toggle current
    trigger.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
    if (panel) panel.hidden = isExpanded;
    if (parentItem) parentItem.classList.toggle('active', !isExpanded);
  }

  /* ==========================================================================
     9. FORM VALIDATION & SUBMISSION
     ========================================================================== */

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function setFieldError(fieldId, errorId, message) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(errorId);
    if (field) {
      field.classList.add('invalid');
      field.setAttribute('aria-invalid', 'true');
    }
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('visible');
    }
  }

  function clearFieldError(fieldId, errorId) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(errorId);
    if (field) {
      field.classList.remove('invalid');
      field.removeAttribute('aria-invalid');
    }
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.remove('visible');
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    let isValid = true;

    // Validate Full Name
    const nameVal = DOM.fullnameInput.value.trim();
    if (!nameVal || nameVal.length < 2) {
      setFieldError('fullname', 'fullname-error', 'Please provide your full name (minimum 2 characters).');
      isValid = false;
    } else {
      clearFieldError('fullname', 'fullname-error');
    }

    // Validate Email
    const emailVal = DOM.emailInput.value.trim();
    if (!emailVal || !validateEmail(emailVal)) {
      setFieldError('email', 'email-error', 'Please enter a valid email address (e.g. name@domain.com).');
      isValid = false;
    } else {
      clearFieldError('email', 'email-error');
    }

    // Validate Track Selection
    if (!DOM.trackSelect.value) {
      setFieldError('preferred-track', 'track-error', 'Please select a primary track of interest.');
      isValid = false;
    } else {
      clearFieldError('preferred-track', 'track-error');
    }

    // Validate Experience Radio
    let experienceSelected = false;
    DOM.experienceRadios.forEach(radio => {
      if (radio.checked) experienceSelected = true;
    });

    const expError = document.getElementById('experience-error');
    if (!experienceSelected) {
      if (expError) {
        expError.textContent = 'Please select your current experience level.';
        expError.classList.add('visible');
      }
      isValid = false;
    } else {
      if (expError) {
        expError.textContent = '';
        expError.classList.remove('visible');
      }
    }

    // Validate Terms Checkbox
    const termsError = document.getElementById('terms-error');
    if (!DOM.termsCheckbox.checked) {
      if (termsError) {
        termsError.textContent = 'You must agree to the syllabus & program terms to continue.';
        termsError.classList.add('visible');
      }
      isValid = false;
    } else {
      if (termsError) {
        termsError.textContent = '';
        termsError.classList.remove('visible');
      }
    }

    if (!isValid) return;

    // Simulate Async Submission
    const submitText = DOM.submitBtn.querySelector('.submit-text');
    const spinner = DOM.submitBtn.querySelector('.spinner');
    if (submitText) submitText.textContent = 'Processing Application...';
    if (spinner) spinner.hidden = false;
    DOM.submitBtn.disabled = true;

    fetch(`${API_BASE_URL}/api/v1/consultations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: nameVal, email: emailVal, message: DOM.messageTextarea.value })
    })
    .then(res => res.json())
    .then(data => {
      if (submitText) submitText.textContent = 'Submit Application Request';
      if (spinner) spinner.hidden = true;
      DOM.submitBtn.disabled = false;
      DOM.consultationForm.reset();
      if (DOM.messageCharCount) DOM.messageCharCount.textContent = '0 / 250';
      showToast(`Thank you, ${nameVal}! Your syllabus request and consultation have been scheduled.`, 'success');
    })
    .catch(err => {
      if (submitText) submitText.textContent = 'Submit Application Request';
      if (spinner) spinner.hidden = true;
      DOM.submitBtn.disabled = false;
      showToast('There was an error submitting your request.', 'error');
    });
  }

  /* ==========================================================================
     10. MOBILE OFF-CANVAS DRAWER
     ========================================================================== */

  function openMobileNav() {
    DOM.mobileNavDrawer.classList.add('open');
    DOM.mobileNavBackdrop.classList.add('open');
    DOM.mobileNavDrawer.setAttribute('aria-hidden', 'false');
    DOM.mobileNavBackdrop.setAttribute('aria-hidden', 'false');
    DOM.menuToggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    DOM.mobileNavDrawer.classList.remove('open');
    DOM.mobileNavBackdrop.classList.remove('open');
    DOM.mobileNavDrawer.setAttribute('aria-hidden', 'true');
    DOM.mobileNavBackdrop.setAttribute('aria-hidden', 'true');
    DOM.menuToggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  /* ==========================================================================
     11. EVENT LISTENERS INITIALIZATION
     ========================================================================== */

  function initEventListeners() {
    // Search input with debounce
    if (DOM.searchInput) {
      DOM.searchInput.addEventListener(
        'input',
        debounce((e) => {
          state.searchQuery = e.target.value;
          if (DOM.clearSearchBtn) {
            DOM.clearSearchBtn.hidden = state.searchQuery === '';
          }
          renderTracks();
        }, 150)
      );
    }

    if (DOM.clearSearchBtn) {
      DOM.clearSearchBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        DOM.searchInput.value = '';
        state.searchQuery = '';
        DOM.clearSearchBtn.hidden = true;
        DOM.searchInput.focus();
        renderTracks();
      });
    }

    // Category Filter Pills
    DOM.categoryPills.forEach((pill) => {
      pill.addEventListener('click', () => {
        const category = pill.getAttribute('data-category');
        state.selectedCategory = category;

        DOM.categoryPills.forEach(p => {
          const isActive = p === pill;
          p.classList.toggle('active', isActive);
          p.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        renderTracks();
      });
    });

    // Difficulty Dropdown Filter
    if (DOM.difficultyFilter) {
      DOM.difficultyFilter.addEventListener('change', (e) => {
        state.selectedDifficulty = e.target.value;
        renderTracks();
      });
    }

    // Bookmark Only Filter Toggle
    if (DOM.bookmarkFilterBtn) {
      DOM.bookmarkFilterBtn.addEventListener('click', () => {
        state.onlySaved = !state.onlySaved;
        DOM.bookmarkFilterBtn.classList.toggle('active', state.onlySaved);
        DOM.bookmarkFilterBtn.setAttribute('aria-pressed', state.onlySaved ? 'true' : 'false');
        renderTracks();
      });
    }

    // Reset Buttons
    if (DOM.resetAllFiltersBtn) {
      DOM.resetAllFiltersBtn.addEventListener('click', resetAllFilters);
    }
    if (DOM.emptyStateResetBtn) {
      DOM.emptyStateResetBtn.addEventListener('click', resetAllFilters);
    }

    // Curriculum Checkbox Matrix
    DOM.skillCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', updateReadinessScore);
    });

    // Curriculum Tabs
    DOM.tabButtons.forEach((btn) => {
      btn.addEventListener('click', () => handleTabClick(btn));
      btn.addEventListener('keydown', handleTabKeyDown);
    });

    // Roadmap Stepper Buttons
    DOM.roadmapStepBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const step = parseInt(btn.getAttribute('data-step') || '0', 10);
        setRoadmapStage(step);
      });
    });

    // FAQ Accordion Triggers
    DOM.accordionTriggers.forEach((trigger) => {
      trigger.addEventListener('click', () => handleAccordionToggle(trigger));
    });

    // Form Live Inputs
    if (DOM.fullnameInput) {
      DOM.fullnameInput.addEventListener('input', () => clearFieldError('fullname', 'fullname-error'));
    }
    if (DOM.emailInput) {
      DOM.emailInput.addEventListener('input', () => clearFieldError('email', 'email-error'));
    }
    if (DOM.trackSelect) {
      DOM.trackSelect.addEventListener('change', () => clearFieldError('preferred-track', 'track-error'));
    }
    if (DOM.termsCheckbox) {
      DOM.termsCheckbox.addEventListener('change', () => {
        const termsError = document.getElementById('terms-error');
        if (DOM.termsCheckbox.checked && termsError) {
          termsError.textContent = '';
          termsError.classList.remove('visible');
        }
      });
    }

    // Message Character Counter
    if (DOM.messageTextarea && DOM.messageCharCount) {
      DOM.messageTextarea.addEventListener('input', (e) => {
        const length = e.target.value.length;
        DOM.messageCharCount.textContent = `${length} / 250`;
      });
    }

    // Consultation Form Submit
    if (DOM.consultationForm) {
      DOM.consultationForm.addEventListener('submit', handleFormSubmit);
    }

    // Newsletter Form
    if (DOM.newsletterForm) {
      DOM.newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = DOM.newsletterEmail.value.trim();
        if (!validateEmail(email)) {
          DOM.newsletterFeedback.textContent = 'Please enter a valid email address.';
          DOM.newsletterFeedback.className = 'newsletter-feedback error';
          return;
        }

        DOM.newsletterFeedback.textContent = '✓ Subscribed to NEXORA Dispatch!';
        DOM.newsletterFeedback.className = 'newsletter-feedback success';
        DOM.newsletterForm.reset();
        showToast('Subscribed to the NEXORA Architecture Dispatch!', 'success');
      });
    }

    // Modal Close Buttons
    if (DOM.modalCloseBtn) {
      DOM.modalCloseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
      });
    }
    if (DOM.tourCloseBtn) {
      DOM.tourCloseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
      });
    }
    if (DOM.tourDismissBtn) {
      DOM.tourDismissBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
      });
    }
    if (DOM.tourExploreBtn) {
      DOM.tourExploreBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
      });
    }
    if (DOM.modalBackdrop) {
      DOM.modalBackdrop.addEventListener('click', closeModal);
    }

    // Hero Preview / Tour Trigger
    if (DOM.heroPreviewBtn) {
      DOM.heroPreviewBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(DOM.tourModal, DOM.heroPreviewBtn);
      });
    }

    // Bookmarks Tray Trigger & Actions
    if (DOM.bookmarkTrayBtn) {
      DOM.bookmarkTrayBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        renderBookmarksTray();
        openModal(DOM.bookmarksModal, DOM.bookmarkTrayBtn);
      });
    }
    if (DOM.bookmarksCloseBtn) {
      DOM.bookmarksCloseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
      });
    }
    if (DOM.bookmarksDoneBtn) {
      DOM.bookmarksDoneBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
      });
    }
    if (DOM.clearAllBookmarksBtn) {
      DOM.clearAllBookmarksBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        state.savedTrackIds = [];
        localStorage.removeItem('nexora_saved_tracks');
        localStorage.removeItem('decodelabs_saved_tracks');
        try {
      const res = await fetch(`${API_BASE_URL}/api/v1/tracks`);
      const data = await res.json();
      if (data.status === 'success') {
        TRACKS_DATA = data.data.tracks;
      }
    } catch (e) {
      console.error(e);
    }
    updateBookmarkBadges();
        renderTracks();
        renderBookmarksTray();
        showToast('Cleared all saved bookmarks.', 'info');
      });
    }

    // Mobile Navigation Toggle
    if (DOM.menuToggleBtn) {
      DOM.menuToggleBtn.addEventListener('click', () => {
        const isOpen = DOM.mobileNavDrawer.classList.contains('open');
        if (isOpen) closeMobileNav();
        else openMobileNav();
      });
    }
    if (DOM.drawerCloseBtn) {
      DOM.drawerCloseBtn.addEventListener('click', closeMobileNav);
    }
    if (DOM.mobileNavBackdrop) {
      DOM.mobileNavBackdrop.addEventListener('click', closeMobileNav);
    }
    DOM.drawerLinks.forEach((link) => {
      link.addEventListener('click', closeMobileNav);
    });

    // Back to Top Button
    if (DOM.backToTopBtn) {
      DOM.backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Header Scroll State & Scrollspy
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (DOM.siteHeader) {
        DOM.siteHeader.classList.toggle('scrolled', scrollY > 20);
      }

      // ScrollSpy Active Link Update
      const sections = ['hero', 'tracks', 'curriculum', 'roadmap', 'contact'];
      let currentSection = '';

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            currentSection = id;
          }
        }
      });

      DOM.navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === `#${currentSection}`);
      });
    }, { passive: true });
  }

  /* ==========================================================================
     12. INITIALIZATION ON DOM READY
     ========================================================================== */

  async function init() {
    // Render Year in Footer
    if (DOM.currentYearSpan) {
      DOM.currentYearSpan.textContent = new Date().getFullYear();
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/tracks`);
      const data = await res.json();
      if (data.status === 'success') {
        TRACKS_DATA = data.data.tracks;
      }
    } catch (e) {
      console.error(e);
    }
    updateBookmarkBadges();
    renderTracks();
    updateReadinessScore();
    setRoadmapStage(0);
    initEventListeners();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
