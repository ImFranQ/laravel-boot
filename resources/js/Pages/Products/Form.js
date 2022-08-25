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
import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';

export default ({ onSubmit, onChangeInput, processing, errors, data, readOnly }) => {

  const { categories } = usePage().props
  const editorRef = useRef(null);

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

            <Editor
              apiKey='gcmcmkaifo9ti0ejkvhucd8c9l42am9f17x4u7nxtw7s92w4'
              onInit={(evt, editor) => editorRef.current = editor}
              initialValue={data.description}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                  'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                  'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                  'bold italic forecolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
              }}
            />

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

            <FormControl isInvalid={errors?.price}>
              <InputGroup>
                <Input
                  {...{ readOnly }}
                  name="price"
                  placeholder="price"
                  errorBorderColor='red.300'
                  value={data.price}
                  onChange={(e) => onChangeInput('price', e.target.value)}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors?.price}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors?.category_id}>
              <InputGroup>
                <Select
                  readOnly
                  placeholder="Select Category"
                  onChange={(e) => onChangeInput('category_id', e.target.value)}
                  errorBorderColor='red.300'
                  defaultValue={data.category_id}
                >
                  {categories.map(category => (
                    <option value={category.id} key={category.id}>{category.title}</option>
                  ))}
                </Select>
              </InputGroup>
              <FormErrorMessage>
                {errors?.category_id}
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