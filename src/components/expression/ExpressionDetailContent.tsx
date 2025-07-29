import noImage from '@/assets/no-image.jpg'
import InteractIcons from '@/components/expression/InteractIcons'
import Expression from '@/entities/Expression'
import useExpressionInteract from '@/hooks/store/useExpressionInteract'
import ExpressionAttributes from '@/pages/ExpressionAttributes'
import { Box, Center, GridItem, Heading, Image, SimpleGrid } from '@chakra-ui/react'
import { useEffect } from 'react'
import ExpressionRecommend from '../ExpressionRecommend'

interface Props {
  exp: Expression,
  clipexp: Expression[]
}
const ExpressionDetailContent = ({ exp, clipexp }: Props) => {
  const { mutate } = useExpressionInteract(exp.id, 'views')
  useEffect(() => { mutate({ visible: true }) }, [mutate])

  return (
    <SimpleGrid
      p='15px 10px'
      columns={{ base: 1, lg: 2 }}
      spacing={5}
      >
        <GridItem order={{ base: 2, lg: 1 }}>
          <Heading pb={5} fontSize='5xl' lineHeight={1}>
            {exp.title}
          </Heading>
          <ExpressionAttributes expression={exp}/>
          <ExpressionRecommend
            data={clipexp} 
            ep={exp}
          />
        </GridItem>
        <GridItem order={{ base: 1, lg: 2 }}>
          <Center>
            <Box>
              <Image w='100%' maxH='600px' src={exp.image || noImage} />
              <InteractIcons expression={exp}/>
            </Box>
          </Center>
        </GridItem>
    </SimpleGrid>
  )
}

export default ExpressionDetailContent