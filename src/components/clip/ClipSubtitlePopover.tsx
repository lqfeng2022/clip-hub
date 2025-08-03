import Expression from '@/entities/Expression'
import { Popover, PopoverTrigger, Text, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, Box, Image, Stack } from '@chakra-ui/react'
import noImage from '@/assets/no-image.jpg'
import { Link } from 'react-router-dom'

interface Props {
  part: string,
  expression: Expression
}
const ClipSubtitlePopover = ({ part, expression }: Props) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Text
          as='strong'
          color='yellow.200'
          _hover={{ color: 'yellow.400'}}
          fontSize='xl'
          cursor='pointer'
        >
          {part}
        </Text>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <Text fontWeight='bold' fontSize='xl'>
            {expression.title}
          </Text>
        </PopoverHeader>
        <PopoverBody>
          <Stack mt='5px' mb='10px'>
            <Link to={'/expressions/' + expression.slug}>
              <Image
                w='100%'
                maxH='200px'
                objectFit='cover'
                className='img-hover'
                src={expression.image || noImage}
              />
            </Link>
            <Text fontSize='sm'>
              {expression.explain}
            </Text>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default ClipSubtitlePopover