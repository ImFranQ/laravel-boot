import { Text, Container, Flex } from '@chakra-ui/react'
import { useForm } from '@inertiajs/inertia-react'
import FrameBoard from '../../libs/components/FrameBoard'
import Form from './Form'

export default ({ csrf, updateUrl, customer }) => {

  const { data, setData, patch, processing, errors, clearErrors } = useForm({
    name: customer.name,
    surname: customer.surname,
    email: customer.email,
    phone: customer.phone ?? '',
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
          <Text fontSize='xl'>Update customer</Text>
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