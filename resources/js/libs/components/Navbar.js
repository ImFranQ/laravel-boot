import { Box, Button, chakra, Container, Flex, Text } from "@chakra-ui/react"
import { Link, usePage } from '@inertiajs/inertia-react'
import SearchInput from "./SearchInput"
import { MdOutlineShoppingCart } from 'react-icons/md'

const CartIcon = chakra(MdOutlineShoppingCart)

export default ({ appName, center, end }) => {
  const { cartUrl } = usePage().props
  
  return (
    <Flex alignItems={'center'} justifyContent={'space-between'} w={'100%'}>
      <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
        <Text fontFamily={'heading'} as={Link} href={'/'}>
          {appName ?? ''}
        </Text>
      </Flex>

      {/* <Box mr={4}>
        <SearchInput />
      </Box>
      <Box mr={4}>
        <Button as={Link} display={'flex'} justifyContent={'center'} type="submit" variant={'unstyled'} href={cartUrl} >
          <CartIcon color={'gray.500'} fontSize={'24px'} />
        </Button>
      </Box> */}
      {center && <Box>{center}</Box>}
      {end && <Box>{end}</Box>}
    </Flex>
  )
}