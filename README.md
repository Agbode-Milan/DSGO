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
│   ├── placeholders/     Large section/hero placeholder photos
│   └── gallery/          Placeholder gallery photos (7 categories × 4)
├── robots.txt
└── sitemap.xml
```

## Replacing placeholder photos

Every placeholder image is a generated graphic labeled "PLACEHOLDER — REPLACE WITH REAL PHOTO" so nothing is mistaken for a real photo of a real person. To swap one in:

1. Name your real photo the same as the placeholder it replaces (e.g. a real outreach-day shot becomes `images/gallery/outreach-days-1.jpg`), **or**
2. Keep your own filenames and update the `src`/`href` in the relevant HTML file to match.

No layout changes are required either way — the CSS uses `object-fit: cover` and flexible aspect ratios, so photos of different orientations still look intentional. Portrait photos work well in the `split-media` and gallery blocks; wide landscape photos work best for hero and collage sections.

The gallery (`gallery.html`) is organized into seven categories that match the brief: Outreach Days, Donations, Volunteers, Community, Young Mothers, Children, Behind the Scenes. Add more photos by copying an existing `<a class="masonry-item" data-category="...">` block and pointing it at your new image.

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
