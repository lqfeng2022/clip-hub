import { useRef, useState } from 'react'
import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import User from './entities/User'

const ProfileCover = ({ user }: { user: User }) => {
  const defaultImg = 'https://bit.ly/naruto-sage'
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleTriggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleClear = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleUpload = () => {
    if (!selectedFile) return

    const formData = new FormData()
    formData.append('back_image', selectedFile)

    // replace with your actual API call
    fetch('/interact/profiles/me/', {
      method: 'PUT',
      body: formData,
      credentials: 'include',
    }).then(() => {
      handleClear()
      // optionally refresh the profile or notify success
    })
  }

  const displayImg = previewUrl || user.back_image || defaultImg

  return (
    <Box mb={5}>
      <Heading fontSize='lg'>Back image</Heading>
      <Text py={2}>This image will appear across the top of your channel</Text>

      <SimpleGrid
        columns={{ sm: 1, lg: 2 }}
        templateColumns={{ lg: '1fr 200px' }}
        gap={4}
      >
        <Box height='160px' borderRadius={5} overflow='hidden' bg='gray.500'>
          <Image
            src={displayImg}
            objectFit='cover'
            width='100%'
            height='100%'
          />
        </Box>

        <HStack gap={3} alignSelf='flex-start' flexWrap='wrap'>
          <input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <Button size='sm' onClick={handleTriggerFileInput}>
            Change
          </Button>
          {selectedFile && (
            <>
              <Button
                size='sm'
                colorScheme='teal'
                onClick={handleUpload}
              >
                Save
              </Button>
              <Button size='sm' variant='outline' onClick={handleClear}>
                Cancel
              </Button>
            </>
          )}
        </HStack>
      </SimpleGrid>
    </Box>
  )
}

export default ProfileCover