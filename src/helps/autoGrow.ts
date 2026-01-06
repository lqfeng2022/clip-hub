import { FormEvent } from 'react'

export const autoGrow = (e: FormEvent<HTMLTextAreaElement>) => {
  const textarea = e.currentTarget

  // Reset height so shrinking works
  textarea.style.height = '40px'

  // Grow ONLY if content overflows
  if (textarea.scrollHeight > textarea.clientHeight) {
    textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`
  }
}