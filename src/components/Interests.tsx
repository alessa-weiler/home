import { SectionHeader } from '../App';

const INTERESTS = [
  {
    emoji: '🎤',
    title: 'Stand-up Comedy',
    description:
      'Performing sets and writing material — turns out building rapport with a hostile room is great practice for stakeholder management.',
  },
  {
    emoji: '🐾',
    title: 'Bernese Mountain Dog',
    description:
      'Co-parent to a very large, very fluffy Berner. Teaches patience, unconditional positive regard, and the importance of robust error-handling.',
  },
  {
    emoji: '🧗',
    title: 'Bouldering',
    description:
      "Technical problem-solving under physical and mental pressure. Each problem is a small puzzle — obsessing over the beta is basically debugging.",
  },
  {
    emoji: '🏔',
    title: 'Hiking & Running',
    description:
      'Long-distance running and mountain hiking. Good for processing ideas and genuinely believing that shipping a hard feature is possible.',
  },
  {
    emoji: '🔧',
    title: 'Side Projects',
    description:
      'Always tinkering — currently exploring AI welfare frameworks, voice synthesis interfaces, and ways to make therapy more accessible through technology.',
  },
];

export function Interests() {
  return (
    <section id="interests" className="py-8 pb-4">
      <SectionHeader label="beyond-work" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {INTERESTS.map(({ emoji, title, description }) => (
          <div
            key={title}
            className="border border-neutral-800 rounded-lg p-5 bg-[#0d0d0d] hover:border-neutral-700 transition-colors"
          >
            <div className="text-2xl mb-3">{emoji}</div>
            <p className="text-sm font-semibold text-white mb-2">{title}</p>
            <p className="text-xs text-neutral-500 leading-relaxed">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
