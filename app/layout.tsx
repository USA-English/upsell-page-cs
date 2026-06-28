import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Conversation Strategies | Upsell",
  description: "Upsell page for Conversation Strategies.",
  metadataBase: new URL("https://example.com"),
  icons: {
    icon: "/images/typ-gift-favicon.webp",
    shortcut: "/images/typ-gift-favicon.webp",
    apple: "/images/typ-gift-favicon.webp"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#112d58"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
