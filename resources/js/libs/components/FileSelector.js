import { Button, chakra, Flex, GridItem, Img, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Text } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { MdRadioButtonUnchecked, MdRadioButtonChecked } from 'react-icons/md'

// iconos
const CheckedIcon = chakra(MdRadioButtonChecked);
const UncheckedIcon = chakra(MdRadioButtonUnchecked);

const useFile = () => {
  const [files, setFiles] = useState([])
  
  const loadFiles = async () => {
    const response = await fetch(`http://localhost:8000/api/files?limit=${15}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    }).then(res => res.json())

    setFiles(response.files.data)
  }

  return { files, loadFiles }
}

const FileItem = ({file, isSelect, onSelect, onRemove}) => {
  return (
    <Flex
      h={150}
      borderWidth={1}
      borderRadius={8}
      overflow={'hidden'}
      justifyContent={'center'}
      position={'relative'}
      borderColor={isSelect ? 'green' : 'gray.200'}

      cursor={'pointer'}
      onClick={() => !isSelect ? onSelect(file) : onRemove(file)}
    >
      <Img src={file.path} maxW={'100%'} maxH={'100%'} />
      <Flex
        position={'absolute'} top={2} right={2}
        justifyContent={'center'} alignItems={'center'}
      >
        {isSelect ? <CheckedIcon fontSize={18} color={'green'} /> : <UncheckedIcon fontSize={18} />}
      </Flex>
    </Flex>
  )

}

export default ({isOpen, onClose, onSuccess, selected:initialState}) => {
  const {files, loadFiles} = useFile()
  const cancelRef = useRef()
  const [selected, setSelected] = useState(initialState ?? []);

  useEffect(() => {
    loadFiles()
  }, [])

  const closeHandler = (isSave) => {
    isSave ? onSuccess(selected) : null
    onClose ? onClose() : null
  }

  // remove item from selected
  const removeItem = (item) => {
    setSelected(selected.filter(i => i.id !== item.id))
  }

  // add item to selected
  const addItem = (item) => {
    setSelected([...selected, item])
  }

  return (
    <Modal
      isOpen={isOpen}
      size={'6xl'}
      onClose={() => closeHandler(false)}
      isCentered
    >
      <ModalOverlay />

      <ModalContent w={'6xl'}>
        <ModalHeader fontSize='lg' fontWeight='bold'>
          Select the images
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text mb={4}>{selected.length} file(s) Selected</Text>
          <SimpleGrid columns={5} gap={4}>
            {files.map((file, index) => (
              <GridItem key={file.id}>
                <FileItem 
                  file={file}
                  onSelect={addItem}
                  onRemove={removeItem}
                  isSelect={selected.find(i => i.id === file.id)}
                />
              </GridItem>
            ))}
          </SimpleGrid>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='red' ref={cancelRef} onClick={() => closeHandler(false)} variant={'outline'}>
            Cancel
          </Button>
          <Button colorScheme='primary' onClick={() => closeHandler(true)} ml={3}>
            Accept
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}