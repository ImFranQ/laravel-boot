import { Text, Container, Box, SimpleGrid } from '@chakra-ui/react'
import Navbar from '../libs/components/Navbar'
import { Link } from '@inertiajs/inertia-react'
import AuthProfile from '../libs/components/AuthProfile'

export default ({ appName, products }) => {
  return (
    <>
      <Navbar
        appName={appName}
        end={<AuthProfile />}
      />

      <Container maxW='6xl' my={4}>
        <SimpleGrid columns={3} gap={4}>
          {products?.data.map(product => (
            <Box
              key={product.id}
              bg={'gray.50'}
              borderColor={'gray.200'}
              borderWidth={1}
              borderStyle={'solid'}
              borderRadius={8}
              p={4}
            >
              <Text as={Link} fontSize='xl' href={product.detailUrl}>
                {product.title}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </>
  )
}