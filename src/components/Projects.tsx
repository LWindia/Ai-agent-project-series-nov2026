import ProjectKubeDoctor from './ProjectKubeDoctor';
import ProjectCloudSentinel from './ProjectCloudSentinel';
import ProjectAIOpsPulse from './ProjectAIOpsPulse';

export default function Projects() {
  return (
    <section id="projects" className="relative scroll-mt-20 py-12 sm:py-16">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        {/* section header — editorial */}
        <div className="reveal flex flex-col gap-6 border-b border-ink-600/50 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label-eyebrow text-electric-400">
              <span className="mr-2 inline-block h-1 w-1 rounded-full bg-electric-400 align-middle" />
              The Series
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-[36px] font-semibold leading-[1.05] tracking-tight text-bone-50 sm:text-[48px]">
              Three agents. Three domains.
              <br />
              <span className="text-bone-400">One engineering discipline.</span>
            </h2>
          </div>
          <p className="max-w-xs text-[13px] leading-relaxed text-bone-300 md:text-right">
            Each project is a self-contained agent built to operate a different layer of
            production infrastructure.
          </p>
        </div>

        {/* project showcases */}
        <div className="space-y-14 pt-10 sm:space-y-20 sm:pt-12">
          <ProjectKubeDoctor />
          <ProjectCloudSentinel />
          <ProjectAIOpsPulse />
        </div>
      </div>
    </section>
  );
}
