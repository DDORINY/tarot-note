# Tarot Card Images

## Storage Location

Major Arcana card images should be stored in:

```text
public/images/cards/major/
```

Minor Arcana Wands card images should be stored in:

```text
public/images/cards/minor/wands/
```

Minor Arcana Cups, Swords, and Pentacles images should be stored in:

```text
public/images/cards/minor/cups/
public/images/cards/minor/swords/
public/images/cards/minor/pentacles/
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

Wands images use these filenames:

```text
ace-of-wands.jpg
two-of-wands.jpg
three-of-wands.jpg
four-of-wands.jpg
five-of-wands.jpg
six-of-wands.jpg
seven-of-wands.jpg
eight-of-wands.jpg
nine-of-wands.jpg
ten-of-wands.jpg
page-of-wands.jpg
knight-of-wands.jpg
queen-of-wands.jpg
king-of-wands.jpg
```

Cups images use the same rank pattern:

```text
ace-of-cups.jpg
two-of-cups.jpg
three-of-cups.jpg
four-of-cups.jpg
five-of-cups.jpg
six-of-cups.jpg
seven-of-cups.jpg
eight-of-cups.jpg
nine-of-cups.jpg
ten-of-cups.jpg
page-of-cups.jpg
knight-of-cups.jpg
queen-of-cups.jpg
king-of-cups.jpg
```

Swords images use the same rank pattern:

```text
ace-of-swords.jpg
two-of-swords.jpg
three-of-swords.jpg
four-of-swords.jpg
five-of-swords.jpg
six-of-swords.jpg
seven-of-swords.jpg
eight-of-swords.jpg
nine-of-swords.jpg
ten-of-swords.jpg
page-of-swords.jpg
knight-of-swords.jpg
queen-of-swords.jpg
king-of-swords.jpg
```

Pentacles images use the same rank pattern:

```text
ace-of-pentacles.jpg
two-of-pentacles.jpg
three-of-pentacles.jpg
four-of-pentacles.jpg
five-of-pentacles.jpg
six-of-pentacles.jpg
seven-of-pentacles.jpg
eight-of-pentacles.jpg
nine-of-pentacles.jpg
ten-of-pentacles.jpg
page-of-pentacles.jpg
knight-of-pentacles.jpg
queen-of-pentacles.jpg
king-of-pentacles.jpg
```

## URL Rules

Because these files live under `public`, the app should reference them with root-relative paths:

```text
/images/cards/major/fool.jpg
/images/cards/major/magician.jpg
/images/cards/minor/wands/ace-of-wands.jpg
/images/cards/minor/wands/two-of-wands.jpg
/images/cards/minor/cups/ace-of-cups.jpg
/images/cards/minor/swords/ace-of-swords.jpg
/images/cards/minor/pentacles/ace-of-pentacles.jpg
```

The same path is used in `data/mock-cards.ts` as `imageUrl` and in Supabase as `tarot_cards.image_url`.

## Copyright Notes

Only use images you have the right to use in this service.

If you use Rider-Waite-Smith images from Wikimedia Commons or another archive, verify that the specific file is public domain in your target jurisdiction and that its source metadata is trustworthy.

Do not use modern recolored decks, commercial tarot decks, or artist-edited versions without explicit permission or a license that allows your intended use.
