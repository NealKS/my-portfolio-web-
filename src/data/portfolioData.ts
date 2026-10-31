import { ProjectItem, SkillCategory, StatMetric } from '../types';

export const USER_AVATAR_URL = '/assets/aistudio/IMG_9024_7ebf63d8.jpg';

export const PORTRAIT_HERO_URL = USER_AVATAR_URL;

export const PORTRAIT_ABOUT_URL = USER_AVATAR_URL;

export const PERSONAL_INFO = {
  name: 'Neal Kottilingal',
  tagline: 'Full Stack Developer & Web3 Builder',
  location: 'Mumbai, Maharashtra, India',
  email: 'neal.kottilingal.in@gmail.com',
  github: 'https://github.com/NealKS',
  linkedin: 'https://www.linkedin.com/in/neal-kottilingal-aa9bbb320/',
  leetcode: 'https://leetcode.com/u/NealSK/',
  instagram: 'https://instagram.com/i.am.nealsk',
  bio: 'Passionate full-stack developer dedicated to architecting resilient distributed systems, intuitive modern user interfaces, and verifiable blockchain smart contracts. With an agile problem-solving mindset and deep roots in Mumbai tech ecosystem, I bridge complex backend logic with seamless product experiences.',
};

export const STATS: StatMetric[] = [
  { value: '3+', label: 'Years of Engineering Experience' },
  { value: '25+', label: 'Completed Projects & Protocols' },
  { value: '100%', label: 'Code Integrity & Production Focus' },
];

export const TICKER_ITEMS = [
  'Python',
  'JavaScript (ES6+)',
  'React & Next.js',
  'Node.js & Express',
  'Algorand & Smart Contracts',
  'REST & GraphQL APIs',
  'PostgreSQL & MongoDB',
  'Docker & CI/CD',
  'Computer Vision',
  'Tailwind CSS',
  'FastAPI',
  'TypeScript',
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'backend',
    title: 'Backend & APIs',
    iconName: 'Terminal',
    accentBg: 'bg-amber-50 dark:bg-amber-950/40',
    accentText: 'text-amber-600 dark:text-amber-400',
    skills: ['Python', 'Django', 'FastAPI', 'Node.js', 'Express', 'Microservices'],
    description: 'High-throughput async services, resilient REST & GraphQL APIs, fault-tolerant microservice architectures.',
  },
  {
    id: 'frontend',
    title: 'Frontend Architecture',
    iconName: 'Layout',
    accentBg: 'bg-blue-50 dark:bg-blue-950/40',
    accentText: 'text-blue-600 dark:text-blue-400',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'State Management'],
    description: 'Accessible, component-driven client applications, fluid micro-animations, design system implementation.',
  },
  {
    id: 'web3',
    title: 'Web3 & Ledger',
    iconName: 'Box',
    accentBg: 'bg-stone-100 dark:bg-stone-800/60',
    accentText: 'text-stone-800 dark:text-amber-400',
    skills: ['Algorand PyTeAL', 'Smart Contracts', 'Distributed Ledgers', 'Wallets', 'Bytecode Audits'],
    description: 'Stateful smart contract development, cryptographic proof pipelines, zero-reentrancy security models.',
  },
  {
    id: 'cloud',
    title: 'Data & Cloud',
    iconName: 'Database',
    accentBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    accentText: 'text-emerald-600 dark:text-emerald-400',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Git', 'AWS Cloud Deployments'],
    description: 'Relational & document stores, caching layers, containerized orchestration, automated CI/CD pipelines.',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'algorand-telemetry',
    badge: 'Web3 & Smart Contract Architecture',
    badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
    title: 'Algorand Contract Telemetry & Security Inspector',
    description:
      'Holistically architected telemetry pipeline delivering on-chain monitoring, automated bytecode verification, and real-time smart contract performance metrics with sub-second finality.',
    tags: ['Python', 'PyTeAL', 'Algorand SDK', 'FastAPI', 'PostgreSQL'],
    highlights: [
      'Zero-reentrancy automated formal audit analyzer',
      'Real-time on-chain block & transaction telemetry stream',
      'Sub-second transaction indexing using Algorand Indexer V2',
      'Interactive debugger command generator for developer workflows',
    ],
    metrics: [
      { label: 'Audit Security Score', value: '99.8%' },
      { label: 'Throughput', value: '1,894 blocks/min' },
      { label: 'Audit Latency', value: '< 240ms' },
    ],
  },
  {
    id: 'axiom',
    badge: 'Identity Security & Access-Risk Intelligence',
    badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
    title: 'Axiom — Explainable Access-Risk Intelligence',
    description: 'An explainable security engine that analyzes SaaS permissions, identifies risky access patterns, correlates smart-contract findings, and generates evidence-backed remediation plans with human approval.',
    githubUrl: 'https://github.com/NealKS/axiom2',
    tags: ['Python', 'AWS Lambda', 'Amazon S3', 'Amazon SNS', 'Amazon Bedrock (optional)', 'AWS SAM', 'Vyper Guard integration'],
    highlights: [
      'Explainable, deterministic identity risk scoring with retained evidence.',
      'Detection of stale identities and excessive permissions.',
      'Analysis of unused privileges, peer drift, and unusual activity.',
      'Optional correlation with Vyper Guard-style contract findings.',
      'HTML, JSON, Markdown, and CLI reporting.',
      'Dry-run remediation proposals for human review; no access changes are executed.',
      'Optional Amazon Bedrock explanations with deterministic fallback.',
      'AWS SAM workflow: S3 input, Lambda analysis, S3 reports, and SNS aggregate alerts.',
    ],
    metrics: [],
  },
];
