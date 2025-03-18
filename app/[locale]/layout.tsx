import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
    children: ReactNode;
    params: Promise<{ locale: string }>;
}

export default async function RootLayout({
    children,
    params,
}: RootLayoutProps) {
    const { locale } = await params;
    let messages;
    try {
        messages = (await import(`@/messages/${locale}.json`)).default;
    } catch (error) {
        console.error("Error fetching messages:", error);
        notFound();
    }

    return (
        <html lang={locale} className={inter.className}>
            <body className="min-h-screen bg-background antialiased">
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <Header />
                    <main className="relative flex min-h-screen flex-col">
                        {children}
                    </main>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}