'use client';

/**
 * @fileoverview ContactHeroForm — Multi-type contact form with dynamic fields.
 *
 * Features:
 *  - Horizontal scroller to switch between Investor / Partnership / In-General
 *  - Dynamic input fields per form type
 *  - Post-submission locked PPT download section (Investor & Partnership only)
 *  - Blurred + lock-icon overlay until form is submitted
 */

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Types ────────────────────────────────────────────────────────────────────

type FormType = 'investor' | 'partnership' | 'general';

interface FormConfig {
  id: FormType;
  label: string;
  tag: string;
  tagColor: string;
  accentColor: string;
  pill: string;
  description: string;
  pptTitle: string;
  pptDesc: string;
  hasPpt: boolean;
}

// ─── Form Configs ─────────────────────────────────────────────────────────────

const FORM_CONFIGS: FormConfig[] = [
  {
    id: 'general',
    label: 'In-General',
    tag: '// general inquiry',
    tagColor: 'text-accent-coral',
    accentColor: '#FF5A3C',
    pill: 'bg-accent-coral',
    description: 'Have questions, feedback, or anything else on your mind? Drop us a message and we\'ll get back to you within 2 hours.',
    pptTitle: '',
    pptDesc: '',
    hasPpt: false,
  },
  {
    id: 'partnership',
    label: 'Partnership',
    tag: '// campus partnership',
    tagColor: 'text-accent-lime',
    accentColor: '#C8FF3D',
    pill: 'bg-accent-lime',
    description: 'Want to integrate CreditBuddy at your campus or become a business partner? Let\'s explore the opportunity together.',
    pptTitle: 'Partnership Proposal — CreditBuddy',
    pptDesc: 'Full partnership model, revenue share, and campus integration guide.',
    hasPpt: true,
  },
  {
    id: 'investor',
    label: 'Investor',
    tag: '// investor inquiry',
    tagColor: 'text-accent-purple',
    accentColor: '#7B5CFF',
    pill: 'bg-accent-purple',
    description: 'Interested in backing the future of student credit in India? Share your details and we\'ll get our founders in touch.',
    pptTitle: 'Investor Deck — CreditBuddy',
    pptDesc: 'Full pitch deck with financials, market opportunity, traction, and team.',
    hasPpt: true,
  },
];

// ─── Dynamic Fields per Form Type ────────────────────────────────────────────

function InvestorFields() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-jetbrains text-xs font-bold text-ink block mb-2">FULL NAME *</label>
          <input required type="text" placeholder="Rajesh Mehta" className="contact-field w-full p-3.5 bg-bg-primary brutal-border rounded-xl font-jakarta text-sm focus:outline-none" />
        </div>
        <div>
          <label className="font-jetbrains text-xs font-bold text-ink block mb-2">EMAIL *</label>
          <input required type="email" placeholder="rajesh@vc-firm.com" className="contact-field w-full p-3.5 bg-bg-primary brutal-border rounded-xl font-jakarta text-sm focus:outline-none" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-jetbrains text-xs font-bold text-ink block mb-2">FIRM / FUND NAME *</label>
          <input required type="text" placeholder="Sequoia India" className="contact-field w-full p-3.5 bg-bg-primary brutal-border rounded-xl font-jakarta text-sm focus:outline-none" />
        </div>
        <div>
          <label className="font-jetbrains text-xs font-bold text-ink block mb-2">INVESTMENT STAGE</label>
          <select className="contact-field w-full p-3.5 bg-bg-primary brutal-border rounded-xl font-jakarta text-sm focus:outline-none">
            <option>Pre-Seed</option>
            <option>Seed</option>
            <option>Series A</option>
            <option>Series B+</option>
            <option>Family Office / HNI</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-jetbrains text-xs font-bold text-ink block mb-2">TICKET SIZE (₹)</label>
          <select className="contact-field w-full p-3.5 bg-bg-primary brutal-border rounded-xl font-jakarta text-sm focus:outline-none">
            <option>Under ₹50L</option>
            <option>₹50L – ₹2Cr</option>
            <option>₹2Cr – ₹10Cr</option>
            <option>₹10Cr+</option>
          </select>
        </div>
        <div>
          <label className="font-jetbrains text-xs font-bold text-ink block mb-2">LINKEDIN / WEBSITE</label>
          <input type="url" placeholder="https://linkedin.com/in/..." className="contact-field w-full p-3.5 bg-bg-primary brutal-border rounded-xl font-jakarta text-sm focus:outline-none" />
        </div>
      </div>
      <div>
        <label className="font-jetbrains text-xs font-bold text-ink block mb-2">WHY CREDITBUDDY? *</label>
        <textarea required rows={3} placeholder="What excites you about our model..." className="contact-field w-full p-3.5 bg-bg-primary brutal-border rounded-xl font-jakarta text-sm focus:outline-none resize-none" />
      </div>
    </>
  );
}

function PartnershipFields() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-jetbrains text-xs font-bold text-ink block mb-2">CONTACT PERSON *</label>
          <input required type="text" placeholder="Priya Agarwal" className="contact-field w-full p-3.5 bg-bg-primary brutal-border rounded-xl font-jakarta text-sm focus:outline-none" />
        </div>
        <div>
          <label className="font-jetbrains text-xs font-bold text-ink block mb-2">OFFICIAL EMAIL *</label>
          <input required type="email" placeholder="priya@college.edu.in" className="contact-field w-full p-3.5 bg-bg-primary brutal-border rounded-xl font-jakarta text-sm focus:outline-none" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-jetbrains text-xs font-bold text-ink block mb-2">INSTITUTION NAME *</label>
          <input required type="text" placeholder="IIT Bhubaneswar" className="contact-field w-full p-3.5 bg-bg-primary brutal-border rounded-xl font-jakarta text-sm focus:outline-none" />
        </div>
        <div>
          <label className="font-jetbrains text-xs font-bold text-ink block mb-2">PARTNERSHIP TYPE</label>
          <select className="contact-field w-full p-3.5 bg-bg-primary brutal-border rounded-xl font-jakarta text-sm focus:outline-none">
            <option>Campus Integration</option>
            <option>Co-lending Partner</option>
            <option>EdTech Collaboration</option>
            <option>Distribution Partner</option>
            <option>Other</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-jetbrains text-xs font-bold text-ink block mb-2">STUDENT STRENGTH</label>
          <select className="contact-field w-full p-3.5 bg-bg-primary brutal-border rounded-xl font-jakarta text-sm focus:outline-none">
            <option>Under 1,000</option>
            <option>1,000 – 5,000</option>
            <option>5,000 – 20,000</option>
            <option>20,000+</option>
          </select>
        </div>
        <div>
          <label className="font-jetbrains text-xs font-bold text-ink block mb-2">CITY</label>
          <input type="text" placeholder="Bhubaneswar" className="contact-field w-full p-3.5 bg-bg-primary brutal-border rounded-xl font-jakarta text-sm focus:outline-none" />
        </div>
      </div>
      <div>
        <label className="font-jetbrains text-xs font-bold text-ink block mb-2">PARTNERSHIP GOALS *</label>
        <textarea required rows={3} placeholder="Describe what you'd like to achieve..." className="contact-field w-full p-3.5 bg-bg-primary brutal-border rounded-xl font-jakarta text-sm focus:outline-none resize-none" />
      </div>
    </>
  );
}

function GeneralFields() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-jetbrains text-xs font-bold text-ink block mb-2">FULL NAME *</label>
          <input required type="text" placeholder="Sneha Sharma" className="contact-field w-full p-3.5 bg-bg-primary brutal-border rounded-xl font-jakarta text-sm focus:outline-none" />
        </div>
        <div>
          <label className="font-jetbrains text-xs font-bold text-ink block mb-2">EMAIL ADDRESS *</label>
          <input required type="email" placeholder="sneha@college.edu.in" className="contact-field w-full p-3.5 bg-bg-primary brutal-border rounded-xl font-jakarta text-sm focus:outline-none" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-jetbrains text-xs font-bold text-ink block mb-2">COLLEGE / UNIVERSITY</label>
          <input type="text" placeholder="IIT Delhi" className="contact-field w-full p-3.5 bg-bg-primary brutal-border rounded-xl font-jakarta text-sm focus:outline-none" />
        </div>
        <div>
          <label className="font-jetbrains text-xs font-bold text-ink block mb-2">TOPIC</label>
          <select className="contact-field w-full p-3.5 bg-bg-primary brutal-border rounded-xl font-jakarta text-sm focus:outline-none">
            <option>Student Support</option>
            <option>Ambassador Program</option>
            <option>App Feedback</option>
            <option>Media Inquiry</option>
            <option>Grievance</option>
            <option>Other</option>
          </select>
        </div>
      </div>
      <div>
        <label className="font-jetbrains text-xs font-bold text-ink block mb-2">YOUR MESSAGE *</label>
        <textarea required rows={4} placeholder="How can we help you?" className="contact-field w-full p-3.5 bg-bg-primary brutal-border rounded-xl font-jakarta text-sm focus:outline-none resize-none" />
      </div>
    </>
  );
}

// ─── PPT Download Section ─────────────────────────────────────────────────────

function PptSection({ unlocked, config }: { unlocked: boolean; config: FormConfig }) {
  if (!config.hasPpt) return null;

  return (
    <div className="relative mt-8 rounded-2xl overflow-hidden brutal-border" style={{ boxShadow: '4px 4px 0px #14100F' }}>
      {/* Content */}
      <div className={`p-6 bg-white transition-all duration-700 ${!unlocked ? 'blur-sm select-none pointer-events-none' : ''}`}>
        <div className="flex items-start gap-4">
          {/* PDF Icon */}
          <div
            className="w-14 h-16 rounded-xl flex items-center justify-center flex-shrink-0 brutal-border"
            style={{ background: config.accentColor === '#7B5CFF' ? '#f3f0ff' : '#f0ffd0' }}
          >
            <svg width="28" height="32" viewBox="0 0 28 32" fill="none">
              <rect width="28" height="32" rx="4" fill={config.accentColor} opacity="0.15" />
              <path d="M6 4h12l6 6v18a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z" fill={config.accentColor} opacity="0.3" />
              <path d="M18 4l6 6h-6V4z" fill={config.accentColor} />
              <text x="4" y="24" fontSize="7" fontWeight="bold" fill={config.accentColor} fontFamily="monospace">PDF</text>
            </svg>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <h4 className="font-bricolage font-extrabold text-ink text-base">{config.pptTitle}</h4>
                <p className="font-jakarta text-xs text-ink-muted mt-0.5">{config.pptDesc}</p>
              </div>
              <a
                href="/CreditBuddy_Pitch_Deck.pdf"
                download="CreditBuddy_Pitch_Deck.pdf"
                onClick={(e) => { if (!unlocked) e.preventDefault(); }}
                className="inline-flex items-center gap-2 px-5 py-2.5 font-jetbrains text-xs font-bold brutal-pill brutal-shadow-sm transition-transform hover:scale-105 active:scale-95"
                style={{ background: config.accentColor, color: config.id === 'partnership' ? '#14100F' : '#fff' }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Download
              </a>
            </div>

            {unlocked && (
              <div className="mt-3 flex items-center gap-2 font-jetbrains text-[10px] text-green-600">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="5.5" stroke="#10B981" />
                  <path d="M3.5 6l2 2 3-3" stroke="#10B981" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Access granted — thank you for reaching out!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lock Overlay */}
      {!unlocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-[2px]">
          <div className="flex flex-col items-center gap-2 select-none">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center brutal-border"
              style={{ background: config.accentColor + '22', boxShadow: '3px 3px 0 #14100F' }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <rect x="3" y="9" width="16" height="11" rx="3" stroke="#14100F" strokeWidth="1.8" />
                <path d="M7 9V6a4 4 0 018 0v3" stroke="#14100F" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="11" cy="14.5" r="1.5" fill="#14100F" />
              </svg>
            </div>
            <p className="font-jetbrains text-[11px] font-bold text-ink text-center leading-tight">
              Fill & submit the form<br />to unlock this resource
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export const ContactHeroForm = () => {
  const [activeType, setActiveType] = useState<FormType>('general');
  const [submitted, setSubmitted] = useState<Record<FormType, boolean>>({
    investor: false,
    partnership: false,
    general: false,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fieldsRef = useRef<HTMLDivElement>(null);

  const config = FORM_CONFIGS.find((f) => f.id === activeType)!;
  const isSubmitted = submitted[activeType];

  // ── Entry animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-info-col',
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.85, ease: 'power3.out' }
      );
      gsap.fromTo('.contact-form-card',
        { scale: 0.94, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.85, ease: 'back.out(1.2)', delay: 0.2 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // ── Animate fields on tab switch
  useEffect(() => {
    if (!fieldsRef.current) return;
    gsap.fromTo(fieldsRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.38, ease: 'power2.out' }
    );
  }, [activeType]);

  const handleTypeChange = (type: FormType) => {
    setActiveType(type);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted((prev) => ({ ...prev, [activeType]: true }));

    // Celebration shake on card
    if (containerRef.current) {
      gsap.fromTo('.contact-form-card',
        { x: -6 },
        { x: 0, duration: 0.4, ease: 'elastic.out(1.2, 0.5)' }
      );
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative pt-32 pb-20 px-6 md:px-12 bg-bg-primary text-ink border-b-[1.6px] border-ink"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

        {/* ── Left Column ── */}
        <div className="contact-info-col lg:col-span-5 space-y-6 lg:sticky lg:top-32">
          <span className="font-jetbrains text-xs font-normal brutal-pill bg-accent-lime px-4 py-1.5 inline-block">
            // get in touch
          </span>

          <h1 className="font-bricolage text-5xl md:text-7xl font-extrabold tracking-tight leading-[0.95]">
            We&apos;re here to <span className="accent-underline">help</span>.
          </h1>

          <p className="font-jakarta text-ink-muted text-base md:text-lg leading-relaxed">
            {config.description}
          </p>

          <div className="space-y-3 font-jetbrains text-xs text-ink pt-4">
            <p className="flex items-center gap-2"><span className="text-sm">📧</span> <a href="mailto:creditbuddyofficial@gmail.com" className="hover:underline">creditbuddyofficial@gmail.com</a></p>
            <p className="flex items-center gap-2"><span className="text-sm">✉️</span> <a href="mailto:info@creditbuddy.org.in" className="hover:underline">info@creditbuddy.org.in</a></p>
            <p className="flex items-center gap-2"><span className="text-sm">📍</span> Sambalpur, Odisha, India - 768004</p>
            <div className="text-[11px] text-ink-muted leading-relaxed pt-2 border-t border-ink/10 space-y-1">
              <p className="font-bold text-ink">CREDITBUDDY PARTNERS PRIVATE LIMITED</p>
              <p>CIN: U62090OD2026PTC053104 | GSTIN: 21AANCC6754D1ZS</p>
              <p>PLOT NO. 1380/6628 Near Gram Devi Mandir, Matru Vihar, Shanti Nagar, Budharaja, Sambalpur, Odisha, 768004</p>
            </div>
          </div>
        </div>

        {/* ── Right Column ── */}
        <div className="lg:col-span-7 space-y-5">

          {/* ── Form Type Scroller / Switcher ── */}
          <div className="contact-form-type-switcher flex gap-2 p-1 bg-bg-secondary brutal-border rounded-2xl w-full" role="tablist">
            {FORM_CONFIGS.map((fc) => {
              const isActive = fc.id === activeType;
              return (
                <button
                  key={fc.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleTypeChange(fc.id)}
                  className={`
                    flex-1 py-3 px-4 rounded-xl font-jetbrains text-xs font-bold transition-all duration-300 cursor-pointer
                    ${isActive
                      ? 'text-white brutal-shadow-sm scale-[1.02]'
                      : 'text-ink-muted hover:text-ink bg-transparent hover:bg-white/40'
                    }
                  `}
                  style={isActive ? { background: fc.accentColor === '#C8FF3D' ? '#14100F' : fc.accentColor, boxShadow: `3px 3px 0 ${fc.accentColor}` } : {}}
                >
                  {fc.label}
                  {submitted[fc.id as FormType] && (
                    <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-green-500 text-white text-[9px]">✓</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* ── Form Card ── */}
          <div
            className="contact-form-card bg-white brutal-card p-8 md:p-10"
            style={{ boxShadow: `8px 8px 0px ${config.accentColor}` }}
          >
            {/* Form tag label */}
            <div className="flex items-center justify-between mb-6">
              <span className={`font-jetbrains text-xs font-bold ${config.tagColor}`}>{config.tag}</span>
              <span className="font-jetbrains text-[10px] text-ink-muted">
                {isSubmitted ? '✓ submitted' : '* required fields'}
              </span>
            </div>

            {isSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <span className="text-5xl">🎉</span>
                <h3 className="font-bricolage text-3xl font-extrabold text-ink">Message Received!</h3>
                <p className="font-jakarta text-ink-muted text-sm max-w-sm mx-auto">
                  Thanks for reaching out! Our team will respond to your registered email shortly.
                </p>
                <button
                  onClick={() => setSubmitted((prev) => ({ ...prev, [activeType]: false }))}
                  className="mt-2 font-jetbrains text-xs underline text-ink-muted hover:text-ink transition-colors cursor-pointer"
                >
                  Submit another message →
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div ref={fieldsRef}>
                  {activeType === 'investor' && <InvestorFields />}
                  {activeType === 'partnership' && <PartnershipFields />}
                  {activeType === 'general' && <GeneralFields />}
                </div>

                <button
                  type="submit"
                  className="w-full py-4 font-bricolage font-bold text-base brutal-pill transition-all hover:scale-[1.01] active:scale-95 cursor-pointer text-center mt-2"
                  style={{
                    background: config.accentColor === '#C8FF3D' ? '#14100F' : config.accentColor,
                    color: '#fff',
                    boxShadow: `4px 4px 0 ${config.accentColor === '#C8FF3D' ? '#C8FF3D' : '#14100F'}`,
                  }}
                >
                  Send {config.label} Inquiry →
                </button>
              </form>
            )}
          </div>

          {/* ── PPT Section (Investor & Partnership only) ── */}
          {config.hasPpt && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-jetbrains text-[10px] font-bold text-ink-muted uppercase tracking-widest">// exclusive resource</span>
                <div className="flex-1 h-px bg-ink/10" />
              </div>
              <PptSection unlocked={isSubmitted} config={config} />
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
