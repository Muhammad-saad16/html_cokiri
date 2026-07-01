---
name: Academic Heritage Modernized
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#554336'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#887364'
  outline-variant: '#dbc2b0'
  surface-tint: '#904d00'
  primary: '#8d4b00'
  on-primary: '#ffffff'
  primary-container: '#b15f00'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb77d'
  secondary: '#725a42'
  on-secondary: '#ffffff'
  secondary-container: '#fedcbe'
  on-secondary-container: '#796048'
  tertiary: '#525c6d'
  on-tertiary: '#ffffff'
  tertiary-container: '#6b7587'
  on-tertiary-container: '#fefcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdcc3'
  primary-fixed-dim: '#ffb77d'
  on-primary-fixed: '#2f1500'
  on-primary-fixed-variant: '#6e3900'
  secondary-fixed: '#fedcbe'
  secondary-fixed-dim: '#e1c1a4'
  on-secondary-fixed: '#291806'
  on-secondary-fixed-variant: '#59422c'
  tertiary-fixed: '#d9e3f7'
  tertiary-fixed-dim: '#bdc7db'
  on-tertiary-fixed: '#121c2a'
  on-tertiary-fixed-variant: '#3d4757'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
  heritage-orange: '#D97706'
  scholar-brown: '#4B3621'
  research-grey: '#1F2937'
  paper-white: '#FFFFFF'
  manuscript-tint: '#F3F4F6'
typography:
  headline-xl:
    fontFamily: Source Serif 4
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
  headline-lg:
    fontFamily: Source Serif 4
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Source Serif 4
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Source Serif 4
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  gutter: 24px
  margin-desktop: 80px
  margin-mobile: 20px
  container-max-width: 1280px
---

## Brand & Style

The design system for this institute embodies an **Academic & Professional** personality, striking a balance between traditional Islamic scholarship and contemporary research excellence. It is designed to evoke feelings of trust, intellectual rigor, and institutional stability.

The visual style is **Corporate / Modern with a focus on editorial clarity**. It leverages generous whitespace, a structured grid, and a sophisticated color palette to ensure that dense educational content remains accessible and engaging. The aesthetic avoids unnecessary ornamentation, allowing the "knowledge" (text and research) to remain the focal point, while using sharp geometric accents inspired by the brand's diamond-based logo patterns.

## Colors

The palette is rooted in the institute’s visual identity. **Heritage Orange** serves as the primary action color, providing energy and focus to calls-to-action and key brand elements. **Scholar Brown** and **Research Grey** provide the grounding "academic" weights, used for deep contrast and secondary UI elements.

The background strategy utilizes **Paper White** for primary surfaces and **Manuscript Tint** for subtle section containment. This high-contrast light theme ensures maximum readability for long-form research papers and course materials, maintaining a clean, institutional feel.

## Typography

This design system employs a sophisticated pairings strategy. **Source Serif 4** is utilized for headlines to convey authority, literary tradition, and academic prestige. It provides the "institutional voice."

**Inter** is the workhorse for body text, chosen for its exceptional legibility in digital environments and its neutral, modern tone. For metadata, navigation, and UI labels, **Hanken Grotesk** offers a sharp, contemporary contrast, keeping the interface feeling precise and efficient. Large headlines should scale down for mobile devices to maintain visual harmony.

## Layout & Spacing

The layout follows a **Fixed Grid** model for desktop to maintain the organized structure of a printed academic journal. A 12-column grid is used with 24px gutters to allow for complex content layouts, such as sidebars for citations or course modules.

On mobile, the system transitions to a single-column fluid layout with 20px side margins. Spacing follows an 8px base unit, ensuring consistent vertical rhythm. Content-heavy pages (like research articles) should utilize a narrowed central column (approx. 720px) to optimize the line length for reading comfort.

## Elevation & Depth

To maintain a "clean and professional" look, depth is achieved through **low-contrast outlines** and **tonal layers** rather than heavy shadows. 

- **Level 0 (Base):** Paper White background.
- **Level 1 (Cards/Sections):** Subtle 1px border in Research Grey (at 10% opacity) or a light grey surface (Manuscript Tint).
- **Level 2 (Active Elements):** For interactive components like dropdowns or hover states on cards, use an extra-diffused, low-opacity shadow (Color: Scholar Brown, Opacity: 5%, Blur: 12px) to suggest a gentle lift without breaking the flat, academic aesthetic.

## Shapes

The design system uses **Soft (0.25rem)** roundedness. This minimal rounding provides a modern touch while retaining the "serious" and "structured" feel required for a research institute. 

Buttons and input fields should strictly adhere to the 0.25rem corner radius. Larger containers, such as featured course cards, can scale to **rounded-lg (0.5rem)** to appear slightly more inviting, but fully rounded/pill shapes should be avoided to maintain institutional gravity.

## Components

### Buttons
Primary buttons use a solid **Heritage Orange** fill with white text. Secondary buttons use a **Scholar Brown** outline with a clear background. Labels are always in Hanken Grotesk, Uppercase for a crisp, professional appearance.

### Input Fields
Fields utilize a white background with a 1px border. When focused, the border shifts to Heritage Orange. Labels are positioned above the field in a bold, small font (label-caps).

### Cards
Cards are the primary way to display research papers and courses. They feature a 1px subtle border, ample padding (24px), and use Headline-MD for titles. On hover, they may transition to a slightly darker border or the Level 2 subtle shadow.

### Academic Lists
For listing courses or research topics, use a clean list with 1px horizontal dividers. Incorporate the diamond shape from the logo as a bullet point icon for a distinctive brand touch.

### Progress Indicators
For learning modules, use a thin Heritage Orange bar to show completion, maintaining the minimalist, data-focused style.