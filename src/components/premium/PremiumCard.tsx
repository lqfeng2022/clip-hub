import { Button, Card, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import PremiumCoverBadge from './PremiumCoverBadge'
import { Link } from 'react-router-dom'

interface Props {
  credits: string,
  price: string,
  step: string,
  note: string,
  image: string,
}
const PremiumCard = ({ credits, price, step, note, image }: Props) => {
  return (
    <Card
      mx={4} mt={8}
      maxW='400px'
      direction='column'
      overflow='hidden'
      variant='outline'
      borderRadius='15px'
      display='flex'
    >
      <PremiumCoverBadge step={step} image={image}/>
      <Stack p={5}>
        <HStack mb={2} justifyContent='space-between'>
          <HStack align='flex-end'>  {/* make Text bottom-aligned */}
            <Heading size='lg' fontWeight='light' color='yellow.200'>
              {credits}
            </Heading>
            <Text fontSize='sm'>/ ${price}</Text>
          </HStack>
          <Link to={'payment/'}>
            <Button
              size='sm'
              variant='solid'
              borderRadius='full'
              bg='gray.600'
              _hover={{bg: 'green.500'}}
            >
              Subscribe
            </Button>
          </Link>
        </HStack>
        <Text color='gray.100'>
          {note}
        </Text>
      </Stack>
    </Card>
  )
}

export default PremiumCard