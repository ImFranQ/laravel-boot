import { Text, Container } from '@chakra-ui/react'

export default () => {
  return (
    <Container 
      maxW='6xl' 
      bg={'gray.50'} 
      borderColor={'gray.200'} 
      borderWidth={1} 
      borderStyle={'solid'} 
      p={4} 
      my={4} 
      borderRadius={8}
    >
      <Text fontSize='xl'>Application Works!</Text>
    </Container>
  )
}