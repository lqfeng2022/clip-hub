import noImage from '@/assets/no-image.jpg'
import InteractIcons from '@/components/expression/InteractIcons'
import Expression from '@/entities/Expression'
import useExpressionInteract from '@/hooks/interact/useExpressionInteract'
import ExpressionAttributes from '@/components/expression/ExpressionAttributes'
import { Box, Center, GridItem, Heading, Image, Show, SimpleGrid } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import ClipExpression from '../ClipExpression'
import { pocketURL } from '@/services/pocket'
import useExpressionViews from '@/hooks/interact/useExpressionViews'
import useLanguageStore from '@/languageStore'
import { expressionPage } from '@/data/expressionPage'
import ChatBox from './ChatBox'
import ExpressionHeader from './ExpressionHeader'

interface Props {
  exp: Expression,
  clipexp: Expression[]
}
const ExpressionDetailContent = ({ exp, clipexp }: Props) => {
  const [chatOpen, setChatOpen] = useState(false)

  const { refetch } = useExpressionViews()
  const { mutate } = useExpressionInteract(exp.id, 'views')

  const lang = useLanguageStore(s => s.language)
  const others = lang === 'en' 
    ? expressionPage.en.others : expressionPage.zh.others
  
  useEffect(() => { 
    mutate({ visible: true }, { onSuccess: () => refetch()}) 
  }, [mutate])

  return (
    <SimpleGrid
      p='15px 10px'
      columns={{ base: 1, lg: 2 }}
      spacing={5}
    >
      {/* 2. Expression details and recommendation */}
      <GridItem order={{ base: 2, lg: 1 }}>
        {/* 2.1 Expression title */}
        <Show above='md'><ExpressionHeader expression={exp}/></Show>
        {/* 2.2 Expression attributes(explain/langtas/words/clip) */}
        <ExpressionAttributes expression={exp}/>
        {/* 2.3 Expression recommendation */}
        <Box pt={5}>
          <Heading size='md' pb={1} color='gray'>
            {others}
          </Heading>
          <ClipExpression data={clipexp}/>
        </Box>
      </GridItem>
      {/* 1. Expression image & interactions, chatbox */}
      <GridItem order={{ base: 1, lg: 2 }}>
        {/* 1.1 image & interactions */}
        <Show below='md'><ExpressionHeader expression={exp}/></Show>
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
        {/* 1.2 Chat box display on above='md' */}
        <ChatBox 
          expression={exp}
          extend={chatOpen} 
          setExtend={() => setChatOpen(!chatOpen)}
        />
      </GridItem>
    </SimpleGrid>
  )
}

export default ExpressionDetailContent