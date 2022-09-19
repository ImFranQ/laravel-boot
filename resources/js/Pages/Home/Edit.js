import { Container } from "@chakra-ui/react"
import CarouselList from "../../libs/components/CarouselList"
import FrameBoard from "../../libs/components/FrameBoard"

export default () => {
  return (
    <FrameBoard>
      <Container maxW={'6xl'} p={4}>
        <CarouselList mb={4}/>
      </Container>
    </FrameBoard>
  )
}