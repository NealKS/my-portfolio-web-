import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ExternalLink,
  RefreshCw,
  Award,
  Flame,
  CheckCircle2,
  Code2,
  Sparkles,
  X,
  Radio,
  Zap,
} from 'lucide-react';
import { LeetCodeProfileData, LeetCodeSubmission, ThemeMode } from '../types';
import { AnimatedCounter } from './AnimatedCounter';
import { CodeCompileReveal } from './CodeCompileReveal';

interface LeetCodeSectionProps {
  theme: ThemeMode;
}

// Problem difficulty level resolver
function getProblemDifficulty(sub: LeetCodeSubmission): 'Easy' | 'Medium' | 'Hard' {
  if (sub.difficulty) {
    const d = sub.difficulty.toLowerCase();
    if (d.includes('hard')) return 'Hard';
    if (d.includes('med')) return 'Medium';
    if (d.includes('easy')) return 'Easy';
  }
  const slug = (sub.titleSlug || '').toLowerCase();
  if (slug === 'regular-expression-matching') return 'Hard';
  if (slug === 'longest-substring-without-repeating-characters') return 'Medium';
  if (
    slug === 'two-sum' ||
    slug === 'count-the-digits-that-divide-a-number' ||
    slug === 'sum-multiples' ||
    slug === 'find-the-index-of-the-first-occurrence-in-a-string'
  ) {
    return 'Easy';
  }
  if (slug.includes('hard') || slug.includes('median')) return 'Hard';
  if (
    slug.includes('medium') ||
    slug.includes('longest-substring') ||
    slug.includes('add-two-numbers')
  ) {
    return 'Medium';
  }
  return 'Easy';
}

function getDifficultyBadge(difficulty: 'Easy' | 'Medium' | 'Hard') {
  switch (difficulty) {
    case 'Easy':
      return 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/25';
    case 'Medium':
      return 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/25';
    case 'Hard':
      return 'text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/25';
    default:
      return 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/25';
  }
}

// Fallback verified question history list (all 6 solved problems)
const FALLBACK_QUESTION_HISTORY: LeetCodeSubmission[] = [
  {
    title: 'Find the Index of the First Occurrence in a String',
    titleSlug: 'find-the-index-of-the-first-occurrence-in-a-string',
    difficulty: 'Easy',
    statusDisplay: 'Accepted',
    lang: 'java',
  },
  {
    title: 'Regular Expression Matching',
    titleSlug: 'regular-expression-matching',
    difficulty: 'Hard',
    statusDisplay: 'Accepted',
    lang: 'java',
  },
  {
    title: 'Longest Substring Without Repeating Characters',
    titleSlug: 'longest-substring-without-repeating-characters',
    difficulty: 'Medium',
    statusDisplay: 'Accepted',
    lang: 'java',
  },
  {
    title: 'Two Sum',
    titleSlug: 'two-sum',
    difficulty: 'Easy',
    statusDisplay: 'Accepted',
    lang: 'java',
  },
  {
    title: 'Count the Digits That Divide a Number',
    titleSlug: 'count-the-digits-that-divide-a-number',
    difficulty: 'Easy',
    statusDisplay: 'Accepted',
    lang: 'java',
  },
  {
    title: 'Sum Multiples',
    titleSlug: 'sum-multiples',
    difficulty: 'Easy',
    statusDisplay: 'Accepted',
    lang: 'java',
  },
];

// Fallback calendar map for active days
const DEFAULT_SUBMISSION_CALENDAR: Record<string, number> = {
  '1787356800': 2,
  '1787616000': 1,
  '1788825600': 3,
};

// Resilient direct fetcher for environments without Express server (e.g. Vercel static deployment)
async function fetchDirectFromPublicApi(): Promise<LeetCodeProfileData | null> {
  try {
    const [profileRes, acRes, calRes] = await Promise.all([
      fetch('https://alfa-leetcode-api.onrender.com/userProfile/KjimQyxyX0')
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
      fetch('https://alfa-leetcode-api.onrender.com/KjimQyxyX0/acSubmission')
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
      fetch('https://alfa-leetcode-api.onrender.com/KjimQyxyX0/calendar')
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
    ]);

    if (!profileRes || typeof profileRes.totalSolved !== 'number') return null;

    let calMap: Record<string, number> = DEFAULT_SUBMISSION_CALENDAR;
    if (calRes && typeof calRes.submissionCalendar === 'string') {
      try {
        calMap = JSON.parse(calRes.submissionCalendar);
      } catch (e) {
        // ignore
      }
    }

    const rawSubs: any[] = acRes?.submission || [];
    const submissions: LeetCodeSubmission[] = rawSubs.map((s) => ({
      title: s.title,
      titleSlug: s.titleSlug,
      timestamp: s.timestamp,
      statusDisplay: s.statusDisplay || 'Accepted',
      lang: s.lang || 'java',
      difficulty: getProblemDifficulty(s),
    }));

    return {
      username: 'KjimQyxyX0',
      realName: 'NEAL Kottilingal',
      ranking: profileRes.ranking || 5000001,
      userAvatar: 'https://assets.leetcode.com/users/KjimQyxyX0/avatar_1760594672.png',
      totalSolved: profileRes.totalSolved,
      totalQuestions: 4046,
      easySolved: profileRes.easySolved ?? 4,
      totalEasy: 963,
      mediumSolved: profileRes.mediumSolved ?? 1,
      totalMedium: 2111,
      hardSolved: profileRes.hardSolved ?? 1,
      totalHard: 972,
      submissionCalendar: calMap,
      recentSubmissions: submissions.length > 0 ? submissions : FALLBACK_QUESTION_HISTORY,
      languages: [{ name: 'Java', solved: profileRes.totalSolved }],
      skills: [
        { name: 'Dynamic Programming', count: 1, category: 'Advanced' },
        { name: 'Hash Table', count: 2, category: 'Intermediate' },
        { name: 'Recursion', count: 1, category: 'Intermediate' },
        { name: 'Sliding Window', count: 1, category: 'Intermediate' },
        { name: 'Math', count: 2, category: 'Intermediate' },
        { name: 'Array', count: 2, category: 'Fundamental' },
        { name: 'String', count: 3, category: 'Fundamental' },
      ],
      totalActiveDays: calRes?.totalActiveDays ?? 3,
      maxStreak: calRes?.streak ?? 1,
      totalSubmissionsYear: profileRes.totalSolved,
      lastUpdated: new Date().toISOString(),
    };
  } catch (err) {
    console.warn('Direct public LeetCode API fallback error:', err);
    return null;
  }
}

export function LeetCodeSection({ theme }: LeetCodeSectionProps) {
  const [data, setData] = useState<LeetCodeProfileData | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('leetcode_profile_cache_v3');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed.totalSolved === 'number' && parsed.totalSolved >= 5) {
            return parsed;
          }
        }
      } catch (e) {
        // ignore
      }
    }
    return null;
  });
  const [loading, setLoading] = useState<boolean>(!data);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [secondsSinceLastSync, setSecondsSinceLastSync] = useState<number>(0);
  const [newSolveNotification, setNewSolveNotification] = useState<{
    title: string;
    count: number;
    difficulty?: string;
  } | null>(null);
  const prevTotalSolvedRef = useRef<number | null>(data?.totalSolved ?? null);

  const [hoveredDay, setHoveredDay] = useState<{
    dateStr: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);
  const [activeTab, setActiveTab] = useState<'recent' | 'languages' | 'skills'>('recent');

  const fetchLeetCodeData = async (forceRefresh = false) => {
    if (forceRefresh) setRefreshing(true);
    try {
      let resolvedData: LeetCodeProfileData | null = null;

      // Tier 1: Try backend Express endpoint
      try {
        const url = forceRefresh ? '/api/leetcode?refresh=true' : '/api/leetcode';
        const res = await fetch(url);
        if (res.ok) {
          const json = await res.json();
          if (json && json.data && typeof json.data.totalSolved === 'number') {
            resolvedData = json.data;
          }
        }
      } catch (e) {
        // Backend endpoint not accessible (e.g. running on Vercel static hosting)
      }

      // Tier 2: Resilient direct public fallback if backend is unavailable
      if (!resolvedData) {
        resolvedData = await fetchDirectFromPublicApi();
      }

      if (resolvedData) {
        // Detect if newly solved problem was completed on LeetCode
        if (
          prevTotalSolvedRef.current !== null &&
          resolvedData.totalSolved > prevTotalSolvedRef.current
        ) {
          const latestSub = resolvedData.recentSubmissions?.[0]?.title || 'LeetCode Problem';
          setNewSolveNotification({
            title: latestSub,
            count: resolvedData.totalSolved,
          });
          // Auto-hide celebration banner after 8 seconds
          setTimeout(() => {
            setNewSolveNotification(null);
          }, 8000);
        }
        prevTotalSolvedRef.current = resolvedData.totalSolved;
        setData(resolvedData);
        setSecondsSinceLastSync(0);

        try {
          localStorage.setItem('leetcode_profile_cache_v3', JSON.stringify(resolvedData));
        } catch (e) {
          // ignore
        }
      }
    } catch (err) {
      console.error('Failed to load LeetCode data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    // 1. Initial live fetch
    fetchLeetCodeData(true);

    // 2. Continuous real-time polling every 5 seconds for immediate automatic updates
    const pollInterval = setInterval(() => {
      fetchLeetCodeData(false);
    }, 5000);

    // 3. Increment seconds timer every second for transparency
    const timerInterval = setInterval(() => {
      setSecondsSinceLastSync((prev) => prev + 1);
    }, 1000);

    // 4. INSTANT SYNC: When user solves on LeetCode and switches back to this tab
    const handleFocusOrVisibility = () => {
      if (document.visibilityState === 'visible') {
        fetchLeetCodeData(true);
      }
    };

    window.addEventListener('focus', handleFocusOrVisibility);
    document.addEventListener('visibilitychange', handleFocusOrVisibility);
    window.addEventListener('online', handleFocusOrVisibility);

    return () => {
      clearInterval(pollInterval);
      clearInterval(timerInterval);
      window.removeEventListener('focus', handleFocusOrVisibility);
      document.removeEventListener('visibilitychange', handleFocusOrVisibility);
      window.removeEventListener('online', handleFocusOrVisibility);
    };
  }, []);

  // Compute 52 weeks of calendar data for the consistency graph
  const calendarWeeks = useMemo(() => {
    const weeks: { date: Date; dateKey: string; count: number; dayOfWeek: number }[][] = [];
    const submissionMap = data?.submissionCalendar || {};

    const today = new Date();
    today.setHours(23, 59, 59, 999);

    // 52 weeks = 364 days back
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - (52 * 7 - 1));
    // Align starting week to Sunday
    startDate.setDate(startDate.getDate() - startDate.getDay());

    let currentWeek: { date: Date; dateKey: string; count: number; dayOfWeek: number }[] = [];

    for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
      const dayDate = new Date(d);
      const dayOfWeek = dayDate.getDay(); // 0 = Sun, 6 = Sat
      const curDateStr = dayDate.toISOString().split('T')[0];

      // Match submission count by UTC date string to avoid timezone shifts
      let count = 0;
      for (const [tsStr, subCount] of Object.entries(submissionMap)) {
        const ts = parseInt(tsStr, 10);
        const subDateStr = new Date(ts * 1000).toISOString().split('T')[0];
        if (subDateStr === curDateStr) {
          count = Math.max(count, Number(subCount));
        }
      }

      currentWeek.push({
        date: dayDate,
        dateKey: curDateStr,
        count,
        dayOfWeek,
      });

      if (dayOfWeek === 6 || d.getTime() >= today.getTime()) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    return weeks;
  }, [data?.submissionCalendar]);

  const monthLabels = [
    'Sep',
    'Oct',
    'Nov',
    'Dec',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
  ];

  const totalSolved = data?.totalSolved ?? 6;
  const totalQuestions = data?.totalQuestions ?? 4046;
  const easySolved = data?.easySolved ?? 4;
  const totalEasy = data?.totalEasy ?? 963;
  const mediumSolved = data?.mediumSolved ?? 1;
  const totalMedium = data?.totalMedium ?? 2111;
  const hardSolved = data?.hardSolved ?? 1;
  const totalHard = data?.totalHard ?? 972;

  // Calculate donut percentage (accent ratio)
  const solvedPercent = Math.max(1, Math.round((totalSolved / totalQuestions) * 100));

  const submissionsToRender =
    data?.recentSubmissions && data.recentSubmissions.length > 0
      ? data.recentSubmissions
      : FALLBACK_QUESTION_HISTORY;

  return (
    <section
      id="leetcode"
      className={`py-20 sm:py-28 border-b transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-[#0B0F14] border-stone-800 text-stone-100'
          : 'bg-[#F4F1EA] border-stone-200 text-stone-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <CodeCompileReveal delay={0.05} tag="TELEMETRY:LEETCODE" prefix="[0x24]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Algorithmic Discipline & Problem Solving</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>Auto-Sync Active</span>
                </div>
              </div>

              <h2
                className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight ${
                  theme === 'dark' ? 'text-white' : 'text-stone-950'
                }`}
              >
                LeetCode Consistency Matrix
              </h2>
              <p
                className={`text-sm sm:text-base mt-2 max-w-2xl leading-relaxed ${
                  theme === 'dark' ? 'text-stone-400' : 'text-stone-600'
                }`}
              >
                Real-time telemetry and activity logs automatically synced directly with{' '}
                <span className="font-semibold font-mono text-amber-500">
                  leetcode.com/u/KjimQyxyX0
                </span>
                . Every newly solved problem and submission streak is automatically updated.
              </p>
            </div>

            {/* Live Sync Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
              <div className="text-[11px] font-mono text-stone-400">
                <span>Auto-polls every 5s • Checked {secondsSinceLastSync === 0 ? 'just now' : `${secondsSinceLastSync}s ago`}</span>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  id="refresh-leetcode-btn"
                  onClick={() => fetchLeetCodeData(true)}
                  disabled={refreshing}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.93 }}
                  className={`cyber-btn px-3.5 py-2 rounded-xl text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-2 transition-colors shadow-sm cursor-pointer ${
                    theme === 'dark'
                      ? 'bg-stone-900 border border-stone-800 text-stone-300 hover:text-amber-400 hover:border-amber-500/40'
                      : 'bg-white border border-stone-300 text-stone-700 hover:text-amber-600 hover:border-amber-400'
                  }`}
                  title="Force sync live stats from LeetCode"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-amber-500' : ''}`} />
                  <span>{refreshing ? 'Syncing...' : 'Sync Now'}</span>
                  <span className="terminal-cursor !h-2.5 !w-1" />
                </motion.button>

                <motion.a
                  id="open-leetcode-profile-btn"
                  href="https://leetcode.com/u/KjimQyxyX0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.94 }}
                  className="cyber-btn px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-md shadow-amber-500/20 cursor-pointer"
                >
                  <span>LeetCode</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </motion.a>
              </div>
            </div>
          </div>
        </CodeCompileReveal>

        {/* Live Celebration Banner When New Problem Solved */}
        <AnimatePresence>
          {newSolveNotification && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-amber-500/15 to-emerald-500/15 border-2 border-emerald-500/40 text-stone-900 dark:text-stone-100 flex items-center justify-between shadow-xl"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-stone-950 flex items-center justify-center font-bold shrink-0 shadow-md shadow-emerald-500/30">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-extrabold text-sm sm:text-base flex items-center gap-2">
                    <span>New LeetCode Problem Solved!</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500 text-stone-950 font-bold">
                      {newSolveNotification.count} Total Solved
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-0.5">
                    <strong>"{newSolveNotification.title}"</strong> was accepted and immediately logged into your matrix!
                  </p>
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => setNewSolveNotification(null)}
                className="text-stone-400 hover:text-stone-100 p-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Profile Card & Quick Stats (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* User Profile Mini Card */}
            <div
              className={`p-6 rounded-3xl border shadow-lg transition-all ${
                theme === 'dark'
                  ? 'bg-stone-900/90 border-stone-800 shadow-black/40'
                  : 'bg-white border-stone-200/90'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-amber-500/40 shrink-0">
                  <img
                    src={
                      data?.userAvatar ||
                      'https://assets.leetcode.com/users/KjimQyxyX0/avatar_1760594672.png'
                    }
                    alt="NEAL Kottilingal LeetCode Avatar"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute bottom-0 inset-x-0 h-1 bg-amber-500"></div>
                </div>

                <div className="overflow-hidden">
                  <h3
                    className={`font-black text-lg truncate ${
                      theme === 'dark' ? 'text-white' : 'text-stone-900'
                    }`}
                  >
                    NEAL Kottilingal
                  </h3>
                  <div className="text-xs font-mono text-amber-500 font-semibold truncate">
                    @KjimQyxyX0
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 mt-1">
                    <span>Rank ~5,000,000</span>
                  </div>
                </div>
              </div>

              {/* Status Pill */}
              <div className="mt-5 pt-4 border-t border-stone-200 dark:border-stone-800/80 flex items-center justify-between text-xs">
                <span className="text-stone-500 dark:text-stone-400 font-mono">
                  0 Following • 0 Followers
                </span>
                <span className="flex items-center gap-1.5 text-emerald-500 dark:text-emerald-400 font-mono font-bold text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Active</span>
                </span>
              </div>
            </div>

            {/* Languages & Core Problem Topics */}
            <div
              className={`p-6 rounded-3xl border shadow-lg ${
                theme === 'dark'
                  ? 'bg-stone-900/90 border-stone-800 shadow-black/40'
                  : 'bg-white border-stone-200/90'
              }`}
            >
              <h4 className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold mb-3 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5" />
                <span>Languages & Solved Topics</span>
              </h4>

              <div className="space-y-3 text-xs">
                {(data?.languages || [{ name: 'Java', solved: totalSolved }]).map((lang) => (
                  <div
                    key={lang.name}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60"
                  >
                    <span className="font-bold">{lang.name}</span>
                    <span className="font-mono text-amber-500 font-semibold">
                      {lang.solved} solved
                    </span>
                  </div>
                ))}

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(data?.skills || [
                    { name: 'Dynamic Programming', count: 1, category: 'Advanced' },
                    { name: 'Hash Table', count: 2, category: 'Intermediate' },
                    { name: 'Recursion', count: 1, category: 'Intermediate' },
                    { name: 'Sliding Window', count: 1, category: 'Intermediate' },
                    { name: 'Math', count: 2, category: 'Intermediate' },
                    { name: 'Array', count: 2, category: 'Fundamental' },
                    { name: 'String', count: 3, category: 'Fundamental' },
                  ]).map((skill) => (
                    <span
                      key={skill.name}
                      className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-mono text-[11px] border border-stone-200 dark:border-stone-700"
                    >
                      {skill.name} ×{skill.count}
                    </span>
                  ))}
                </div>
              </div>

              {/* Locked Badge Widget */}
              <div className="mt-5 pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-stone-200 dark:bg-stone-800 flex items-center justify-center text-stone-400">
                  <Award className="w-5 h-5 text-amber-500/70" />
                </div>
                <div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400">Locked Badge</div>
                  <div className="text-xs font-bold text-stone-800 dark:text-stone-200">
                    Sep LeetCoding Challenge
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Problem Solved Ring + Consistency Heatmap + Recent Submissions (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Top Stat Row: Problem Solving Donut + Breakdown */}
            <div
              className={`p-6 sm:p-8 rounded-3xl border shadow-lg ${
                theme === 'dark'
                  ? 'bg-stone-900/90 border-stone-800 shadow-black/40'
                  : 'bg-white border-stone-200/90'
              }`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                {/* Circular Donut Ring */}
                <div className="sm:col-span-5 flex flex-col items-center justify-center relative">
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    {/* SVG Radial Gauge */}
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {/* Background circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke={theme === 'dark' ? '#292524' : '#E7E5E4'}
                        strokeWidth="8"
                        fill="transparent"
                      />
                      {/* Progress circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#10B981"
                        strokeWidth="8"
                        strokeDasharray="251.2"
                        strokeDashoffset={251.2 - (251.2 * Math.max(1, totalSolved)) / totalQuestions}
                        strokeLinecap="round"
                        fill="transparent"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <div className="text-3xl font-black font-mono tracking-tight text-stone-900 dark:text-white">
                        <AnimatedCounter value={totalSolved} />
                        <span className="text-xs text-stone-500 font-normal">/{totalQuestions}</span>
                      </div>
                      <div className="text-[11px] font-mono font-semibold text-emerald-500 flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Solved</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-[11px] text-stone-400 font-mono mt-2">0 Attempting</div>
                </div>

                {/* Difficulty Bars */}
                <div className="sm:col-span-7 space-y-3.5">
                  {/* Easy */}
                  <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">Easy</span>
                      <span className="font-mono font-bold">
                        <AnimatedCounter value={easySolved} />{' '}
                        <span className="text-stone-400 font-normal text-[11px]">/{totalEasy}</span>
                      </span>
                    </div>
                    <div className="w-full h-2 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                        style={{ width: `${Math.max(2, (easySolved / totalEasy) * 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Medium */}
                  <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-bold text-amber-500">Medium</span>
                      <span className="font-mono font-bold">
                        <AnimatedCounter value={mediumSolved} />{' '}
                        <span className="text-stone-400 font-normal text-[11px]">/{totalMedium}</span>
                      </span>
                    </div>
                    <div className="w-full h-2 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full transition-all duration-700"
                        style={{ width: `${Math.max(0, (mediumSolved / totalMedium) * 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Hard */}
                  <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-bold text-rose-500">Hard</span>
                      <span className="font-mono font-bold">
                        <AnimatedCounter value={hardSolved} />{' '}
                        <span className="text-stone-400 font-normal text-[11px]">/{totalHard}</span>
                      </span>
                    </div>
                    <div className="w-full h-2 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-rose-500 rounded-full transition-all duration-700"
                        style={{ width: `${Math.max(0, (hardSolved / totalHard) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Consistency Submission Heatmap Graph */}
            <div
              className={`p-6 sm:p-8 rounded-3xl border shadow-lg relative overflow-hidden ${
                theme === 'dark'
                  ? 'bg-stone-900/90 border-stone-800 shadow-black/40'
                  : 'bg-white border-stone-200/90'
              }`}
            >
              {/* Header metrics */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800 mb-5 gap-2">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-500" />
                  <span className="font-black text-sm sm:text-base">
                    {data?.totalSubmissionsYear || totalSolved} submissions in the past one year
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-stone-500 dark:text-stone-400">
                  <span>
                    Total active days:{' '}
                    <strong className="text-stone-900 dark:text-white">
                      {data?.totalActiveDays ?? 3}
                    </strong>
                  </span>
                  <span>•</span>
                  <span>
                    Max streak:{' '}
                    <strong className="text-stone-900 dark:text-white">
                      {data?.maxStreak ?? 1}
                    </strong>
                  </span>
                </div>
              </div>

              {/* Month Markers Row */}
              <div className="hidden sm:flex justify-between text-[10px] font-mono text-stone-400 dark:text-stone-500 px-1 mb-2">
                {monthLabels.map((m, i) => (
                  <span key={i}>{m}</span>
                ))}
              </div>

              {/* Heatmap Grid Matrix */}
              <div className="overflow-x-auto pb-2">
                <div className="inline-flex gap-1 min-w-[640px]">
                  {calendarWeeks.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-1">
                      {week.map((day, dIdx) => {
                        const isGreenActive = day.count > 0;
                        const bgColor =
                          day.count >= 2
                            ? 'bg-emerald-400 ring-1 ring-emerald-300 dark:bg-emerald-400'
                            : day.count === 1
                            ? 'bg-emerald-600 dark:bg-emerald-500'
                            : theme === 'dark'
                            ? 'bg-stone-800/80 hover:bg-stone-700'
                            : 'bg-stone-200 hover:bg-stone-300';

                        return (
                          <div
                            key={dIdx}
                            onMouseEnter={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              setHoveredDay({
                                dateStr: day.date.toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                }),
                                count: day.count,
                                x: rect.left,
                                y: rect.top,
                              });
                            }}
                            onMouseLeave={() => setHoveredDay(null)}
                            className={`w-3 h-3 rounded-[3px] transition-all cursor-pointer ${bgColor} ${
                              isGreenActive ? 'scale-110 shadow-sm' : ''
                            }`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend & Tooltip note */}
              <div className="flex items-center justify-between pt-4 mt-2 border-t border-stone-200 dark:border-stone-800 text-[11px] text-stone-400">
                <span className="font-mono text-[10px]">
                  Updated live from LeetCode GraphQL protocol
                </span>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px]">Less</span>
                  <span
                    className={`w-2.5 h-2.5 rounded-[2px] ${
                      theme === 'dark' ? 'bg-stone-800' : 'bg-stone-200'
                    }`}
                  ></span>
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-600"></span>
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-400"></span>
                  <span className="text-[10px]">More</span>
                </div>
              </div>

              {/* Floating Tooltip */}
              {hoveredDay && (
                <div
                  className="fixed z-50 pointer-events-none px-3 py-1.5 rounded-lg bg-stone-900 text-white border border-stone-700 text-xs font-mono shadow-2xl transform -translate-x-1/2 -translate-y-full mb-2"
                  style={{ left: hoveredDay.x, top: hoveredDay.y - 6 }}
                >
                  <span className="text-amber-400 font-bold">
                    {hoveredDay.count} {hoveredDay.count === 1 ? 'submission' : 'submissions'}
                  </span>{' '}
                  on {hoveredDay.dateStr}
                </div>
              )}
            </div>

            {/* Recent Accepted Submissions Panel */}
            <div
              className={`p-6 sm:p-8 rounded-3xl border shadow-lg ${
                theme === 'dark'
                  ? 'bg-stone-900/90 border-stone-800 shadow-black/40'
                  : 'bg-white border-stone-200/90'
              }`}
            >
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800 mb-4">
                <div className="flex items-center gap-3">
                  <motion.button
                    onClick={() => setActiveTab('recent')}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.94 }}
                    className={`text-xs font-mono font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      activeTab === 'recent'
                        ? 'bg-amber-500 text-stone-950 shadow-sm'
                        : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                    }`}
                  >
                    Question History ({submissionsToRender.length})
                  </motion.button>
                  <motion.button
                    onClick={() => setActiveTab('languages')}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.94 }}
                    className={`text-xs font-mono font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      activeTab === 'languages'
                        ? 'bg-amber-500 text-stone-950 shadow-sm'
                        : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                    }`}
                  >
                    Language Metrics
                  </motion.button>
                </div>

                <motion.a
                  href="https://leetcode.com/u/KjimQyxyX0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-xs font-mono text-amber-500 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>View all submissions</span>
                  <ExternalLink className="w-3 h-3" />
                </motion.a>
              </div>

              {/* Submissions List */}
              {activeTab === 'recent' ? (
                <div className="divide-y divide-stone-100 dark:divide-stone-800/80">
                  {submissionsToRender.map((sub, idx) => {
                    const difficulty = getProblemDifficulty(sub);
                    const badgeStyles = getDifficultyBadge(difficulty);

                    return (
                      <motion.div
                        key={idx}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                        className="py-3.5 flex items-center justify-between gap-4 group hover:bg-stone-500/5 px-2 rounded-xl transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </motion.div>
                          <div className="min-w-0">
                            <a
                              href={`https://leetcode.com/problems/${sub.titleSlug}/`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-amber-500 transition-colors truncate block"
                            >
                              {sub.title}
                            </a>
                          </div>
                        </div>

                        {/* Level / Difficulty of Problem */}
                        <div className="shrink-0">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-bold tracking-wide border ${badgeStyles}`}
                          >
                            {difficulty}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-4 space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800">
                    <span className="font-bold text-sm">Java Programming Language</span>
                    <span className="font-mono text-amber-500 font-bold">{totalSolved} Solved</span>
                  </div>
                  <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                    Data structures implemented include Hash Tables, Dynamic Arrays, Bit Manipulation,
                    and Mathematical algorithms.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
