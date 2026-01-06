import { CollectionForm, collectionSchema } from '@/validation/CollectionSchema'
import { Button, FormControl, FormErrorMessage, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

interface Props {
  isOpen: boolean
  onClose: () => void
  onCreate: (title: string) => void
}
const CollectionAddModal = ({ isOpen, onClose, onCreate }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<CollectionForm>({
    resolver: zodResolver(collectionSchema),
    mode: 'onChange', // validate on change for live feedback
  })

  const submitHandler = (data: CollectionForm) => {
    onCreate(data.title)
    reset()
    onClose()
  }

  return (
    <Modal size='xs' isOpen={isOpen} onClose={() => { reset(); onClose() }}>
      <ModalOverlay />
      <ModalContent as='form' onSubmit={handleSubmit(submitHandler)}>
        <ModalHeader fontSize='lg'>
          Create a new list
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Input
              placeholder='Enter list name'
              {...register('title')}
            />
            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter gap={3}>
          <Button
            type='submit'
            size='sm'
            colorScheme='green'
            isDisabled={!isValid}
          >
            Create
          </Button>
          <Button 
            size='sm' 
            variant='ghost' 
            onClick={() => { reset(); onClose() }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CollectionAddModal