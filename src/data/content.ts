// Single source of truth for every variant.
// Edit business facts, services, or contact details HERE — all three designs read from this file.

export const business = {
  name: 'Sandoval Fencing & Welding',
  legalName: 'Sandoval Fencing & Welding, LLC',
  shortName: 'Sandoval',
  since: 2020,
  area: 'North Texas',
  owner: 'Adam',
  phone: '940-632-9186',
  phoneHref: 'tel:9406329186',
  email: 'Adam.Sandy@icloud.com',
  emailHref: 'mailto:Adam.Sandy@icloud.com',
  tagline: 'Custom fencing, gates, shop buildings, and pickleball courts — welded and installed with honest work and a reliable turnaround.',
} as const;

export type Service = {
  id: string;
  title: string;
  blurb: string;
};

export const services: Service[] = [
  {
    id: 'fencing',
    title: 'Custom Fencing',
    blurb: 'Pipe, ranch, privacy, and ornamental fencing built to handle North Texas weather and terrain.',
  },
  {
    id: 'gates',
    title: 'Gates',
    blurb: 'Custom entrance and driveway gates — manual or automated — welded to match your fence line.',
  },
  {
    id: 'shops',
    title: 'Shop Buildings',
    blurb: 'Steel shops and workspaces engineered for durability, storage, and everyday use.',
  },
  {
    id: 'pickleball',
    title: 'Pickleball Courts',
    blurb: 'Complete court builds with fencing and finish work — the fastest-growing thing we do.',
  },
];

export type Promise = {
  title: string;
  blurb: string;
};

export const promises: Promise[] = [
  {
    title: 'Honest Communication',
    blurb: 'Straight answers and no surprises — from the first quote to the final weld.',
  },
  {
    title: 'Reliable Scheduling',
    blurb: 'We show up when we say we will and finish on time.',
  },
  {
    title: 'Custom Solutions',
    blurb: 'Every project is built to fit your property, not forced into a template.',
  },
];

// Sample testimonial — swap for real Google reviews before launch.
export const testimonial = {
  quote:
    "Adam built our ranch gate and it turned out better than we imagined. Fair price, showed up on time, and the work is rock solid.",
  cite: 'A happy customer, North Texas',
  sample: true,
} as const;

// The three design directions, used by the landing/compare page.
export type Variant = {
  slug: 'industrial' | 'rustic' | 'modern';
  name: string;
  desc: string;
};

export const variants: Variant[] = [
  { slug: 'industrial', name: 'Industrial', desc: 'Dark steel palette, amber accents, bold uppercase. Rugged and work-focused.' },
  { slug: 'rustic', name: 'Rustic', desc: 'Warm, ranch-country feel for the North Texas property market.' },
  { slug: 'modern', name: 'Modern', desc: 'Clean, contemporary metalwork presentation.' },
];
