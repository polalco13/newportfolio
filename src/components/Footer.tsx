export function Footer() {
  return (
    <footer className="pt-10 sm:pt-12 border-t border-[var(--color-border)]">
      <p className="font-body text-xs text-[var(--color-text-muted)] text-center">
        © {new Date().getFullYear()} Pol Alcoverro · Designed & built in Barcelona
      </p>
    </footer>
  );
}
