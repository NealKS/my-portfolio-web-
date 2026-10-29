export type ThemeMode = 'light' | 'dark';

export type ScreenView = 'all' | 'hero' | 'about' | 'skills' | 'leetcode' | 'github' | 'projects' | 'chapters' | 'contact';

export interface ChapterEvent {
  id: string;
  title: string;
  year: number;
  date: string;
  displayDate?: string;
  category: 'achievement' | 'experience';
  badge: string;
  achievementRank?: string;
  issuer?: string;
  location?: string;
  coverImage: string;
  images: string[];
  linkedinUrl?: string;
  skills?: string[];
  highlights?: string[];
}

export interface LeetCodeSubmission {
  title: string;
  titleSlug: string;
  timestamp?: string;
  statusDisplay?: string;
  lang?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard' | string;
}

export interface LeetCodeProfileData {
  username: string;
  realName: string;
  ranking: number;
  userAvatar: string;
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  submissionCalendar: Record<string, number>;
  recentSubmissions: LeetCodeSubmission[];
  languages: { name: string; solved: number }[];
  skills: { name: string; count: number; category: string }[];
  totalActiveDays: number;
  maxStreak: number;
  totalSubmissionsYear: number;
  lastUpdated: string;
}

export interface GitHubRepo {
  id: string;
  name: string;
  fullName: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  topics: string[];
  updatedAt: string;
  htmlUrl: string;
  defaultBranch: string;
  commitsCount: number;
  category: 'web3' | 'backend' | 'frontend' | 'tools';
}

export interface GitHubActivityItem {
  id: string;
  type: 'PushEvent' | 'PullRequestEvent' | 'CreateEvent' | 'ReleaseEvent';
  repoName: string;
  message: string;
  timestamp: string;
  branch?: string;
}

export interface GitHubProfileData {
  username: string;
  realName: string;
  bio: string;
  location: string;
  avatarUrl: string;
  htmlUrl: string;
  publicRepos: number;
  totalCommitsYear: number;
  totalStars: number;
  totalForks: number;
  pullRequests: number;
  currentStreak: number;
  maxStreak: number;
  topLanguages: { name: string; percentage: number; color: string }[];
  repositories: GitHubRepo[];
  recentActivity: GitHubActivityItem[];
  commitCalendar: Record<string, number>; // date "YYYY-MM-DD" -> count
  lastUpdated: string;
}

export interface ProjectItem {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  highlights: string[];
  metrics: {
    label: string;
    value: string;
  }[];
}

export interface SkillCategory {
  id: string;
  title: string;
  iconName: string;
  accentBg: string;
  accentText: string;
  skills: string[];
  description: string;
}

export interface StatMetric {
  value: string;
  label: string;
}

