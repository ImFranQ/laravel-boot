import {
  Button,
  Stack,
  Box,
  Flex,
  Input,
  FormControl,
  InputGroup,
  FormErrorMessage,
} from '@chakra-ui/react'
import { usePage } from '@inertiajs/inertia-react'

export default ({ onSubmit, onChangeInput, processing, errors, data, readOnly }) => {

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
                  <Input
                    {...{ readOnly }}
                    name="name"
                    placeholder="First name"
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
            <Box flex={4} as={Flex} alignItems={'center'}>Surname</Box>
            <Box flex={8}>
              <FormControl isInvalid={errors?.surname}>
                <InputGroup>
                  <Input
                    {...{ readOnly }}
                    name="surname"
                    placeholder="Surname"
                    errorBorderColor='red.300'
                    value={data.surname}
                    onChange={(e) => onChangeInput('surname', e.target.value)}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors?.surname}
                </FormErrorMessage>
              </FormControl>
            </Box>
          </Flex>

          <Flex>
            <Box flex={4} as={Flex} alignItems={'center'}>Email</Box>
            <Box flex={8}>
              <FormControl isInvalid={errors?.email}>
                <InputGroup>
                  <Input
                    {...{ readOnly }}
                    name="email"
                    placeholder="E-mail"
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
            <Box flex={4} as={Flex} alignItems={'center'}>Phone</Box>
            <Box flex={8}>
              <FormControl isInvalid={errors?.phone}>
                <InputGroup>
                  <Input
                    {...{ readOnly }}
                    name="phone"
                    placeholder="Phone"
                    errorBorderColor='red.300'
                    value={data.phone}
                    onChange={(e) => onChangeInput('phone', e.target.value)}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors?.phone}
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