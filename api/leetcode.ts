// Serverless function endpoint for Vercel / serverless environments
export default async function handler(req: any, res: any) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const [profileRes, acRes, calRes] = await Promise.all([
      fetch('https://alfa-leetcode-api.onrender.com/userProfile/NealSK')
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
      fetch('https://alfa-leetcode-api.onrender.com/NealSK/acSubmission')
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
      fetch('https://alfa-leetcode-api.onrender.com/NealSK/calendar')
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
    ]);

    let calMap: Record<string, number> = {
      '1787356800': 2,
      '1787616000': 1,
      '1788825600': 3,
    };
    if (calRes && typeof calRes.submissionCalendar === 'string') {
      try {
        calMap = JSON.parse(calRes.submissionCalendar);
      } catch (e) {
        // ignore
      }
    }

    const rawSubs = acRes?.submission || [];
    const submissions = rawSubs.map((s: any) => {
      const slug = (s.titleSlug || '').toLowerCase();
      let diff = 'Easy';
      if (slug === 'regular-expression-matching') diff = 'Hard';
      else if (slug === 'longest-substring-without-repeating-characters') diff = 'Medium';
      return {
        title: s.title,
        titleSlug: s.titleSlug,
        timestamp: s.timestamp,
        statusDisplay: s.statusDisplay || 'Accepted',
        lang: s.lang || 'java',
        difficulty: diff,
      };
    });

    const totalSolved = profileRes?.totalSolved ?? 6;
    const easySolved = profileRes?.easySolved ?? 4;
    const mediumSolved = profileRes?.mediumSolved ?? 1;
    const hardSolved = profileRes?.hardSolved ?? 1;

    const data = {
      username: 'NealSK',
      realName: 'NEAL Kottilingal',
      ranking: profileRes?.ranking || 5000001,
      userAvatar: '/assets/aistudio/IMG_9024_7ebf63d8.jpg',
      totalSolved,
      totalQuestions: 4046,
      easySolved,
      totalEasy: 963,
      mediumSolved,
      totalMedium: 2111,
      hardSolved,
      totalHard: 972,
      submissionCalendar: calMap,
      recentSubmissions: submissions.length > 0 ? submissions : undefined,
      languages: [{ name: 'Java', solved: totalSolved }],
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
      totalSubmissionsYear: totalSolved,
      lastUpdated: new Date().toISOString(),
    };

    res.status(200).json({ success: true, source: 'vercel_serverless', data });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err?.message || 'Serverless error' });
  }
}
