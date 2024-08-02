import type { Metadata } from "next";

// import Header from '@/app/(service)/components/Header'
import Footer from '@/app/(service)/components/Footer'
import { UsernameProvider } from '@/app/(service)/components/ServiceUsernameContext';
import {NavigationMenuHeader} from '@/app/(service)/components/Headerworking';

export const metadata: Metadata = {
  title: "BOX",
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
      {/* <Header /> */}
      < NavigationMenuHeader  />
      <main>{children}</main>
      <Footer />
    </>
    </UsernameProvider>
  );
}

