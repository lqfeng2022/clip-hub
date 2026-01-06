import { Center, Text } from '@chakra-ui/react'

interface Props {
  count: number,
  genre: string,
}
const PostCount = ({ count, genre }: Props) => {
  return (
    <Center 
      height='50px' 
      borderY='1px solid'
      borderColor='gray.500'
      opacity='0.6'
    >
      <Text fontWeight='semibold' color='yellow.200'>
        {`Show ${count} ${genre}`}
      </Text>
    </Center> 
  )
}

export default PostCount