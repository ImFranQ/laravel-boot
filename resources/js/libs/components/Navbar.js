import { Box, Button, chakra, Container, Flex, Text } from "@chakra-ui/react"
import { Link, usePage } from '@inertiajs/inertia-react'
import SearchInput from "./SearchInput"
import { MdOutlineShoppingCart } from 'react-icons/md'

const CartIcon = chakra(MdOutlineShoppingCart)

export default ({ appName, end }) => {
  const { cartUrl } = usePage().props
  
  return (
    <Box
      minH={'60px'}
      py={{ base: 2 }}
      px={{ base: 4 }}
      borderBottomWidth={1}
      bg={'white'}
      align={'center'}
    >
      <Container maxW={'6xl'}>
        <Flex alignItems={'center'}>
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
            <Text fontFamily={'heading'} as={Link} href={'/'}>
              {appName ?? ''}
            </Text>
          </Flex>

          <Box mr={4}>
            <SearchInput />
          </Box>
          <Box mr={4}>
            <Button as={Link} display={'flex'} justifyContent={'center'} type="submit" variant={'unstyled'} href={cartUrl} >
              <CartIcon color={'gray.500'} fontSize={'24px'} />
            </Button>
          </Box>

          { end ? end : null }
        </Flex>
      </Container>
    </Box>
  )
}