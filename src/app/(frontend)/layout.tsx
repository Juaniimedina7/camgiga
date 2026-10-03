import React from 'react'
import type { Metadata } from 'next'
import { Barlow_Semi_Condensed, Inter } from 'next/font/google'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { WhatsAppFab } from '../../components/WhatsAppFab'
import { ScrollReveal } from '../../components/ScrollReveal'
import './globals.css'

const display = Barlow_Semi_Condensed({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-display',
  display: 'swap',
})
const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.camgiga.com.ar'),
  title: {
    default: 'CAMGIGA — Repuestos para camiones | Cajas, diferenciales, embragues',
    template: '%s | CAMGIGA',
  },
  description:
    'Repuestos para camiones, maquinaria agrícola y colectivos. Cajas, diferenciales y embragues, originales y alternativos. 25 años. Envíos a todo el país.',
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'CAMGIGA SRL',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFab />
        <ScrollReveal />
      </body>
    </html>
  )
}
