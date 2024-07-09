import type { Metadata } from "next";

import Header from '@/app/(service)/components/Header'
import Footer from '@/app/(service)/components/Footer'

export const metadata: Metadata = {
  title: "BOX | Service",
  description: "Auto-Blog",
};

export default function ServiceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />

    </>
  );
}
