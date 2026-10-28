// All facts below are real, drawn from Tisa's actual portfolio deck and the
// Content Desk Launch planner. Anything that reads as a tagline/headline is
// a DRAFT pass for review, not finalized brand copy — flagged in the UI.
//
// Photos in /public/images are real, pulled directly from Tisa's own
// portfolio deck -- not stock. A few generic stock/AI graphics that were
// mixed into that deck (a "digital marketing" hologram render, a stock
// hand-pointing-at-a-chart shot) were deliberately left out.

const BASE = import.meta.env.BASE_URL;
const img = (name: string) => `${BASE}images/${name}`;

export const images = {
  heroEvent: img('hero-event.jpg'),
  philharmonicBassists: img('philharmonic-bassists.jpg'),
  babyConcerts: img('baby-concerts.jpg'),
  babyConcertsScreenshot: img('baby-concerts-screenshot.png'),
  indiaTourViolin: img('india-tour-violin.jpg'),
  zubinMehtaGala: img('zubin-mehta-gala.jpg'),
  crescendoBrochure: img('crescendo-brochure.jpg'),
  filmingRehearsal: img('filming-rehearsal.jpg'),
  interviewSession: img('interview-session.jpg'),
  deskFlatlay: img('desk-flatlay.jpg'),
  tisaPortrait: img('tisa-portrait.jpg'),
  officeCandid: img('office-candid.jpg'),
  auditoriumCandid: img('auditorium-candid.jpg'),
  recordingStudio: img('recording-studio.jpg'),
};

export type Highlight = { label: string; value: string };
export type Section = { heading: string; body: string };
export type GalleryItem = { src: string; caption: string };

export type CaseStudy = {
  id: string;
  subject: string;
  dateRange: string;
  tag: string;
  narrative: string[];
  sections: Section[];
  highlights: Highlight[];
  heroImage: string | null;
  gallery: GalleryItem[];
  accent: string;
  flagship: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    id: 'belgrade-philharmonic',
    subject: 'Belgrade Philharmonic',
    dateRange: '2023–2026',
    tag: 'Orchestra · Social, editorial & campaigns',
    flagship: true,
    accent: '#e8432f',
    heroImage: images.philharmonicBassists,
    gallery: [
      { src: images.babyConcerts, caption: 'Baby Concerts — the toddler-friendly series that passed 4M views' },
      { src: images.babyConcertsScreenshot, caption: 'The actual post: 166K likes, 52.6K shares' },
      { src: images.indiaTourViolin, caption: 'India Tour, January 2026' },
      { src: images.zubinMehtaGala, caption: 'Zubin Mehta Gala, Kolarac Great Hall' },
      { src: images.crescendoBrochure, caption: 'CRESCENDO — the 2025/26 season brochure' },
      { src: images.filmingRehearsal, caption: 'Shooting rehearsal footage from the hall' },
    ],
    narrative: [
      "Since 2023, work for the Belgrade Philharmonic Orchestra has covered social media management across six platforms plus YouTube, website and editorial content maintenance, and supporting offline/print work.",
      "Growth over the period has been substantial: Instagram grew 2.5x and TikTok grew 10x between 2023 and 2026, while Threads went from a standing start to over 7,200 followers. Across all platforms combined, total following rose from 78,386 to 128,814 — a 64% increase — sustained at a cadence of 20+ posts per week.",
      "The work included focused campaigns around major moments, among them the Orchestra's India Tour and China Tour and the Zubin Mehta Gala, plus a dedicated “Baby Concerts” video series that reached over 4 million views. A single 2024 post reached more than 4 million views on its own.",
      "The work was recognized externally with two awards: PRO PR Globe's Music Discography Communication Achievement (January 2026) and a place on PC Press's “Top 50” online list (February 2026).",
    ],
    sections: [
      { heading: 'Social media marketing', body: 'Ongoing management of six social platforms plus YouTube at a cadence of 20+ posts per week, covering concert promotion, audience-facing storytelling, and real-time coverage of tours and galas.' },
      { heading: 'Website content maintenance', body: "Ongoing editorial and website content upkeep for the Orchestra's site, keeping programme, news, and season information current." },
      { heading: 'Focus campaigns', body: 'Dedicated campaign coverage for major moments including the India Tour (January 2026) and China Tour (2023), and coordination around the Zubin Mehta Gala.' },
      { heading: 'Community & audience building', body: "Audience development work including the ‘Baby Concerts’ video series (4+ million views, 166K likes, 52.6K shares) and steady follower growth across every platform the Orchestra uses." },
    ],
    highlights: [
      { label: 'Instagram', value: '2.5x growth' },
      { label: 'TikTok', value: '10x growth' },
      { label: 'Threads', value: '0 → 7,200' },
      { label: 'Top post', value: '4M+ views' },
      { label: 'Cadence', value: '20+ posts/wk' },
      { label: 'Total reach', value: '+64%' },
    ],
  },
  {
    id: 'totema',
    subject: 'Totema Agency',
    dateRange: '2021–2023',
    tag: 'SEO & content-marketing agency · multi-client',
    flagship: false,
    accent: '#2f7de8',
    heroImage: images.deskFlatlay,
    gallery: [],
    narrative: [
      'Agency-side work spanning three to four concurrent clients, centered on content strategy, SEO publishing, and performance tracking.',
    ],
    sections: [
      { heading: 'Content strategy & SEO publishing', body: 'Planned and published SEO-driven content across multiple client accounts.' },
      { heading: 'Account management & client collaboration', body: 'Ran day-to-day client relationships alongside the content work.' },
      { heading: 'Performance tracking & iteration', body: 'Tracked analytics and iterated strategy against results.' },
      { heading: 'LinkedIn presence & thought leadership', body: "Built out clients' LinkedIn presence as a thought-leadership channel." },
    ],
    highlights: [],
  },
  {
    id: 'radio-belgrade',
    subject: 'Radio Belgrade 2',
    dateRange: '2018–2022',
    tag: 'Cultural reporter & writer',
    flagship: false,
    accent: '#d9a441',
    heroImage: images.recordingStudio,
    gallery: [],
    narrative: [
      'Four years as a cultural reporter and writer, covering music and the arts.',
    ],
    sections: [],
    highlights: [],
  },
  {
    id: 'wonder-strings',
    subject: 'Wonder Strings',
    dateRange: 'Current',
    tag: 'Website & concert promotion — case study in progress',
    flagship: false,
    accent: '#2fae7d',
    heroImage: null,
    gallery: [],
    narrative: [
      'An active client. Website and concert-promotion work; the full case study is still being assembled.',
    ],
    sections: [],
    highlights: [],
  },
];

export const flagship = caseStudies.find(c => c.flagship)!;
export const selectedWork = caseStudies.filter(c => !c.flagship);

// Real platform-by-platform follower counts for the Belgrade Philharmonic
// engagement, May 2023 -> February 2026. From the same verified portfolio data
// as the highlights above -- not estimated.
export type GrowthRow = { platform: string; start: number; end: number; changeLabel: string };
export const followerGrowth: GrowthRow[] = [
  { platform: 'Instagram', start: 18344, end: 47147, changeLabel: '+150%' },
  { platform: 'Facebook', start: 48088, end: 56700, changeLabel: '+18%' },
  { platform: 'TikTok', start: 64, end: 4887, changeLabel: '+7,536%' },
  { platform: 'Twitter/X', start: 11392, end: 12059, changeLabel: '+6%' },
  { platform: 'Threads', start: 0, end: 7278, changeLabel: 'NEW' },
  { platform: 'LinkedIn', start: 498, end: 743, changeLabel: '+49%' },
];
export const followerGrowthTotal: GrowthRow = { platform: 'Total', start: 78386, end: 128814, changeLabel: '+64%' };

export type Award = { title: string; issuer: string; date: string };
export const awards: Award[] = [
  { title: 'Music Discography Communication Achievement', issuer: 'PRO PR Globe', date: 'January 2026' },
  { title: '"Top 50" online list', issuer: 'PC Press', date: 'February 2026' },
];

export type PressItem = { title: string; outlet: string; year: string; kind: string };
export const press: PressItem[] = [
  { title: 'CRESCENDO 2025/26', outlet: 'Belgrade Philharmonic', year: '2025', kind: 'Season brochure · Print' },
  { title: "'A Modern Lady': Nobu Kôda", outlet: 'Mordents Magazine', year: '2022', kind: 'Featured article' },
];

export const services = [
  'Digital',
  'Editorial & web',
  'PR',
  'Strategic communications',
];

export const social = {
  instagram: '#',
  linkedin: '#',
  email: 'hello@algo-rhythm.studio',
};

// DRAFT headline/proposition copy — written for this review pass, not
// approved brand language. Replace freely.
export const draftCopy = {
  kicker: 'Algo-Rhythm',
  headline: 'Communications for people who make the room go quiet.',
  subhead:
    "A solo studio for music and cultural institutions — digital, editorial and PR work built on real audience growth, not vanity metrics.",
  aboutBody:
    "Algo-Rhythm is built around one person's decade in music and cultural communications — four years as a cultural reporter, three running content and SEO across an agency's client roster, and the last three leading the Belgrade Philharmonic's entire digital presence. The studio exists to bring that same rigor to a small number of institutions at a time.",
};
