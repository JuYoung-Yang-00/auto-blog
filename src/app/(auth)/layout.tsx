import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BOX | Auth",
  description: "Auto-Blog",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
