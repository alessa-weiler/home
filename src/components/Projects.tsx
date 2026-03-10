const projects = [
  {
    year: '2025',
    title: 'AI Welfare Research Platform',
    tech: ['Python', 'Research', 'Ethics'],
    description:
      'Exploring frameworks for evaluating AI welfare and developing ethical guidelines for human-AI interaction.',
    links: [{ text: 'Research', url: '#' }],
  },
  {
    year: '2024',
    title: 'Empathetic AI Chat Interface',
    tech: ['JavaScript', 'Claude API', 'UX Design'],
    description:
      'A conversational interface designed to foster meaningful connections between humans and AI, featuring voice synthesis and natural language processing.',
    links: [
      { text: 'Live Demo', url: '#' },
      { text: 'GitHub', url: '#' },
    ],
  },
  {
    year: '2024',
    title: 'Human-AI Collaboration Study',
    tech: ['Research', 'UX', 'Ethics'],
    description:
      'Investigating how humans and AI can work together more effectively while respecting AI autonomy and welfare.',
    links: [{ text: 'Paper', url: '#' }],
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-16">
      <h2 className="text-2xl font-bold text-white mb-8 font-mono">
        <span className="text-green-400">~/</span>projects
      </h2>
      <div className="space-y-4">
        {projects.map((project, i) => (
          <div
            key={i}
            className="border border-neutral-800 rounded-lg p-6 bg-black/40 hover:border-neutral-700 transition-colors group"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono text-neutral-600">{project.year}</span>
                  <h3 className="text-white font-semibold group-hover:text-green-300 transition-colors">
                    {project.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-neutral-400 leading-relaxed">{project.description}</p>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              {project.links.map((link) => (
                <a
                  key={link.text}
                  href={link.url}
                  className="text-sm font-mono text-neutral-500 hover:text-green-400 transition-colors"
                >
                  → {link.text}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
