# NEXORA — Responsive Frontend Interface

> **Built for DecodeLabs Project 1**  
> Tagline: *Build. Explore. Create.*  
> A production-grade, accessible, and responsive developer interface built strictly with core web fundamentals: **HTML5**, **CSS3**, and **Vanilla JavaScript** (Zero Frameworks, Zero CSS Libraries, Zero External Dependencies).

---

## 🎯 Project Overview

**NEXORA** is a modern, futuristic developer product landing page and interactive curriculum interface created to demonstrate mastery of modern frontend fundamentals. It features a dark-tech aesthetic, a curated catalog of engineering tracks, an interactive curriculum matrix with dynamic readiness scoring, an architectural trajectory roadmap, an accessible FAQ accordion, and an admissions consultation form with real-time field validation.

---

## 🛠️ Technology Stack

| Layer | Implementation | Details |
|---|---|---|
| **Markup** | HTML5 Semantic Elements | `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, ARIA landmark roles, and accessible dialogs. |
| **Styling** | Modern Vanilla CSS3 | Dark Futuristic design system, CSS Custom Properties (Tokens), CSS Grid layouts, Flexbox alignments, `clamp()` fluid typography, and hardware-accelerated transitions. |
| **Interactivity** | Vanilla JavaScript (ES6+) | Modular IIFE architecture, debounced catalog search, multi-faceted filtering, `localStorage` bookmarking, focus-trapped accessible modals, dynamic readiness benchmarks, and real-time form validation. |
| **Dependencies** | Zero External Libraries | No React, Vue, Next.js, Bootstrap, Tailwind, or jQuery. |

---

## 🎨 Design System & Color Palette

A **futuristic, developer-focused, and premium** visual direction:

- **Cyber Obsidian Background (`#080B14`)**: Deep, low-fatigue dark base with subtle ambient glows.
- **Layered Navy Surface (`#0E1322` / `#12182A` / `#171F35`)**: High-contrast card surfaces with thin translucent glass borders (`rgba(255, 255, 255, 0.10)`).
- **Cyber Indigo (`#6C63FF`)**: Primary vibrant accent for interactive buttons, badges, and gradient highlights.
- **Electric Cyan (`#00D4FF`)**: Secondary glow accent for active states, focus indicators, and technical metrics.
- **Soft Lavender (`#A78BFA`)**: Gradient text highlights and milestone badges.
- **Crisp Text (`#F5F7FF` & `#A7B0C5`)**: High-contrast typography meeting WCAG AA guidelines.

### Typography
- **Font Family**: `Inter` (Weights: 400, 500, 600, 700, 800) — High legibility across screen densities.
- **Fluid Scale**: Managed with `clamp()` for headings and body across all viewports.

---

## 🚀 Key Features

1. **Responsive Header & Accessible Navigation**:
   - Minimalist dark glass navbar with blur effect on scroll.
   - Off-canvas mobile navigation drawer with trap focus and backdrop dismissal.
   - Live ScrollSpy active section indicator.
   - Quick-access Saved Bookmarks drawer badge counter.

2. **Hero Section with Floating Futuristic UI**:
   - High-impact value proposition: *"Build Interfaces That Feel Future-Ready."*
   - Dual CTAs: *"Explore Project"* & *"View Features"*.
   - Floating interactive badges and syntax-highlighted `nexoraEngine` terminal.

3. **Interactive Tracks & Project Catalog**:
   - **Real-Time Search**: Debounced search across title, description, and keywords.
   - **Category Pills**: Instant filtering across *Frontend*, *Backend*, *Cloud & DevOps*, and *Full Stack*.
   - **Difficulty Dropdown**: Filter by *Beginner*, *Intermediate*, or *Advanced*.
   - **Bookmarking Engine**: Save/remove tracks with instant `localStorage` persistence and toast alerts.
   - **Curriculum Details Modal**: Opens full syllabus breakdown, specs, and capstone deliverables.

4. **Curriculum Matrix & Skills Readiness Benchmark**:
   - Accessible ARIA Tabs (`role="tablist"`, keyboard Left/Right Arrow navigation).
   - Interactive competency checklist that dynamically calculates readiness percentage (`0% - 100%`) and updates the progress meter in real time.

5. **Interactive Career Trajectory Roadmap**:
   - 4-phase interactive stepper (`Junior` → `Mid-Level` → `Senior` → `Staff Architect`).
   - Dynamically updates competencies, timeline, and signature capstones.

6. **Accessible FAQ Accordion**:
   - Smooth accordion panels with `aria-expanded` and `aria-controls`.
   - Single-open accordion pattern for focused reading.

7. **Admissions & Consultation Form**:
   - Real-time inline field validation (Full Name, Email regex, Track Select, Experience Level, Terms Checkbox).
   - Dynamic character counter for goals textarea (`0 / 250`).
   - Accessible `aria-invalid` and `aria-describedby` error announcements.
   - Simulated async submission with loading spinner and success toast notification.

8. **Footer & Architecture Dispatch**:
   - Multi-column semantic footer with newsletter validation, social links, accessibility badge, and smooth "Back to Top" scrolling.

---

## 📱 Responsive Testing & Breakpoints

The project strictly follows a **mobile-first** development workflow:

- **Mobile Viewports (320px, 375px, 390px, 430px)**: Compact off-canvas menu, vertically stacked cards, fluid typography, no horizontal scroll.
- **Tablet Viewport (768px)**: 2-column track card grid, horizontal category controls, 3-column tab headers.
- **Desktop & Wide Displays (1024px, 1280px, 1440px+)**: Full multi-column grid layouts, side-by-side hero and form layouts, and expansive footer grid.

---

## ♿ Accessibility (WCAG 2.1 AA)

- **Keyboard Navigable**: All interactive elements (drawer, modals, tabs, accordion, checkboxes, forms) are 100% operable via keyboard.
- **Focus Management**: Visible focus rings (`:focus-visible`), modal focus trapping, and focus restoration to invoking buttons on modal dismissal.
- **ARIA Semantics**: `role="dialog"`, `aria-modal="true"`, `role="tablist"`, `role="tabpanel"`, `role="region"`, and live region announcements for search results and toast messages.
- **Motion Accessibility**: `@media (prefers-reduced-motion: reduce)` disables animations and smooth scrolling for users with motion sensitivities.

---

## 📁 Project Structure

```
d:/New folder/
├── index.html        # Semantic HTML5 document
├── css/
│   └── style.css     # CSS3 stylesheet with futuristic dark design tokens, Grid & Flexbox
├── js/
│   └── script.js     # Modular Vanilla JavaScript ES6+ application engine
└── README.md         # Documentation and project guide
```

---

## 🏃 How to Run the Project

### Method 1: Local HTTP Server (Recommended)
```bash
# Using Python 3
python -m http.server 8080

# OR using Node.js npx
npx serve .
```
Navigate to:
```
http://localhost:8080
```

### Method 2: Direct File Open
Double click `index.html` in your file manager to open it directly in any modern browser.
