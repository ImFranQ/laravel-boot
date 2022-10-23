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
    <FrameBoard
      pageTitle={'Edit customer'}
    >
      <Form
        onSubmit={handleSubmit}
        onChangeInput={handleInput}
        processing={processing}
        errors={errors}
        data={data}
      />
    </FrameBoard>
  )
}