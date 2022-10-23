import { Text, Container, Flex } from '@chakra-ui/react'
import { useForm } from '@inertiajs/inertia-react'
import FrameBoard from '../../libs/components/FrameBoard'
import Form from './Form'

export default ({ csrf, updateUrl, user }) => {

  const { data, setData, patch, processing, errors, clearErrors } = useForm({
    name: user.name,
    email: user.email,
    password: '',
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
      pageTitle={'Edit user'}
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