# Divine Selasi Global Outreach — Website

A static, mobile-first website for DSGO. No build step — plain HTML, CSS and JavaScript, so any volunteer comfortable editing text can maintain it.

## Structure

```
dsgo-website/
├── index.html          Home
├── our-story.html       About / Our Story
├── our-impact.html      Impact numbers and stories
├── gallery.html         Full photo gallery (masonry + lightbox)
├── get-involved.html    Volunteer / Partner / Spread the word
├── donate.html           Give money (via WhatsApp), give items, sponsorship
├── css/styles.css       All styles (design tokens at the top)
├── js/main.js           Nav, scroll reveal, lightbox, forms (submit → WhatsApp)
├── images/
│   ├── logo.jpg / logo-transparent*.png   Uploaded logo, processed versions
│   ├── icon-mark.png     Cropped logo icon used in the header/footer
│   ├── favicon*.png       Generated favicons
│   ├── real/             Real DSGO outreach photography (2024–2025), processed into
│   │                      hero/gallery-ready crops — see "Real photography" below
│   └── placeholders/     Remaining section/hero placeholder photos, still awaiting real shots
├── robots.txt
└── sitemap.xml
```

## Real photography

`images/real/` holds the real outreach photos supplied for the site (47 photos as of the last update), each processed into up to four files (using the shared `{slug}` name):

- `{slug}.jpg` — full working copy (long edge ≤1800px), used as the large lightbox image.
- `{slug}-land.jpg` — 16:9 landscape crop, used for hero/banner slots on desktop.
- `{slug}-port.jpg` — 4:5 portrait crop, used for hero/banner slots on mobile (served via `<picture><source media="(max-width: 640px)">`) and for split/story image blocks.
- `{slug}-sm.jpg` — small natural-aspect thumbnail, used in the gallery masonry grid.

The homepage hero is a carousel (`js/main.js`, "Hero carousel" section) that cycles through six real photos, auto-advancing every ~6.5s, pausable on hover/focus, swipeable on touch, and respecting `prefers-reduced-motion`. Each `<picture>` slide swaps to the `-port` crop under 640px so mobile visitors see a portrait-framed subject instead of a cropped-down landscape shot.

### Site-wide clickable gallery

Almost every real photo on the site — hero collage tiles, split/story images on Our Story, Our Impact and Get Involved, and the full masonry grid on `gallery.html` — carries `data-lightbox` (plus `data-full` for a larger image and `data-caption`). Clicking any of them opens the same lightbox used on the gallery page, with prev/next arrows that cycle through every photo visible on that page. To make a new image clickable this way, add `data-lightbox`, `data-full="images/real/your-photo.jpg"` and `data-caption="..."` to its container, and (outside the gallery masonry, which already has its own zoom icon) add `<span class="zoom-icon">...</span>` inside it, copying the icon markup from a neighbouring image — the hover icon and cursor are handled by CSS automatically for anything with `data-lightbox`. Pages that use this (`our-story.html`, `our-impact.html`, `get-involved.html`, `index.html`, `gallery.html`) each need the `<div class="lightbox">…</div>` markup once near the bottom of `<body>` — copy it from an existing page if you add lightbox images to a page that doesn't have one yet (`donate.html` currently doesn't).

### WhatsApp contact

The whole site is built around one WhatsApp number, `https://wa.me/233266284398`, and almost everything now goes there directly:

- **Volunteer and donation forms** (`get-involved.html`, `donate.html`) no longer show a fake "we've received it" confirmation. On submit, `js/main.js` reads the filled-in fields, builds a readable multi-line message (name, contact, what they chose, any notes), and opens WhatsApp in a new tab with that message pre-filled via `?text=`, so the visitor just has to hit send.
- **Quick-tap buttons** on `get-involved.html` (Outreach Day, Sorting & Packing, Offer a Skill, Year-Round) and `donate.html` (Mobile Money, Bank Transfer, plus every "Enquire"/"Sign Up" link under Other Ways to Help) are plain `wa.me` links, each with its own pre-filled message, for anyone who'd rather skip the form entirely.
- The floating WhatsApp button (`.whatsapp-float`, bottom-right, all pages) and the footer contact line link to the same number.

To change the number, update `233266284398` (and the display text `+233 26 628 4398`) across the HTML and JS files — it appears in `js/main.js` as the `WHATSAPP_NUMBER` constant plus in every `wa.me` link in the HTML.

## Replacing/adding placeholder photos

The few remaining placeholder images are generated graphics labeled "PLACEHOLDER — REPLACE WITH REAL PHOTO" so nothing is mistaken for a real photo of a real person. To swap one in:

1. Process it the same way as the existing real photos (crop to `-land`/`-port`/`-sm` variants as needed — see above), name it to match the placeholder it replaces, and update the `src`/`href`/`srcset` in the relevant HTML file, **or**
2. For a simple 1:1 swap with no responsive art-direction, just replace the placeholder file in place under the same filename.

No layout changes are required either way — the CSS uses `object-fit: cover` and flexible aspect ratios, so photos of different orientations still look intentional.

The gallery (`gallery.html`) is a single masonry grid, one flat list of photos with no year or category grouping. Add more photos by copying an existing `<a class="masonry-item">` block anywhere in the grid and pointing it at your new image (add `data-full="images/real/your-photo.jpg"` if you want the lightbox to open a larger version than the thumbnail, and a `-sm.jpg` thumbnail sized to roughly 640px wide for the grid itself).

## Team photos on Our Story

The "The people behind DSGO" section on `our-story.html` currently shows a simple 4-photo grid with no names or bios, written that way on purpose since real team photos hadn't been supplied yet. Once they're available, drop each photo in under `images/real/` and swap the `src` in the matching `.story-card .story-media img`; add a name/role caption underneath if you'd like one, following the pattern of any other captioned photo on the site.

## Updating the impact numbers

The stat strip on `index.html` and `our-impact.html` ("500+ people supported", "200+ families reached", the descriptive line about what's given out) is meant to be refreshed after each outreach rather than tracked to the exact person or item. Just edit the numbers directly in both files (search for `500+` and `200+`) and update the `stat-note` line beneath them if the phrasing needs to change.

## Social media links

Update the `href="#"` links in the footer's social icon row (present on every page) with real profile URLs once accounts are set up.

## Deploying

This site needs no build step or server-side code, so it can be hosted anywhere that serves static files:

- **Netlify / Vercel**: drag-and-drop the `dsgo-website` folder, or connect a Git repository.
- **GitHub Pages**: push this folder to a repository and enable Pages on the `main` branch.
- **Traditional hosting (cPanel, etc.)**: upload the contents of this folder to your `public_html` directory.

Update the canonical URLs in each page's `<head>` and in `sitemap.xml`/`robots.txt` to match your final domain.

## Forms

The volunteer form (`get-involved.html`) and the physical-donation form (`donate.html`) don't send data anywhere on their own (there's no backend). Instead, `js/main.js` builds a WhatsApp message from what was filled in and opens `wa.me` with it pre-filled, so submissions arrive as ordinary WhatsApp messages DSGO can reply to directly. The newsletter/contact form still just shows an on-page confirmation; if you want it to actually deliver messages (or want the WhatsApp forms to *also* log to a spreadsheet or inbox), connect it to a form service (e.g. Formspree, Netlify Forms) or a custom backend and update the relevant handler in `js/main.js`.
