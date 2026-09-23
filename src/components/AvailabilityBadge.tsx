const MAP: Record<string, { cls: string; label: string }> = {
  'en-stock': { cls: 'badge--ok', label: 'En stock' },
  consultar: { cls: 'badge--warn', label: 'Consultar disponibilidad' },
  'sin-stock': { cls: 'badge--muted', label: 'Sin stock' },
}

export function AvailabilityBadge({ value }: { value?: string | null }) {
  const info = MAP[value ?? 'consultar'] ?? MAP.consultar
  return <span className={`badge ${info.cls}`}>{info.label}</span>
}
