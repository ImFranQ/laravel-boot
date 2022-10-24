import { Text, Container, Box, Grid, GridItem, Divider, Flex } from '@chakra-ui/react'
import Navbar from '../../libs/components/Navbar'
import AuthProfile from '../../libs/components/AuthProfile'
import AppLayout from '../../libs/components/AppLayout'
import CustomerForm from '../../libs/components/CustomerForm'
import CartItem from '../../libs/components/CartItem'

export default ({ appName, csrf, cart }) => {

  return (
    <AppLayout>
      <Navbar
        appName={appName}
        end={<AuthProfile />}
      />

      <Container maxW='7xl' my={4}>
        <Grid
          templateAreas={`"left rigth"`}
          gridTemplateRows={'1fr'}
          gridTemplateColumns={'60% 1fr'}
          gap={4}
        >
          <GridItem area={'left'}>
            <Box
              borderWidth={'1px'}
              p={4} borderRadius={8}
              shadow={'md'}
              mb={4}
            >
              {cart?.products?.map(product => (
                <CartItem product={product} key={product.id} />
              ))}
            </Box>
            
            <Box
              borderWidth={'1px'}
              p={4} borderRadius={8}
              shadow={'md'}
            >
              <Text fontSize={'xl'}>Cart Totals</Text>
              <Divider my={4} />
              <Flex justify={'space-between'} mb={2}>
                <Text fontSize={'md'}>Subtotal</Text>
                <Text fontSize={'md'}>${cart.total}</Text>
              </Flex>
              <Flex justify={'space-between'} mb={2}>
                <Text fontSize={'md'}>Tax</Text>
                <Text fontSize={'md'}>${cart.tax}</Text>
              </Flex>
              <Flex justify={'space-between'}>
                <Text fontSize={'md'}>Coupon</Text>
                <Text fontSize={'md'}>$0</Text>
              </Flex>
              <Divider my={4} />
              <Flex justify={'space-between'}>
                <Text fontSize={'md'} fontWeight={'bold'}>Total</Text>
                <Text fontSize={'md'} fontWeight={'bold'}>${cart.total}</Text>
              </Flex>
            </Box>
          </GridItem>

          <GridItem area={'rigth'}>
            <Box
              borderWidth={'1px'}
              p={4} borderRadius={8}
              shadow={'md'}
            >
              <Flex justify={'space-between'}>
                <Text fontSize={'md'} fontWeight={'bold'}>Total</Text>
                <Text fontSize={'md'} fontWeight={'bold'}>${cart.total}</Text>
              </Flex> 
              <Divider my={4} />
              
              <CustomerForm />
            </Box>
          </GridItem>
        </Grid>


      </Container>
    </AppLayout>
  )
}