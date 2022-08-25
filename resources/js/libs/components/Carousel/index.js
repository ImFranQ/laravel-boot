import { Box, Flex, Img } from "@chakra-ui/react"
import { useEffect, useState } from "react"

export const Carousel = ({...others}) => {

  const [active, setActive] = useState(0)

  useEffect(() => {
    let nextActive
    const interval = setInterval(() => {
      nextActive = active + 1
      if (nextActive >= [1, 2, 3].length) nextActive = 0
      if (nextActive < 0) nextActive = [1, 2, 3].length - 1
      setActive(nextActive)
    }, 1000 * 5)

    return () => {
      clearInterval(interval)
    }
  }, [active])
  
  return (
    <Box
      position={'relative'}
      height={'411px'}
      overflow={'hidden'}
      borderWidth={1}
      bg={'white'}
      {...others}
    >
      <Box position={'relative'} h={'100%'} >
        <CarouselItem {...{ pos: 0 - active }} src={'https://images-eu.ssl-images-amazon.com/images/G/31/img18/Wearables/Revamp_Dec26th_18/smartwatches_under1500_750x375._CB458301681_.jpg'}/>
        <CarouselItem {...{ pos: 1 - active }} src={'https://ae01.alicdn.com/kf/Saa025b9308bb4accb8febeabf68db55cn.jpg_640x640q90.jpg'}/>
        <CarouselItem {...{ pos: 2 - active }} src={'https://doto.vteximg.com.br/arquivos/img-contenido-smartwatch-garmin-venu-bateria-dotomexico.jpg'} />
      </Box>
    </Box>
  )
}

export const CarouselItem = ({ pos, active, src, ...others}) => {
  return (
    <Flex 
      position={'absolute'}
      transition={'all .3s'}
      transform={`translateX(${(100 * pos)}%)`}
      h={'100%'} w={'100%'}
      justifyContent={'center'}
      overflow={'hidden'}
      { ...others }
    >
      <Img
        src={src}
        h={'100%'}
        maxW={'initial'}
      />
    </Flex>
  )
}