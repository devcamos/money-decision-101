export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-4 py-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm text-muted-foreground">
          {currentYear} Nexus Motivus · Investing 101
        </p>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">
          UK educational content only. Nexus does not provide a personal recommendation or claim endorsement by the authorities cited on this page.
        </p>
      </div>
    </footer>
  );
}
