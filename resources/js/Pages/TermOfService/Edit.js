import { Container } from "@chakra-ui/react"
import FrameBoard from "../../libs/components/FrameBoard"
import TermOfServiceForm from "../../libs/components/TermOfServiceForm"

export default () => {
  return (
    <FrameBoard>
      <Container maxW={'6xl'} p={4}>
        <TermOfServiceForm />
      </Container>
    </FrameBoard>
  )
}