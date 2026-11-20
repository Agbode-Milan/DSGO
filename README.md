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
| `paymentLink` | Paste the Paystack / Flutterwave payment page link. While empty, the **Give** button reveals the Mobile Money and bank details. |
| `momo`, `bank` | Mobile Money and bank details shown on the Give box and the Donate page. |
| `campaign` | Funfest goal (GH₵50,000), children (1,000), cost per child and the breakdown. Set `raised` above 0 to show a progress bar. |
| `programmes`, `values` | The three programmes and the core values. |
| `giftTiers` | Sponsor options (GH₵50 = one child) and what each provides. |
| `stats` | 500+ people / 200+ families — refresh after each outreach. |
| `socials` | Instagram / Facebook / TikTok / X links. Empty ones are hidden. |
| `whatsappNumber` | Used by every WhatsApp button and form. |

## Photos

Real outreach photos live in `src/assets/photos/`. Astro resizes them and serves AVIF/WebP automatically.
To add one: drop the `.jpg` in that folder and add a caption line in `src/data/photos.ts` — it then appears in the gallery and can be used anywhere with `<Photo slug="file-name" />`.

## How giving works

- **Gift picker** (home page + Donate): tap an amount → the impact line updates → **Give** opens the payment link, or shows Mobile Money and bank details with copy buttons.
- **Mobile give bar**: slides up on phones after the hero, on every page except Donate.
- **Item donation & volunteer forms**: open WhatsApp with the details filled in — no backend needed.
- **Countdown**: the hero counts down to the next 26th December automatically.

## Pages

`/` home · `/our-story` · `/our-impact` · `/gallery` · `/get-involved` · `/donate`
