import { SectionHeader } from '../App';

const EXPERIENCE = [
  {
    role: 'Chief Technology Officer',
    company: 'Pont',
    period: '2024 – Present',
    location: 'London',
    description:
      'Built an agent-based model to predict human compatibility for patient–therapist matching. Full-stack: Python backend, JavaScript/HTML/CSS frontend, PostgreSQL, DigitalOcean, Stripe, Pinecone vector search, Celery & Redis.',
    tags: ['Python', 'PostgreSQL', 'React', 'Pinecone', 'Stripe'],
  },
  {
    role: 'Product Design & Software Intern',
    company: 'Ticketmaster',
    period: 'Summer 2018',
    location: 'London',
    description:
      'Designed and prototyped a mobile app redesign. Assisted with A/B test data analysis to improve event discovery and checkout conversion. Presented design rationale to engineering and design teams.',
    tags: ['Product Design', 'Figma', 'A/B Testing', 'Mobile'],
  },
  {
    role: 'Research Student',
    company: 'Public Health India',
    period: 'Jun 2022 – Jan 2023',
    location: 'Remote',
    description:
      'Analysed WHO SAGE2 census data in R to identify predictors of medication adherence. Applied regression analysis and data visualisation across clinical and behavioural variables. Co-authored a published paper.',
    tags: ['R', 'Data Analysis', 'Research', 'Statistics'],
  },
  {
    role: 'Medical Affairs Associate',
    company: 'Entheon Biomedical',
    period: 'Jun 2021 – Oct 2021',
    location: 'Remote',
    description:
      'Synthesized complex research for a genetic testing kit specification. Presented findings to C-suite, leading to product modifications.',
    tags: ['Research', 'Communication', 'Biotech'],
  },
];

const EDUCATION = [
  {
    degree: 'MRes Molecular & Cellular Biology',
    institution: 'Imperial College London',
    period: '2023 – 2024',
    detail: 'Computational genomics pipelines (R, Python, Bash). Systematic review of 4,000+ papers.',
  },
  {
    degree: 'BA Natural Sciences (Cantab)',
    institution: 'University of Cambridge',
    period: '2020 – 2023',
    detail: 'Bioinformatics · Mathematical Biology · Neurobiology · Psychology. Upper Second-Class Honours.',
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-16">
      <SectionHeader label="experience" />

      <div className="space-y-3 mb-12">
        {EXPERIENCE.map((item, i) => (
          <div
            key={i}
            className="border border-neutral-800 rounded-lg p-6 bg-[#0d0d0d] hover:border-neutral-700 transition-colors group"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
              <div>
                <h3 className="text-white font-semibold group-hover:text-neutral-200 transition-colors">
                  {item.role}
                </h3>
                <p className="text-sm text-neutral-500 font-mono">
                  {item.company} · {item.location}
                </p>
              </div>
              <span className="text-xs font-mono text-neutral-600 shrink-0">{item.period}</span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed mb-3">{item.description}</p>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2 py-0.5 rounded bg-neutral-900 text-neutral-500 border border-neutral-800 font-mono"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Education */}
      <h3 className="text-lg font-bold text-white mb-4 font-mono text-neutral-400">
        <span className="text-neutral-700">~/</span>education
      </h3>
      <div className="space-y-3">
        {EDUCATION.map((edu, i) => (
          <div
            key={i}
            className="border border-neutral-800 rounded-lg p-5 bg-[#0d0d0d] flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2"
          >
            <div>
              <p className="text-white font-semibold text-sm">{edu.degree}</p>
              <p className="text-xs font-mono text-neutral-500 mt-0.5">{edu.institution}</p>
              <p className="text-xs text-neutral-500 mt-2 leading-relaxed max-w-md">{edu.detail}</p>
            </div>
            <span className="text-xs font-mono text-neutral-600 shrink-0">{edu.period}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
