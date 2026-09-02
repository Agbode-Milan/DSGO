# Divine Selasi Global Outreach — Website

A static, mobile-first website for DSGO. No build step — plain HTML, CSS and JavaScript, so any volunteer comfortable editing text can maintain it.

## Structure

```
dsgo-website/
├── index.html          Home
├── our-story.html       About / Our Story
├── our-impact.html      Impact numbers, stories, transparency
├── gallery.html         Full photo gallery (masonry + lightbox, filterable by category)
├── get-involved.html    Volunteer / Partner / Spread the word
├── donate.html           Give money, give items, sponsorship
├── css/styles.css       All styles (design tokens at the top)
├── js/main.js           Nav, scroll reveal, gallery filter + lightbox, forms
├── images/
│   ├── logo.jpg / logo-transparent*.png   Uploaded logo, processed versions
│   ├── icon-mark.png     Cropped logo icon used in the header/footer
│   ├── favicon*.png       Generated favicons
│   ├── real/             Real DSGO outreach photography (2024–2025), processed into
│   │                      hero/gallery-ready crops — see "Real photography" below
│   ├── placeholders/     Remaining section/hero placeholder photos, still awaiting real shots
│   └── gallery/          Remaining placeholder gallery photos (a few slots per category)
├── robots.txt
└── sitemap.xml
```

## Real photography

`images/real/` holds the real outreach photos supplied for the site (31 photos as of the last update), each processed into up to four files (using the shared `{slug}` name):

- `{slug}.jpg` — full working copy (long edge ≤1800px), used as the large lightbox image.
- `{slug}-land.jpg` — 16:9 landscape crop, used for hero/banner slots on desktop.
- `{slug}-port.jpg` — 4:5 portrait crop, used for hero/banner slots on mobile (served via `<picture><source media="(max-width: 640px)">`) and for split/story image blocks.
- `{slug}-sm.jpg` — small natural-aspect thumbnail, used in the gallery masonry grid.

The homepage hero is a carousel (`js/main.js`, "Hero carousel" section) that cycles through six real photos, auto-advancing every ~6.5s, pausable on hover/focus, swipeable on touch, and respecting `prefers-reduced-motion`. Each `<picture>` slide swaps to the `-port` crop under 640px so mobile visitors see a portrait-framed subject instead of a cropped-down landscape shot.

### Site-wide clickable gallery

Almost every real photo on the site — hero collage tiles, split/story images on Our Story, Our Impact and Get Involved, and the full masonry grid on `gallery.html` — carries `data-lightbox` (plus `data-full` for a larger image and `data-caption`). Clicking any of them opens the same lightbox used on the gallery page, with prev/next arrows that cycle through every photo visible on that page. To make a new image clickable this way, add `data-lightbox`, `data-full="images/real/your-photo.jpg"` and `data-caption="..."` to its container, and (outside the gallery masonry, which already has its own zoom icon) add `<span class="zoom-icon">...</span>` inside it, copying the icon markup from a neighbouring image — the hover icon and cursor are handled by CSS automatically for anything with `data-lightbox`. Pages that use this (`our-story.html`, `our-impact.html`, `get-involved.html`, `index.html`, `gallery.html`) each need the `<div class="lightbox">…</div>` markup once near the bottom of `<body>` — copy it from an existing page if you add lightbox images to a page that doesn't have one yet (`donate.html` currently doesn't).

### WhatsApp contact

"Donate Now" buttons, volunteering CTAs, and all direct-contact links (partnership enquiries, international giving, footer contact) point to DSGO's WhatsApp number via `https://wa.me/233266284398` (optionally with a pre-filled `?text=` message). The nav/header "Donate" button and the main giving options on `donate.html` (Mobile Money, bank transfer, the physical-donation form) still route to the full donate page, since that's where the actual giving methods live — WhatsApp is offered there too, as the option that works today while Mobile Money/bank details are still placeholders. A floating WhatsApp button (`.whatsapp-float`, bottom-right, all pages) links to the same number. To change the number, update `233266284398` (and the display text `+233 26 628 4398`) across the HTML files.

## Replacing/adding placeholder photos

The few remaining placeholder images are generated graphics labeled "PLACEHOLDER — REPLACE WITH REAL PHOTO" so nothing is mistaken for a real photo of a real person. To swap one in:

1. Process it the same way as the existing real photos (crop to `-land`/`-port`/`-sm` variants as needed — see above), name it to match the placeholder it replaces, and update the `src`/`href`/`srcset` in the relevant HTML file, **or**
2. For a simple 1:1 swap with no responsive art-direction, just replace the placeholder file in place under the same filename.

No layout changes are required either way — the CSS uses `object-fit: cover` and flexible aspect ratios, so photos of different orientations still look intentional.

The gallery (`gallery.html`) is organized into seven categories that match the brief: Outreach Days, Donations, Volunteers, Community, Young Mothers, Children, Behind the Scenes. All but Volunteers and Behind the Scenes are now fully real photos. Add more photos by copying an existing `<a class="masonry-item" data-category="...">` block and pointing it at your new image (add `data-full="images/real/your-photo.jpg"` if you want the lightbox to open a larger version than the thumbnail).

## Replacing placeholder text

Search for `[Placeholder` or `[X]` across the HTML files — these mark:

- Impact statistics (people supported, families reached, items distributed)
- Mobile Money / bank donation details on `donate.html`
- Team bios on `our-story.html`
- Beneficiary stories on `index.html` and `our-impact.html`
- Contact address and registration details in the footer and `our-impact.html`

**Do not publish the donation page until the Mobile Money and bank details are filled in and verified** — the placeholder copy explicitly warns visitors not to send funds until the notice is removed.

## Social media links

Update the `href="#"` links in the footer's social icon row (present on every page) with real profile URLs once accounts are set up.

## Deploying

This site needs no build step or server-side code, so it can be hosted anywhere that serves static files:

- **Netlify / Vercel**: drag-and-drop the `dsgo-website` folder, or connect a Git repository.
- **GitHub Pages**: push this folder to a repository and enable Pages on the `main` branch.
- **Traditional hosting (cPanel, etc.)**: upload the contents of this folder to your `public_html` directory.

Update the canonical URLs in each page's `<head>` and in `sitemap.xml`/`robots.txt` to match your final domain.

## Forms

The volunteer, physical-donation and newsletter forms currently show a confirmation message on submit but do not send data anywhere (there's no backend yet). To make them functional, connect them to a form service (e.g. Formspree, Netlify Forms) or a custom backend, and update `js/main.js`'s submit handler accordingly.
