import Clip from '@/entities/Clip'
import useLanguageStore from '@/languageStore'
import { Box, Button, Collapse, Heading, HStack, Link, Text } from '@chakra-ui/react'
import ClipAttrDefinition from './ClipAttrDefinition'
import { clipPage } from '@/data/clipPage'
import { useState } from 'react'

const ClipAttributes = ({ clip }: { clip: Clip }) => {
  const lang = useLanguageStore(s => s.language)

  const original = lang === 'ch' && clip.original_ch ? clip.original_ch : clip.original
  const about_content = lang === 'ch' && clip?.description_ch 
  ? clip.description_ch : clip?.description

  const attributes = lang === 'en' ? clipPage.en : clipPage.zh
  const clip_page = lang === 'en' ? clipPage.en : clipPage.zh

  const [show, setShow] = useState(false)

  return (
    <Box p={3} mt={3} borderRadius='10px' background='gray.700'>
      <Collapse in={show} startingHeight='76px'>
        <HStack>
          <Heading size='md' color='gray.500'>{clip_page.about}</Heading>
          {!show && <Button
            size='xl'
            variant='ghost'
            _hover={{ backgrouond: ''}}
            onClick={() => setShow(!show)}
          >
            ...more
          </Button>}
        </HStack>
        <Text p='8px 4px 0px'>{about_content}</Text>
        <Box pt={2}>
          <ClipAttrDefinition term={attributes.creator}>
            {clip.creator.name}
          </ClipAttrDefinition>
          <ClipAttrDefinition term={attributes.release_year}>
            {clip.release_year}
          </ClipAttrDefinition>
          <ClipAttrDefinition term={attributes.genre}>
            {clip.genre.title}
          </ClipAttrDefinition>
          <ClipAttrDefinition term={attributes.original}>
            <Link
              href={clip.website}
              isExternal
              fontStyle='italic'
              _hover={{color: 'yellow.200'}}
            >
              {original}
            </Link>
          </ClipAttrDefinition>
        </Box>
      </Collapse>
      {show && <Button 
        size='sm' 
        px='3px' 
        variant='ghost' 
        _hover={{ backgrouond: ''}} 
        onClick={() => setShow(!show)}
      >
        show lesss
      </Button>}
    </Box>
  )
}

export default ClipAttributes