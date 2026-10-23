import { ProjectItem, SkillCategory, StatMetric } from '../types';

export const USER_AVATAR_URL = '/assets/aistudio/neal-portrait.jpg';

export const PORTRAIT_HERO_URL = USER_AVATAR_URL;

export const PORTRAIT_ABOUT_URL = USER_AVATAR_URL;

export const PERSONAL_INFO = {
  name: 'Neal Kottilingal',
  tagline: 'Full Stack Developer & Web3 Builder',
  location: 'Mumbai, Maharashtra, India',
  email: 'neal.kottilingal.in@gmail.com',
  github: 'https://github.com/NealKS',
  linkedin: 'https://linkedin.com',
  leetcode: 'https://leetcode.com/u/KjimQyxyX0/',
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
    id: 'vision-control',
    badge: 'Computer Vision & Full Stack WebSockets',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300',
    title: 'VisionControl: Contactless Gesture Telemetry Driver',
    description:
      'Zero-friction touchless interface driver operating on lightweight computer vision algorithms. Translates real-world facial and hand gestures into instantaneous system actions across distributed web dashboards.',
    tags: ['Node.js', 'OpenCV / Python', 'React', 'WebSockets', 'MediaPipe'],
    highlights: [
      'Sub-10ms gesture landmark pipeline running at 60 FPS',
      'Noise-filtering Kalman filter for tremor-free coordinate mapping',
      'Real-time bi-directional WebSocket telemetry bridge',
      'Cross-browser touchless presentation & dashboard control',
    ],
    metrics: [
      { label: 'Frame Rate', value: '60 FPS' },
      { label: 'Pipeline Latency', value: '8.4ms' },
      { label: 'Landmark Confidence', value: '98.2%' },
    ],
  },
];
