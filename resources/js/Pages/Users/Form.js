import {
  Container,
  Button,
  Stack,
  chakra,
  Spinner,
  Flex,
  Input,
  FormControl,
  InputLeftElement,
  InputGroup,
  InputRightElement,
  FormErrorMessage
} from '@chakra-ui/react'
import { useState } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser } from "react-icons/fa";

const EnvelopeIcon = chakra(FaEnvelope);
const LockIcon = chakra(FaLock);
const EyeIcon = chakra(FaEye);
const EyeSlashIcon = chakra(FaEyeSlash);
const UserIcon = chakra(FaUser);

export default ({ onSubmit, onChangeInput, processing, errors, data, readOnly }) => {

  const [showPassword, setShowPassword] = useState(false)

  return (
    <Container maxW={'md'}>
      <form onSubmit={onSubmit}>
        <Flex
          flexDirection="column"
          alignItems="center"
        >
          <Stack spacing={4} w={'100%'}>
            <FormControl isInvalid={errors?.name}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents={'none'}
                  children={<UserIcon color={'gray.300'} />}
                />
                <Input
                  {...{ readOnly }}
                  name="name"
                  placeholder="Name"
                  errorBorderColor='red.300'
                  value={data.name}
                  onChange={(e) => onChangeInput('name', e.target.value)}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors?.name}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors?.email}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents={'none'}
                  children={<EnvelopeIcon color={'gray.300'} />}
                />
                <Input
                  {...{ readOnly }}
                  name="email"
                  placeholder="Email"
                  errorBorderColor='red.300'
                  value={data.email}
                  onChange={(e) => onChangeInput('email', e.target.value)}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors?.email}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors?.password}>
              <InputGroup>
                <InputLeftElement pointerEvents={'none'} >
                  <LockIcon color={'gray.300'} />
                </InputLeftElement>

                <Input
                  {...{ readOnly }}
                  name="password"
                  placeholder='Password'
                  value={data.password}
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e) => onChangeInput('password', e.target.value)}
                  errorBorderColor='red.300'
                />

                <InputRightElement>
                  <Button variant={'ghost'} size="sm" onClick={() => setShowPassword(!showPassword)}>
                    {!showPassword ? <EyeIcon color={'gray.300'} /> : <EyeSlashIcon color={'gray.300'} />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {errors?.password}
              </FormErrorMessage>
            </FormControl>

            {!readOnly && !processing && <Button type="submit" colorScheme={'primary'}>Save</Button>}
          </Stack>
          {processing && <Spinner mt={4} color={'primary.500'} />}
        </Flex>
      </form>
    </Container>
  )
}