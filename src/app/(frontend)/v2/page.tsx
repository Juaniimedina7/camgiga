import '../heroes.css'
import Link from 'next/link'
import type { Metadata } from 'next'
import { HeroSplit } from '../../../components/hero/HeroVariants'

export const metadata: Metadata = { title: 'Preview V2 — Split técnico', robots: { index: false, follow: false } }

export default function PreviewV2() {
  return (
    <>
      <div className="preview-bar">Versión <b>2 · Split técnico</b> · <Link href="/v1">ver V1</Link> · <Link href="/v3">ver V3</Link> · <Link href="/">Inicio actual</Link></div>
      <HeroSplit />
    </>
  )
}
