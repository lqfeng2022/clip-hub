import { Box, Button, Collapse, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { formatMessage } from '@/helps/formatMessage'
import useChatMessageRewrite from '@/hooks/interact-chat/useChatMessageRewrite'

interface Props {
  content: string
  rewrite_content?: string
  chatSessionId: number
  messageId: number
  align?: 'left' | 'right'
}

const TextMessageWithRewrite = ({
  content,
  rewrite_content,
  chatSessionId,
  messageId,
  align = 'left'
}: Props) => {
  const [showRewriteBox, setShowRewriteBox] = useState(false)
  const [viewingRewrite, setViewingRewrite] = useState(false)
  const [localRewrite, setLocalRewrite] = useState<string | null>(rewrite_content || null)
  
  const { mutate: rewriteMessage, isLoading } = useChatMessageRewrite(chatSessionId, messageId)

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems={align === 'right' ? 'flex-end' : 'flex-start'}
      width={{ base: '260px', sm: '350px' }}
    >
      {/* Main text message */}
      <Box
        borderRadius='12px'
        background={align === 'right' ? 'gray.700' : 'RGBA(0, 0, 0, 0.22)'}
        p='8px 15px'
        width='full'
        cursor='pointer'
        onClick={() => setShowRewriteBox(!showRewriteBox)}
        _hover={{ opacity: 0.8 }}
      >
        <Text
          color={align === 'right' ? 'white' : 'gray.100'}
          lineHeight={1.4}
          fontSize={{ base: '0.8em', sm: 'sm' }}
          whiteSpace='pre-wrap'
        >
          {formatMessage(
            viewingRewrite && localRewrite ? localRewrite : content
          )}
        </Text>
      </Box>

      {/* Rewrite controls - shown on click */}
      <Collapse in={showRewriteBox && (!!localRewrite || true)} animateOpacity>
        <Box
          p={2}
          borderRadius='5px'
          width='full'
        >
          {localRewrite ? (
            <Button
              size='xs'
              variant='outline'
              width='full'
              _hover={{ background: 'yellow.800' }}
              onClick={() => setViewingRewrite(!viewingRewrite)}
            >
              {viewingRewrite ? 'View Original' : 'View Rewrite'}
            </Button>
          ) : (
            <Button
              size='xs'
              variant='outline'
              width='full'
              isLoading={isLoading}
              isDisabled={isLoading}
              onClick={() =>
                rewriteMessage(undefined, {
                  onSuccess: (data) => {
                    if (data?.content) {
                      setLocalRewrite(data.content)
                      setViewingRewrite(true)
                    }
                  },
                })
              }
            >
              Rewrite
            </Button>
          )}
        </Box>
      </Collapse>
    </Box>
  )
}

export default TextMessageWithRewrite
