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
            <FormControl isInvalid={errors?.title}>
              <InputGroup>
                <Input
                  {...{ readOnly }}
                  name="title"
                  placeholder="Title"
                  errorBorderColor='red.300'
                  value={data.title}
                  onChange={(e) => onChangeInput('title', e.target.value)}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors?.title}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors?.description}>
              <InputGroup>
                <Textarea
                  {...{ readOnly }}
                  name="description"
                  placeholder="Description"
                  errorBorderColor='red.300'
                  value={data.description}
                  onChange={(e) => onChangeInput('description', e.target.value)}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors?.description}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors?.parent_id}>
              <InputGroup>
                <Select 
                  readOnly
                  placeholder="Select Category"
                  onChange={(e) => onChangeInput('parent_id', e.target.value)}
                  errorBorderColor='red.300'
                  defaultValue={data.parent_id}
                >
                  {categories.map(category => (
                    <option value={category.id} key={category.id}>{ category.title }</option>
                  ))}
                </Select>
              </InputGroup>
              <FormErrorMessage>
                {errors?.parent_id}
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