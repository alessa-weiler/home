import { SplineHero } from './components/SplineHero';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Interests } from './components/Interests';

export function SectionHeader({ label }: { label: string }) {
  return (
    <h2 className="text-2xl font-bold text-white mb-6 font-mono">
      <span className="text-neutral-700">~/</span>
      {label}
    </h2>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Nav */}
        <nav className="flex items-center justify-between mb-10">
          <span className="font-mono text-sm tracking-wider text-white">alessa weiler</span>
          <div className="flex gap-6 text-sm font-mono text-neutral-500">
            <a href="#skills" className="hover:text-white transition-colors">skills</a>
            <a href="#experience" className="hover:text-white transition-colors">experience</a>
          </div>
        </nav>

        {/* Hero — Spline 3D */}
        <SplineHero />

        {/* Skills */}
        <Skills />

        {/* Experience */}
        <Experience />

        {/* Interests */}
        <Interests />
      </div>
    </div>
  );
}
