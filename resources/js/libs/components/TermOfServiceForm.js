import { Box, Button, Center, Flex, Input, Text } from "@chakra-ui/react"
import { useForm, usePage } from "@inertiajs/inertia-react";
import { useEffect } from "react";
import { useRef } from "react";

export default () => {
  const {fileUrl, updateUrl, csrf} = usePage().props
  const {data, setData, post, processing, isDirty, errors} = useForm({
    term_of_service_file: '',
    _token: csrf
  })
  const fileRef = useRef(null)

  const uploadHandled = (e) => {
    if(e.target.files?.length) {
      setData('term_of_service_file', e.target.files[0])
    }
  }

  useEffect(() => {
    if (isDirty) post(updateUrl, { forceFormData: true })
  }, [data])

  return (
    <Box bg={'white'} p={4}
      borderRadius={8}
      borderWidth={1}
    >
      <Flex 
        pb={2} mb={2} 
        borderBottomWidth={'1px'} 
        borderBottomColor={'gray.200'}
        justifyContent={'space-between'}
      >
        <Text fontSize='xl'>Term Of Service</Text>
        {processing && <Text>Loading...</Text>}
        {!processing && (
          <>
            {errors?.term_of_service_file && <Text color={'red.500'} as={'small'} >
              {errors?.term_of_service_file}
            </Text>}
            
            <Button 
              size={'sm'} 
              colorScheme={'primary'}
              onClick={() => fileRef.current.click()}
            >
              Upload Document
            </Button>
          </>
        )}
        <Input type={'file'} display={'none'} ref={fileRef} onChange={uploadHandled} />
      </Flex>

      { fileUrl 
        ? (
          <iframe 
            src={fileUrl} 
            style={{width: "100%", height:"700px"}} 
            frameBorder="0">
          </iframe>
        ) : (
          <Center py={4}>
            <Text fontSize='sm' color={'gray.500'}>
              No document uploaded
            </Text>
          </Center>
        )
      }
    </Box>
  )
}