import { Avatar, Box, Center, Container, SimpleGrid, Text } from '@chakra-ui/react'
import ProductPreview from '../libs/components/ProductPreview'
import { Carousel } from '../libs/components/Carousel'
import PageHeader from '../libs/components/PageHeader'
import { Link } from '@inertiajs/inertia-react'
import { DecoratedTitle } from '../libs/components/helpers'
import AppTemplate from '../libs/components/AppTemplate'

export default ({ appName, products, categories }) => {
  return (
    <AppTemplate>
      <PageHeader />

      <Container maxW='7xl' my={4}>
        <Carousel />
        <Box my={16}>
          <DecoratedTitle mb={8}>Categories</DecoratedTitle>

          <SimpleGrid columns={6} gap={8}>
            {categories.map((category, index) => (
              <Link href='#'>
                <Center mb={4}>
                  <Avatar name={category.title} size='xl'></Avatar>
                </Center>
                <Text 
                  textAlign={'center'} 
                  fontSize={'lg'} 
                  textTransform={'uppercase'}
                  color={'gray.500'}
                >
                  {category.title}
                </Text>
              </Link>
            ))}
          </SimpleGrid>
        </Box>
        
        <Box my={16}>
          <DecoratedTitle mb={8}>Recent Products</DecoratedTitle>
          <SimpleGrid columns={5} gap={4}>
            {products?.data.map(product => (
              <ProductPreview key={product.id} product={product} />
            ))}
          </SimpleGrid>
        </Box>
      </Container>
    </AppTemplate>
  )
}