import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import APIClient from '@/services/api-interact'

const apiClient = new APIClient('chatsessions')

export const useCallPost = (chatSessionId: number) => {
  const [callId, setCallId] = useState<string | null>(null)

  const { mutateAsync: createCall } = useMutation({
    mutationFn: async () => {
      return apiClient.postChatCall(chatSessionId, {}, { withCredentials: true })
    },
  })

  const startCall = async (onOpen?: () => void) => {
    if (!chatSessionId || callId) return
    try {
      const res = await createCall()
      if (!res?.uuid) {
        console.error('Invalid call response', res)
        return
      }
      setCallId(res.uuid)
      onOpen?.()
    } catch (err) {
      console.error('Failed to create call', err)
    }
  }

  const endCall = () => {
    setCallId(null)
  }

  return { callId, startCall, endCall }
}