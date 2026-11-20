// ─────────────────────────────────────────────────────────────
// DSGO site settings — edit these first.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Divine Selasi Global Outreach',
  short: 'DSGO',
  url: 'https://www.divineselasi.org',
  location: 'Accra, Ghana',
  founded: 'September 2022',
  status: 'Registered non-profit (LBG) in Ghana',
  whatsappNumber: '233266284398',
  whatsappDisplay: '+233 26 628 4398',
  phone: '+233555252350',
  phoneDisplay: '+233 55 525 2350',
  email: 'dsglobaloutreach@gmail.com',

  /**
   * ONLINE PAYMENT LINK (Paystack / Flutterwave payment page).
   * Paste the full link here, e.g. 'https://paystack.com/pay/dsgo'.
   * While this is empty, the Give button shows the Mobile Money and
   * bank details below instead.
   */
  paymentLink: '',

  /** How to give directly. */
  momo: {
    number: '0555 25 23 50',
    name: 'Divine Selasi Agbodeka',
    reference: 'CHOF + your name',
  },
  bank: {
    bank: 'Cal Bank, Labone Branch',
    account: '1400008502201',
    name: 'Divine Selasi Global Outreach LBG',
  },

  /** Social profiles — leave '' to hide an icon. */
  socials: {
    instagram: 'https://www.instagram.com/childofhopefunfest',
    facebook: '',
    tiktok: '',
    x: '',
  },
  instagramHandle: '@childofhopefunfest',

  /** The annual Child of Hope Funfest (day and month). */
  outreachDay: 26,
  outreachMonth: 12,
};

/** Build a wa.me link with a pre-filled message. */
export const wa = (text: string) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;

/**
 * Child of Hope Funfest 2026 fundraising goal.
 * `raised` shows a progress bar when above 0 — update it as gifts come in.
 */
export const campaign = {
  year: 2026,
  goal: 50000,
  raised: 0,
  children: 1000,
  perChild: 50,
  breakdown: [
    { amount: 25, icon: 'food', title: 'Feeding & refreshment', text: 'A hot lunch and drinks for one child.' },
    { amount: 15, icon: 'bible', title: 'Bible-story book', text: 'Their own Child of Hope colouring book.' },
    { amount: 10, icon: 'party', title: 'Play & logistics', text: 'Their share of the games, bouncy castles and set-up.' },
  ],
};

/** Gift options: GH₵50 sponsors one child. */
export const giftTiers = [
  {
    amount: 50,
    title: '1 child',
    impact: 'One child gets a hot meal, their own Bible-story book and a whole day of play.',
  },
  {
    amount: 150,
    title: '3 children',
    impact: 'Three children, maybe a whole family of siblings, share a day they’ll talk about for months.',
  },
  {
    amount: 250,
    title: '5 children',
    impact: 'Five children eat, play, laugh and go home holding a book of Bible stories of their own.',
    featured: true,
  },
  {
    amount: 500,
    title: '10 children',
    impact: 'Ten children through the gate, fed, celebrated and loved for the day.',
  },
  {
    amount: 1000,
    title: '20 children',
    impact: 'Twenty children: a whole classroom’s worth of joy, food and Bible stories.',
  },
];

/** Impact figures — refresh after each outreach. */
export const stats = [
  { value: 500, suffix: '+', label: 'People supported' },
  { value: 200, suffix: '+', label: 'Families reached' },
];

/** The three DSGO programmes. */
export const programmes = [
  {
    icon: 'party',
    name: 'Child of Hope Funfest',
    when: 'Every 26 December',
    text: 'Our flagship outreach for the children and mothers of the Kayayei community in Agbogbloshie: free health screenings, hot Christmas meals, gifts, a full funfair, and skills training for head porters.',
    href: '/donate',
    cta: 'Sponsor a child',
    featured: true,
  },
  {
    icon: 'music',
    name: 'The WinePress Worship Concert',
    when: 'Once a year',
    text: 'A night of worship built on repentance, restitution and revival, to uplift, heal and bring hope by the power of the Holy Spirit. We also take worship outreaches into senior high schools across Ghana.',
  },
  {
    icon: 'tent',
    name: 'The Seekers Tent',
    when: 'Every quarter',
    text: 'An intimate gathering for anyone hungry for more of Jesus. Through songs, prayer and Bible study, we help people grow a real, personal relationship with Him.',
  },
];

/** Core values. */
export const values = [
  { icon: 'shield', title: 'Integrity', text: 'Honest, open and accountable in everything we do.' },
  { icon: 'cross', title: 'Faith-centred service', text: 'We serve because of the love of Jesus, and in His name.' },
  { icon: 'heart', title: 'Compassion', text: 'We meet people’s physical, spiritual and emotional needs without judgement.' },
  { icon: 'handshake', title: 'Collaboration', text: 'We work hand in hand with churches, communities and like-minded partners.' },
  { icon: 'scales', title: 'Stewardship', text: 'Every cedi, hour and talent entrusted to us is used carefully and well.' },
  { icon: 'pray', title: 'Prayerful guidance', text: 'We bring every decision and every outreach to God in prayer first.' },
  { icon: 'grow', title: 'Continuous improvement', text: 'We keep learning so each year’s outreach does more good than the last.' },
];
