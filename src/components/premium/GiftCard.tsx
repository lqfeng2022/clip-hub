import { Box, Button, Card, HStack, Icon, Input, InputGroup, InputLeftElement, Image, useToast, Text } from '@chakra-ui/react'
import { CiBarcode } from 'react-icons/ci'
import clip_studio from '@/assets/clip-studio.jpg'
import useVoucherPost from '@/hooks/billing/useVoucherPost'
import { zodResolver } from '@hookform/resolvers/zod'
import { VoucherForm, voucherSchema } from '@/validation/voucherSchema'
import { useForm } from 'react-hook-form'

const GiftCard = () => {
  const toast = useToast()
  const { mutate: redeem, isLoading } = useVoucherPost()

  const { register, handleSubmit, formState: { errors }, reset } = useForm<VoucherForm>({
    resolver: zodResolver(voucherSchema),
    defaultValues: { code: '' }
  })

  const onSubmit = ({ code }: VoucherForm) => {
    redeem({ code }, { onSuccess: () => {
      toast({
        title: 'Gift card redeemed.',
        description: "We've put the credits to your account",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      reset()
    }})
  }

  return (
    <Card
      mx={4} mt={8}
      maxW='400px'
      direction='column'
      overflow='hidden'
      variant='outline'
      borderRadius='15px'
    >
      {/* cover */}
      <Box position='relative' h='180px' overflow='hidden'>
        <Image objectFit='cover' src={clip_studio} opacity={0.8}/>
        <Box 
          position='absolute'
          top={0}
          right={3}
          fontWeight='bold'
          fontSize='2.5em'
          color='green.700'
        >
          gift card
        </Box>
      </Box>
      {/* form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <HStack p={4} spacing={3}>
          <InputGroup>
            <InputLeftElement pointerEvents='none' h='100%' pr={2}>
              <Icon as={CiBarcode} boxSize={6} color='gray.200'/>
            </InputLeftElement>
            <Input 
              {...register('code')}
              variant='filled'
              width='280px' 
              focusBorderColor='yellow.500'
              size='sm'
              placeholder='input gift card code..'
              _placeholder={{ opacity: 0.6, color: 'inherit' }}
              isInvalid={!!errors.code}
            />
          </InputGroup>
          <Button
            type='submit'
            size='sm'
            variant='solid'
            borderRadius='full'
            px='20px'
            bg='gray.700'
            _hover={{bg: 'yellow.500'}}
            isLoading={isLoading}
            isDisabled={isLoading}
          >
            Redeem
          </Button>
        </HStack>
        {/* error */}
        {errors.code && (
          <Text px={4} pb={3} fontSize='sm' color='red.400'>
            {errors.code.message}
          </Text>
        )}
      </form>
    </Card>
  )
}

export default GiftCard