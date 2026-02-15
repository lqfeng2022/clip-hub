// chatDateUtils.ts
export const shouldShowDateDivider = (
  prevMessageCreatedAt: string | null,
  currentMessageCreatedAt: string
) => {
  if (!prevMessageCreatedAt) return true

  const prev = new Date(prevMessageCreatedAt)
  const curr = new Date(currentMessageCreatedAt)

  const diffMs = curr.getTime() - prev.getTime()
  const diffMinutes = diffMs / (1000 * 60)
  const diffYears = curr.getFullYear() - prev.getFullYear()

  // Show divider if more than 30 minutes passed OR year changed
  return diffMinutes >= 30 || diffYears >= 1
}

/**
 * Format datetime for display:
 * - If the year is same as previous, skip year
 * - Format: 2/10 20:20 or 2/10 20:20 2025 if year changed
 */
export const formatDateTime = (
  currentMessageCreatedAt: string,
  prevMessageCreatedAt: string | null
) => {
  const curr = new Date(currentMessageCreatedAt)
  const prev = prevMessageCreatedAt ? new Date(prevMessageCreatedAt) : null

  const month = curr.getMonth() + 1
  const day = curr.getDate()
  const hours = curr.getHours().toString().padStart(2, '0')
  const minutes = curr.getMinutes().toString().padStart(2, '0')

  const includeYear = !prev || curr.getFullYear() !== prev.getFullYear()
  const yearPart = includeYear ? ` ${curr.getFullYear()}` : ''

  return `${month}/${day} ${hours}:${minutes}${yearPart}`
}