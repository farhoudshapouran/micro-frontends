import "@repo/ui/styles/globals.css";
import type { AppProps } from "next/app";
import ReduxProvider from "@repo/data-context/provider";
import { PersistGate, persistor } from "@repo/data-context/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </ReduxProvider>
  );
}
