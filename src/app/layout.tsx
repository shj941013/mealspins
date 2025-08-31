import "../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MealSpin",
  description: "Spin your fridge into dinner",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
