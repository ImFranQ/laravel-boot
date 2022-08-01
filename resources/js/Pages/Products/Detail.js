import { Container, Box, Button } from '@chakra-ui/react'
import { useForm } from '@inertiajs/inertia-react'
import Navbar from '../../libs/components/Navbar'
import AuthProfile from '../../libs/components/AuthProfile'
import AppLayout from '../../libs/components/AppLayout'

export default ({ appName, csrf, product }) => {

  const { post } = useForm({
    count: '1',
    _token: csrf
  })
  
  return (
    <AppLayout>
      <Navbar
        appName={appName}
        end={<AuthProfile />}
      />

      <Container maxW='6xl' my={4}>
        <Box
          key={product.id}
          bg={'gray.50'}
          borderColor={'gray.200'}
          borderWidth={1}
          borderStyle={'solid'}
          borderRadius={8}
          p={4}
        >
          <Box mb={4}>
            {product.title}
          </Box>

          <Button 
            colorScheme={'blue'}
            onClick={() => post(product.cart.addUrl)}
          >
            Add To Cart
          </Button>
        </Box>
      </Container>
    </AppLayout>
  )
}