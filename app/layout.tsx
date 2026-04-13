import { Gochi_Hand } from 'next/font/google';
import { Header } from "@/components/Header";
import { Toaster } from "react-hot-toast";
import "./globals.css";

// Configuração da fonte
const gochiHand = Gochi_Hand({
  weight: '400', // Essa fonte só possui o peso 400
  subsets: ['latin'],
  variable: '--font-gochi-hand', // Definimos uma variável CSS
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${gochiHand.variable}`}
    >
      <body className="font-sans antialiased text-base">
        <Toaster position="bottom-right" reverseOrder={false} />
        <main className="min-h-screen flex flex-col bg-zinc-50">
          <Header />
          {children}
        </main>
      </body>

    </html>
  );
}
