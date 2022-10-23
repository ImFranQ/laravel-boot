import { 
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Textarea,
  Input,
  InputGroup,
  Text,
  useDisclosure,
  Img,
  chakra,
  Button,
  Heading 
} from "@chakra-ui/react"
import { useForm } from "@inertiajs/inertia-react"
import { BiImageAdd } from 'react-icons/bi'
import FileSelector from "../../libs/components/FileSelector"
import FrameBoard from "../../libs/components/FrameBoard"

const AddImageIcon = chakra(BiImageAdd)

export default ({csrf, settings, updateUrl}) => {

  const options = {}
  settings.forEach(setting => options[setting.name] = setting.value)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data, setData, patch, processing, errors, clearErrors } = useForm({
    title: options.title,
    description: options.description,
    url: options.url,
    brand_image: options.brand_image,
    _token: csrf
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    patch(updateUrl)
  }

  const handleInput = (name, value) => {
    clearErrors(name)
    setData(name, value)
  }
  
  return (
    <FrameBoard
      pageTitle={'Settings'}
      footer={<>
        <Flex mb={4}>
          <Box flex={4} as={Flex} alignItems={'center'}></Box>
          <Box flex={8}>
            <Button onClick={handleSubmit} colorScheme={'primary'}>Save</Button>
          </Box>
        </Flex>
      </>}
    >
      <Heading size={'md'} mb={4}>General</Heading>
      
      <Flex mb={4}>
        <Box flex={4} as={Flex} alignItems={'center'}>Page Title</Box>
        <Box flex={8}>
          <FormControl isInvalid={errors?.title}>
            <InputGroup>
              <Input
                name="title"
                placeholder="Title"
                errorBorderColor='red.300'
                value={data.title}
                onChange={(e) => handleInput('title', e.target.value)}
              />
            </InputGroup>
            <FormErrorMessage>
              {errors?.title}
            </FormErrorMessage>
          </FormControl>
        </Box>
      </Flex>

      <Flex mb={4}>
        <Box flex={4} as={Flex} alignItems={'center'}>Page Description</Box>
        <Box flex={8}>
          <FormControl isInvalid={errors?.description}>
            <InputGroup>
              <Textarea
                name="description"
                rows={2}
                placeholder="Description"
                errorBorderColor='red.300'
                value={data.description}
                onChange={(e) => handleInput('description', e.target.value)}
              />
            </InputGroup>
            <FormErrorMessage>
              {errors?.description}
            </FormErrorMessage>
          </FormControl>
        </Box>
      </Flex>

      <Flex mb={4}>
        <Box flex={4} as={Flex} alignItems={'center'}>URL</Box>
        <Box flex={8}>
          <FormControl isInvalid={errors?.url}>
            <InputGroup>
              <Input
                name="url"
                placeholder="URL"
                errorBorderColor='red.300'
                value={data.url}
                onChange={(e) => handleInput('url', e.target.value)}
              />
            </InputGroup>
            <FormErrorMessage>
              {errors?.url}
            </FormErrorMessage>
          </FormControl>
        </Box>
      </Flex>

      <Flex mb={4}>
        <Box flex={4} as={Flex} alignItems={'center'}>Brand Image</Box>
        <Box flex={8}>
          <Box borderWidth={2} borderRadius={8} w={'200px'} _hover={{ cursor: 'pointer' }}>
            { data.brand_image
              ? (
                <Flex h={120} alignItems={'center'} onClick={ onOpen } >
                  <Img src={data.brand_image} w={'100%'} />
                </Flex>
              ) : (
                <Flex
                  alignItems={'center'} justifyContent={'center'} flexDirection={'column'}
                  h={120}
                  onClick={ onOpen }
                >
                  <AddImageIcon fontSize={48} />
                  <Text>Select Images</Text>
                </Flex>
              )
            }
          </Box>
          {errors?.brand_image && (
            <Text color={'red.500'} as={'small'}>{ errors?.brand_image }</Text>
          )}
        </Box>
      </Flex>
            
      <FileSelector
        {...{isOpen, onClose}} 
        onSuccess={(file) => handleInput('brand_image', file[0].path)} 
      />

    </FrameBoard>
  )
}