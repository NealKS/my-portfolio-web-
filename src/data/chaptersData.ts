import { ChapterEvent } from '../types';

/**
 * CHAPTERS: LIFETIME DATA STORE
 * Scalable for decades of achievements, recognition, events, and experiences.
 * 
 * To add a new milestone:
 * Simply add a new object to CHAPTER_EVENTS array below.
 * The system automatically groups entries by year and category.
 */
export const CHAPTER_EVENTS: ChapterEvent[] = [
  // ==========================================
  // YEAR 2026 - ACHIEVEMENTS & RECOGNITION
  // ==========================================
  {
    id: 'hack-2026-kodex',
    title: 'Hack 2026 — Special Mention & 4th Position',
    year: 2026,
    // The supplied post confirms the organizers, but gives no exact event date.
    city: 'REVA University, Bengaluru',
    category: 'achievement',
    badge: 'Special Mention & 4th Position',
    recognition: 'Special Mention and 4th Position',
    team: 'Kodex',
    project: 'Algo-secure',
    eventName: 'Hack — 24-Hour Hackathon',
    organizer: 'Algorand Technologies / Google Developer Group on Campus REVA University',
    teamMembers: ['Preetham AK', 'Madan Kumar G S', 'Mohammed Tasowuff'],
    description: 'Team Kodex secured 4th position and received a Special Mention at Hack for Algo-secure, a smart-contract security project focused on vulnerability detection, contract change analysis, and developer-friendly security workflows.',
    mediaType: 'photo',
    coverImage: '/assets/achievements/hack-2026-kodex.png',
    imageAlt: 'Team Kodex and participants on stage at the Hack award ceremony at REVA University',
    certificateImages: [],
    linkedinUrl: 'https://lnkd.in/p/dJdCm_KF',
    detailTitle: 'Hack — Special Mention & 4th Position',
    detailParagraphs: [
      'Team Kodex received a Special Mention and secured 4th position at the 24-hour Hack hackathon.',
      'Our project, Algo-secure, focused on making smart-contract security more practical and developer-friendly through vulnerability detection, contract change comparison, and improvements to the development workflow.',
      'This experience involved collaborative problem-solving, rapid development, and presenting our work under hackathon time constraints.',
    ],
  },

  // ==========================================
  // YEAR 2026 - EXPERIENCES & PARTICIPATION
  // ==========================================
  {
    id: 'technical-presentation-2025',
    title: 'Technical Project Presentation',
    year: 2025,
    date: '2025-10-13',
    city: '',
    category: 'experience',
    badge: 'Presentation',
    description: 'Presented a technical project to an audience, sharing its features, implementation approach, and development process. Gained practical experience in technical communication, demonstrating work, and engaging with fellow developers.',
    mediaType: 'photo',
    coverImage: '/assets/experiences/technical-presentation-2026.png',
    imageAlt: 'Neal presenting a technical project to an audience beside the presentation screen',
    certificateImages: [],
    linkedinUrl: 'https://lnkd.in/p/deurKybz',
  },
  {
    id: 'build-for-bengaluru-2026',
    title: 'Build for Bengaluru — 2026',
    year: 2026,
    date: '2026-04-25',
    endDate: '2026-04-26',
    city: 'REVA University, Bengaluru',
    category: 'experience',
    badge: 'Hackathon Participation',
    eventName: 'Build for Bengaluru',
    team: 'Kodex',
    duration: '30-hour hackathon',
    description: 'Participated in Build for Bengaluru, a 30-hour hackathon at REVA University as part of Team Kodex. Collaborated on problem-solving, rapid prototyping, and building solutions under time constraints.',
    mediaType: 'photo',
    coverImage: '/assets/experiences/build-for-bengaluru-2026.png',
    imageAlt: 'Original Build for Bengaluru participant badge for Neal SK, Team Kodex, at REVA University, 25–26 April 2026',
    certificateImages: [],
    linkedinUrl: 'https://lnkd.in/p/dsS5gVJx',
  },
  {
    id: 'fhe-development-2026',
    date: '2026-04-28',
    title: 'Confidential Smart Contracts — FHE Development',
    year: 2026,
    category: 'experience',
    badge: 'Blockchain Development & Hands-on Learning',
    project: 'ConfidentialVault',
    technologies: ['Solidity', 'Hardhat', 'JavaScript', 'Zama FHE / CoFHE tooling'],
    localTestResult: '1 passing local Hardhat test — encrypted balance storage and decryption.',
    description: 'Explored privacy-preserving smart contracts using Solidity, Hardhat, and Fully Homomorphic Encryption (FHE). Implemented and tested a ConfidentialVault contract, with a passing local test covering encrypted balance storage and decryption.',
    mediaType: 'photo',
    coverImage: '/assets/experiences/fhe-development-redacted.png',
    imageAlt: 'Redacted VS Code development screenshot showing ConfidentialVault and one passing local Hardhat test',
    certificateImages: [],
    linkedinUrl: 'https://lnkd.in/p/dUG79wvh',
  },
  {
    id: 'ai-agents-session-2026',
    date: '2026-04-29',
    title: 'AI Agents — Technical Session',
    year: 2026,
    category: 'experience',
    badge: 'AI & Developer Learning',
    description: 'Attended a technical session exploring how AI agents work, including reasoning models, planning, tool integration, and the architecture behind agent-based systems.',
    mediaType: 'photo',
    coverImage: '/assets/experiences/ai-agents-session-2026.png',
    previewPosition: 'center bottom',
    imageAlt: 'Speaker beside a How the Agent Works presentation with Google for Developers branding',
    certificateImages: [],
    linkedinUrl: 'https://lnkd.in/p/dbxTKks5',
  },
  {
    id: 'neo4j-build-sprint-2026',
    title: 'Neo4j Graph Builder Build Sprint',
    year: 2026,
    date: '2026-10-18',
    city: 'Quad AI, HSR Layout, Bengaluru',
    category: 'experience',
    badge: 'Graph Databases & AI Learning',
    eventName: 'Neo4j Graph Builder Build Sprint',
    organizer: 'Neo4j × hackFront India',
    description: 'Participated in the Neo4j Graph Builder Build Sprint at Quad AI in Bengaluru. Explored graph databases, knowledge graphs, and their connection to AI through live demonstrations by Neo4j Developer Advocate Vasundhara Shukla.',
    mediaType: 'photo',
    coverImage: '/assets/experiences/neo4j-build-sprint-2026.png',
    previewPosition: 'center bottom',
    imageAlt: 'Audience and presenter at Quad AI beside an AI-agent memory architecture slide',
    certificateImages: [],
    linkedinUrl: 'https://lnkd.in/p/dSmtRRYA',
  },
  {
    id: 'hacktoberfest-maintainers-shield-2026',
    title: 'Hacktoberfest Hack Day — Maintainer’s Shield',
    year: 2026,
    date: '2026-10-24',
    city: 'Startup Park, Bengaluru',
    category: 'experience',
    badge: 'Open Source & AI Development',
    eventName: 'Hacktoberfest Hack Day Bengaluru 2026',
    organizer: 'KrowdKraft Community',
    project: 'Maintainer’s Shield',
    description: 'Built Maintainer’s Shield as a solo participant at Hacktoberfest Hack Day Bengaluru. The advisory tool combines rule-based checks and Gemma 4 to review pull requests alongside linked issues, code changes, and screenshots. Selected to present in the final judging round; no prize was awarded.',
    detailParagraphs: [
      'Built Maintainer’s Shield as a solo participant in the Best Use of Gemma 4 track at Hacktoberfest Hack Day Bengaluru. The tool reviews linked issues, code changes, and screenshots to provide an advisory verdict and supporting evidence.',
      'Development involved significant AI assistance. My contributions included choosing the problem, designing the rules-first approach, and testing on real public pull requests. The tool never comments, closes, or merges automatically.',
      'The project was selected for the final judging round. No prize was awarded. This video shows the development workflow.',
    ],
    mediaType: 'video',
    coverImage: '/assets/experiences/maintainers-shield-poster.png',
    videoUrl: '/assets/experiences/maintainers-shield-2026.mp4',
    imageAlt: 'Maintainer’s Shield development video',
    certificateImages: [],
    linkedinUrl: 'https://lnkd.in/p/dcDxNtcU',
  },
  {
    id: 'impulse-axiom-2026',
    title: 'Impulse ’26 — Axiom',
    year: 2026,
    date: '2026-10-25',
    category: 'experience',
    badge: 'Cybersecurity Hackathon',
    eventName: 'Impulse ’26',
    organizer: 'AWS Student Builder Group, REVA University',
    team: 'Codex',
    project: 'Axiom',
    duration: '24-hour hackathon',
    teamMembers: ['Madan Kumar G S'],
    description: 'Participated in the Cybersecurity track at Impulse ’26 with Team Codex. Built Axiom by adapting and extending the open-source Vyper Guard to identify SaaS access risk and permission drift, with deterministic scoring and advisory AI explanations. The team reached the top 50 from 650+ registrations; no prize was won.',
    mediaType: 'graphic',
    coverImage: '',
    imageAlt: 'Original portfolio illustration for Impulse ’26 and Axiom; not an official event photograph or certificate',
    certificateImages: [],
    linkedinUrl: 'https://lnkd.in/p/dn2nScyr',
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
  return Array.from(yearsSet).sort((a, b) => b - a);
}

export function getLatestYear(events: ChapterEvent[] = CHAPTER_EVENTS): number {
  const years = getAvailableYears(events);
  return years.length > 0 ? years[0] : new Date().getFullYear();
}

export function getEventsForYear(events: ChapterEvent[], year: number): ChapterEvent[] {
  return events
    .filter((e) => e.year === year)
    .sort((a, b) => {
      // ISO start dates sort chronologically; year-only entries follow dated records.
      if (!a.date || !b.date) return Number(!a.date) - Number(!b.date) || a.id.localeCompare(b.id);
      return a.date.localeCompare(b.date) || a.id.localeCompare(b.id);
    });
}

export function getAchievementsForYear(events: ChapterEvent[], year: number): ChapterEvent[] {
  return getEventsForYear(events, year).filter((e) => e.category === 'achievement');
}

export function getExperiencesForYear(events: ChapterEvent[], year: number): ChapterEvent[] {
  return getEventsForYear(events, year).filter((e) => e.category === 'experience');
}

/** Profile URLs are preserved in the archive, but must not be mislabeled as posts. */
export function linkedinPostUrl(value?: string): string | undefined {
  if (!value) return;
  try {
    const url = new URL(value);
    if (url.protocol === 'https:' && url.hostname === 'lnkd.in' && /^\/p\/[A-Za-z0-9_-]+\/?$/.test(url.pathname)) return url.href;
    if (url.protocol === 'https:' && /^(www\.)?linkedin\.com$/.test(url.hostname) && /^\/(posts\/[^/]+|feed\/update\/urn:li:[^/]+)/.test(url.pathname)) return url.href;
  } catch { /* Missing or malformed links simply have no post action. */ }
}

export function chapterMetadata(event: ChapterEvent): string {
  const date = event.date ? new Date(`${event.date}T12:00:00`) : null;
  const end = event.endDate ? new Date(`${event.endDate}T12:00:00`) : null;
  const formatter = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  let formatted = date && !Number.isNaN(date.getTime()) ? formatter.format(date) : String(event.year);
  if (date && end && !Number.isNaN(end.getTime())) {
    formatted = date.getMonth() === end.getMonth() && date.getFullYear() === end.getFullYear()
      ? `${date.getDate()}–${formatter.format(end)}`
      : `${formatted} – ${formatter.format(end)}`;
  }
  return [formatted, event.city].filter(Boolean).join(' · ');
}

export function chapterRecordCount(category: ChapterEvent['category'], count: number): string {
  return category === 'achievement' ? `${count} ${count === 1 ? 'Achievement' : 'Achievements'}` : `${count} ${count === 1 ? 'record' : 'records'}`;
}
