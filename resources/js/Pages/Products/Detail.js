import { Container, Box, Button, Grid, GridItem, Text, Flex, useToast } from '@chakra-ui/react'
import { useForm } from '@inertiajs/inertia-react'
import Navbar from '../../libs/components/Navbar'
import AuthProfile from '../../libs/components/AuthProfile'
import AppLayout from '../../libs/components/AppLayout'
import Counter from '../../libs/components/Counter'
import { AlertLayout } from '../../libs/components/Alerts'

export default ({ appName, csrf, product }) => {

  const toast = useToast()

  const { post, setData } = useForm({
    count: '1',
    _token: csrf
  })

  const addHandle = () => {
    post(product.cart.addUrl, {
      onSuccess: () => {
        toast({
          position: 'bottom-right',
          containerStyle: {
            minWidth: '400px'
          },
          render: () => (
            <AlertLayout 
              type={'success'} 
              message={'Product added to cart successfully'} 
              onClose={() => toast.closeAll()} />
          ),
        })
      }
    })
  }

  return (
    <AppLayout>
      <Navbar
        appName={appName}
        end={<AuthProfile />}
      />

      <Container maxW='6xl' my={4}>
        <Grid
          templateAreas={`"left rigth"`}
          gridTemplateRows={'1fr'}
          gridTemplateColumns={'60% 1fr'}
          gap={4}
          mb={4}
        >
          <GridItem area={'left'}>
            <Box minH={'400px'} bg={'gray.100'}>
              img
            </Box>
          </GridItem>

          <GridItem area={'rigth'}>
            <Box
              key={product.id}
              borderColor={'gray.200'}
              borderWidth={1}
              borderStyle={'solid'}
              borderRadius={8}
              p={4}
            >
              <Text fontSize={'2xl'} mb={4}>{product.title}</Text>
              <Text fontSize={'sm'} color={'gray.500'}>price</Text>
              <Text fontSize={'3xl'} mb={4}>${product.price}</Text>
              <Text fontSize={'initial'} color={'gray.500'}>Stock: -</Text>

              <Flex>
                <Counter mr={2} maxW={'150px'} onChange={v => setData('count', v)} />
                <Button
                  flex={{base: 1}}
                  colorScheme={'blue'}
                  onClick={() => addHandle()}
                >
                  Add To Cart
                </Button>
              </Flex>
            </Box>
          </GridItem>
        </Grid>
        <Grid
          templateAreas={`"left rigth"`}
          gridTemplateRows={'1fr'}
          gridTemplateColumns={'60% 1fr'}
          gap={4}
        >
          <Box area={'left'}>
            <Text fontSize={'sm'} color={'gray.500'}>Description</Text>
            <Text>{product.description}</Text>
          </Box>
        </Grid>
      </Container>
    </AppLayout>
  )
}