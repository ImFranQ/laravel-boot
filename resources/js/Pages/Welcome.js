import { Box, Container, Flex, List, SimpleGrid, Text  } from '@chakra-ui/react'
import Navbar from '../libs/components/Navbar'
import AuthProfile from '../libs/components/AuthProfile'
import ProductPreview from '../libs/components/ProductPreview'
import { Carousel } from '../libs/components/Carousel'
import ListItem from '../libs/components/ListItem'

export default ({ appName, products, categories }) => {
  return (
    <>
      <Navbar
        appName={appName}
        end={<AuthProfile />}
      />

      <Container maxW='6xl' my={4}>
        <Flex gap={4} mb={4}>
          <Box w={'750px'} minW={'750px'}>
            <Carousel />
          </Box>
          <Box flex={{ base: 1 }}>
            <List borderWidth={1} borderRadius={8}>
              {categories.map((category, index) => (
                <ListItem 
                  key={index}
                  title={category.title}
                />
              ))}
            </List>
          </Box>
        </Flex>
        <SimpleGrid columns={5} gap={4}>
          {products?.data.map(product => (
            <ProductPreview key={product.id} product={product} />
          ))}
        </SimpleGrid>
      </Container>
    </>
  )
}