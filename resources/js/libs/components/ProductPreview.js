import { Box, Button, chakra, Divider, Flex, Img, Text } from "@chakra-ui/react"
import { MdOutlineAddShoppingCart } from 'react-icons/md'

const CartIcon = chakra(MdOutlineAddShoppingCart)

export default ({product}) => {
  return (
    <Flex
      borderColor={'gray.200'}
      borderWidth={1}
      borderStyle={'solid'}
      borderRadius={8}
      p={4}
      flexDir={'column'}
      bg={'white'}
    >
      <Flex
        maxH={'120px'}
        mb={2}
        justifyContent={'center'}
      >
        <Img
          src={product.files[0]?.path ?? 'https://m.media-amazon.com/images/I/61kAqcLvUIS._AC_UY218_.jpg'}
          maxW={'100%'}
          maxH={'100%'}
        />
      </Flex>
      <Divider my={2} />
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Button colorScheme={'primary'}>
          <CartIcon fontSize={'24px'} />
        </Button>
        <Box lineHeight={4} textAlign={'right'}>
          <Text
            color={'red.400'}
            textDecoration={'line-through'}
          >$100.99</Text>
          <Text 
            fontSize={'xl'} 
            fontWeight={'bold'}
          >${product.price}</Text>
        </Box>
      </Flex>
      {/*
      <Text as={Link} href={product.detailUrl} flex={{ base: 1 }}>
        {product.title}
      </Text> */}
    </Flex>
  )
}