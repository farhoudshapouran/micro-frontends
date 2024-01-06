import "@repo/ui/styles/globals.css";
import "../styles/mdx.css";
import type { AppProps } from "next/app";
import ReduxProvider from "@repo/data-context/provider";
import { PersistGate, persistor } from "@repo/data-context/store";
// theme
import { ThemeProvider } from "@repo/ui/theme-provider";
// layout
import MainLayout from "@/sections/layouts/main";

// ----------------------------------------------------------------------

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <ThemeProvider>
        <PersistGate loading={null} persistor={persistor}>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </PersistGate>
      </ThemeProvider>
    </ReduxProvider>
  );
}
