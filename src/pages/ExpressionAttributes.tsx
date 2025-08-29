import { Box, Heading, HStack, Icon, Image, Stack, Tag, Text } from '@chakra-ui/react'
import { ImQuotesLeft } from 'react-icons/im'
import { Link } from 'react-router-dom'
import Expression from '@/entities/Expression'
import TagHList from '@/components/TagHList'
import useLanguageStore from '@/languageStore'
import { pocketURL } from '@/services/pocket'

const ExpressionAttributes = ({ expression } : { expression: Expression }) => {
  const lang = useLanguageStore(s => s.language)

  const explain_header = lang === 'en' ? 'Explain' : '解释'
  const tags_header = lang === 'en' ? 'Tags' : '语言标签'
  const words_header = lang === 'en' ? 'Words' : '单词'
  const clip_header = lang === 'en' ? 'Clip' : '表达式所在的视频'

  const explain = lang === 'ch' && expression.explain_ch 
    ? expression.explain_ch : expression.explain

  return (
    <>
      {/* clip quotes */}
      <HStack align='flex-start' wrap='wrap'>
        <Icon as={ImQuotesLeft}/>
        <Heading fontSize='2xl' flex='1'>
          {expression.subtitle.content}
        </Heading>
      </HStack>
      {/* explaining */}
      <Box py={5}>
        <Heading size='md' pb={1} color='gray.500'>
          {explain_header}
        </Heading>
        <Text>{explain}</Text>
      </Box>
      {/* language tags */}
      <Box>
        <Heading size='md' color='gray.500'>
          {tags_header}
        </Heading>
        <HStack>
          <Tag
            size='sm'
            colorScheme='blue'
            backgroundColor='#4A5568'
          >
            {expression.formal}
          </Tag>
          <TagHList items={expression.langtags} color='teal'/>
        </HStack>
      </Box>
      {/* word tags */}
      <Box pt={2}>
        <Heading size='md' color='gray.500'>
          {words_header}
        </Heading>
        <TagHList items={expression.words} color='gray'/>
      </Box>
      {/* clip link */}
      <Stack>
        <Heading size='md' py={2} color='gray.500'>
          {clip_header}
        </Heading>
        <Link to={`/clips/${expression.video.slug}`}>
          <Box position='relative'>
            <Text
              fontWeight='bold'
              position='absolute'
              left={1}
              top={1}
            >
              {expression.video.title}
            </Text>
            <Image
              w='100%' aspectRatio={ 30 / 9 }
              objectFit='cover'
              src={`${pocketURL}${expression.video.cover}`}
              className='img-hover'
            />
          </Box>
        </Link>
      </Stack>
    </>
  )
}

export default ExpressionAttributes