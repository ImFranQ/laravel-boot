import { Text, Container, Flex } from '@chakra-ui/react'
import FrameBoard from '../../libs/components/FrameBoard'
import Form from './Form'

export default ({ product }) => {

  return (
    <FrameBoard>
      <Container maxW='7xl' p={4} >
        <Flex
          pb={2} mb={4}
          borderBottomWidth={'1px'}
          borderBottomColor={'gray.200'}
          justifyContent={'space-between'}
        >
          <Text fontSize='xl'>Product detail</Text>
        </Flex>

        <Form
          readOnly
          data={product}
        />

      </Container>
    </FrameBoard>
  )
}