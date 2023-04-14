import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { AuthContextProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import i18next from "i18next";
import { en } from "@/localization/en";
import { hi } from "@/localization/hi";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
  lng: "en",
  debug: true,
  resources: {
    en: en,
    hi: hi,
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}
