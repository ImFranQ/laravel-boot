import {
  Container,
  Button,
  Stack,
  Spinner,
  Flex,
  Input,
  Textarea,
  FormControl,
  InputGroup,
  FormErrorMessage,
  Select
} from '@chakra-ui/react'
import { usePage } from '@inertiajs/inertia-react'

export default ({ onSubmit, onChangeInput, processing, errors, data, readOnly }) => {

  const { categories } = usePage().props

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

            {!readOnly && !processing && <Button type="submit" colorScheme={'primary'}>Save</Button>}
          </Stack>
          {processing && <Spinner mt={4} color={'primary.500'} />}
        </Flex>
      </form>
    </Container>
  )
}