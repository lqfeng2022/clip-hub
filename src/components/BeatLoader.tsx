import { Box, HStack } from '@chakra-ui/react'

const BeatLoader = () => {
  const dots = [0, 1, 2]

  return (
    <HStack spacing={2} p='20px'>
      {dots.map((i) => (
        <Box
          key={i}
          w={2}
          h={2}
          borderRadius='full'
          bg='gray.400'
          animation={`beat 1s ease-in-out ${i * 0.2}s infinite`}
        />
      ))}
      <style>
        {`
          @keyframes beat {
            0%, 80%, 100% {
              transform: scale(0.8);
              opacity: 0.6;
            }
            40% {
              transform: scale(1.2);
              opacity: 1;
            }
          }
        `}
      </style>
    </HStack>
  )
}

export default BeatLoader