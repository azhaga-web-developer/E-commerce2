---
name: Modern Editorial Commerce
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#0051d5'
  on-secondary: '#ffffff'
  secondary-container: '#316bf3'
  on-secondary-container: '#fefcff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#370e00'
  on-tertiary-container: '#e45405'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#b4c5ff'
  on-secondary-fixed: '#00174b'
  on-secondary-fixed-variant: '#003ea8'
  tertiary-fixed: '#ffdbce'
  tertiary-fixed-dim: '#ffb599'
  on-tertiary-fixed: '#370e00'
  on-tertiary-fixed-variant: '#7f2b00'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-badge:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system embodies an editorial, high-trust retail experience tailored for a modern, conversion-focused e-commerce storefront. The tone balances confident restraint with approachable warmth: high visual clarity, generous negative space, intentional typographic pacing, and friction-free interactions that guide the customer from discovery to checkout.

The design movement combines **Minimalist Editorial** with **Tactile Modernism**:
- Crisp, hairline separations alongside warm off-white canvas layers to evoke tactile paper catalogues.
- Deep slate typography for immediate legibility, high contrast, and accessible scanning.
- Precise, restrained bursts of accent color reserved strictly for primary conversions, status indicators, and promotional callouts.
- Soft, multi-layered ambient shadows to give elevated components (drawers, sticky add-to-cart bars, quick-view modals) distinct physical reality without feeling cluttered.

## Colors

The palette establishes an authoritative, premium foundation with purposeful, high-contrast focal points:

- **Primary (`#0F172A` / Slate 900)**: Serves as the anchor for primary actions, headlines, and essential structural chrome. Used for high-conversion CTAs ("Add to Bag", "Proceed to Checkout") to drive clarity and decisive focus.
- **Secondary (`#2563EB` / Modern Cobalt)**: Expresses digital interactivity, active states, focus rings, link interactions, and verified trust badges.
- **Tertiary (`#EA580C` / Warm Ember)**: Utilized strictly for time-sensitive elements, promotional tags ("29% OFF", "Limited Edition"), stock scarcity warnings, and sale pricing.
- **Neutral Palette**: Built from warm architectural slates:
  - Surface base: `#F8FAFC` (Canvas background) and `#FFFFFF` (Elevated product cards and modals).
  - Subtle fills: `#F1F5F9` (Search inputs, secondary button fills, table zebra striping).
  - Structural borders: `#E2E8F0` (Card outlines, dividers, table headers).
  - Secondary copy: `#64748B` (Metadata, breadcrumbs, SKUs, and secondary labels).

## Typography

The type system relies on `Plus Jakarta Sans` across display, body, and UI labels. Its geometric clarity combined with humanistic grotesque details produces a crisp, editorial character that holds structure in dense product grids and provides high-impact presence in promotional banners.

- **Scale & Contrast**: Headlines leverage tight, negative letter-spacing (`-0.015em` to `-0.03em`) and heavy weights (`700` to `800`) to anchor editorial product storytelling.
- **Reading Comfort**: Body copy is set at an optimal reading size of `15px` with a generous `24px` line height to ensure fatigue-free browsing of product descriptions and specifications.
- **Functional Labels**: Microcopy, pricing tags, and product status badges utilize uppercase or semi-bold styling (`label-badge`) with positive tracking (`0.02em` to `0.04em`) to ensure legibility at micro scales.

## Layout & Spacing

The layout is built on a responsive 12-column grid constrained to a maximum width of `1280px` for standard commerce views and `1440px` for hero/editorial spreads.

- **Desktop (>= 1024px)**: 12-column grid with `1.5rem` (`24px`) gutters and `2rem` (`32px`) lateral margin padding. Product listing grids default to 3 or 4 columns.
- **Tablet (768px - 1023px)**: 8-column grid with `1.25rem` (`20px`) gutters and `1.5rem` (`24px`) margins. Listing grids collapse to 2 columns.
- **Mobile (< 768px)**: 4-column grid with `0.75rem` (`12px`) gutters and `1rem` (`16px`) canvas margins. Product listing cards adapt to 2 columns or single-column stacked cards with horizontal scroll carousels for related items.

Internal component rhythm adheres strictly to an 8px scale (`0.25rem`, `0.5rem`, `1rem`, `1.5rem`, `2.5rem`). Micro elements like chip labels and badge insets drop down to 4px boundaries.

## Elevation & Depth

Visual hierarchy uses a hybrid strategy of **Tonal Layering** grounded by **Low-Contrast Hairlines** and **Ambient Diffuse Shadows**:

- **Level 0 (Base Canvas)**: Background rendered in `#F8FAFC`. Provides warm physical depth without harsh glare.
- **Level 1 (Card & Section Containers)**: `#FFFFFF` surface bordered by a crisp `1px solid #E2E8F0` line. Product cards rest here with no resting shadow to maintain clean horizontal lines across multi-item grids.
- **Level 2 (Hover & Popover Layer)**: Triggered on card hover, dropdown menus, and quick-filter panels. Supported by `0 8px 24px -4px rgba(15, 23, 42, 0.06), 0 4px 12px -2px rgba(15, 23, 42, 0.04)`.
- **Level 3 (Overlays & Conversion Drawers)**: Applied to slide-out shopping carts, floating mobile buy-bars, and quick-view modals. Uses a soft ambient drop shadow: `0 20px 40px -8px rgba(15, 23, 42, 0.12), 0 1px 3px 0 rgba(15, 23, 42, 0.05)`, backed by a `rgba(15, 23, 42, 0.4)` backdrop blur overlay (`backdrop-filter: blur(4px)`).

## Shapes

The geometric architecture pairs defined container edges with welcoming, tactile curvature. 

- Base components (inputs, list items, small buttons) employ `0.5rem` (`8px`) corner radius.
- Structural cards and media wrappers employ `rounded-lg` (`1rem` / `16px`) or `rounded-xl` (`1.5rem` / `24px`) to create framed product viewports.
- Micro-elements such as category filters, discount badges, and floating counter pills adopt pill structures (`9999px`) to visually separate actionable chips and status tags from square product tiles.

## Components

### Buttons
- **Primary (Conversion)**: Slate black background (`#0F172A`), white label (`#FFFFFF`), `0.5rem` corner radius, `space-md` horizontal padding, height `48px`. Focus ring: `2px solid #2563EB` with `2px` offset.
- **Secondary**: `#F1F5F9` surface with `#0F172A` text and `#E2E8F0` border. Active state shifts to `#E2E8F0`.
- **Accent / Promotional**: Warm Ember background (`#EA580C`) with white label, reserved for flash deals and seasonal action triggers.

### Badges & Product Tags
- **NEW**: `#0F172A` fill with `#FFFFFF` text, `rounded-full`, uppercase `label-badge` font, `4px 8px` padding.
- **Discount (% OFF)**: Light ember background (`#FFEDD5`) with `#C2410C` text, communicating urgency without visual dissonance.
- **Best Seller**: Soft amber background (`#FEF3C7`) with `#B45309` text, paired with a miniature star glyph.

### Product Cards
- Contained within `#FFFFFF` surface, `1px solid #E2E8F0`, corner radius `1rem`.
- Aspect ratio for product photography is locked to `4:5` or `1:1` with an off-white image container (`#F1F5F9`).
- Hover state: Slight `-2px` vertical translation with Level 2 elevation shadow and an immediate reveal of an inline "Quick Add" trigger.

### Input Fields & Controls
- **Form Inputs**: Height `44px`, background `#FFFFFF`, border `1px solid #CBD5E1`, corner radius `0.5rem`. On focus: border shifts to `#2563EB` with an ambient glow (`box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15)`).
- **Checkboxes & Radios**: `20px` width/height. Unchecked: `1.5px solid #CBD5E1`. Checked: filled `#0F172A` with white checkmark glyph.

### Chips & Filters
- Compact `36px` pills with `1px solid #E2E8F0`, text in `#64748B`.
- Selected state shifts background to `#0F172A`, text to `#FFFFFF`, and border to `#0F172A`. Includes count indicator pills for faceted navigation.