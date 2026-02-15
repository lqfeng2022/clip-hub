// chatDateUtils.ts

const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365
const THIRTY_MINUTES_MS = 1000 * 60 * 30

export const shouldShowDateDivider = (
  prevMessageCreatedAt: string | null,
  currentMessageCreatedAt: string
) => {
  if (!prevMessageCreatedAt) return true // first message always shows divider

  const prev = new Date(prevMessageCreatedAt)
  const curr = new Date(currentMessageCreatedAt)

  const diffMs = curr.getTime() - prev.getTime()

  // show divider if gap >= 30 minutes
  return diffMs >= THIRTY_MINUTES_MS
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

  const month = curr.getMonth() + 1
  const day = curr.getDate()
  const hours = curr.getHours().toString().padStart(2, '0')
  const minutes = curr.getMinutes().toString().padStart(2, '0')

  let includeYear = false

  if (prevMessageCreatedAt) {
    const prev = new Date(prevMessageCreatedAt)
    const diffMs = curr.getTime() - prev.getTime()

    // only include year if gap >= 1 year
    includeYear = diffMs >= ONE_YEAR_MS
  }

  const yearPart = includeYear ? ` ${curr.getFullYear()}` : ''

  return `${month}/${day} ${hours}:${minutes}${yearPart}`
}