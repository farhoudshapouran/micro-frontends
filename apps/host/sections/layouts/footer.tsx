import { ThemeToggle } from "@repo/ui/components/theme-toggle";

// ----------------------------------------------------------------------

export default function Footer() {
  return (
    <footer className="py-6 md:py-0">
      <div className="container flex items-center justify-between md:h-24">
        <div className="flex flex-col text-sm leading-6 text-muted-foreground md:flex-row gap-1">
          <p>
            Built by{" "}
            <a
              href="https://www.linkedin.com/in/farhoudshapouran"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Farhoud Shapouran
            </a>
            .
          </p>
          <p>
            The source code is available on{" "}
            <a
              href="https://github.com/farhoudshapouran/micro-frontends"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
        <ThemeToggle />
      </div>
    </footer>
  );
}
