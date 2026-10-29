import '../heroes.css'
import Link from 'next/link'
import type { Metadata } from 'next'
import { HeroKinetic } from '../../../components/hero/HeroVariants'

export const metadata: Metadata = { title: 'Preview V3 — Editorial kinético', robots: { index: false, follow: false } }

export default function PreviewV3() {
  return (
    <>
      <div className="preview-bar">Versión <b>3 · Editorial kinético</b> · <Link href="/v1">ver V1</Link> · <Link href="/v2">ver V2</Link> · <Link href="/">Inicio actual</Link></div>
      <HeroKinetic />
    </>
  )
}
