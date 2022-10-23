import { Text, Container, Flex } from '@chakra-ui/react'
import FrameBoard from '../../libs/components/FrameBoard'
import Form from './Form'

export default ({ customer }) => {

  return (
    <FrameBoard
      pageTitle={'Customer details'}
    >
      <Form
        readOnly
        data={customer}
      />
    </FrameBoard>
  )
}