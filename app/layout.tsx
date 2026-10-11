import type { Metadata } from 'next'
import { Fraunces, Geist_Mono, Source_Sans_3 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const sourceSans = Source_Sans_3({ subsets: ["latin"], variable: "--font-source-sans", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://v0-investing-101-web-app.vercel.app"),
  title: {
    default: "Money Decision 101 | What should I do with my next £1,000?",
    template: "%s",
  },
  description:
    "UK educational money guidance. Money Decision 101 identifies the next topic to explore; Investing 101 teaches investing foundations.",
  openGraph: {
    type: "website",
    siteName: "Money Decision 101",
  },
  twitter: {
    card: "summary_large_image",
  },
}

export const viewport = {
  themeColor: '#fffaf1',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${geistMono.variable} ${fraunces.variable}`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
