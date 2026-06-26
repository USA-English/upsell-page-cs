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

## CTA Buttons

The CTA group lives in `#vturb-cta-group` inside `app/page.tsx`.

Current buttons:

- Primary upsell button
  - Text: `COMPRAR O PRESENTE MISTERIOSO POR R$9,90`
  - Class: `ticto-upsell-button`
  - Color: green, configured through Tailwind color `buy`
  - Current behavior: button element reserved for a future purchase/checkout script
  - Desktop helper label: `← ÚLTIMA CHANCE ❗`, positioned to the right of the button
  - Mobile helper label: `ÚLTIMA CHANCE ❗` with `↓`, positioned above the button

- Refusal button
  - Text: `Não quero o presente.`
  - Class: `ticto-refuse-button`
  - Color: red, configured through Tailwind color `refuse`
  - URL: `https://hub.speakingrooms.com.br/login`
  - Target behavior: same tab

- Already purchased button
  - Text: `Já comprei por R$2 na tela anterior 😎`
  - Color: `#0349b9`
  - URL: `https://hub.speakingrooms.com.br/login`
  - Target behavior: same tab

The previous WhatsApp CTA was removed.

## CTA Reveal

The CTA group is currently visible by default while visual adjustments are being made.

When it is time to hide the buttons again, change `.vturb-cta-group` in `app/globals.css` back to `display: none;`.

The reveal hooks are still available: add the `is-visible` class, add `show-upsell-ctas` to `body`, dispatch `vturb:show-ctas`, or open the page with `?showCtas=1` for testing.
