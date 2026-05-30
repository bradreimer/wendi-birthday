# Wendi Birthday Site - Living Specs

## 1) Product Goal
Build a fast, modern, visually dynamic single-page birthday site that celebrates Wendi with playful energy and strong personalization (teaching, cooking, schnauzers).

## 2) Primary Audience
- Wendi (primary)
- Friends/family viewing the celebration page (secondary)

## 3) Core Requirements (Must Have)
- Show "Happy Birthday, Wendi!" in a fun, prominent way.
- Fill the page with birthday visuals and schnauzer-themed imagery.
- Include a "Get Birthday Wishes" button.
- On button click, trigger an explosive celebration effect (confetti + dynamic visual state change).
- Render quickly on modern desktop and mobile browsers.
- Deploy via Docker Compose and expose on port 3003.

## 4) Experience Direction
- Tone: joyful, playful, energetic, affectionate.
- Visual style: modern collage/poster vibe with layered gradients, stickers, and animated elements.
- Motion: meaningful launch animations and celebration burst; avoid motion overload.
- Personal motifs:
  - Teacher references: books, chalkboard cues, stars/stickers.
  - Cooking references: cake, whisk, kitchen warmth.
  - Schnauzers: repeated throughout hero and gallery.

## 5) Technical Stack Decision
- Frontend: React + TypeScript + Vite.
- Rationale:
  - Reactive UI state makes celebration mode and dynamic wishes easy to evolve.
  - Vite provides fast startup/build and small production bundles.
  - TypeScript keeps future iteration safer.
- Effects: canvas-confetti for burst celebration.
- Hosting in container: static production build served by Nginx.
- Orchestration: docker-compose with host port 3003 mapped to container port 80.

## 6) Functional Specs
### Hero Section
- Large headline: "Happy Birthday, Wendi!"
- Support copy with personalized references (teacher + cooking + schnauzers).
- CTA button: "Get Birthday Wishes".

### Wish Delivery
- On CTA click:
  - Randomized or rotating birthday wishes appear.
  - Confetti explosion sequence fires immediately.
  - Page enters temporary "party mode" (background/motion amplification).
  - Surprise guest cards for Hermann and Fibs pop into view with "Happy Birthday, Wendi!" greetings.
  - Hermann and Fibs images are sourced from `http://schnode.local:3002`.

### Visual Density
- Page should remain richly decorated above and below the fold.
- Use image tiles/stickers/cards to keep visual energy across viewport sizes.
- Schnauzer visuals should be clearly visible in multiple sections.
- Include a "celebration news desk" collection featuring article-style cards about what makes Wendi amazing.

### Responsiveness
- Mobile-first behavior with scaling typography and reflowing card grid.
- CTA and key message remain visible without excessive scrolling.

## 7) Non-Functional Specs
- Performance:
  - Fast initial paint on modern browsers.
  - Minimize runtime work while idle.
- Accessibility:
  - Sufficient text contrast.
  - Keyboard focusable button.
  - Respect reduced motion preferences where feasible.
- Reliability:
  - Deterministic Docker build.
  - Single command startup via docker-compose.

## 8) Deployment Specs
- `docker-compose up --build` starts site.
- Service available at http://localhost:3003.
- Production image uses multi-stage build:
  - Stage 1: Node builds static assets.
  - Stage 2: Nginx serves dist bundle.

## 9) Acceptance Criteria (v1)
- User can load page at localhost:3003 from Docker Compose.
- Headline appears exactly as "Happy Birthday, Wendi!".
- Page includes obvious birthday + schnauzer visuals.
- Clicking CTA triggers immediate celebration burst and visible state change.
- Layout is modern and usable on mobile and desktop.

## 10) Iteration Controls (What We Can Tune Quickly)
- Theme direction: colors, font personality, texture intensity.
- Motion intensity: subtle, medium, explosive.
- Wish tone: sweet, funny, extra-chaotic.
- Visual mix ratio: schnauzer-heavy vs birthday-heavy vs cooking/teaching-heavy.
- Density level: airy, balanced, maximalist.

## 11) Next Iteration Candidates
- Add custom wish editor (JSON list in config).
- Add music toggle (off by default).
- Add countdown / age milestone module.
- Add photo upload slots for friends/family.
- Add alternate themes selectable by a toggle.

## 12) Current Scope Boundary
- Single-page app only (no backend).
- No user authentication.
- No persistent data storage.
