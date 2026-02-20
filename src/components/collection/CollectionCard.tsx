import Collection from '@/entities/Collection'
import { Card, CardBody, HStack, useDisclosure, Text, Stack } from '@chakra-ui/react'
import CollectionCardCover from './CollectionCardCover'
import CollectionCardTitle from './CollectionCardTitle'
import CollectionCardModal from './CollectionCardModal'
import CollectionEditMenu from './CollectionEditMenu'

interface Props {
  list: Collection
  onUpdate: (title: string) => void
  onDelete: () => void
}
const CollectionCard = ({ list, onUpdate, onDelete }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Card 
      direction='row'
      // overflow='hidden' 
      variant='unstyled' 
      borderRadius={12}
    >
      <CollectionCardCover list={list}/>
      <CardBody pl='10px' pr='5px'>
        <HStack justifyContent='space-between' alignItems='flex-start'>
          <Stack>
            <CollectionCardTitle list={list}/>
            <Text fontSize='sm' color='yellow.200' opacity={0.8}>
              personal lists
            </Text>
          </Stack>
          <CollectionEditMenu onDelete={onDelete} onOpen={onOpen}/>
        </HStack>
        <CollectionCardModal 
          list={list} 
          isOpen={isOpen} 
          onClose={onClose} 
          onUpdate={onUpdate}
        />
      </CardBody>
    </Card>
  )
}

export default CollectionCard