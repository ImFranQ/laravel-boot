import { Text, Container, Box, Button } from '@chakra-ui/react'
import { Link, useForm } from '@inertiajs/inertia-react'
import Navbar from '../../libs/components/Navbar'
import AuthProfile from '../../libs/components/AuthProfile'
import AppLayout from '../../libs/components/AppLayout'

export default ({ appName, csrf, cart }) => {

  const { delete:destroy } = useForm({
    _token: csrf
  })

  return (
    <AppLayout>
      <Navbar
        appName={appName}
        end={<AuthProfile />}
      />

      <Container maxW='6xl' my={4}>
        {cart?.products?.map(product => (
          <Box
            key={product.id}
            bg={'gray.50'}
            borderColor={'gray.200'}
            borderWidth={1}
            borderStyle={'solid'}
            borderRadius={8}
            p={4}
            mb={4}
          >
            <Box mb={4}>{product.data.title} - {product.count} - {product.price}</Box>

            <Button
              colorScheme={'blue'}
              onClick={() => destroy(product.data.cart.destroyUrl)}
            >
              Remove 
            </Button>
          </Box>
        ))}

      </Container>
    </AppLayout>
  )
}