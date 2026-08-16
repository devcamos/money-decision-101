import type { Metadata } from 'next'
import { Geist, Geist_Mono, Libre_Baskerville } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });
const libreBaskerville = Libre_Baskerville({ 
  subsets: ["latin"], 
  weight: ["400", "700"],
  variable: "--font-serif" 
});

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
    siteName: "Nexus Motivus",
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
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${libreBaskerville.variable}`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
