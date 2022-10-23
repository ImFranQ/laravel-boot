import CarouselList from "../../libs/components/CarouselList"
import FrameBoard from "../../libs/components/FrameBoard"

export default () => {
  return (
    <FrameBoard
      pageTitle={'Home Page'}
    >
      <CarouselList mb={4}/>
    </FrameBoard>
  )
}