import { personalInfo } from "@/data";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] py-8">
      <p className="font-body text-center text-xs text-[var(--color-text-muted)]">
        &copy; {new Date().getFullYear()} {personalInfo.name}. Designed and built in Barcelona.
      </p>
    </footer>
  );
}
