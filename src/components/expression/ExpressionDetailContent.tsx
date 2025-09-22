import noImage from '@/assets/no-image.jpg'
import InteractIcons from '@/components/expression/InteractIcons'
import Expression from '@/entities/Expression'
import useExpressionInteract from '@/hooks/interact/useExpressionInteract'
import ExpressionAttributes from '@/pages/ExpressionAttributes'
import { Box, Center, GridItem, Heading, Image, SimpleGrid } from '@chakra-ui/react'
import { useEffect } from 'react'
import ClipExpression from '../ClipExpression'
import { pocketURL } from '@/services/pocket'
import useExpressionViews from '@/hooks/interact/useExpressionViews'
import useLanguageStore from '@/languageStore'

interface Props {
  exp: Expression,
  clipexp: Expression[]
}
const ExpressionDetailContent = ({ exp, clipexp }: Props) => {
  const { refetch } = useExpressionViews()
  const { mutate } = useExpressionInteract(exp.id, 'views')

  const lang = useLanguageStore(s => s.language)
  const others = lang === 'en' ? 'Other Expressions' : '其他的表达式'
  
  useEffect(() => { 
    mutate({ visible: true }, {
      onSuccess: () => refetch()
    }) 
  }, [mutate])

  return (
    <SimpleGrid
      p='15px 10px'
      columns={{ base: 1, lg: 2 }}
      spacing={5}
      >
        {/* 2. Clip details and recommendation */}
        <GridItem order={{ base: 2, lg: 1 }}>
          {/* 2.1 Clip details */}
          <Heading pb={5} fontSize='4xl' lineHeight={1}>
            {exp.title}
          </Heading>
          <ExpressionAttributes expression={exp}/>
          {/* 2.2 Recommend: using clip expressions temporarily */}
          <Box pt={4}>
            <Heading size='md' pb={1} color='gray'>
              {others}
            </Heading>
            <ClipExpression data={clipexp}/>
          </Box>
        </GridItem>
        {/* 1. Clip image and interactions */}
        <GridItem order={{ base: 1, lg: 2 }}>
          <Center>
            <Box>
              <Image
                w='100%'
                maxH='600px'
                borderRadius='md'
                src={`${pocketURL}${exp.image}` || noImage}
              />
              <InteractIcons expression={exp}/>
            </Box>
          </Center>
        </GridItem>
    </SimpleGrid>
  )
}

export default ExpressionDetailContent