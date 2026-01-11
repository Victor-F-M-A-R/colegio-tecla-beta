# AURA DESIGN SYSTEM - Technical Guidelines for SOLEN

> Reference: Based on Aura.build Architecture & Responsive Patterns.

## 1. Responsive Logic (Mobile-First Mandate)

Aura's core philosophy is "Contextual Breakpoints". You must apply Tailwind utility classes following this strict progression to ensure the "Mobile-First" guarantee:

- **Mobile (Default):** `<div class="flex flex-col gap-4 ...">` (No prefix = Mobile view)
- **Tablet (md:):** `md:grid md:grid-cols-2` (768px+)
- **Desktop (lg:):** `lg:grid-cols-3` (1024px+)
- **Ultra-Wide (xl:/2xl:):** `xl:max-w-7xl xl:mx-auto`

**Rule:** Never use fixed widths (`w-[500px]`). Always use percentages or relative units (`w-full`, `max-w-md`) combined with `mx-auto` for centering.

## 2. Visual Aesthetics & "The Aura Look"

To achieve the "Beautiful/Stunning" requirement, use these specific "Code Snippets" patterns adapted from Aura's library:

### A. Border Gradients (Premium Feel)

Do not use simple borders. Use this Tailwind structure for cards (like the Bento Grid):

```jsx
<div class="relative p-[1px] rounded-xl bg-gradient-to-b from-white/20 to-transparent overflow-hidden">
  <div class="bg-slate-950 rounded-xl h-full w-full p-6">
    {/* Content Here */}
  </div>
</div>
B. Progressive Blur (Glassmorphism)
For the Sticky Navbar and Overlays: backdrop-blur-md bg-white/5 border-b border-white/10 supports-[backdrop-filter]:bg-white/5

C. Text Gradients (Headlines)
For high-impact B2B headlines (Hero Section): bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400

3. Interaction & Animation (Framer Motion + Tailwind)
Use the "Page Transitions" logic from Aura:

Hover States: All interactive elements must have transition-all duration-300 ease-out hover:scale-[1.02] active:scale-95.

Entrance: Use strict opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-700 for hero elements.

4. Component Architecture (The "@Reference" Logic)
Treat the project as a collection of reusable Aura components.

@Hero: Must contain H1, Subheadline, CTA, and Visual Mockup (Right or Bottom).

@BentoGrid: A CSS Grid container grid-cols-1 md:grid-cols-3 gap-6 where features live.

@Testimonial: Cards with avatars and "Verified" badges.

5. Assets & Images
Use aspect-video or aspect-square to prevent CLS (Cumulative Layout Shift).

Images must have object-cover and rounded corners rounded-2xl to match the UI language.
```
