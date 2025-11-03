export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <p className="text-sm text-muted-foreground">
          Built with ❤️ for Desishub © {new Date().getFullYear()}
        </p>
        <p className="text-sm text-muted-foreground">
          Candidate Assessment Platform
        </p>
      </div>
    </footer>
  );
}
