import Collection from '@/entities/Collection'
import { Card, CardBody, HStack, useDisclosure } from '@chakra-ui/react'
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
          <CollectionCardTitle list={list}/>
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