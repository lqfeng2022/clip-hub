import useNavStack from '@/stores/navStack'
import { Box, Heading, HStack, Icon } from '@chakra-ui/react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

const PageNavTab = ({ title }: { title?: string }) => {
  const navigate = useNavigate()
  const pop = useNavStack((s) => s.pop)

  const goBack = () => {
    const prev = pop()
    if (prev) navigate(prev)
    else navigate(-1) // fallback
  }

  return (
    <Box
      position='sticky'
      height='55px'
      pl={2}
      top='0px' // height of top navbar
      zIndex={10}
      bg='#262626'
      opacity='0.85'
      display='flex'
      justifyContent='left'
      borderBottom='1px'
      borderColor='gray.700'
    >
      <HStack spacing='20px'>
        <Icon
          as={IoIosArrowRoundBack}
          boxSize={8}
          onClick={goBack}
          _hover={{
            bg: 'gray.600', borderRadius: 'full', opacity: '0.8'
          }}
          cursor='pointer'
          transition='0.1s'
        />
        <Heading
          fontSize='lg'
          borderColor='yellow.400'
        >
          {title}
        </Heading>
      </HStack>
    </Box>
  )
}

export default PageNavTab