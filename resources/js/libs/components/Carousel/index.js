import { Box, Button, Flex, Img, Text } from "@chakra-ui/react"
import { Link, usePage } from "@inertiajs/inertia-react"
import { useEffect, useState } from "react"

export const Carousel = ({...others}) => {

  const [active, setActive] = useState(0)
  const {carousel} = usePage().props

  useEffect(() => {
    let nextActive
    const interval = setInterval(() => {
      nextActive = active + 1
      if (nextActive >= carousel.length) nextActive = 0
      if (nextActive < 0) nextActive = carousel.length - 1
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
        {
          carousel.map((item, index) => (
            <CarouselItem
              key={index}
              pos={index - active}
              title={item.title}
              description={item.description}
              btnText={item.link_text}
              btnLink={item.link}
              src={item.files[0].path}
            ></CarouselItem>
          ))
        }
      </Box>
    </Box>
  )
}

export const CarouselItem = ({ pos, active, src, title, description, btnText, btnLink, ...others}) => {
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
        alt={title}
        w={'100%'}
      />
      <Flex
        position={'absolute'} top={0}
        w={'100%'} h={'100%'}
        alignItems={'center'}
        p={16}
      >
        <Box w={'50%'}>
          <Text fontSize={'5xl'} color={'white'}>{title}</Text>
          <Text fontSize={'3xl'} color={'white'}>{description}</Text>
          {btnText && <Button as={Link} href={btnLink} mt={4}>{btnText}</Button>}
        </Box>
      </Flex>
    </Flex>
  )
}