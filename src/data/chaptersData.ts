import { ChapterEvent } from '../types';

/**
 * CHAPTERS: LIFETIME DATA STORE
 * Scalable for decades of achievements, recognition, events, and experiences.
 * 
 * To add a new milestone in future years (e.g. 2027, 2030, 2040):
 * Simply add a new object to CHAPTER_EVENTS array below.
 * The system automatically:
 *   1. Detects all unique years
 *   2. Generates year tabs (newest first)
 *   3. Groups achievements and experiences
 *   4. Formats dates and renders certificates/galleries
 */
export const CHAPTER_EVENTS: ChapterEvent[] = [
  // ==========================================
  // YEAR 2026 - ACHIEVEMENTS & RECOGNITION
  // ==========================================
  {
    id: 'event-2026-01',
    title: 'Algorand Protocol Developer Certification',
    year: 2026,
    date: '2026-03-24',
    displayDate: 'March 24, 2026',
    category: 'achievement',
    badge: 'Certified Protocol Builder',
    achievementRank: 'Top Tier',
    issuer: 'Algorand Foundation Ecosystem Developer Guild',
    location: 'Mumbai, India • Global Ledger',
    coverImage: '/assets/certificates/algorand-developer-2026.svg',
    images: [
      '/assets/certificates/algorand-developer-2026.svg',
    ],
    linkedinUrl: 'https://www.linkedin.com/in/neal-kottilingal-b118b6283/',
    skills: ['PyTeAL', 'Algorand SDK', 'Smart Contracts', 'Bytecode Auditing'],
    highlights: [
      'Validated competency in Algorand state proof verifications and on-chain telemetry pipelines',
      'Engineered sub-second event indexing handling 1,800+ blocks per minute',
      'Achieved verified developer status on Algorand developer ecosystem registry'
    ]
  },
  {
    id: 'event-2026-02',
    title: 'Web3 Hackathon Mumbai 2026',
    year: 2026,
    date: '2026-02-18',
    displayDate: 'February 18, 2026',
    category: 'achievement',
    badge: 'Winner',
    achievementRank: '1st Place',
    issuer: 'Web3 Builders Collective Mumbai',
    location: 'Mumbai, Maharashtra, India',
    coverImage: '/assets/certificates/web3-mumbai-winner-2026.svg',
    images: [
      '/assets/certificates/web3-mumbai-winner-2026.svg',
    ],
    linkedinUrl: 'https://www.linkedin.com/in/neal-kottilingal-b118b6283/',
    skills: ['Solidity', 'State Channels', 'Node.js', 'Ethers.js'],
    highlights: [
      'Won 1st Place in Infrastructure & Protocol Scalability Track out of 60+ regional teams',
      'Constructed peer-to-peer micro-payment state channels with off-chain zero-knowledge telemetry',
      'Commended by jury panel for clean bytecode optimization and modular full-stack architecture'
    ]
  },

  // ==========================================
  // YEAR 2026 - EXPERIENCES & PARTICIPATION
  // ==========================================
  {
    id: 'event-2026-03',
    title: 'Advanced Algorand Smart Contracts Masterclass',
    year: 2026,
    date: '2026-04-19',
    displayDate: 'April 19, 2026',
    category: 'experience',
    badge: 'Workshop',
    achievementRank: 'Masterclass Completed',
    issuer: 'Algorand India Developer Guild',
    location: 'Mumbai, India',
    coverImage: '/assets/certificates/smart-contracts-workshop-2026.svg',
    images: [
      '/assets/certificates/smart-contracts-workshop-2026.svg',
    ],
    linkedinUrl: 'https://www.linkedin.com/in/neal-kottilingal-b118b6283/',
    skills: ['Atomic Transaction Composer', 'PyTeAL', 'Unit Scaffolding'],
    highlights: [
      'Completed in-depth masterclass on Atomic Transaction Composers (ATC) and state manipulation',
      'Executed secure cross-contract call patterns and automated test scaffolding'
    ]
  },
  {
    id: 'event-2026-04',
    title: 'Global Full Stack & Cloud Summit 2026',
    year: 2026,
    date: '2026-01-29',
    displayDate: 'January 29, 2026',
    category: 'experience',
    badge: 'Participant',
    issuer: 'Full Stack Architects Guild & Cloud Forum',
    location: 'Mumbai, India & Global Virtual',
    coverImage: '/assets/certificates/fullstack-summit-2026.svg',
    images: [
      '/assets/certificates/fullstack-summit-2026.svg',
    ],
    linkedinUrl: 'https://www.linkedin.com/in/neal-kottilingal-b118b6283/',
    skills: ['React 19', 'Distributed Systems', 'Microservices', 'Docker'],
    highlights: [
      'Participated in enterprise architectural deep-dives on React 19 Concurrent Rendering',
      'Attended hands-on technical sessions on high-concurrency microservices and real-time WebSockets'
    ]
  }
];

// Helper functions for dynamic lifelong scaling:
export function getAvailableYears(events: ChapterEvent[] = CHAPTER_EVENTS): number[] {
  const yearsSet = new Set<number>();
  events.forEach((e) => {
    if (typeof e.year === 'number') {
      yearsSet.add(e.year);
    }
  });
  // Sort descending: newest year first (e.g. 2026, 2025, 2024...)
  return Array.from(yearsSet).sort((a, b) => b - a);
}

export function getLatestYear(events: ChapterEvent[] = CHAPTER_EVENTS): number {
  const years = getAvailableYears(events);
  return years.length > 0 ? years[0] : new Date().getFullYear();
}

export function getEventsForYear(events: ChapterEvent[], year: number): ChapterEvent[] {
  return events
    .filter((e) => e.year === year)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAchievementsForYear(events: ChapterEvent[], year: number): ChapterEvent[] {
  return getEventsForYear(events, year).filter((e) => e.category === 'achievement');
}

export function getExperiencesForYear(events: ChapterEvent[], year: number): ChapterEvent[] {
  return getEventsForYear(events, year).filter((e) => e.category === 'experience');
}
