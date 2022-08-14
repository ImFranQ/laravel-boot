import { Box, Container, SimpleGrid, Text } from "@chakra-ui/react"
import { Link } from '@inertiajs/inertia-react'
import AuthProfile from "../../libs/components/AuthProfile"
import Navbar from "../../libs/components/Navbar"

export default ({ products, appName }) => {
  return (
    <>
      <Navbar
        appName={appName}
        end={<AuthProfile />}
      />

      <Container maxW='6xl' p={4} >
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