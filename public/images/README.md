# Images

Use this folder for all image assets used by the upsell page.

## Naming

- `background-desktop.webp` - main desktop background.
- `background-mobile.webp` - main mobile background.
- `video-frame.svg` or `video-frame.webp` - optional decorative frame around the video.
- Use lowercase names, hyphens, and descriptive labels.
- Prefer `.webp` for photos/backgrounds and `.svg` for simple vector frames.

## Recommended Sizes

- Desktop background: `1920 x 1080 px`.
- Mobile background: `768 x 1024 px` or `768 x 1365 px`.
- Keep important visual elements away from the edges because the page uses cover-style cropping.

## Current Usage

The page currently references remote background/frame assets from the original page. Once local files are added here, update `app/page.tsx` to use:

```ts
const heroBackground = "/images/background-desktop.webp";
```

For a separate mobile background, add a CSS or responsive Tailwind rule that switches to:

```text
/images/background-mobile.webp
```

## Optimization

- Desktop background target weight: up to `300-500 KB`.
- Mobile background target weight: up to `200-350 KB`.
- Avoid uploading source PSD/AI/Figma exports here; keep only web-ready images.
