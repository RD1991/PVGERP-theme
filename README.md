# PVG COET&M — ERP Theme

Official shared UI theme for **PVG's College of Engineering, Technology and Management, Pune** ERP system.

Built from brand colours, logo and typography extracted directly from [pvgcoet.ac.in](https://www.pvgcoet.ac.in/).

---

## Files

| File | Purpose |
|------|---------|
| `pvg-erp-theme.css` | **All styles** — design tokens, layout, components, utilities |
| `pvg-erp-theme.js` | **All interactivity** — sidebar, modal, toast, notifications, validation |
| `pvg-erp-theme.html` | Live demo / kitchen-sink showing every component |
| `assets/logos/pvgcoet-icon-180.jpg` | Square 180×180 logo — sidebar circle, app icon |
| `assets/logos/pvgcoet-logo.jpg` | Horizontal wordmark 520×103 — headers, documents |

---

## Quick Start — any module

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Poppins font (required) -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

  <!-- Font Awesome (required for icons) -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

  <!-- ★ PVG ERP Theme -->
  <link rel="stylesheet" href="https://raw.githubusercontent.com/RD1991/PVGERP-theme/main/pvg-erp-theme.css" />
</head>
<body>

  <!-- your module HTML here -->

  <!-- ★ PVG ERP Theme JS -->
  <script src="https://raw.githubusercontent.com/RD1991/PVGERP-theme/main/pvg-erp-theme.js"></script>
</body>
</html>
```

> **Tip:** Once deployed to GitHub Pages or a CDN, replace the raw GitHub URLs with the hosted URL. Raw GitHub links are fine for development.

---

## Brand Tokens

All values are CSS custom properties on `:root`. Override any token in your module's own stylesheet.

```css
:root {
  --pvg-navy:        #003A6A;   /* Primary brand — sidebar, headings, buttons */
  --pvg-navy-dark:   #002650;   /* Hover / active states */
  --pvg-navy-light:  #004e8f;   /* Gradient end, avatar backgrounds */
  --pvg-dark:        #2D2D2D;   /* Body text, secondary button */
  --pvg-blue-mid:    #72acdc;   /* Active sidebar border, info colour */
  --pvg-surface:     #f4f6f9;   /* Page background */
  --pvg-card:        #ffffff;   /* Card / panel background */
  --pvg-border:      #d9dee6;   /* Default borders */
  --pvg-text:        #444444;   /* Body text */
  --pvg-text-muted:  #707070;   /* Secondary text */
  --pvg-success:     #28a745;
  --pvg-warning:     #ffc107;
  --pvg-danger:      #f52846;
  --pvg-info:        #72acdc;
  --sidebar-w:       260px;
  --topbar-h:        64px;
  --radius:          8px;
}
```

Font: **Poppins** (Google Fonts) — weights 300, 400, 500, 600, 700, 800.

---

## Layout Shell

Every module page should use this layout skeleton:

```html
<aside class="pvg-sidebar">
  <div class="pvg-sidebar__brand">
    <img class="pvg-sidebar__logo" src="assets/logos/pvgcoet-icon-180.jpg" alt="PVG Logo" />
    <div class="pvg-sidebar__brand-text">
      <h2>PVG COET&M</h2>
      <span>Module Name</span>          <!-- change per module -->
    </div>
  </div>

  <nav class="pvg-sidebar__nav">
    <div class="pvg-nav-label">Section</div>
    <a class="pvg-nav-item pvg-nav-item--active" href="/">
      <i class="fa-solid fa-gauge-high"></i>
      <span class="pvg-nav-item__text">Dashboard</span>
    </a>
    <!-- more items -->
  </nav>

  <div class="pvg-sidebar__footer">
    <div class="pvg-avatar pvg-avatar--md">AB</div>
    <div class="pvg-sidebar__user-info">
      <p>User Name</p>
      <span>Role</span>
    </div>
    <i class="fa-solid fa-right-from-bracket pvg-sidebar__logout"></i>
  </div>
</aside>

<header class="pvg-topbar">
  <button class="pvg-topbar__btn" data-pvg-sidebar-toggle>
    <i class="fa-solid fa-bars"></i>
  </button>
  <!-- breadcrumb, search, actions, profile -->
</header>

<main class="pvg-main" data-pvg-page="Module / Page Name">
  <!-- content -->
</main>
```

---

## Components

### Card

```html
<div class="pvg-card">
  <div class="pvg-card__header">
    <div>
      <div class="pvg-card__title">Card Title</div>
      <div class="pvg-card__subtitle">Supporting text</div>
    </div>
    <button class="pvg-card__action">Action <i class="fa-solid fa-arrow-right"></i></button>
  </div>
  <div class="pvg-card__body">
    <!-- content -->
  </div>
</div>
```

### Stat Card

```html
<div class="pvg-stat-card pvg-stat-card--navy">   <!-- --navy | --success | --warning | --danger -->
  <div class="pvg-stat-card__header">
    <div class="pvg-stat-card__icon"><i class="fa-solid fa-users"></i></div>
    <span class="pvg-stat-card__trend pvg-stat-card__trend--up">+4.2%</span>
  </div>
  <div class="pvg-stat-card__value">2,847</div>
  <div class="pvg-stat-card__label">Total Students</div>
</div>
```

### Buttons

```html
<button class="pvg-btn pvg-btn--primary">Primary</button>
<button class="pvg-btn pvg-btn--secondary">Secondary</button>
<button class="pvg-btn pvg-btn--outline">Outline</button>
<button class="pvg-btn pvg-btn--ghost">Ghost</button>
<button class="pvg-btn pvg-btn--success">Approve</button>
<button class="pvg-btn pvg-btn--danger">Reject</button>

<!-- Sizes -->
<button class="pvg-btn pvg-btn--primary pvg-btn--sm">Small</button>
<button class="pvg-btn pvg-btn--primary pvg-btn--lg">Large</button>
```

### Badges / Pills

```html
<!-- Colour badges -->
<span class="pvg-badge pvg-badge--navy">New</span>
<span class="pvg-badge pvg-badge--success">Verified</span>
<span class="pvg-badge pvg-badge--warning">Pending</span>
<span class="pvg-badge pvg-badge--danger">Overdue</span>

<!-- Status pills (with dot) -->
<span class="pvg-pill pvg-pill--active">Active</span>
<span class="pvg-pill pvg-pill--pending">Pending</span>
<span class="pvg-pill pvg-pill--inactive">Inactive</span>

<!-- Department badges -->
<span class="pvg-dept pvg-dept--comp">Computer Engineering</span>
<span class="pvg-dept pvg-dept--mech">Mechanical</span>
<span class="pvg-dept pvg-dept--elec">Electrical</span>
<span class="pvg-dept pvg-dept--etc">E&amp;TC</span>
<span class="pvg-dept pvg-dept--it">IT Engineering</span>
<span class="pvg-dept pvg-dept--aids">AI &amp; Data Science</span>
<span class="pvg-dept pvg-dept--mba">MBA</span>
<span class="pvg-dept pvg-dept--print">Printing &amp; Packaging</span>
```

### Form Controls

```html
<div class="pvg-form-grid-3">   <!-- or pvg-form-grid-2 / pvg-form-grid-4 -->
  <div class="pvg-form-group">
    <label>Label <sup style="color:var(--pvg-danger)">*</sup></label>
    <input class="pvg-form-control" type="text" placeholder="..." required />
    <span class="pvg-form-hint">Optional hint text</span>
  </div>
  <div class="pvg-form-group">
    <label>Select</label>
    <select class="pvg-form-control">
      <option>Option 1</option>
    </select>
  </div>
</div>
```

### Alerts

```html
<div class="pvg-alert pvg-alert--info">    <i class="fa-solid fa-circle-info"></i>    Info message</div>
<div class="pvg-alert pvg-alert--success"> <i class="fa-solid fa-circle-check"></i>   Success message</div>
<div class="pvg-alert pvg-alert--warning"> <i class="fa-solid fa-triangle-exclamation"></i> Warning</div>
<div class="pvg-alert pvg-alert--danger">  <i class="fa-solid fa-circle-xmark"></i>   Error message</div>
```

### Data Table

```html
<table class="pvg-table" data-pvg-sortable>
  <thead><tr><th>Name</th><th>Dept</th><th>Status</th></tr></thead>
  <tbody>
    <tr><td>...</td><td>...</td><td>...</td></tr>
  </tbody>
</table>
```

### Modal

```html
<!-- Trigger -->
<button class="pvg-btn pvg-btn--primary" data-pvg-modal-open="myModal">Open</button>

<!-- Modal -->
<div class="pvg-modal-overlay" id="myModal">
  <div class="pvg-modal">
    <div class="pvg-modal__header">
      <span class="pvg-modal__title">Modal Title</span>
      <button class="pvg-modal__close" data-pvg-modal-close><i class="fa-solid fa-xmark"></i></button>
    </div>
    <div class="pvg-modal__body">
      <!-- content -->
    </div>
    <div class="pvg-modal__footer">
      <button class="pvg-btn pvg-btn--ghost" data-pvg-modal-close>Cancel</button>
      <button class="pvg-btn pvg-btn--primary">Confirm</button>
    </div>
  </div>
</div>
```

---

## JavaScript API (`PVG` global)

```js
// Toast notification
PVG.Toast.show('Message text', 'success');   // type: success | danger | warning | info
PVG.Toast.show('Error!', 'danger', 5000);    // custom duration in ms

// Confirm dialog
PVG.Confirm.show({
  title:     'Delete Record',
  message:   'This cannot be undone.',
  danger:    true,                           // red confirm button
  onConfirm: () => { /* do work */ },
  onCancel:  () => { /* optional */ }
});

// Modal (programmatic)
PVG.Modal.open('myModal');
PVG.Modal.close('myModal');

// Notification badge
PVG.Notifications.setBadge(5);   // show 5 unread
PVG.Notifications.setBadge(0);   // clear dot

// Form validation
const valid = PVG.Form.validate(formElement);   // returns true/false
PVG.Form.clearErrors(formElement);

// Page loader
PVG.Loader.show();
PVG.Loader.hide();

// Sidebar
PVG.Sidebar.toggle();
```

---

## Auth Page Layout

For login / register pages (no sidebar):

```html
<div class="pvg-auth-page">
  <div class="pvg-auth-page__brand">
    <img src="logo.jpg" alt="PVG Logo" />
    <h1>PVG COET&M<br>ERP Portal</h1>
    <p>Empowering education since 1985</p>
  </div>
  <div class="pvg-auth-page__form">
    <div class="pvg-auth-box">
      <h2>Sign In</h2>
      <p>Enter your credentials to continue</p>
      <!-- form -->
    </div>
  </div>
</div>
```

---

## Module Integration Checklist

- [ ] Link `pvg-erp-theme.css` in `<head>`
- [ ] Link `pvg-erp-theme.js` before `</body>`
- [ ] Load Poppins from Google Fonts
- [ ] Load Font Awesome 6.x
- [ ] Use `pvg-*` class prefix for all themed elements
- [ ] Set `data-pvg-page="Module / Page"` on `<main>` for breadcrumb auto-build
- [ ] Add `data-pvg-sidebar-toggle` to hamburger button
- [ ] Add `data-pvg-sortable` to tables that need column sorting

---

## Modules

| Module | Status |
|--------|--------|
| Auth (Login/Register) | 🔲 Planned |
| Admission | 🔲 Planned |
| Academics (Courses/Timetable) | 🔲 Planned |
| Attendance | 🔲 Planned |
| Examinations | 🔲 Planned |
| Fees & Finance | 🔲 Planned |
| Notifications | 🔲 Planned |
| Hostel | 🔲 Planned |
| Placements | 🔲 Planned |

---

## License

Internal use — PVG's College of Engineering, Technology and Management, Pune.
