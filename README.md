# ResumePro

A premium, free resume builder designed for modern hiring. No signup required, instant PDF export, and ATS-friendly templates.

## Design Philosophy

ResumePro follows a calm, professional, and editorial design approach that prioritizes:

- **Clarity over decoration** – Clean layouts with generous whitespace
- **Confidence over hype** – Straightforward messaging without marketing buzzwords
- **Accessibility over barriers** – Zero friction, no signup walls
- **Quality over quantity** – Refined templates that work across industries

### Visual Identity

- **Color Palette**: Light, neutral tones with subtle depth
  - Primary: `#111827` (Charcoal) – for text and key UI elements
  - Secondary: `#6B7280` (Gray) – for supporting text
  - Borders: `#E5E7EB` (Light Gray) – soft separation
  - Background: `#FFFFFF` & `#F9FAFB` – clean, airy spaces

- **Typography**: System font stack for native feel
  - Headings: 600 weight, tight letter-spacing (-0.02em)
  - Body: 400-500 weight, comfortable line-height (1.5-1.7)
  - Scale: 14px–64px, responsive and hierarchical

- **Shadows**: Subtle and realistic
  - Cards: `0 2px 16px rgba(0,0,0,0.08)`
  - Hover: `0 4px 24px rgba(0,0,0,0.12)`
  - No exaggerated drop shadows or glows

- **Spacing**: Generous and consistent
  - Sections: 96-128px vertical rhythm
  - Components: 16-24px internal padding
  - Grid gaps: 16-32px based on breakpoint

### Content Strategy

**Hero Section**
- Headline: Direct, confident, outcomes-focused
- Subheadline: Clear value props (free, no signup, instant)
- CTAs: Low-pressure language ("Create your resume" vs "Sign up now")

**Features Section**
- 3 core benefits, not feature lists
- Benefit-led titles with supporting clarity
- Focus: ATS-friendly, professional, instant export

**Testimonials**
- Credible, realistic tone
- No over-enthusiasm or hyperbole
- Highlight specific outcomes without fake urgency

**CTA Section**
- Invitation, not pressure
- Reinforce ease and zero friction
- Single, clear action

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load fonts.

## Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── (builder)/          # Resume builder routes
│   ├── (site)/             # Marketing site routes
│   ├── globals.css         # Global styles
│   └── layout.js           # Root layout
├── components/             # React components
│   ├── HomePage.jsx        # Landing page (redesigned)
│   ├── Header.jsx          # Navigation (refined)
│   ├── Footer.jsx          # Footer (minimal)
│   ├── Review.jsx          # Testimonials section
│   └── ReviewCard.jsx      # Individual testimonial card
├── redux/                  # State management
└── utils/                  # Helper functions
```

## Design System Guidelines

### Component Patterns

**Buttons**
- Primary: `bg-[#111827] text-white` with subtle hover
- Secondary: `border border-[#E5E7EB]` with light hover state
- Padding: `px-7 py-3.5` for comfortable touch targets
- Border radius: `rounded-lg` (8px) for modern, refined look

**Cards**
- Border: `border-[#E5E7EB]` for soft separation
- Hover: Subtle shadow lift, no transform scale
- Padding: `p-7` for breathing room
- Border radius: `rounded-xl` (12px)

**Typography Hierarchy**
- H1: 44-64px, semibold (600)
- H2: 36-44px, semibold (600)
- H3: 19px, semibold (600)
- Body: 15-17px, normal (400)
- Small: 13-14px, medium (500)

### Spacing System

- Section vertical: `py-24 md:py-32` (96-128px)
- Container horizontal: `px-6 md:px-8 lg:px-12`
- Component gaps: `gap-4` to `gap-16` based on context
- Max-width constraints: `max-w-[680px]` for readability

## Brand Principles

1. **No dark mode** – Maintain light, airy aesthetic
2. **No aggressive colors** – Avoid neon, bright gradients
3. **No urgency tactics** – No countdowns, fake scarcity
4. **No signup pressure** – Emphasize instant access
5. **No buzzword overload** – Clear, direct language

## Maintenance Notes

When adding new content or features:

- Keep copy concise and benefit-focused
- Use neutral, professional language
- Maintain generous whitespace
- Test on mobile (320px+) for readability
- Ensure ATS-friendly template quality remains priority

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
