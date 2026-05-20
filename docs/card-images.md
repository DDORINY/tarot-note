# Tarot Card Images

## Storage Location

Major Arcana card images should be stored in:

```text
public/images/cards/major/
```

The card back image is stored at:

```text
public/images/card-back.png
```

## Filename Rules

Use lowercase kebab-case filenames with the `.jpg` extension.

```text
fool.jpg
magician.jpg
high-priestess.jpg
empress.jpg
emperor.jpg
hierophant.jpg
lovers.jpg
chariot.jpg
strength.jpg
hermit.jpg
wheel-of-fortune.jpg
justice.jpg
hanged-man.jpg
death.jpg
temperance.jpg
devil.jpg
tower.jpg
star.jpg
moon.jpg
sun.jpg
judgement.jpg
world.jpg
```

## URL Rules

Because these files live under `public`, the app should reference them with root-relative paths:

```text
/images/cards/major/fool.jpg
/images/cards/major/magician.jpg
```

The same path is used in `data/mock-cards.ts` as `imageUrl` and in Supabase as `tarot_cards.image_url`.

## Copyright Notes

Only use images you have the right to use in this service.

If you use Rider-Waite-Smith images from Wikimedia Commons or another archive, verify that the specific file is public domain in your target jurisdiction and that its source metadata is trustworthy.

Do not use modern recolored decks, commercial tarot decks, or artist-edited versions without explicit permission or a license that allows your intended use.
