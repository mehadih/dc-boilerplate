// src/app/layout.tsx
import {JSX, ReactNode, Suspense} from 'react';
import './globals.css';
import ClientLayout from './client-layout';
import {Toaster} from "sonner";
import {GlobalProvider} from "@/context/GlobalContext";
import MainMenu from "@/components/global/MainMenu";
import Footer from "@/components/global/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Next.js Boilerplate",
    description: "Page description",
    keywords: "",
    authors: [{ name: "" }],
    robots: "index, follow",
    openGraph: {
        title: "Next.js Boilerplate",
        description: "Page description",
        url: "https://yoursite.com",
        images: [
            {
                url: "https://yoursite.com/image.jpg",
                alt: "Description of the image",
            },
        ],
        type: "website",
        siteName: "NextJs Boilerplate",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "Next.js Boilerplate",
        description: "Page description",
        images: ["https://yoursite.com/image.jpg"],
    },
    icons: {
        icon: [
            { url: "/images/static/favicon.ico", type: "image/x-icon" },
            { url: "/images/static/icon1.png", sizes: "32x32", type: "image/png" },
            { url: "/images/static/icon0.svg", type: "image/svg+xml" },
        ],
        apple: [
            { url: "/images/static/apple-icon.png", sizes: "180x180" },
        ],
    },
    manifest: "/manifest.json",
    other: {
        "theme-color": "green",
        "mobile-web-app-capable": "yes",
        "apple-mobile-web-app-capable": "yes",
        "apple-mobile-web-app-status-bar-style": "black-translucent",
        "format-detection": "telephone=no",
        "apple-mobile-web-app-title": "NextJs Boilerplate",
        "application-name": "NextJs Boilerplate",
    },
};

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({children}: RootLayoutProps): JSX.Element {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://www.googletagmanager.com" />
            <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-XXXXXXX');
                    `,
                }}
            />
        </head>
        <body className={'antialiased'} suppressHydrationWarning>
        <Toaster
            duration={5000}
            position="bottom-right"
            richColors
        />
        <GlobalProvider>
            <Suspense fallback={<LoadingSpinner/>}>
                <MainMenu/>
            </Suspense>
            <ClientLayout>{children}</ClientLayout>
            <Footer />
        </GlobalProvider>
        </body>
        </html>
    );
}