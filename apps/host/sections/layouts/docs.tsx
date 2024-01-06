// components
import { ScrollArea } from "@repo/ui/components/scroll-area";
// routes
import { docs } from "@/utils/routes/docs";
//
import { DocsSidebarNav } from "./nav/nav-sidebar";

// ----------------------------------------------------------------------

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
        <ScrollArea className="h-full py-5 pr-6 lg:py-6">
          <DocsSidebarNav items={docs} />
        </ScrollArea>
      </aside>
      <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
        {children}
      </main>
    </div>
  );
}
