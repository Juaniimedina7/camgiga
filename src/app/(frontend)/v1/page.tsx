import '../heroes.css'
import Link from 'next/link'
import type { Metadata } from 'next'
import { HeroCine } from '../../../components/hero/HeroVariants'

export const metadata: Metadata = { title: 'Preview V1 — Cinemático', robots: { index: false, follow: false } }

export default function PreviewV1() {
  return (
    <>
      <div className="preview-bar">Versión <b>1 · Cinemático</b> · <Link href="/v2">ver V2</Link> · <Link href="/v3">ver V3</Link> · <Link href="/">Inicio actual</Link></div>
      <HeroCine />
    </>
  )
}
