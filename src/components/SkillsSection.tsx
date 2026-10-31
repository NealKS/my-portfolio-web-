import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Layout, Box, Database, Sparkles, Check } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { ThemeMode, SkillCategory } from '../types';
import { CodeCompileReveal, StaggerCompileContainer, StaggerCompileItem } from './CodeCompileReveal';

interface SkillsSectionProps {
  theme: ThemeMode;
}

export function SkillsSection({ theme }: SkillsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredCategories =
    activeCategory === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.id === activeCategory);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal':
        return <Terminal className="w-6 h-6" />;
      case 'Layout':
        return <Layout className="w-6 h-6" />;
      case 'Box':
        return <Box className="w-6 h-6" />;
      case 'Database':
        return <Database className="w-6 h-6" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <section
      id="skills"
      className={`py-20 sm:py-28 border-b transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-[#0A0D12] border-stone-800/90 text-stone-100'
          : 'bg-stone-100 border-stone-200 text-stone-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header Title with Code Compiling Stagger */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <CodeCompileReveal delay={0.05}>
            <span className="text-teal-500 dark:text-teal-400 font-mono font-bold tracking-widest text-xs uppercase">
              // Engine & Toolbox
            </span>
          </CodeCompileReveal>

          <CodeCompileReveal delay={0.15}>
            <h3
              className={`text-3xl sm:text-4xl font-black mt-2 tracking-tight ${
                theme === 'dark' ? 'text-white' : 'text-stone-900'
              }`}
            >
              Technical Capabilities
            </h3>
          </CodeCompileReveal>

          <CodeCompileReveal delay={0.25}>
            <p
              className={`text-sm mt-3 leading-relaxed ${
                theme === 'dark' ? 'text-stone-400' : 'text-stone-600'
              }`}
            >
              From distributed system architectures and smart contracts to front-end ergonomics, high
              reliability across the complete stack.
            </p>
          </CodeCompileReveal>

          {/* Interactive Category Filter Pills */}
          <CodeCompileReveal delay={0.35}>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              <motion.button
                onClick={() => setActiveCategory('all')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.93 }}
                className={`cyber-btn px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                    : theme === 'dark'
                    ? 'bg-stone-800 text-stone-400 hover:text-white'
                    : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
                }`}
              >
                All Capabilities
              </motion.button>
              {SKILL_CATEGORIES.map((cat) => (
                <motion.button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.93 }}
                  className={`cyber-btn px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                      : theme === 'dark'
                      ? 'bg-stone-800 text-stone-400 hover:text-white'
                      : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
                  }`}
                >
                  {cat.title}
                </motion.button>
              ))}
            </div>
          </CodeCompileReveal>
        </div>

        {/* Capabilities Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-6 sm:p-7 rounded-2xl border shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between group cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-stone-900/80 border-stone-800 hover:border-amber-500/50 shadow-black/40'
                    : 'bg-white border-stone-200/90 hover:border-amber-400/70'
                }`}
              >
                <div>
                  {/* Icon Container */}
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.15 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 transition-transform ${item.accentBg} ${item.accentText}`}
                  >
                    {renderIcon(item.iconName)}
                  </motion.div>

                  {/* Category Title */}
                  <h4
                    className={`font-extrabold text-base tracking-tight mb-2 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {item.title}
                  </h4>

                  {/* Description */}
                  <p
                    className={`text-xs leading-relaxed mb-4 ${
                      theme === 'dark' ? 'text-stone-400' : 'text-stone-500'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Skills Tags */}
                <div className="pt-3 border-t border-stone-200/60 dark:border-stone-800/80">
                  <div className="flex flex-wrap gap-1.5">
                    {item.skills.map((skill, sIdx) => (
                      <motion.span
                        key={sIdx}
                        whileHover={{ scale: 1.08 }}
                        className={`text-[11px] font-mono px-2 py-0.5 rounded-md font-medium transition-colors ${
                          theme === 'dark'
                            ? 'bg-stone-800/90 text-stone-300 hover:text-amber-400 hover:bg-stone-800'
                            : 'bg-stone-100 text-stone-700 hover:text-amber-600 hover:bg-amber-50'
                        }`}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
