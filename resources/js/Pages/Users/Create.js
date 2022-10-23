import { Text, Container, Flex} from '@chakra-ui/react'
import { useForm } from '@inertiajs/inertia-react'
import FrameBoard from '../../libs/components/FrameBoard'
import Form from './Form'

export default ({ csrf, storeUrl }) => {

  const { data, setData, post, processing, errors, clearErrors } = useForm({
    name: '',
    email: '',
    password: '',
    _token: csrf
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post(storeUrl)
  }

  const handleInput = (name, value) => {
    clearErrors(name)
    setData(name, value)
  }

  return (
    <FrameBoard
      pageTitle={'Create new user'}
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