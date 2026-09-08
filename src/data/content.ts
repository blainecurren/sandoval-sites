// Single source of truth for the site content.
// Edit business facts, services, or contact details HERE — the site reads them from this file.

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

// Named `Commitment`, not `Promise` — `Promise` would shadow the built-in type
// inside this module and silently break any future `Promise<T>` annotation here.
export type Commitment = {
  title: string;
  blurb: string;
};

export const promises: Commitment[] = [
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
