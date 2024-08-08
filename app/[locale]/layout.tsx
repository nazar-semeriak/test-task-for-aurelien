import SidebarNavigation from "@/components/section/SidebarNavigation";
import { cn } from "@/lib/utils";
import { NextAuthProvider } from "../NextAuthProvider";

import "@/styles/global.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Inter as FontSans } from "next/font/google";
import type { Metadata } from "next";

import { NextIntlClientProvider, useMessages } from "next-intl";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Daillens Admin",
    default: "Daillens Admin",
  },
};

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <NextAuthProvider>
          <body
            className={cn(
              "min-h-screen bg-background font-sans antialiased",
              fontSans.variable
            )}
          >
            {children}
            {/* <div className="w-full">
              <div className="flex flex-wrap justify-start ">
                <div className="w-2/12 ">
                  <SidebarNavigation />
       
                </div>
                <div className="w-10/12 flex">{children}</div>
              </div>
            </div> */}
          </body>
        </NextAuthProvider>
      </NextIntlClientProvider>
    </html>
  );
}
