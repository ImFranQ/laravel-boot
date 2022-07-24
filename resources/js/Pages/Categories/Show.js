import { Text, Container, Flex } from '@chakra-ui/react'
import FrameBoard from '../../libs/components/FrameBoard'
import Form from './Form'

export default ({ category }) => {

  return (
    <FrameBoard>
      <Container maxW='6xl' p={4} >
        <Flex
          pb={2} mb={4}
          borderBottomWidth={'1px'}
          borderBottomColor={'gray.200'}
          justifyContent={'space-between'}
        >
          <Text fontSize='xl'>Category detail</Text>
        </Flex>

        <Form
          readOnly
          data={category}
        />

      </Container>
    </FrameBoard>
  )
}