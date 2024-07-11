import type { Metadata } from "next";

import Header from '@/app/(service)/components/Header'
import Footer from '@/app/(service)/components/Footer'
import { UsernameProvider } from '@/app/(service)/components/ServiceUsernameContext';


export const metadata: Metadata = {
  title: "BOX | ",
  description: "Auto-Blog",
};

export default function ServiceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
 {
  return (
    <UsernameProvider>
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
    </UsernameProvider>
  );
}

