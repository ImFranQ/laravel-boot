import { Box, Button, chakra, Container, Divider, Flex, FormControl, FormErrorMessage, FormLabel, GridItem, IconButton, Img, Input, InputGroup, Select, SimpleGrid, Stack, Text, useDisclosure } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react";
import { Editor } from '@tinymce/tinymce-react';
import { BiImageAdd } from 'react-icons/bi'
import FileSelector from "./FileSelector";
import { usePage } from "@inertiajs/inertia-react";

const AddImageIcon = chakra(BiImageAdd)

const FileItem = ({file}) => {
  return (
    <Flex
      h={150}
      borderWidth={1}
      borderRadius={8}
      overflow={'hidden'}
      justifyContent={'center'}
      position={'relative'}
    >
      <Img src={file.path} maxW={'100%'} maxH={'100%'} />
    </Flex>
  )
}

export default ({data, errors, processing, setData, onSubmit}) => {
  const editorRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { categories } = usePage().props
  const [isSubmitting, setSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editorRef.current) 
      setData('description', editorRef.current.getContent())

    setSubmitting(true)
  }

  useEffect(() => {
    if(isSubmitting) {
      onSubmit()
      setSubmitting(false)
    }
  }, [isSubmitting])

  return (
    <Flex flexDir={'column'} h={'100%'}>
      <Flex 
        px={4} 
        alignItems={'center'} justifyContent={'end'} 
        h={16} 
        bg={'gray.100'}
        borderBottomWidth={1}
      >
        <Button 
          px={8} 
          colorScheme={'primary'} 
          onClick={handleSubmit}  
        >Save</Button>
      </Flex>
      <Flex flex={1}>
        <Stack spacing={4} flex={8} p={4}>

          <FormControl isInvalid={errors?.title}>
            <InputGroup>
              <Input
                name="title"
                placeholder="Title"
                errorBorderColor='red.300'
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                fontSize={24}
                py={8}
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

          <SimpleGrid columns={5} gap={4}>
            <GridItem>
              <Flex
                borderWidth={2} borderRadius={8} 
                alignItems={'center'} justifyContent={'center'} flexDirection={'column'}
                h={150} bg={'white'} cursor={'pointer'}
                onClick={onOpen}
              >
                <AddImageIcon fontSize={48} />
                <Text>Select Images</Text>
              </Flex>
            </GridItem>

            {data.files.map((file, index) => (
              <GridItem key={index}>
                <FileItem file={file} />
              </GridItem>
            ))}
          </SimpleGrid>

        </Stack>
        <Box bg={'gray.100'} h={'100%'} flex={4} borderLeftWidth={1} p={4}>
          <Stack spacing={4}>
            <FormControl isInvalid={errors?.price}>
              <FormLabel>Price</FormLabel>
              <InputGroup>
                <Input
                  name="price"
                  placeholder="price"
                  errorBorderColor='red.300'
                  size={'lg'}
                  value={data.price}
                  onChange={(e) => setData('price', e.target.value)}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors?.price}
              </FormErrorMessage>
            </FormControl>

            <Divider />

            <FormControl isInvalid={errors?.category_id}>
              <FormLabel>Category</FormLabel>
              <InputGroup>
                <Select
                  readOnly
                  placeholder="Select Category"
                  value={data.category_id}
                  size={'lg'}
                  onChange={(e) => setData('category_id', e.target.value)}
                  errorBorderColor='red.300'
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
          </Stack>
        </Box>

        <FileSelector {...{isOpen, onClose}} onSuccess={files => setData('files', files)} selected={data.files} />
      </Flex>
    </Flex>
  )
}