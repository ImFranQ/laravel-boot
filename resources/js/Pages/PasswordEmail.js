import {
  Text,
  Container,
  Button,
  Stack,
  chakra,
  Spinner,
  Flex,
  Box,
  Input,
  FormControl,
  InputLeftElement,
  InputGroup,
  InputRightElement,
  FormErrorMessage
} from '@chakra-ui/react'
import { useForm } from '@inertiajs/inertia-react'
import { useState } from 'react';
import { FaEnvelope } from "react-icons/fa";
import Navbar from '../libs/components/Navbar';

const EnvelopeIcon = chakra(FaEnvelope);

export default ({ csrf, appName }) => {

  const [emailSend, setEmailSend] = useState(true)

  const { data, setData, post, processing, errors, clearErrors } = useForm({
    email: '',
    _token: csrf
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post('/password/email', {
      onSuccess: (data) => setEmailSend(true)
    })
  }

  const handleInput = (name, value) => {
    clearErrors(name)
    setData(name, value)
  }

  return (
    <>
      <Navbar appName={appName} />
      <Container
        maxW='md'
        my={4}
      >
        <Box
          boxShadow="md"
          borderStyle={'solid'}
          borderColor={'gray.200'}
          borderWidth={1}
          borderRadius={8}
          p={4}
        >

          <form onSubmit={handleSubmit}>
            <Flex
              flexDirection="column"
              alignItems="center"
            >
              <Stack spacing={4} w={'100%'}>
                <Text fontSize='xl'>Reset Password</Text>

                <FormControl isInvalid={errors.email}>
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
                      disabled={!!processing}
                      onChange={(e) => handleInput('email', e.target.value)}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.email}
                  </FormErrorMessage>
                </FormControl>

                {!processing && <Button type="submit" colorScheme={'primary'}>Reset Password</Button>}


              </Stack>
              {processing && <Spinner mt={4} color={'primary.500'} />}
            </Flex>
          </form>
        </Box>

        <Box mt={4}>
          <Box
            borderRadius={8}
            p={4}
            bg={'green.100'}
            borderStyle={'solid'}
            borderColor={'green.200'}
            borderWidth={1}
          >
            <Text color={'green.800'} fontWeight={'bold'} fontSize={'1.2rem'}>Check your email.</Text>
            <Text color={'green.800'}>We sent you an email with instructions on how to reset you password.</Text>
          </Box>
        </Box>
      </Container>
    </>
  )
}