import { Box, Flex, Text } from "@chakra-ui/react"
import { Link } from '@inertiajs/inertia-react'

export default ({ appName, end }) => {

  return (
    <Box>
      <Flex
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={'gray.300'}
        align={'center'}
      >
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text fontFamily={'heading'} as={Link} href={'/'}>
            {appName ?? ''}
          </Text>
        </Flex>

        { end ? end : null }
      </Flex>
    </Box>
  )
}