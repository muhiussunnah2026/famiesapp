'use client';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const stats = [
  { n: '10 000+', label: 'nedladdningar' },
  { n: '500+', label: 'evenemang i flödet' },
  { n: '270+', label: 'kurerade källor' },
  { n: '4.8', label: 'snitt i App Store' },
];

const testimonials = [
  {
    name: 'Anna, 34',
    role: 'mamma till 3 & 6 år',
    city: 'Stockholm',
    quote:
      'Äntligen en app som bara visar det som passar oss. Jag brukade googla i en halvtimme varje lördag. Nu öppnar jag Famies och vi är ute innan klockan tio.',
  },
  {
    name: 'Markus, 41',
    role: 'pappa till två',
    city: 'Solna',
    quote:
      'Det är som att ha en kompis som alltid vet vad som händer. Sparar oss så mycket tid — och vi upptäcker saker precis runt hörnet som vi aldrig sett.',
  },
  {
    name: 'Linnea, 29',
    role: 'förstagångsförälder',
    city: 'Nacka',
    quote:
      'Som ny förälder har jag inte energi att leta. Famies gör det åt mig. Flödet är lugnt, tips passar oss, och det känns inte som reklam.',
  },
  {
    name: 'Sofia & Erik',
    role: 'familj med 4 barn',
    city: 'Upplands Väsby',
    quote:
      'Vi har testat allt — kalendrar, listor, grupper på Facebook. Famies är det första som faktiskt känns gjort för föräldrar.',
  },
  {
    name: 'Johan, 37',
    role: 'pappa till 2 & 5 år',
    city: 'Södermalm',
    quote:
      'Brevlådan med kortnotiser är min favorit. Jag kollar en gång om dagen och vet exakt vad som är på gång. Klart.',
  },
  {
    name: 'Emma, 32',
    role: 'mamma till tvillingar',
    city: 'Täby',
    quote:
      'Det bästa är att appen följer med när barnen växer. Förra året var det småbarnsaktiviteter. Nu är det andra grejer. Samma app.',
  },
];

export default function SocialProof() {
  return (
    <section className="relative w-full py-20 md:py-28 section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl md:rounded-[2rem] shadow-soft p-8 md:p-10 mb-20 md:mb-24"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 text-center">
            {stats.map((s, i) => (
              <div key={i} className="relative">
                <div className="text-4xl md:text-5xl font-black text-brand-gradient mb-2">
                  {s.n}
                </div>
                <div className="text-sm md:text-base font-medium text-ink-500 dark:text-ink-300">
                  {s.label}
                </div>
                {i < stats.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 -translate-y-1/2 h-10 w-px bg-ink-100 dark:bg-ink-700" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials header */}
        <div className="text-center mb-14 md:mb-16 max-w-3xl mx-auto">
          <div className="inline-block px-4 py-1.5 mb-5 rounded-full glass shadow-soft text-xs font-bold uppercase tracking-wider text-primary">
            Vad föräldrar säger
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-ink-900 dark:text-white leading-[1.05] mb-6">
            Familjer gör <span className="text-brand-gradient">mer</span>. <br />
            Letar <span className="text-brand-gradient">mindre</span>.
          </h2>
        </div>

        {/* Testimonial grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
              className="group relative glass rounded-3xl p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-pink"
            >
              <Quote
                className="absolute top-6 right-6 text-primary/30 group-hover:text-primary/60 transition-colors"
                size={32}
              />

              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} size={15} className="fill-primary text-primary" />
                ))}
              </div>

              <p className="text-ink-700 dark:text-ink-100 leading-relaxed mb-6 text-[15px] md:text-base">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-ink-100/70 dark:border-ink-700/50">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary text-white font-black flex items-center justify-center">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-ink-900 dark:text-white text-sm leading-tight">
                    {t.name}
                  </div>
                  <div className="text-xs text-ink-500 dark:text-ink-300">
                    {t.role} • {t.city}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
