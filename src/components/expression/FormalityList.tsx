import useLanguageStore from '@/languageStore'
import { Heading } from '@chakra-ui/react'
import FormalityTags from './FormalityTags'

const FormalityList = () => {
  const lang = useLanguageStore(s => s.language)

  return (
    <>
      <Heading fontSize='3xl' py={3}>
        {lang === 'en' ? 'Formality' : '正式性'}
      </Heading>
      <FormalityTags/>
    </>
  )
}

export default FormalityList