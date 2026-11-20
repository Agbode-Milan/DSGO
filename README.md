# Divine Selasi Global Outreach website

Astro site for DSGO. Mobile-first, warm and photo-led, built to turn visitors into givers.

## Run it

```
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/ — upload anywhere (Netlify, Vercel, cPanel)
```

## Things to edit before launch

All in **`src/data/site.ts`**:

| Setting | What it does |
|---|---|
| `paymentLink` | Paste the Paystack / Flutterwave payment page link. While empty, every **Give** button opens WhatsApp with the chosen amount pre-written. |
| `giftTiers` | Suggested amounts and what each provides. **These are estimates — confirm real costs.** |
| `stats` | 500+ people / 200+ families — refresh after each outreach. |
| `socials` | Instagram / Facebook / TikTok / X links. Empty ones are hidden. |
| `whatsappNumber` | Used by every WhatsApp button and form. |

## Photos

Real outreach photos live in `src/assets/photos/`. Astro resizes them and serves AVIF/WebP automatically.
To add one: drop the `.jpg` in that folder and add a caption line in `src/data/photos.ts` — it then appears in the gallery and can be used anywhere with `<Photo slug="file-name" />`.

## How giving works

- **Gift picker** (home page + Donate): tap an amount → the impact line updates → **Give** opens the payment link (or WhatsApp).
- **Mobile give bar**: slides up on phones after the hero, on every page except Donate.
- **Item donation & volunteer forms**: open WhatsApp with the details filled in — no backend needed.
- **Countdown**: the hero counts down to the next 26th December automatically.

## Pages

`/` home · `/our-story` · `/our-impact` · `/gallery` · `/get-involved` · `/donate`
