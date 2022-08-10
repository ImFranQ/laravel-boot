import {
  Text, Container, Box, Grid, GridItem, Divider, Flex, Button, 
  Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Radio 
} from '@chakra-ui/react'
import Navbar from '../../libs/components/Navbar'
import AuthProfile from '../../libs/components/AuthProfile'
import AppLayout from '../../libs/components/AppLayout'
import CartItem from '../../libs/components/CartItem'
import { useState } from 'react'

export default ({ appName, csrf, cart }) => {

  const [accordionIndex, setAccordionIndex] = useState(0)

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
        >
          <GridItem area={'left'}>
            <Box
              borderWidth={'1px'}
              p={4} borderRadius={8}
              shadow={'md'}
              mb={4}
            >
              {cart?.products?.map(product => (
                <CartItem product={product} key={product.id} readOnly />
              ))}
            </Box>

            <Box
              borderWidth={'1px'}
              p={4} borderRadius={8}
              shadow={'md'}
            >
              <Text fontSize={'xl'}>Totals</Text>
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
              
              <Text fontSize={'xl'}>Payment methods</Text>
              <Divider my={4} />
              
              <Accordion defaultIndex={[accordionIndex]}>
                <AccordionItem>
                  <AccordionButton _expanded={{ bg: 'blue.500', color: 'white' }}>
                    <Box flex={1} textAlign={'left'}>
                      <Text>Bank Transfer</Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>
                    <Button
                      type='submit'
                      w={'100%'}
                      colorScheme={'blue'}
                      mt={4}
                    >
                      Continue
                    </Button>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

            </Box>
          </GridItem>
        </Grid>


      </Container>
    </AppLayout>
  )
}