import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.scss";
import styles from "./layout.module.scss";
import { Header } from "../components";
import { Footer } from "../components/Footer/Footer";
import { ReactQueryProvider, ReduxProvider } from "../providers";
import { ServiceWorkerRegistration } from "../components/ServiceWorkerRegistration/ServiceWorkerRegistration";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Starsoft - Marketplace de NFTs",
    template: "%s | Starsoft",
  },
  description: "Compre NFTs de forma segura e fácil.",
  openGraph: {
    title: "Starsoft - Marketplace de NFTs",
    description: "Compre NFTs de forma segura e fácil.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon-32x32.png",
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Starsoft",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.variable} antialiased`}>
        <ServiceWorkerRegistration />
        <ReactQueryProvider>
          <ReduxProvider>
            <Header />
            <main className={styles.main} id="main-content">
              {children}
            </main>
            <Footer />
          </ReduxProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
