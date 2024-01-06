// routes
import { usePathname } from "@repo/utils/routes/hooks";

import { cn } from "@repo/ui/lib/utils";
import Header from "./header";
import Footer from "./footer";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const pathname = usePathname();

  const isHome = pathname === "/";

  return (
    <div
      className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.variable
      )}
    >
      <div className="relative flex min-h-screen flex-col">
        <Header />
        <div className="flex-1 py-6 border-b">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
