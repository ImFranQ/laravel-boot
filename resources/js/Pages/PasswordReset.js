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
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import Navbar from '../libs/components/Navbar';

const EnvelopeIcon = chakra(FaEnvelope);
const LockIcon = chakra(FaLock);
const EyeIcon = chakra(FaEye);
const EyeSlashIcon = chakra(FaEyeSlash);
const UserIcon = chakra(FaUser);

export default ({ csrf, email, token, appName }) => {

  const [showPassword, setShowPassword] = useState(false)

  const { data, setData, post, processing, errors, clearErrors } = useForm({
    token,
    email,
    password: '',
    password_confirmation: '',
    _token: csrf
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post('/password/reset')
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
                <Text fontSize='xl'>Set new password</Text>

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
                      onChange={(e) => handleInput('email', e.target.value)}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.email}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.password}>
                  <InputGroup>
                    <InputLeftElement pointerEvents={'none'} >
                      <LockIcon color={'gray.300'} />
                    </InputLeftElement>

                    <Input
                      name="password"
                      placeholder='Password'
                      value={data.password}
                      type={showPassword ? 'text' : 'password'}
                      onChange={(e) => handleInput('password', e.target.value)}
                    />

                    <InputRightElement>
                      <Button variant={'ghost'} size="sm" onClick={() => setShowPassword(!showPassword)}>
                        {!showPassword ? <EyeIcon color={'gray.300'} /> : <EyeSlashIcon color={'gray.300'} />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.password}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.password_confirmation}>
                  <InputGroup>
                    <InputLeftElement pointerEvents={'none'} >
                      <LockIcon color={'gray.300'} />
                    </InputLeftElement>

                    <Input
                      name="password_confirmation"
                      placeholder='Confirm password'
                      value={data.password_confirmation}
                      type={showPassword ? 'text' : 'password'}
                      onChange={(e) => handleInput('password_confirmation', e.target.value)}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.password_confirmation}
                  </FormErrorMessage>
                </FormControl>

                {!processing && <Button type="submit" colorScheme={'primary'}>Set password</Button>}
              </Stack>
              {processing && <Spinner mt={4} color={'primary.500'} />}
            </Flex>
          </form>
        </Box>
      </Container>
    </>
  )
}