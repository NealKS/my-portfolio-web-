import { Home, User, Cpu, Code2, FolderGit2, Layers, BookOpen, Mail } from 'lucide-react';
import type { ScreenView } from '../types';

export const NAV_ITEMS = [
  { label: 'Hero', screen: 'hero', icon: Home },
  { label: 'About Me', screen: 'about', icon: User },
  { label: 'Stack & Skills', screen: 'skills', icon: Cpu },
  { label: 'LeetCode', screen: 'leetcode', icon: Code2 },
  { label: 'GitHub Activity', screen: 'github', icon: FolderGit2 },
  { label: 'Featured Projects', screen: 'projects', icon: Layers },
  { label: 'Chapters', screen: 'chapters', icon: BookOpen },
  { label: 'Contact', screen: 'contact', icon: Mail },
] satisfies { label: string; screen: ScreenView; icon: typeof Home }[];
