import { SectionHeader } from '../App';

const SKILLS = [
  {
    category: 'Languages',
    items: ['Python', 'TypeScript', 'JavaScript', 'R', 'SQL', 'HTML/CSS'],
  },
  {
    category: 'Backend',
    items: ['PostgreSQL', 'Redis', 'Celery', 'REST APIs', 'DigitalOcean', 'Stripe'],
  },
  {
    category: 'Frontend',
    items: ['React', 'Tailwind CSS', 'Vite', 'Three.js', 'Framer Motion'],
  },
  {
    category: 'Product & Design',
    items: ['Interaction design', 'Figma', 'User research', 'Usability testing', 'A/B testing'],
  },
  {
    category: 'AI & Data',
    items: ['Claude API', 'Pinecone (vector search)', 'Agent-based modelling', 'Machine learning', 'R/Python pipelines'],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-16">
      <SectionHeader label="skills" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SKILLS.map(({ category, items }) => (
          <div
            key={category}
            className="border border-neutral-800 rounded-lg p-5 bg-[#0d0d0d] hover:border-neutral-700 transition-colors"
          >
            <p className="text-xs font-mono text-neutral-500 mb-3 uppercase tracking-widest">
              {category}
            </p>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <span
                  key={item}
                  className="text-xs px-2 py-1 rounded bg-neutral-900 text-neutral-300 border border-neutral-800 font-mono"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
