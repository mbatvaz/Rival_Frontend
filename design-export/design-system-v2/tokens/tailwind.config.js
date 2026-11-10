// Rival — Tailwind preset. Every value points at a CSS custom property from css/tokens.css,
// so load css/tokens.css on the page and never hard-code raw values in templates.
// Usage in your tailwind.config.js:  presets: [require('./rival-design-system/tokens/tailwind.config.js')]
// Note: font weights above 600 are intentionally absent (600 headings / 400 content / 300 supporting text).
module.exports = {
  "theme": {
    "extend": {
      "colors": {
        "bg": {
          "canvas": "var(--bg-canvas)",
          "gradient-a": "var(--bg-gradient-a)",
          "gradient-b": "var(--bg-gradient-b)",
          "gradient-c": "var(--bg-gradient-c)",
          "plaster": "var(--bg-plaster)",
          "surface": "var(--bg-surface)",
          "surface-muted": "var(--bg-surface-muted)",
          "inverse": "var(--bg-inverse)",
          "inverse-raised": "var(--bg-inverse-raised)"
        },
        "glass": {
          "fill": "var(--glass-fill)",
          "fill-strong": "var(--glass-fill-strong)",
          "edge": "var(--glass-edge)",
          "shade": "var(--glass-shade)"
        },
        "scrim": {
          "photo": "var(--scrim-photo)",
          "modal": "var(--scrim-modal)"
        },
        "text": {
          "primary": "var(--text-primary)",
          "secondary": "var(--text-secondary)",
          "muted": "var(--text-muted)",
          "disabled": "var(--text-disabled)",
          "inverse": "var(--text-inverse)",
          "inverse-muted": "var(--text-inverse-muted)",
          "link": "var(--text-link)"
        },
        "line": {
          "hairline": "var(--line-hairline)",
          "strong": "var(--line-strong)",
          "control": "var(--line-control)"
        },
        "focus-ring": "var(--focus-ring)",
        "chrome": {
          "100": "var(--chrome-100)",
          "300": "var(--chrome-300)",
          "500": "var(--chrome-500)",
          "700": "var(--chrome-700)"
        },
        "accent": {
          "100": "var(--accent-100)",
          "300": "var(--accent-300)",
          "500": "var(--accent-500)",
          "700": "var(--accent-700)",
          "text": "var(--accent-text)"
        },
        "status": {
          "neutral": {
            "fg": "var(--neutral-fg)",
            "bg": "var(--neutral-bg)",
            "line": "var(--neutral-line)",
            "solid": "var(--neutral-solid)"
          },
          "info": {
            "fg": "var(--info-fg)",
            "bg": "var(--info-bg)",
            "line": "var(--info-line)",
            "solid": "var(--info-solid)"
          },
          "success": {
            "fg": "var(--success-fg)",
            "bg": "var(--success-bg)",
            "line": "var(--success-line)",
            "solid": "var(--success-solid)"
          },
          "accent": {
            "fg": "var(--accent-fg)",
            "bg": "var(--accent-bg)",
            "line": "var(--accent-line)",
            "solid": "var(--accent-solid)"
          },
          "warning": {
            "fg": "var(--warning-fg)",
            "bg": "var(--warning-bg)",
            "line": "var(--warning-line)",
            "solid": "var(--warning-solid)"
          },
          "plum": {
            "fg": "var(--plum-fg)",
            "bg": "var(--plum-bg)",
            "line": "var(--plum-line)",
            "solid": "var(--plum-solid)"
          },
          "rose": {
            "fg": "var(--rose-fg)",
            "bg": "var(--rose-bg)",
            "line": "var(--rose-line)",
            "solid": "var(--rose-solid)"
          },
          "danger": {
            "fg": "var(--danger-fg)",
            "bg": "var(--danger-bg)",
            "line": "var(--danger-line)",
            "solid": "var(--danger-solid)"
          }
        }
      },
      "spacing": {
        "1": "var(--space-1)",
        "2": "var(--space-2)",
        "3": "var(--space-3)",
        "4": "var(--space-4)",
        "5": "var(--space-5)",
        "6": "var(--space-6)",
        "8": "var(--space-8)",
        "12": "var(--space-12)"
      },
      "borderRadius": {
        "xs": "var(--radius-xs)",
        "sm": "var(--radius-sm)",
        "md": "var(--radius-md)",
        "lg": "var(--radius-lg)",
        "xl": "var(--radius-xl)",
        "pill": "var(--radius-pill)"
      },
      "boxShadow": {
        "hairline": "var(--shadow-hairline)",
        "sm": "var(--shadow-sm)",
        "md": "var(--shadow-md)",
        "glass": "var(--shadow-glass)",
        "sheet": "var(--shadow-sheet)",
        "focus": "var(--shadow-focus)"
      },
      "backdropBlur": {
        "glass": "var(--blur-glass)",
        "strong": "var(--blur-strong)"
      },
      "transitionDuration": {
        "fast": "var(--duration-fast)",
        "base": "var(--duration-base)",
        "slow": "var(--duration-slow)",
        "deliberate": "var(--duration-deliberate)"
      },
      "transitionTimingFunction": {
        "standard": "var(--ease-standard)",
        "exit": "var(--ease-exit)",
        "spring": "var(--ease-spring)"
      },
      "fontFamily": {
        "sans": [
          "var(--font-sans)"
        ],
        "display": [
          "var(--font-display)"
        ],
        "display-regular": [
          "var(--font-display-regular)"
        ],
        "numeric": [
          "var(--font-numeric)"
        ],
        "numeric-regular": [
          "var(--font-numeric-regular)"
        ]
      },
      "fontWeight": {
        "light": "300",
        "normal": "400",
        "semibold": "600"
      },
      "fontSize": {
        "display-xl": [
          "36px",
          {
            "lineHeight": "52px",
            "fontWeight": "300"
          }
        ],
        "display-lg": [
          "26px",
          {
            "lineHeight": "40px",
            "fontWeight": "400"
          }
        ],
        "numeral-xl": [
          "40px",
          {
            "lineHeight": "48px",
            "fontWeight": "300"
          }
        ],
        "numeral-md": [
          "20px",
          {
            "lineHeight": "28px",
            "fontWeight": "400"
          }
        ],
        "heading-xl": [
          "22px",
          {
            "lineHeight": "34px",
            "fontWeight": "600"
          }
        ],
        "heading-lg": [
          "18px",
          {
            "lineHeight": "30px",
            "fontWeight": "600"
          }
        ],
        "heading-md": [
          "16px",
          {
            "lineHeight": "26px",
            "fontWeight": "600"
          }
        ],
        "title": [
          "15px",
          {
            "lineHeight": "24px",
            "fontWeight": "400"
          }
        ],
        "body-lg": [
          "16px",
          {
            "lineHeight": "28px",
            "fontWeight": "300"
          }
        ],
        "body": [
          "14px",
          {
            "lineHeight": "24px",
            "fontWeight": "400"
          }
        ],
        "body-sm": [
          "13px",
          {
            "lineHeight": "22px",
            "fontWeight": "300"
          }
        ],
        "label": [
          "14px",
          {
            "lineHeight": "20px",
            "fontWeight": "400"
          }
        ],
        "caption": [
          "12px",
          {
            "lineHeight": "18px",
            "fontWeight": "300"
          }
        ],
        "tag": [
          "12px",
          {
            "lineHeight": "18px",
            "fontWeight": "400"
          }
        ],
        "overline": [
          "11px",
          {
            "lineHeight": "16px",
            "fontWeight": "400"
          }
        ]
      }
    }
  }
};
