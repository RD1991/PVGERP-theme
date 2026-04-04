/**
 * PVG COET&M — ERP Theme JavaScript
 * Version: 1.0.0
 *
 * Usage:
 *   <script src="pvg-erp-theme.js"></script>
 *
 * All behaviour is driven by data-* attributes so no
 * module-specific JS config is needed.
 */

(function (global) {
  'use strict';

  /* ─────────────────────────────────────────────────────────
     NAMESPACE
  ───────────────────────────────────────────────────────── */
  const PVG = {};

  /* ─────────────────────────────────────────────────────────
     SIDEBAR — collapse / expand / mobile drawer
  ───────────────────────────────────────────────────────── */
  PVG.Sidebar = {
    COLLAPSED_KEY: 'pvg_sidebar_collapsed',

    init() {
      const sidebar = document.querySelector('.pvg-sidebar');
      if (!sidebar) return;

      // Restore persisted collapse state
      if (localStorage.getItem(this.COLLAPSED_KEY) === 'true') {
        sidebar.classList.add('pvg-sidebar--collapsed');
        this._updateMainMargin(true);
      }

      // Toggle button — add data-pvg-sidebar-toggle to any button
      document.querySelectorAll('[data-pvg-sidebar-toggle]').forEach(btn => {
        btn.addEventListener('click', () => this.toggle());
      });

      // Mobile overlay backdrop
      this._createBackdrop();
    },

    toggle() {
      const sidebar = document.querySelector('.pvg-sidebar');
      if (!sidebar) return;

      const isMobile = window.innerWidth <= 768;

      if (isMobile) {
        sidebar.classList.toggle('pvg-sidebar--mobile-open');
        document.getElementById('pvg-backdrop')?.classList.toggle('pvg-backdrop--visible');
      } else {
        const collapsed = sidebar.classList.toggle('pvg-sidebar--collapsed');
        localStorage.setItem(this.COLLAPSED_KEY, collapsed);
        this._updateMainMargin(collapsed);
      }
    },

    _updateMainMargin(collapsed) {
      const main = document.querySelector('.pvg-main');
      const topbar = document.querySelector('.pvg-topbar');
      if (main)   main.style.marginLeft   = collapsed ? '64px' : '';
      if (topbar) topbar.style.left        = collapsed ? '64px' : '';
    },

    _createBackdrop() {
      const backdrop = document.createElement('div');
      backdrop.id = 'pvg-backdrop';
      backdrop.style.cssText = [
        'position:fixed', 'inset:0', 'background:rgba(0,0,0,.45)',
        'z-index:99', 'opacity:0', 'pointer-events:none',
        'transition:opacity .22s ease'
      ].join(';');

      backdrop.addEventListener('click', () => this.toggle());
      document.body.appendChild(backdrop);

      // CSS rule for visible state injected dynamically
      const style = document.createElement('style');
      style.textContent = '#pvg-backdrop.pvg-backdrop--visible { opacity: 1 !important; pointer-events: all !important; }';
      document.head.appendChild(style);
    }
  };

  /* ─────────────────────────────────────────────────────────
     ACTIVE NAV — mark current page nav item
  ───────────────────────────────────────────────────────── */
  PVG.ActiveNav = {
    init() {
      const current = location.pathname;
      document.querySelectorAll('.pvg-nav-item').forEach(item => {
        const href = item.getAttribute('href');
        if (href && href !== '#' && current.includes(href)) {
          item.classList.add('pvg-nav-item--active');
        }
      });
    }
  };

  /* ─────────────────────────────────────────────────────────
     MODAL
     Usage:
       data-pvg-modal-open="myModal"  → opens #myModal
       data-pvg-modal-close           → closes nearest modal
  ───────────────────────────────────────────────────────── */
  PVG.Modal = {
    init() {
      // Open triggers
      document.querySelectorAll('[data-pvg-modal-open]').forEach(trigger => {
        trigger.addEventListener('click', () => {
          const id = trigger.dataset.pvgModalOpen;
          this.open(id);
        });
      });

      // Close triggers
      document.querySelectorAll('[data-pvg-modal-close]').forEach(btn => {
        btn.addEventListener('click', () => {
          const overlay = btn.closest('.pvg-modal-overlay');
          if (overlay) this.closeEl(overlay);
        });
      });

      // Click on overlay backdrop to close
      document.querySelectorAll('.pvg-modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
          if (e.target === overlay) this.closeEl(overlay);
        });
      });

      // ESC key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          document.querySelectorAll('.pvg-modal-overlay.pvg-modal--open')
            .forEach(o => this.closeEl(o));
        }
      });
    },

    open(id) {
      const overlay = document.getElementById(id);
      if (overlay) {
        overlay.classList.add('pvg-modal--open');
        document.body.style.overflow = 'hidden';
      }
    },

    close(id) {
      const overlay = document.getElementById(id);
      if (overlay) this.closeEl(overlay);
    },

    closeEl(overlay) {
      overlay.classList.remove('pvg-modal--open');
      document.body.style.overflow = '';
    }
  };

  /* ─────────────────────────────────────────────────────────
     NOTIFICATION PANEL
     Usage:
       data-pvg-notif-toggle  → toggles .pvg-notif-panel
  ───────────────────────────────────────────────────────── */
  PVG.Notifications = {
    init() {
      document.querySelectorAll('[data-pvg-notif-toggle]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const panel = btn.nextElementSibling?.classList.contains('pvg-notif-panel')
            ? btn.nextElementSibling
            : document.querySelector('.pvg-notif-panel');

          if (panel) panel.classList.toggle('pvg-notif--open');
        });
      });

      // Mark all read
      document.querySelectorAll('.pvg-notif-panel__mark-read').forEach(el => {
        el.addEventListener('click', () => {
          document.querySelectorAll('.pvg-notif-item--unread')
            .forEach(item => item.classList.remove('pvg-notif-item--unread'));
          this._clearDot();
        });
      });

      // Click outside closes panel
      document.addEventListener('click', () => {
        document.querySelectorAll('.pvg-notif-panel.pvg-notif--open')
          .forEach(p => p.classList.remove('pvg-notif--open'));
      });
    },

    /** Update the unread count badge on the bell button */
    setBadge(count) {
      const dot = document.querySelector('[data-pvg-notif-toggle] .pvg-dot');
      if (!dot) return;
      if (count === 0) {
        dot.style.display = 'none';
      } else {
        dot.style.display = '';
        dot.title = `${count} unread notification${count > 1 ? 's' : ''}`;
      }
    },

    _clearDot() { this.setBadge(0); }
  };

  /* ─────────────────────────────────────────────────────────
     TOAST NOTIFICATIONS
     Usage (JS):
       PVG.Toast.show('Record saved successfully', 'success');
       PVG.Toast.show('Invalid email address', 'danger');
  ───────────────────────────────────────────────────────── */
  PVG.Toast = {
    _container: null,
    _icons: {
      success: 'fa-circle-check',
      danger:  'fa-circle-xmark',
      warning: 'fa-triangle-exclamation',
      info:    'fa-circle-info'
    },

    _ensureContainer() {
      if (this._container) return;
      this._container = document.createElement('div');
      this._container.id = 'pvg-toast-container';
      this._container.style.cssText = [
        'position:fixed', 'bottom:24px', 'right:24px',
        'display:flex', 'flex-direction:column', 'gap:10px',
        'z-index:9999', 'pointer-events:none'
      ].join(';');
      document.body.appendChild(this._container);
    },

    show(message, type = 'info', duration = 3500) {
      this._ensureContainer();

      const toast = document.createElement('div');
      const iconClass = this._icons[type] || this._icons.info;

      toast.style.cssText = [
        'display:flex', 'align-items:center', 'gap:10px',
        'padding:13px 18px', 'border-radius:8px',
        'box-shadow:0 4px 16px rgba(0,0,0,.15)',
        'font-family:Poppins,sans-serif', 'font-size:13px',
        'font-weight:500', 'pointer-events:all',
        'transform:translateX(120%)', 'transition:transform .3s ease',
        'max-width:320px', 'min-width:220px'
      ].join(';');

      const colorMap = {
        success: { bg: '#f0fdf4', color: '#166534', border: '#bbf7d0' },
        danger:  { bg: '#fff1f2', color: '#9f1239', border: '#fecdd3' },
        warning: { bg: '#fffbeb', color: '#92400e', border: '#fde68a' },
        info:    { bg: '#eff6ff', color: '#1e40af', border: '#bfdbfe' }
      };

      const c = colorMap[type] || colorMap.info;
      toast.style.background    = c.bg;
      toast.style.color         = c.color;
      toast.style.border        = `1px solid ${c.border}`;

      toast.innerHTML = `
        <i class="fa-solid ${iconClass}" style="font-size:16px;flex-shrink:0"></i>
        <span>${message}</span>
      `;

      this._container.appendChild(toast);

      // Animate in
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          toast.style.transform = 'translateX(0)';
        });
      });

      // Auto dismiss
      setTimeout(() => {
        toast.style.transform = 'translateX(120%)';
        toast.addEventListener('transitionend', () => toast.remove(), { once: true });
      }, duration);
    }
  };

  /* ─────────────────────────────────────────────────────────
     CONFIRM DIALOG
     Usage (JS):
       PVG.Confirm.show({
         title: 'Delete Record',
         message: 'Are you sure? This cannot be undone.',
         onConfirm: () => { ... }
       });
  ───────────────────────────────────────────────────────── */
  PVG.Confirm = {
    show({ title = 'Confirm', message = 'Are you sure?', onConfirm, onCancel, danger = false } = {}) {
      const id = 'pvg-confirm-dialog';
      let existing = document.getElementById(id);
      if (existing) existing.remove();

      const overlay = document.createElement('div');
      overlay.id = id;
      overlay.className = 'pvg-modal-overlay pvg-modal--open';

      const btnClass = danger ? 'pvg-btn pvg-btn--danger' : 'pvg-btn pvg-btn--primary';

      overlay.innerHTML = `
        <div class="pvg-modal" style="max-width:400px">
          <div class="pvg-modal__header">
            <span class="pvg-modal__title">${title}</span>
            <button class="pvg-modal__close" data-pvg-confirm-cancel><i class="fa-solid fa-xmark"></i></button>
          </div>
          <div class="pvg-modal__body">
            <p style="font-size:13.5px;color:#444;line-height:1.6">${message}</p>
          </div>
          <div class="pvg-modal__footer">
            <button class="${'pvg-btn pvg-btn--ghost'}" data-pvg-confirm-cancel>Cancel</button>
            <button class="${btnClass}" data-pvg-confirm-ok>Confirm</button>
          </div>
        </div>
      `;

      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';

      const cleanup = () => {
        overlay.remove();
        document.body.style.overflow = '';
      };

      overlay.querySelectorAll('[data-pvg-confirm-cancel]').forEach(el => {
        el.addEventListener('click', () => { cleanup(); onCancel?.(); });
      });

      overlay.querySelector('[data-pvg-confirm-ok]').addEventListener('click', () => {
        cleanup(); onConfirm?.();
      });

      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) { cleanup(); onCancel?.(); }
      });
    }
  };

  /* ─────────────────────────────────────────────────────────
     BREADCRUMB BUILDER
     Usage (HTML):
       <nav class="pvg-topbar__breadcrumb" data-pvg-breadcrumb>
         <!-- auto-populated from data-pvg-page on <main> -->
       </nav>
       <main data-pvg-page="Students / Add Student">
  ───────────────────────────────────────────────────────── */
  PVG.Breadcrumb = {
    init() {
      const nav = document.querySelector('[data-pvg-breadcrumb]');
      const main = document.querySelector('[data-pvg-page]');
      if (!nav || !main) return;

      const parts = ['ERP', ...main.dataset.pvgPage.split('/').map(s => s.trim())];
      nav.innerHTML = parts.map((part, i) => {
        const isLast = i === parts.length - 1;
        return isLast
          ? `<span class="current">${part}</span>`
          : `<span>${part}</span><i class="fa-solid fa-chevron-right"></i>`;
      }).join('');
    }
  };

  /* ─────────────────────────────────────────────────────────
     TABLE SORTING (lightweight, client-side)
     Add data-pvg-sortable to <table> — clicking <th> sorts
  ───────────────────────────────────────────────────────── */
  PVG.TableSort = {
    init() {
      document.querySelectorAll('table[data-pvg-sortable]').forEach(table => {
        table.querySelectorAll('th').forEach((th, colIdx) => {
          th.style.cursor = 'pointer';
          th.style.userSelect = 'none';
          th._pvgSortDir = 1;

          th.addEventListener('click', () => {
            const tbody = table.querySelector('tbody');
            const rows  = Array.from(tbody.querySelectorAll('tr'));

            rows.sort((a, b) => {
              const aText = a.cells[colIdx]?.textContent.trim() ?? '';
              const bText = b.cells[colIdx]?.textContent.trim() ?? '';
              return aText.localeCompare(bText, 'en', { numeric: true }) * th._pvgSortDir;
            });

            th._pvgSortDir *= -1;
            rows.forEach(r => tbody.appendChild(r));

            // Update arrow indicators
            table.querySelectorAll('th').forEach(t => {
              t.textContent = t.textContent.replace(/ [↑↓]$/, '');
            });
            th.textContent += th._pvgSortDir === 1 ? ' ↓' : ' ↑';
          });
        });
      });
    }
  };

  /* ─────────────────────────────────────────────────────────
     FORM VALIDATION HELPERS
  ───────────────────────────────────────────────────────── */
  PVG.Form = {
    /**
     * Validate a form element. Returns true if valid.
     * Adds .pvg-form-control--error and inserts .pvg-form-error if invalid.
     */
    validate(formEl) {
      let valid = true;
      formEl.querySelectorAll('[required]').forEach(input => {
        const group = input.closest('.pvg-form-group');
        this._clearError(input, group);

        if (!input.value.trim()) {
          this._setError(input, group, 'This field is required.');
          valid = false;
        } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
          this._setError(input, group, 'Enter a valid email address.');
          valid = false;
        }
      });
      return valid;
    },

    _setError(input, group, msg) {
      input.classList.add('pvg-form-control--error');
      if (group) {
        const err = document.createElement('span');
        err.className = 'pvg-form-error pvg-validation-msg';
        err.textContent = msg;
        group.appendChild(err);
      }
    },

    _clearError(input, group) {
      input.classList.remove('pvg-form-control--error');
      group?.querySelectorAll('.pvg-validation-msg').forEach(e => e.remove());
    },

    /** Clear all errors on a form */
    clearErrors(formEl) {
      formEl.querySelectorAll('.pvg-form-control--error').forEach(el => {
        el.classList.remove('pvg-form-control--error');
      });
      formEl.querySelectorAll('.pvg-validation-msg').forEach(e => e.remove());
    }
  };

  /* ─────────────────────────────────────────────────────────
     PAGE LOADER
     Shows / hides a full-page loading overlay.
  ───────────────────────────────────────────────────────── */
  PVG.Loader = {
    _el: null,

    show() {
      if (this._el) { this._el.style.display = 'flex'; return; }

      this._el = document.createElement('div');
      this._el.id = 'pvg-page-loader';
      this._el.style.cssText = [
        'position:fixed', 'inset:0',
        'background:rgba(255,255,255,.8)',
        'display:flex', 'align-items:center', 'justify-content:center',
        'z-index:10000'
      ].join(';');

      this._el.innerHTML = `
        <div style="text-align:center">
          <div style="
            width:40px;height:40px;border-radius:50%;
            border:3px solid #d9dee6;
            border-top-color:#003A6A;
            animation:pvg-spin .7s linear infinite;
            margin:0 auto 12px
          "></div>
          <p style="font-family:Poppins,sans-serif;font-size:13px;color:#707070">Loading…</p>
        </div>
      `;

      const style = document.createElement('style');
      style.textContent = '@keyframes pvg-spin { to { transform: rotate(360deg) } }';
      document.head.appendChild(style);
      document.body.appendChild(this._el);
    },

    hide() {
      if (this._el) this._el.style.display = 'none';
    }
  };

  /* ─────────────────────────────────────────────────────────
     AUTO-INIT on DOMContentLoaded
  ───────────────────────────────────────────────────────── */
  function init() {
    PVG.Sidebar.init();
    PVG.ActiveNav.init();
    PVG.Modal.init();
    PVG.Notifications.init();
    PVG.Breadcrumb.init();
    PVG.TableSort.init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* Expose globally */
  global.PVG = PVG;

}(window));
