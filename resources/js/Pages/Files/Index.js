import { Text, Flex, chakra, SimpleGrid, GridItem, Input, Spinner, Img, IconButton } from '@chakra-ui/react'
import FrameBoard from '../../libs/components/FrameBoard'

import { AiOutlinePlus } from 'react-icons/ai'
import { FiTrash } from 'react-icons/fi'

import { useEffect, useRef, useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';

const PlusIcon = chakra(AiOutlinePlus)
const TrashIcon = chakra(FiTrash)

const FileItem = ({file}) => {

  const { delete:destroy, progress } = useForm()

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
      <Flex
        position={'absolute'} top={2} right={2}
        justifyContent={'center'} alignItems={'center'}
      >
        <IconButton 
          colorScheme={'red'} 
          size={'sm'} onClick={() => destroy(file.actions?.destroy)}
          disabled={progress}
        >
          <TrashIcon />
        </IconButton>
      </Flex>
    </Flex>
  )

}

export default ({ storeUrl, files }) => {

  const inputFile = useRef(null);

  const { data, setData, post, progress, isDirty, errors } = useForm({
    file: null,
  })

  const fileHandler = (e) => {
    if (e.target.files && e.target.files[0]) {
      setData('file', e.target.files[0])
    }
  }

  useEffect(() => {
    if (isDirty) post(storeUrl, { forceFormData: true })
  }, [data])

  return (
    <FrameBoard
      pageTitle={'Files'}
    >
      <SimpleGrid columns={4} gap={4}>
        <GridItem>
          <Flex 
            w={'100%'} h={150} 
            borderWidth={1} 
            borderRadius={8} 
            alignItems={'center'} 
            justifyContent={'center'} 
            flexDirection={'column'}
            color={'gray'}
            _hover={{cursor: 'pointer'}}
            onClick={() => inputFile.current?.click()}
          >
            {!progress && (
              <>
                <PlusIcon fontSize={48} />
                <Text>Add File</Text>
              </>
            )}
            {progress && <Spinner />}
            {errors.file && (
              <>
                <Text as={'small'} mt={4} color={'red'}>{errors.file}</Text>
              </>
            )}
            <Input 
              type={'file'} 
              ref={inputFile} 
              display={'none'}
              onChange={e => fileHandler(e)}
            />
          </Flex>
        </GridItem>

        {files.data.map(file => (
          <GridItem key={file.id}>
            <FileItem file={file} />
          </GridItem>
        ))}
      </SimpleGrid>
    </FrameBoard>
  )
}