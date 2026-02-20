// Date and Time converting function
export function formatDate(dateString: string): string {
  const date = new Date(dateString)

  // Format time (e.g. '9:34 AM')
  const time = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })

  // Format date (e.g. 'Nov 19, 2025')
  const day = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return `${time} · ${day}`
}

export function formatSimpleDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()

  const diffMs = now.getTime() - date.getTime()
  const diffMin = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  // 1) If less than 24 hours
  if (diffHours < 24) {
    if (diffMin < 1) return '1m'
    if (diffMin < 60) return `${diffMin}m`
    return `${diffHours}h`
  }

  // 2) Less than 1 year → return 'Oct 30'
  const diffYears = now.getFullYear() - date.getFullYear()
  if (diffYears < 1) {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }

  // 3) 1 year or more → return 'Oct 30, 2024'
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  })
}

// Format chat duration
export function formatDuration(sec: number | null) {
  if (sec == null || !isFinite(sec)) return '0:00'

  const total = Math.max(0, Math.floor(sec))
  const hours = Math.floor(total / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const seconds = total % 60

  const mm = String(minutes).padStart(hours > 0 ? 2 : 1, '0') // pad minutes only if hours exist
  const ss = String(seconds).padStart(2, '0')

  return hours > 0 ? `${hours}:${mm}:${ss}` : `${mm}:${ss}`
}