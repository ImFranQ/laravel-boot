import { Text, Container, Flex } from '@chakra-ui/react'
import { useForm } from '@inertiajs/inertia-react'
import FrameBoard from '../../libs/components/FrameBoard'
import Form from './Form'

export default ({ csrf, updateUrl, product }) => {

  const { data, setData, patch, processing, errors, clearErrors } = useForm({
    title: product.title,
    description: product.description,
    price: product.price,
    parent_id: product.parent_id,
    category_id: product.category_id,
    _token: csrf
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    patch(updateUrl)
  }

  const handleInput = (name, value) => {
    clearErrors(name)
    setData(name, value)
  }

  return (
    <FrameBoard>
      <Container maxW='6xl' p={4} >
        <Flex
          pb={2} mb={4}
          borderBottomWidth={'1px'}
          borderBottomColor={'gray.200'}
          justifyContent={'space-between'}
        >
          <Text fontSize='xl'>Update product</Text>
        </Flex>

        <Form
          onSubmit={handleSubmit}
          onChangeInput={handleInput}
          processing={processing}
          errors={errors}
          data={data}
        />

      </Container>
    </FrameBoard>
  )
}