import { useState, FormEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Copy,
  Check,
  Send,
  ArrowUp,
  Github,
  Linkedin,
  Mail,
  MessageSquare,
  Code2,
  ExternalLink,
  Inbox,
  AlertCircle,
  RefreshCw,
  Clock,
  Sparkles,
  X,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThemeMode } from '../types';
import { CodeCompileReveal } from './CodeCompileReveal';

interface ContactSectionProps {
  theme: ThemeMode;
  onScrollToTop: () => void;
  onNavClick: (sectionId: string) => void;
}

interface StoredNote {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  deliveredViaEmail: boolean;
  deliveryMethod: string;
}

export function ContactSection({ theme, onScrollToTop, onNavClick }: ContactSectionProps) {
  const [copied, setCopied] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [showQuickForm, setShowQuickForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [responseInfo, setResponseInfo] = useState<{
    deliveredViaEmail: boolean;
    deliveryMethod: string;
    recipient: string;
    note?: string;
  } | null>(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [lastSubmitted, setLastSubmitted] = useState({ name: '', email: '', message: '' });

  // Stored notes drawer for Neal to check all incoming inquiries
  const [showNotesDrawer, setShowNotesDrawer] = useState(false);
  const [storedNotes, setStoredNotes] = useState<StoredNote[]>([]);
  const [loadingNotes, setLoadingNotes] = useState(false);

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3200);
    });
  };

  const copyDraftToClipboard = () => {
    const draftText = `To: ${PERSONAL_INFO.email}\nSubject: Portfolio Inquiry from ${lastSubmitted.name}\n\nHi Neal,\n\n${lastSubmitted.message}\n\nFrom: ${lastSubmitted.name}\nReply to: ${lastSubmitted.email}`;
    navigator.clipboard.writeText(draftText).then(() => {
      setCopiedDraft(true);
      setTimeout(() => setCopiedDraft(false), 3000);
    });
  };

  const fetchStoredNotes = async () => {
    setLoadingNotes(true);
    try {
      const res = await fetch('/api/contact/messages');
      const data = await res.json();
      if (data && data.messages) {
        setStoredNotes(data.messages);
      }
    } catch (err) {
      console.error('Failed to load notes:', err);
    } finally {
      setLoadingNotes(false);
    }
  };

  useEffect(() => {
    if (showNotesDrawer) {
      fetchStoredNotes();
    }
  }, [showNotesDrawer]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setSubmitting(true);
    setErrorMessage('');
    const currentSubmission = { ...formData };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentSubmission),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to transmit message');
      }

      setLastSubmitted(currentSubmission);
      setResponseInfo({
        deliveredViaEmail: Boolean(data.deliveredViaEmail),
        deliveryMethod: data.deliveryMethod || 'stored',
        recipient: data.recipient || PERSONAL_INFO.email,
        note: data.note,
      });
      setSubmissionStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err: any) {
      console.error('Error sending message:', err);
      setErrorMessage(err.message || 'Unable to transmit note. Please use direct email.');
      setSubmissionStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    PERSONAL_INFO.email
  )}&su=${encodeURIComponent(`Portfolio Message from ${lastSubmitted.name || 'Visitor'}`)}&body=${encodeURIComponent(
    `Hi Neal,\n\n${lastSubmitted.message}\n\nBest,\n${lastSubmitted.name}\nEmail: ${lastSubmitted.email}`
  )}`;

  const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
    `Portfolio Message from ${lastSubmitted.name || 'Visitor'}`
  )}&body=${encodeURIComponent(
    `Hi Neal,\n\n${lastSubmitted.message}\n\nBest,\n${lastSubmitted.name}\nEmail: ${lastSubmitted.email}`
  )}`;

  return (
    <footer
      id="contact"
      className="bg-[#080B0F] text-stone-300 pt-20 pb-12 border-t border-stone-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Pitch Banner */}
        <CodeCompileReveal delay={0.05} tag="SOCKET:CONNECT" prefix="[0x30]">
          <div className="bg-gradient-to-r from-stone-900 via-[#131922] to-stone-900 border border-stone-800 rounded-3xl p-8 sm:p-12 mb-16 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <span className="text-teal-400 font-mono text-xs uppercase tracking-widest font-bold">
                // Have a project or team opening?
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4 tracking-tight">
                Let’s build reliable software together.
              </h3>
              <p className="text-stone-400 text-sm sm:text-base mb-6 leading-relaxed">
                Currently open to high-impact Full Stack engineering, backend architecture, or Web3
                builder roles based in Mumbai, India or worldwide remotely.
              </p>

              {/* Interactive Email Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <motion.button
                  id="copy-email-btn"
                  onClick={copyEmailToClipboard}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.94 }}
                  className="cyber-btn px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-stone-950" />
                  ) : (
                    <Copy className="w-4 h-4 text-stone-950" />
                  )}
                  <span>{copied ? 'Copied to Clipboard!' : `Copy: ${PERSONAL_INFO.email}`}</span>
                  <span className="terminal-cursor !h-2.5 !w-1 bg-stone-950" />
                </motion.button>

                <motion.a
                  id="direct-email-link"
                  href={`mailto:${PERSONAL_INFO.email}`}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.94 }}
                  className="cyber-btn px-5 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs uppercase tracking-wider transition-colors border border-stone-700 inline-flex items-center gap-2 cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-teal-400" />
                  <span>Direct Email</span>
                </motion.a>

                <motion.button
                  id="toggle-message-form-btn"
                  onClick={() => {
                    setShowQuickForm(!showQuickForm);
                    if (submissionStatus === 'success') setSubmissionStatus('idle');
                  }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.94 }}
                  className={`cyber-btn px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors border inline-flex items-center gap-2 cursor-pointer ${
                    showQuickForm
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                      : 'bg-stone-900/90 hover:bg-stone-800 text-stone-300 border-stone-700/80'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 text-amber-400" />
                  <span>{showQuickForm ? 'Close Form' : 'Send Fast Note'}</span>
                </motion.button>

                {/* View Inbox Log Button */}
                <motion.button
                  id="toggle-inbox-log-btn"
                  onClick={() => setShowNotesDrawer(!showNotesDrawer)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.94 }}
                  className="cyber-btn px-4 py-3 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-400 hover:text-stone-200 border border-stone-800 font-mono text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-colors cursor-pointer"
                  title="View stored contact messages"
                >
                  <Inbox className="w-4 h-4 text-teal-400" />
                  <span>Transmissions</span>
                </motion.button>
              </div>
            </div>

            {/* Visual Feedback Toast */}
            {copied && (
              <div
                id="copy-toast-notification"
                className="text-xs text-emerald-400 font-mono mt-3 flex items-center gap-1.5 animate-fadeIn"
              >
                <Check className="w-4 h-4" />
                <span>Email copied to clipboard successfully!</span>
              </div>
            )}

            {/* Quick Contact Form inline drawer */}
            {showQuickForm && (
              <div className="mt-8 pt-6 border-t border-stone-800 max-w-xl">
                {submissionStatus === 'success' ? (
                  <div className="p-5 bg-stone-900/90 border border-amber-500/40 rounded-2xl space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500 text-stone-950 flex items-center justify-center shrink-0">
                        <Check className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-white font-bold text-sm">
                          {responseInfo?.deliveredViaEmail
                            ? 'Fast Note Sent Directly to Inbox!'
                            : 'Fast Note Received & Stored!'}
                        </h4>
                        <p className="text-stone-400 text-xs leading-relaxed">
                          {responseInfo?.deliveredViaEmail ? (
                            <span>
                              Your message was delivered directly to{' '}
                              <strong className="text-amber-400">{responseInfo.recipient}</strong>. Neal
                              will follow up at <strong>{lastSubmitted.email}</strong>.
                            </span>
                          ) : (
                            <span>
                              Your note was safely recorded on the portfolio backend for Neal.
                              To guarantee instant delivery directly from your personal email right
                              now, you can dispatch it in one click below:
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Instant Direct Email Actions */}
                    <div className="pt-2 border-t border-stone-800/80 flex flex-wrap gap-2.5">
                      <a
                        id="open-gmail-compose-btn"
                        href={gmailComposeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shadow-amber-500/20 active:scale-95"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Send via Gmail Web</span>
                      </a>

                      <a
                        id="open-mailto-btn"
                        href={mailtoUrl}
                        className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 border border-stone-700 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Open in Mail App</span>
                      </a>

                      <button
                        id="copy-draft-btn"
                        onClick={copyDraftToClipboard}
                        className="px-3.5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 font-mono text-xs flex items-center gap-1.5 border border-stone-800 transition-colors"
                      >
                        {copiedDraft ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedDraft ? 'Draft Copied!' : 'Copy Draft'}</span>
                      </button>

                      <button
                        onClick={() => setSubmissionStatus('idle')}
                        className="px-3 py-2 text-stone-400 hover:text-stone-200 text-xs font-mono ml-auto"
                      >
                        Write another
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSendMessage} className="space-y-3">
                    <div className="flex items-center justify-between pb-1">
                      <span className="text-xs font-mono text-stone-400">
                        Direct communication channel to{' '}
                        <span className="text-amber-400 font-semibold">{PERSONAL_INFO.email}</span>
                      </span>
                    </div>

                    {submissionStatus === 'error' && (
                      <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Your Name"
                        required
                        value={formData.name}
                        disabled={submitting}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950 border border-stone-700 text-white text-xs placeholder:text-stone-500 focus:outline-none focus:border-amber-500"
                      />
                      <input
                        type="email"
                        placeholder="Your Email Address"
                        required
                        value={formData.email}
                        disabled={submitting}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950 border border-stone-700 text-white text-xs placeholder:text-stone-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <textarea
                      placeholder="Brief details about your project, team opportunity, or inquiry..."
                      rows={3}
                      required
                      value={formData.message}
                      disabled={submitting}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-stone-950 border border-stone-700 text-white text-xs placeholder:text-stone-500 focus:outline-none focus:border-amber-500 resize-none"
                    ></textarea>
                    <div className="flex items-center justify-between">
                      <motion.button
                        type="submit"
                        disabled={submitting}
                        whileHover={{ scale: submitting ? 1 : 1.03 }}
                        whileTap={{ scale: submitting ? 1 : 0.94 }}
                        className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shadow-md disabled:opacity-50 cursor-pointer"
                      >
                        {submitting ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Send className="w-3.5 h-3.5" />
                        )}
                        <span>{submitting ? 'Transmitting...' : 'Transmit Message'}</span>
                      </motion.button>

                      <span className="text-[11px] font-mono text-stone-500">
                        Replies delivered to your email
                      </span>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* Stored Notes / Inquiries Log Drawer */}
            {showNotesDrawer && (
              <div className="mt-8 pt-6 border-t border-stone-800 max-w-2xl animate-fadeIn">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Inbox className="w-4 h-4 text-amber-500" />
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                      Received Fast Notes Log ({storedNotes.length})
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={fetchStoredNotes}
                      disabled={loadingNotes}
                      className="text-stone-400 hover:text-white p-1 rounded transition-colors"
                      title="Refresh notes"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${loadingNotes ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                      onClick={() => setShowNotesDrawer(false)}
                      className="text-stone-400 hover:text-white p-1 rounded transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {loadingNotes ? (
                  <div className="p-6 text-center text-xs font-mono text-stone-500">
                    Loading recorded notes...
                  </div>
                ) : storedNotes.length === 0 ? (
                  <div className="p-6 text-center text-xs font-mono text-stone-500 bg-stone-950/60 rounded-xl border border-stone-800/80">
                    No notes recorded yet. Notes sent via the "Send Fast Note" form will appear here.
                  </div>
                ) : (
                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {storedNotes.map((note) => (
                      <div
                        key={note.id}
                        className="p-3.5 rounded-xl bg-stone-950/90 border border-stone-800 text-xs space-y-2"
                      >
                        <div className="flex items-center justify-between text-stone-400 font-mono text-[11px]">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white">{note.name}</span>
                            <span>&lt;{note.email}&gt;</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{new Date(note.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                        </div>
                        <p className="text-stone-300 leading-relaxed whitespace-pre-wrap">
                          {note.message}
                        </p>
                        <div className="flex items-center justify-between pt-1 border-t border-stone-900 text-[10px] font-mono">
                          <span
                            className={
                              note.deliveredViaEmail ? 'text-emerald-400' : 'text-amber-400'
                            }
                          >
                            {note.deliveredViaEmail
                              ? '✓ Delivered via Email'
                              : '• Recorded locally on server'}
                          </span>
                          <a
                            href={`mailto:${note.email}?subject=Re: Portfolio Inquiry&body=Hi ${encodeURIComponent(
                              note.name
                            )},\n\nThank you for reaching out via my portfolio.\n\n`}
                            className="text-amber-500 hover:underline flex items-center gap-1 font-bold"
                          >
                            <span>Reply to {note.name}</span>
                            <Mail className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Decorative background ring */}
            <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full border-8 border-white/5 pointer-events-none"></div>
          </div>
        </CodeCompileReveal>

        {/* Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-stone-800/80">
          {/* Col 1: Identity */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center font-bold text-stone-950 text-sm">
                NK
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Neal Kottilingal</span>
            </div>
            <p className="text-stone-400 text-xs sm:text-sm max-w-md leading-relaxed">
              Full Stack Developer specializing in resilient web applications, Python/Node.js backend
              architectures, and Algorand smart contract protocols. Mumbai, Maharashtra, India.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-white text-xs uppercase tracking-wider font-bold mb-4 font-mono">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavClick('hero')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Home Top
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('about')}
                  className="hover:text-amber-400 transition-colors"
                >
                  About Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('skills')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Tech Capabilities
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('leetcode')}
                  className="hover:text-amber-400 transition-colors"
                >
                  LeetCode Matrix
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('github')}
                  className="hover:text-amber-400 transition-colors"
                >
                  GitHub Activity
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('projects')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Featured Projects
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Social and External Links */}
          <div>
            <h4 className="text-white text-xs uppercase tracking-wider font-bold mb-4 font-mono">
              Socials & Networks
            </h4>
            <div className="flex flex-col space-y-2.5 text-xs text-stone-400">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white flex items-center gap-2 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Profile</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white flex items-center gap-2 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn Network</span>
              </a>
              <a
                href={PERSONAL_INFO.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 flex items-center gap-2 transition-colors"
              >
                <Code2 className="w-4 h-4 text-amber-500" />
                <span>LeetCode @KjimQyxyX0</span>
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="hover:text-white flex items-center gap-2 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Neal Kottilingal. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Mumbai, India</span>
            <motion.button
              id="back-to-top-btn"
              onClick={onScrollToTop}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.92 }}
              className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 font-semibold cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
