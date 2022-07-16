import { Text, Container, Box } from '@chakra-ui/react'
import FrameBoard from '../libs/components/FrameBoard'

export default () => {
  return (
    <FrameBoard>
      <Container maxW='6xl' p={4} >
        <Box pb={2} mb={2} borderBottomWidth={'1px'} borderBottomColor={'gray.200'} >
          <Text fontSize='xl'>Home</Text>
        </Box>
        <Text>Home Content</Text>
      </Container>
    </FrameBoard>
  )
}