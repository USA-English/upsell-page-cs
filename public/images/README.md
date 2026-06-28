# Images

Use this folder for all image assets used by the upsell page.

## Naming

- `background-desktop.webp` - main desktop background currently used from the `sm` breakpoint up.
- `backdrop-mobile.webp` - main mobile background currently used below the `sm` breakpoint.
- `typ-gift-favicon.webp` - favicon used by the page metadata.
- `background-mobile.webp` - optional alternate mobile background name for future versions.
- `video-frame.svg` or `video-frame.webp` - optional decorative frame around the video.
- Use lowercase names, hyphens, and descriptive labels.
- Prefer `.webp` for photos/backgrounds and `.svg` for simple vector frames.

## Recommended Sizes

- Desktop background: `1920 x 1080 px`.
- Mobile background: `768 x 1024 px` or `768 x 1365 px`.
- Favicon: square image, ideally `512 x 512 px` or larger.
- Keep important visual elements away from the edges because the page uses cover-style cropping.

## Current Usage

The page currently uses local background assets:

```ts
const heroBackground = "/images/background-desktop.webp";
const mobileHeroBackground = "/images/backdrop-mobile.webp";
```

Desktop uses `background-desktop.webp` from the `sm` breakpoint up. Mobile uses `backdrop-mobile.webp` below the `sm` breakpoint.

The favicon is configured in `app/layout.tsx`:

```ts
icons: {
  icon: "/images/typ-gift-favicon.webp",
  shortcut: "/images/typ-gift-favicon.webp",
  apple: "/images/typ-gift-favicon.webp"
}
```

If file names change, update `app/page.tsx` or `app/layout.tsx` accordingly.

## Optimization

- Desktop background target weight: up to `300-500 KB`.
- Mobile background target weight: up to `200-350 KB`.
- Avoid uploading source PSD/AI/Figma exports here; keep only web-ready images.
