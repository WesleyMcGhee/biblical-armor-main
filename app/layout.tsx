import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Biblical Armor Apologetics",
  description: "Equipping believers with knowledge to defend their faith",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-mono antialiased">
        {children}
      </body>
    </html>
  );
}
