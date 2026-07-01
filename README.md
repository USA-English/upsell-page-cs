# Upsell Page CS

Next.js landing page for the Conversation Strategies upsell flow.

## Stack

- Next.js App Router
- React
- Tailwind CSS
- vTurb/ConverteAI player embed
- LastLink one-click upsell script
- Make webhook verification for the already-purchased flow

## Local Commands

```bash
pnpm install
pnpm dev
pnpm build
```

## LastLink One-Click Upsell

The page loads the required LastLink script in `app/page.tsx`:

```html
<script src="https://cdn.lastlink.com/upsell.min.js"></script>
```

The post-upsell redirect is configured as:

```js
var upsellRedirect = "https://typ-final-converted-cs.leandrocraig.com/";
```

Do not replace the LastLink script and do not rename the accept button ID.

## CTA Buttons

The CTA group lives in `#vturb-cta-group` inside `app/page.tsx`.

Current buttons:

- Primary upsell button
  - Text: `COMPRAR O PRESENTE MISTERIOSO POR R$9,90`
  - ID: `llupsell-CA735AB24-`
  - Function: accepts and processes the one-click upsell through LastLink
  - Post-purchase URL: `https://typ-final-converted-cs.leandrocraig.com/`
  - Important: this button must not have `href`, `onclick`, or any custom redirect
  - Color: green, configured through Tailwind color `buy`
  - Desktop helper label: `← ÚLTIMA CHANCE ❗`, positioned to the right of the button
  - Mobile helper label: `ÚLTIMA CHANCE ❗` with `↓`, positioned above the button

- Refusal button
  - Text: `Não quero o presente.`
  - ID: `denyButton77f02e7`
  - Function: refuses the offer through the LastLink deny-button hook and redirects to the final thank-you page
  - URL: `https://typ-final.leandrocraig.com/`
  - URL query parameters from the current page are preserved
  - Color: red, configured through Tailwind color `refuse`

- Already purchased button
  - Text: `Já comprei por R$2 na tela anterior 😎`
  - ID: `alreadyBoughtButton`
  - Function: opens a modal, asks for purchase email, and verifies through Make
  - Make URL: `https://hook.us2.make.com/22jehst3h93w5vi01r3vel961clrzkee`
  - Request: `GET` with `email=<email informado>`
  - Trigger: only the explicit click on `Verificar compra` inside the modal calls Make
  - The `Verificar compra` button stays disabled until the email matches the local validation regex
  - Opening the modal, typing the email, or pressing Enter must not call Make
  - Confirmed response: `{ "hasGift": true }`
  - Denied response: `{ "hasGift": false }`
  - Confirmed URL: `https://typ-final-converted-cs.leandrocraig.com/`
  - Failure fallback URL: `https://typ-final-converted-cs.leandrocraig.com/`
  - Failure fallback delay: wait at least `10s` from submission before redirecting
  - Color: `#0349b9`

There must be exactly one element with `id="llupsell-CA735AB24-"`.
The third button must not use the LastLink accept ID and must not use an ID starting with `denyButton`.

The previous WhatsApp CTA was removed. All old Ticto classes and button IDs should remain absent.

## CTA Reveal

The CTA group is currently visible by default while visual adjustments are being made.

When it is time to hide the buttons again, change `.vturb-cta-group` in `app/globals.css` back to `display: none;`.

The reveal hooks are still available: add the `is-visible` class, add `show-upsell-ctas` to `body`, dispatch `vturb:show-ctas`, or open the page with `?showCtas=1` for testing.

## Search Indexing

This upsell page should not be indexed by search engines.

Current protections:

- `app/layout.tsx` sets `robots` metadata to `noindex` and `nofollow`.
- `app/robots.ts` generates a `robots.txt` that disallows all crawlers.
- `next.config.ts` sends `X-Robots-Tag: noindex, nofollow, noarchive` on all routes.

These settings discourage indexing and search visibility, but they do not authenticate the page. Anyone with the direct URL can still open it.
