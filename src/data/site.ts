// ─────────────────────────────────────────────────────────────
// DSGO site settings — edit these first.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Divine Selasi Global Outreach',
  short: 'DSGO',
  url: 'https://www.divineselasi.org',
  location: 'Accra, Ghana',
  whatsappNumber: '233266284398',
  whatsappDisplay: '+233 26 628 4398',

  /**
   * ONLINE PAYMENT LINK (Paystack / Flutterwave payment page).
   * Paste the full link here, e.g. 'https://paystack.com/pay/dsgo'.
   * While this is empty, every "Give" button opens WhatsApp instead,
   * with the chosen amount already written in the message.
   */
  paymentLink: '',

  /** Social profiles — leave '' to hide an icon. */
  socials: {
    instagram: '',
    facebook: '',
    tiktok: '',
    x: '',
  },

  /** The annual outreach date (day and month). */
  outreachDay: 26,
  outreachMonth: 12,
};

/** Build a wa.me link with a pre-filled message. */
export const wa = (text: string) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;

/**
 * Suggested gift amounts (Ghana cedis) and what each one provides.
 * ⚠ ESTIMATES — confirm these figures against real outreach costs
 * before launch, and update them each year.
 */
export const giftTiers = [
  {
    amount: 50,
    title: 'A warm meal',
    impact: 'A hot meal and a drink for a mother and her child on outreach day.',
  },
  {
    amount: 150,
    title: 'A school pack',
    impact: 'A bag, exercise books and pens so one child walks into January ready to learn.',
  },
  {
    amount: 300,
    title: 'A care bundle',
    impact: 'Clothes, soap and sanitary items for a young mother who carries loads all day.',
    featured: true,
  },
  {
    amount: 600,
    title: 'A family pack',
    impact: 'Food, clothing and everyday essentials for a whole family of four.',
  },
];

/** Impact figures — refresh after each outreach. */
export const stats = [
  { value: 500, suffix: '+', label: 'People supported' },
  { value: 200, suffix: '+', label: 'Families reached' },
];
