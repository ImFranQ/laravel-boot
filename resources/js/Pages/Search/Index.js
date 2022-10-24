import { Container, SimpleGrid } from "@chakra-ui/react"
import AppTemplate from "../../libs/components/AppTemplate"
import ProductPreview from "../../libs/components/ProductPreview"

export default ({ products, appName }) => {
  return (
    <AppTemplate>
      <Container maxW='7xl' p={4} >
        <SimpleGrid columns={5} gap={4}>
          {products?.data.map(product => (
            <ProductPreview
              key={product.id}
              product={product}
            />
          ))}
        </SimpleGrid>
      </Container>
    </AppTemplate>
  )
}