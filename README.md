# Upsell Page CS

Next.js landing page for the Conversation Strategies upsell flow.

## Stack

- Next.js App Router
- React
- Tailwind CSS
- vTurb/ConverteAI player embed

## Local Commands

```bash
pnpm install
pnpm dev
pnpm build
```

## CTA Reveal

The CTA group is hidden by default in `#vturb-cta-group` and can be revealed by adding the `is-visible` class, adding `show-upsell-ctas` to `body`, dispatching `vturb:show-ctas`, or opening the page with `?showCtas=1` for testing.
