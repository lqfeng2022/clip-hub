import { SubmitHandler } from 'react-hook-form'

// Dynamical Input Box
export const handleEnterSubmit = <T>(
  handleSubmit: (callback: SubmitHandler<T>) => (e?: React.BaseSyntheticEvent) => void,
  onSubmit: SubmitHandler<T>
) => (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  // Prevent breaking IME input (Chinese, Japanese, etc.)
  if (e.nativeEvent.isComposing) return

  if (e.key === 'Enter') {
    // Shift + Enter -> new line
    if (e.shiftKey) return

    // Enter alone -> submit
    e.preventDefault()
    handleSubmit(onSubmit)()
  }
}