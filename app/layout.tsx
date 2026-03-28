import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GAIA | Velas artesanales",
  description: "Velas artesanales inspiradas en la tierra, la belleza natural y la delicadeza de lo hecho a mano.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
