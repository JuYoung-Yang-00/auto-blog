import type { Metadata } from "next";
import Header from '@/app/(public)/components/Header';
import Footer from '@/app/(public)/components/Footer';
export const metadata: Metadata = {
  title: "BOX | Public",
  description: "Auto-Blog",
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main>
        <Header />
        {children}
        <Footer />
      </main>
    </>
  );
}
