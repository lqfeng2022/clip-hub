import {
  Box,
  Divider,
  Heading,
  Spinner,
  Tag,
  Wrap,
  WrapItem
} from '@chakra-ui/react'
import useLangTags from '../hooks/useLangTags'

const ExpressionTags = () => {
  const {data, error, isLoading} = useLangTags()

  if (error) return null
  if (isLoading) return <Spinner />
  return (
    <Box mt={8}>
      <Divider my={3} borderColor='white'/>
      <Heading fontSize='3xl' pb={3}>
        Expression tags
      </Heading>
      <Wrap spacing={4} p={2} justify='center'>
      { data?.results.map((tag) => (
        <WrapItem key={tag.id}>
          <Tag size='md' variant='outline' colorScheme='gray'>
            {tag.title}
          </Tag>
        </WrapItem>
      ))}
      </Wrap>
    </Box>
  )
}

export default ExpressionTags