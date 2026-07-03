# Brand Assets

## Storage Location

Brand images live under:

```text
public/images/brand/
```

The app currently references these files:

```text
tarot-note-symbol.png
hero-tarot-table.png
og-image.png
```

## Usage

- `tarot-note-symbol.png`: Header logo and auth screen brand symbol
- `hero-tarot-table.png`: Home and tarot question screen visual
- `og-image.png`: OpenGraph preview image

## Recommended Sizes

- `tarot-note-symbol.png`: 512x512
- `hero-tarot-table.png`: 1600x900 or 1920x1080
- `og-image.png`: 1200x630

## Filename Rules

Use lowercase kebab-case filenames. Keep the current `.png` names unless the code and metadata are updated together.

The project can later move to `.webp` for better compression, but update every reference at the same time:

```text
/images/brand/tarot-note-symbol.png
/images/brand/hero-tarot-table.png
/images/brand/og-image.png
```

## Fallback Behavior

The UI is built so missing brand images do not break the app. If an image fails to load, the Header and auth screens show a simple icon fallback, and hero areas show a layout-safe visual fallback.

## Image Guidelines

Do not include readable text inside generated brand images. Keep text in HTML so it remains accessible, translatable, and crisp on every screen size.

Compress images before committing them. Prefer optimized PNG/JPG or WebP when the code is updated to point to WebP files. Avoid very large assets so the GitHub repository does not grow unnecessarily.
