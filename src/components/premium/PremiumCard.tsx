import { Button, Card, CardBody, CardFooter, Heading, List, ListIcon, ListItem, Stack, Text, Image, Box, Badge, HStack } from '@chakra-ui/react'
import { FaCheck } from 'react-icons/fa6'
import PremiumCoverBadge from './PremiumCoverBadge'

const PremiumCard = () => {
  const list_item = [
    { title: 'Build collections to put what you liked' },
    { title: 'FHD video quality and download free' },
    { title: 'Text and voice Chat on all post topics' },
    { title: 'Voice Chat on all post topics' },
    { title: 'Talk with all character AI' },
  ]
  
  return (
    <Card
      mx={4} mt={8}
      maxW='400px'
      direction='column'
      overflow='hidden'
      variant='outline'
      borderRadius='20px'
      display='flex'
    >
      <PremiumCoverBadge/>
      <CardBody>
        <Stack mb={8}>
          <HStack mb={2} justifyContent='space-between'>
            {/* <Heading size='xl' pb={2}>Be a Bro</Heading> */}
            <HStack align='flex-end'>  {/* make Text bottom-aligned */}
              <Heading size='2xl' fontWeight='light' color='yellow.200'>
                5,000
              </Heading>
              <Text>/ $10.00</Text>
            </HStack>
          </HStack>
          <Text fontWeight='light'>
            Let's practice our speaking skill using the most advanced AI
          </Text>
        </Stack>
        <List 
          spacing={4} 
          fontSize='lg' 
          fontWeight='semibold' 
          color='gray.200'
        >
          {list_item.map((item, index) => 
            <ListItem key={index}>
              <ListIcon as={FaCheck} color='green.500' />
                {item.title}
            </ListItem>
          )}
        </List>
      </CardBody>
      <CardFooter>
        <Button
          variant='solid'
          borderRadius='full'
          bg='gray.500'
          _hover={{bg: 'green.500'}}
        >
          Subscribe
        </Button>
      </CardFooter>
    </Card>
  )
}

export default PremiumCard