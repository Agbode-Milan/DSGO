import type { ImageMetadata } from 'astro';

// Every real DSGO photo lives in src/assets/photos/. To add one, drop the
// .jpg in that folder and add a line to `captions` below (slug = filename
// without .jpg). Astro resizes and compresses them automatically.

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.jpg', {
  eager: true,
});

export const photo: Record<string, ImageMetadata> = Object.fromEntries(
  Object.entries(files).map(([path, mod]) => [path.split('/').pop()!.replace('.jpg', ''), mod.default]),
);

/** Captions double as alt text. Order here = order in the gallery. */
export const captions: Record<string, string> = {
  'mother-baby-water': 'A young mother shares water with her baby at the Funfest',
  'outreach-distribution-crowd': 'Volunteers hand out supplies at Agbogbloshie',
  'tiedye-group-2': 'Kayayei women gathered together at the Funfest',
  'funfest-crowd-cheering': 'Children cheering at the DSGO Funfest',
  'outreach-bp-smiles': 'A woman smiles during a free health check',
  'children-eating': 'Children sharing a meal together',
  'jeans-handover': 'A volunteer hands over new clothing',
  'funfest-dancing-kids': 'Kids dancing at the Funfest',
  'mother-child-crowd': 'A mother and her child in the crowd',
  'boy-blue-stool': 'A little boy carrying his stool',
  'funfest-eating-5': 'Children enjoying lunch together',
  'family-headwraps-tent': 'Women and children waiting under the tent',
  'outreach-bp-crowd': 'Health screening for mothers at the Funfest',
  'funfest-change-kindness': 'Smiles at the Funfest photo frame',
  'tiedye-group-1': 'A volunteer greets women at the Funfest',
  'donation-boxes-medicine': 'Donations packed and ready to go',
  'funfest-crowd-reaching': 'Hands reaching up in celebration',
  'boy-bucket-hat': 'A young boy at the Funfest',
  'funfest-eating-8': 'A boy with his plate of food',
  'outreach-table-service': 'Volunteers serving at the Funfest tables',
  'funfest-team-group-1': 'The DSGO volunteer team',
  'funfest-red-veil-duo': 'Mother and daughter in matching red',
  'crowd-under-tent': 'The community gathers under the tent',
  'funfest-eating-6': 'Friends sharing a meal',
  'funfest-couple-peace': 'Volunteers at the Funfest frame',
  'outreach-bp-seated': 'A nurse checks blood pressure',
  'funfest-singer-crowd': 'Music and dancing with the crowd',
  'funfest-kids-drinks': 'Kids with cold drinks',
  'tiedye-group-3': 'Women of Agbogbloshie, together',
  'funfest-astronaut': 'A volunteer at the Funfest frame',
  'funfest-eating-1': 'Children eating together outside',
  'funfest-team-member-dance': 'A volunteer dancing with joy',
  'funfest-crowd-baby': 'A crowd of children, a baby in arms',
  'funfest-eating-2': 'Boys enjoying their meal',
  'funfest-market-crowd': 'The market crowd at the Funfest',
  'funfest-boy-red-veil': 'A child in festive red',
  'funfest-eating-3': 'A boy enjoying his lunch',
  'funfest-team-pair': 'Two volunteers on the day',
  'funfest-couple-1': 'Smiles at the Funfest frame',
  'funfest-eating-4': 'Children seated for their meal',
  'tiedye-group-4': 'Women gathered at the Funfest',
  'funfest-team-crowd-cheer': 'Volunteers and children cheering together',
  'funfest-santa': 'Christmas cheer at the Funfest',
  'funfest-eating-7': 'Girls sharing a meal',
  'funfest-team-group-2': 'The team, ready for the day',
  'funfest-vendor-phone': 'A volunteer on the day',
  'funfest-team-group-3': 'The DSGO family',
};

export const galleryOrder = Object.keys(captions);
