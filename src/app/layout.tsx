import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.scss";
import styles from "./layout.module.scss";
import { Header } from "../components";
import { Footer } from "../components/Footer/Footer";
import { ReactQueryProvider, ReduxProvider } from "../providers";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Starsoft",
  description: "Compre NFTs de forma segura e fácil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <ReactQueryProvider>
          <ReduxProvider>
            <Header />
            <main className={styles.main}>
              {children}
            </main>
            <Footer />
          </ReduxProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
