import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ice Cool PRO™ - IPL Uklanjanje Dlačica | BiH",
  description: "Bezbolno IPL uklanjanje dlačica iz udobnosti doma. Salon efekat bez salona, bez voska i bez svakodnevnog brijanja. Besplatna dostava, plaćanje pouzećem.",
  keywords: "IPL aparat, IPL epilator BiH, lasersko uklanjanje dlačica, kućni IPL uređaj, epilator sa hlađenjem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bs" className="force-light">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
