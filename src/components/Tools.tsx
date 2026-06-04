import { FadeUp, StaggerContainer, StaggerItem } from "./animations";
import { tools } from "@/data";
import { toolIcons } from "./ToolIcons";

export function Tools() {
  return (
    <FadeUp>
      <section className="flex scroll-mt-24 flex-col gap-5 sm:gap-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-[32px] italic leading-tight text-[var(--color-text-primary)] sm:text-4xl">
            Daily tools
          </h2>
          <p className="max-w-sm font-body text-sm leading-relaxed text-[var(--color-text-secondary)]">
            The practical environment behind the work: editor, version control, containers, and API testing.
          </p>
        </div>

        <StaggerContainer
          className="grid grid-cols-2 gap-3 sm:grid-cols-5"
          staggerDelay={0.05}
        >
          {tools.map((tool) => (
            <StaggerItem key={tool.name}>
              <div className="flex h-full flex-col items-center justify-center gap-2.5 border border-[var(--color-border)] bg-white p-3.5 text-center transition-colors hover:border-[var(--color-border-strong)] sm:gap-3 sm:p-4">
                <div className="text-[var(--color-text-primary)]" aria-hidden="true">
                  {toolIcons[tool.icon]}
                </div>
                <span className="font-body text-xs font-medium text-[var(--color-text-secondary)]">
                  {tool.name}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </FadeUp>
  );
}
