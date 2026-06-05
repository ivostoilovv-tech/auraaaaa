---
name: Warm & Organic Lifestyle
colors:
  surface: '#fff8f3'
  surface-dim: '#e1d9cf'
  surface-bright: '#fff8f3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fbf2e8'
  surface-container: '#f6ece3'
  surface-container-high: '#f0e7dd'
  surface-container-highest: '#eae1d7'
  on-surface: '#1f1b15'
  on-surface-variant: '#54433f'
  inverse-surface: '#343029'
  inverse-on-surface: '#f8efe5'
  outline: '#86736e'
  outline-variant: '#d9c1bc'
  surface-tint: '#914a3a'
  primary: '#8e4838'
  on-primary: '#ffffff'
  primary-container: '#ac604e'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb4a3'
  secondary: '#4e635a'
  on-secondary: '#ffffff'
  secondary-container: '#cee5da'
  on-secondary-container: '#52675e'
  tertiary: '#735802'
  on-tertiary: '#ffffff'
  tertiary-container: '#8e711f'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad2'
  primary-fixed-dim: '#ffb4a3'
  on-primary-fixed: '#3b0902'
  on-primary-fixed-variant: '#743425'
  secondary-fixed: '#d1e8dd'
  secondary-fixed-dim: '#b5ccc1'
  on-secondary-fixed: '#0b1f18'
  on-secondary-fixed-variant: '#374b43'
  tertiary-fixed: '#ffdf96'
  tertiary-fixed-dim: '#e7c268'
  on-tertiary-fixed: '#251a00'
  on-tertiary-fixed-variant: '#5a4400'
  background: '#fff8f3'
  on-background: '#1f1b15'
  surface-variant: '#eae1d7'
typography:
  display-lg:
    fontFamily: Literata
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Literata
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Literata
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Literata
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  caption:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
---

## Brand & Style

The design system is anchored in a "Warm & Organic" philosophy, designed to evoke feelings of tranquility, mindfulness, and groundedness. It targets a B2C audience seeking wellness and lifestyle balance, prioritizing an emotional connection over clinical efficiency.

The aesthetic blends **Modern Minimalism** with **Tactile/Organic** influences. While the layout remains clean and structured, the visual treatment avoids the coldness of traditional tech interfaces. It uses a soft, layered approach to depth and generous white space (or "cream space") to allow content to breathe, mirroring the pace of a slow-living lifestyle.

## Colors

The palette is derived from natural elements—clay, leaf, sun, and parchment. 

- **Primary (Terracotta):** Used for key actions and brand-defining elements. It provides a grounded, earthy energy.
- **Secondary (Sage Green):** Employed for supportive information, success states, and calming background washes.
- **Accent (Honey Gold):** Used sparingly for highlights, premium features, or to draw attention to celebratory moments.
- **Neutral:** A deep, warm charcoal-brown (#4A453E) is used for text instead of pure black to maintain the organic softness.
- **Background (Warm Cream):** The canvas of the design system, providing a softer alternative to stark white, reducing eye strain and enhancing the "analog" feel.

## Typography

The typography strategy relies on a sophisticated "Serif-Sans" pairing. 

**Literata** is the voice of the brand, used for headings to convey authority, warmth, and a literary quality. Its rhythmic strokes feel intentional and human. 

**Plus Jakarta Sans** provides a contemporary, highly legible counterpoint for body copy and UI elements. Its soft curves complement the roundedness of the UI components. 

For mobile, large display sizes are scaled down to ensure readability while maintaining their editorial impact. Use uppercase labels with slight letter spacing for secondary navigation or small identifiers to provide a subtle hierarchy shift.

## Layout & Spacing

The design system utilizes a **Fluid Grid** with generous internal margins. The layout is designed to feel spacious and unhurried.

- **Desktop:** A 12-column grid with a 24px gutter. Outer margins are expansive (64px+) to keep content centered and focused.
- **Mobile:** A 4-column grid with 20px side margins. 
- **Vertical Rhythm:** Spacing follows an 8px base unit. Use `lg` (48px) and `xl` (80px) spacing between major sections to emphasize the "slow" aesthetic. 

Content should never feel cramped; if in doubt, increase the whitespace. Elements should often be center-aligned to create a sense of balance and zen-like symmetry.

## Elevation & Depth

Depth in this design system is achieved through **Tonal Layering** and **Soft Ambient Shadows**. 

Instead of harsh drop shadows, we use "Diffusion Shadows"—extremely low-opacity (#4A453E at 5-8%) with large blur radii to simulate natural light hitting a soft surface. 

- **Level 0 (Base):** Warm Cream (#FDFCF0).
- **Level 1 (Cards/Surface):** White (#FFFFFF) with a soft 1px border in a lightened Sage or Cream tint.
- **Level 2 (Interaction):** Slight lift using the diffusion shadow to indicate hover states or active modals.

Avoid heavy overlays. Modals and dropdowns should feel like light sheets of paper resting on a surface, rather than floating high above it.

## Shapes

The shape language is defined by **Soft Roundedness (Level 2)**. 

Standard components (buttons, input fields) use a 0.5rem (8px) radius. Larger containers, like featured cards or image frames, use 1rem (16px) or 1.5rem (24px) to emphasize the organic, friendly nature of the brand. 

Avoid 0px corners entirely, as they appear too clinical/aggressive for the wellness space. Circular elements are reserved for avatars and specific iconography to maintain a "pebble" like feel.

## Components

- **Buttons:** Primary buttons use the Terracotta fill with white text. Secondary buttons use a Sage Green outline. The shape is always rounded, never sharp.
- **Input Fields:** Use a subtle Cream-tinted fill with a bottom-only or soft-all-around border. Focus states transition the border color to Sage Green.
- **Cards:** White surfaces on the Cream background. Cards should include generous internal padding (24px or 32px) and use the "Diffusion Shadow" for a soft lift.
- **Chips/Tags:** Used for categories like "Mindfulness" or "Nutrition." These should use low-saturation versions of the Secondary and Accent colors with rounded-pill shapes.
- **Lists:** Clean typography with ample line height. Dividers should be subtle and colored in a very light Sage tint, never pure grey.
- **Imagery:** Photography should feature natural lighting, soft focus, and a warm temperature to align with the design system's organic roots. Use the standard card roundedness for all image containers.