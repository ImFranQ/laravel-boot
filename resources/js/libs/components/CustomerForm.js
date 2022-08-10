import { Text, Button, FormControl, InputGroup, InputLeftElement, Input, chakra, FormErrorMessage, Spinner, Flex } from '@chakra-ui/react'
import { useForm, usePage } from '@inertiajs/inertia-react'
import { FaEnvelope, FaUser, FaPhone } from "react-icons/fa";

const EnvelopeIcon = chakra(FaEnvelope);
const UserIcon = chakra(FaUser);
const PhoneIcon = chakra(FaPhone);

export default () => {

  const { csrf, paymentUrl } = usePage().props

  const { data, setData, post, processing, errors, clearErrors } = useForm({
    name: '',
    surname: '',
    email: '',
    phone: '',
    _token: csrf
  })

  // console.log(paymentUrl);

  const handleInput = (name, value) => {
    clearErrors(name)
    setData(name, value)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    post(paymentUrl)
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <Text fontSize={'xl'} mb={4}>Customer Detail</Text>

        <FormControl isInvalid={errors.name} mb={4}>
          <InputGroup>
            <InputLeftElement
              pointerEvents={'none'}
              children={<UserIcon color={'gray.300'} />}
            />
            <Input
              name="name"
              placeholder="Name"
              errorBorderColor='red.300'
              value={data.name}
              onChange={(e) => handleInput('name', e.target.value)}
            />
          </InputGroup>
          <FormErrorMessage>
            {errors.name}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.name} mb={4}>
          <InputGroup>
            <InputLeftElement
              pointerEvents={'none'}
              children={<UserIcon color={'gray.300'} />}
            />
            <Input
              name="surname"
              placeholder="Surname"
              errorBorderColor='red.300'
              value={data.surname}
              onChange={(e) => handleInput('surname', e.target.value)}
            />
          </InputGroup>
          <FormErrorMessage>
            {errors.surname}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.email} mb={4}>
          <InputGroup>
            <InputLeftElement
              pointerEvents={'none'}
              children={<EnvelopeIcon color={'gray.300'} />}
            />
            <Input
              name="email"
              placeholder="Email"
              errorBorderColor='red.300'
              value={data.email}
              onChange={(e) => handleInput('email', e.target.value)}
            />
          </InputGroup>
          <FormErrorMessage>
            {errors.email}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.phone}>
          <InputGroup>
            <InputLeftElement
              pointerEvents={'none'}
              children={<PhoneIcon color={'gray.300'} />}
            />
            <Input
              name="phone"
              placeholder="Phone"
              errorBorderColor='red.300'
              value={data.phone}
              onChange={(e) => handleInput('phone', e.target.value)}
            />
          </InputGroup>
          <FormErrorMessage>
            {errors.phone}
          </FormErrorMessage>
        </FormControl>

        {!processing && (
          <Button
            type='submit'
            w={'100%'}
            colorScheme={'blue'}
            mt={4}
          >
            Proceed to Checkout
          </Button>
        )}
        <Flex
          flexDirection="column"
          alignItems="center"
        >
          {processing && <Spinner mt={4} color={'blue.500'} />}
        </Flex>
      </form>
    </>
  )
}