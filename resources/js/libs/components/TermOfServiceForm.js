import { Box, Button, Divider, Text } from "@chakra-ui/react"
import { useRef } from "react";
import { Editor } from '@tinymce/tinymce-react';

export default () => {

  const editorRef = useRef(null);
  const data = ''
  
  return (
    <Box bg={'white'} p={4}
      borderRadius={8}
      borderWidth={1}
    >
      <Text fontSize={'xl'}>Term of Services</Text>
      <Divider my={4} />

      <Editor
        apiKey='gcmcmkaifo9ti0ejkvhucd8c9l42am9f17x4u7nxtw7s92w4'
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue={data}
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
      <Divider my={4} />
      <Button colorScheme={'primary'}>
        Save
      </Button>
    </Box>
  )
}