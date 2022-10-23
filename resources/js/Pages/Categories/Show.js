import { Text, Container, Flex } from '@chakra-ui/react'
import FrameBoard from '../../libs/components/FrameBoard'
import Form from './Form'

export default ({ category }) => {

  return (
    <FrameBoard
      pageTitle={'Category details'}
    >
      <Form
        readOnly
        data={category}
      />
    </FrameBoard>
  )
}