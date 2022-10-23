import { Text, Container, Flex } from '@chakra-ui/react'
import FrameBoard from '../../libs/components/FrameBoard'
import Form from './Form'

export default ({ user }) => {

  return (
    <FrameBoard
      pageTitle={'User details'}
    >
      <Form
        data={user}
        readOnly
      />
    </FrameBoard>
  )
}