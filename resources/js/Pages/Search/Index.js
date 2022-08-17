import { Container, SimpleGrid } from "@chakra-ui/react"
import AuthProfile from "../../libs/components/AuthProfile"
import Navbar from "../../libs/components/Navbar"
import ProductPreview from "../../libs/components/ProductPreview"

export default ({ products, appName }) => {
  return (
    <>
      <Navbar
        appName={appName}
        end={<AuthProfile />}
      />

      <Container maxW='6xl' p={4} >
        <SimpleGrid columns={5} gap={4}>
          {products?.data.map(product => (
            <ProductPreview
              key={product.id}
              product={product}
            />
          ))}
        </SimpleGrid>
      </Container>
    </>
  )
}