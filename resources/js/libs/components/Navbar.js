import { Box, Flex, Text } from "@chakra-ui/react"
import { Link } from '@inertiajs/inertia-react'

export default ({ appName, center, end }) => {
  
  return (
    <Flex alignItems={'center'} justifyContent={'space-between'} w={'100%'}>
      <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
        <Text fontFamily={'heading'} as={Link} href={'/'}>
          {appName ?? ''}
        </Text>
      </Flex>

      {center && <Box>{center}</Box>}
      {end && <Box>{end}</Box>}
    </Flex>
  )
}