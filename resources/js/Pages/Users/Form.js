import {
  Box,
  Button,
  Stack,
  chakra,
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
    <form onSubmit={onSubmit}>
      <Flex
        flexDirection="column"
        alignItems="center"
      >
        <Stack spacing={4} w={'100%'}>

          <Flex>
            <Box flex={4} as={Flex} alignItems={'center'}>Name</Box>
            <Box flex={8}>
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
            </Box>
          </Flex>

          <Flex>
            <Box flex={4} as={Flex} alignItems={'center'}>Email</Box>
            <Box flex={8}>
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
            </Box>
          </Flex>

          <Flex>
            <Box flex={4} as={Flex} alignItems={'center'}>Password</Box>
            <Box flex={8}>
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
            </Box>
          </Flex>

          <Flex>
            <Box flex={4} as={Flex} alignItems={'center'}></Box>
            <Box flex={8}>
              {!readOnly && <Button isLoading={processing} type="submit" colorScheme={'primary'}>Save</Button>}
            </Box>
          </Flex>

        </Stack>
      </Flex>
    </form>
  )
}