import {
  Button,
  Stack,
  Flex,
  Input,
  Textarea,
  FormControl,
  InputGroup,
  FormErrorMessage,
  Select,
  Box
} from '@chakra-ui/react'
import { usePage } from '@inertiajs/inertia-react'

export default ({ onSubmit, onChangeInput, processing, errors, data, readOnly }) => {

  const { categories } = usePage().props

  return (
    <form onSubmit={onSubmit}>
      <Flex
        flexDirection="column"
        alignItems="center"
      >
        <Stack spacing={4} w={'100%'}>

          <Flex>
            <Box flex={4} as={Flex} alignItems={'center'}>Title</Box>
            <Box flex={8}>
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
            </Box>
          </Flex>

          <Flex>
            <Box flex={4} as={Flex} alignItems={'center'}>Description</Box>
            <Box flex={8}>
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
            </Box>
          </Flex>

          <Flex>
            <Box flex={4} as={Flex} alignItems={'center'}>Category</Box>
            <Box flex={8}>
              <FormControl isInvalid={errors?.parent_id}>
                <InputGroup>
                  <Select 
                    readOnly
                    placeholder="Select Category"
                    onChange={(e) => onChangeInput('parent_id', e.target.value)}
                    errorBorderColor='red.300'
                    defaultValue={data.category_id}
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