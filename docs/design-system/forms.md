# Form Controls, Validations, and Error Systems — Al Jabrani Motors

## 1. Input Controls Hierarchy

```css
/* Base Input Tokens */
.input-base {
  height: 48px;
  padding: 0 16px;
  background-color: #FFFFFF;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-size: 14px;
  color: var(--text-primary);
  outline: none;
  transition: all 200ms ease;
}

.input-base:focus {
  border-color: var(--brand-primary);
  box-shadow: 0 0 0 3px rgba(26, 86, 219, 0.15);
}

.input-base.error {
  border-color: var(--danger);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
}

.input-base:disabled {
  background-color: var(--background-muted);
  cursor: not-allowed;
  opacity: 0.6;
}
```

---

## 2. Validation & Feedback Rules

- **Phone Format**: Saudi numbers (`05xxxxxxxx` or `+9665xxxxxxxx`).
- **Required Fields**: Indicated with a red asterisk `*` and inline error feedback.
- **Loading State on Submit**: Button displays spinner (`animate-spin`) and is `disabled`.
- **Success Notification**: Instant modal feedback with confirmation reference code and direct WhatsApp dispatch.
