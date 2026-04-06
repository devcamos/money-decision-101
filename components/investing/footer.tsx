export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 px-4 border-t border-border">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-sm text-muted-foreground">
          {currentYear} Investing 101. For educational purposes only.
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          This content is not financial advice. Always do your own research.
        </p>
      </div>
    </footer>
  );
}
