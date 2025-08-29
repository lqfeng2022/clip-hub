import useExpressionQueryStore from '@/expressionStore'
import useAlphabets from '@/hooks/store/useAlphabets'
import useLanguageStore from '@/languageStore'
import { Box, Heading, List, ListItem, Spinner, Text } from '@chakra-ui/react'

const WordsList = () => {
  const { data, error, isLoading } = useAlphabets()

  const lang = useLanguageStore(s => s.language)

  const selectedWordId = useExpressionQueryStore(
    (s) => s.expressionQuery.wordId
  )
  const setSelectWordId = useExpressionQueryStore(
    (s) => s.setWordId
  )

  if (error) return null
  if (isLoading) return <Spinner />
  return (
  <>
    <Heading fontSize='3xl' py={3}>
      {lang === 'en' ? 'Words' : '单词'}
    </Heading>
    <List spacing={4} py={2}>
    {data?.results.map((alphabet) => (
      <Box key={alphabet.id}>
        <Heading>{`${alphabet.title} ${alphabet.slug}`}</Heading>
        {alphabet.words.map((word) => (
          <ListItem key={word.id} pl={2}>
            <Text
              size='md'
              fontWeight={word.id === selectedWordId ? 'bold' : 'normal'}
              onClick={() => setSelectWordId(word.id)}
            >
              {word.title}
            </Text>
          </ListItem>
        ))}
      </Box>
    ))}
    </List>
  </>
)
}

export default WordsList