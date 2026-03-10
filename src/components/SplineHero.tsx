'use client';
import { SplineScene } from '@/components/ui/splite';
import { Card } from '@/components/ui/card';
import { Spotlight } from '@/components/ui/spotlight';

export function SplineHero() {
  return (
    <Card className="w-full h-[520px] bg-black relative overflow-hidden border border-neutral-800/60">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

      <div className="flex h-full">
        {/* Left content */}
        <div className="flex-1 p-10 relative z-10 flex flex-col justify-center">
          <p className="text-xs font-mono text-neutral-600 mb-3 tracking-widest uppercase">
            Full-Stack Engineer · London
          </p>
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-500 leading-tight">
            Alessa<br />Weiler
          </h1>
          <p className="mt-5 text-sm text-neutral-400 max-w-xs leading-relaxed">
            CTO & builder. I shipped a patient–therapist matching platform from 0→1.
            Cambridge grad. Curious about humans, systems, and the intersection.
          </p>
          <div className="mt-7 flex gap-3 flex-wrap">
            <a
              href="#experience"
              className="px-4 py-2 text-xs font-mono bg-white text-black hover:bg-neutral-200 rounded transition-colors"
            >
              View experience →
            </a>
            <a
              href="#chat"
              className="px-4 py-2 text-xs font-mono text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-600 rounded transition-colors"
            >
              Talk to me
            </a>
          </div>
        </div>

        {/* Right content — 3D Scene */}
        <div className="flex-1 relative hidden md:block">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  );
}
