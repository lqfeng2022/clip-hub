import useCredit from '@/hooks/billing/useCredit'
import { Box, Progress, Text } from '@chakra-ui/react'

const UserCredit = () => {
  const { data: credit } = useCredit()

  const debits = credit?.lifetime_debits ?? 0
  const credits = credit?.lifetime_credits ?? 1

  const creditRatio = Math.min(100, Math.round((debits / credits) * 100))

  return (
    <Box pl='150px' py={3}>
      <Box position='relative'>
        <Progress
          value={creditRatio}
          height='32px'
          colorScheme='gray'
          bg='orange.400'
          opacity={0.6}
        />
        {/* Text overlay */}
        <Text
          position='absolute'
          top='50%'
          left='50%'
          transform='translate(-50%, -50%)'
          fontWeight='light'
          pointerEvents='none'
          whiteSpace='nowrap'
        >
          {debits.toLocaleString()} / 
          {' '}{credits.toLocaleString()} 
          {' '}<strong>credits</strong>
        </Text>
      </Box>
    </Box>
  )
}

export default UserCredit