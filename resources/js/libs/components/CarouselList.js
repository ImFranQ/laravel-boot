import { Box, Button, chakra, Divider, Flex, IconButton, Img, Input, Text, useDisclosure } from "@chakra-ui/react"
import { useForm, usePage } from "@inertiajs/inertia-react"
import { useEffect, useState } from "react"
import { FaPlus, FaTrash, FaPen, FaCheck, FaTimes } from "react-icons/fa"
import { BiImageAdd } from 'react-icons/bi'
import FileSelector from "./FileSelector"

const PlusIcon = chakra(FaPlus)
const TrashIcon = chakra(FaTrash)
const PenIcon = chakra(FaPen)
const CheckIcon = chakra(FaCheck)
const AddImageIcon = chakra(BiImageAdd)
const CancelIcon = chakra(FaTimes)

const CarouselItem = ({data:initialState, onCancel, onSuccess}) => {

  const { carousel , storeCarouselUrl } = usePage().props
  const [isEditable, setIsEditable] = useState(!initialState)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data, post, processing, isDirty, setData, patch } = useForm({
    title: initialState?.title ?? '',
    description:  initialState?.description ?? '',
    file: initialState?.files ?? [],
    file_relation_id: initialState?.files[0].id ?? null,
    link: initialState?.link ?? '',
    link_text: initialState?.link_text ?? '',
    id: initialState?.id,
    is_active: true,
    order: initialState?.order ?? carousel.length + 1
  })

  const succesHandler = () => {
    if (!processing) {
      data.id
        ? patch(carousel.find((e) => e.id == data.id).updateUrl, { onSuccess: onSuccessHandler })
        : post(storeCarouselUrl, { onSuccess: onSuccessHandler }) 
    }
  }

  const onSuccessHandler = () => {
    setIsEditable(false)
    onSuccess && onSuccess()
    
  }

  const onCancelHandler = () => {
    setIsEditable(false)
    onCancel && onCancel()
  }

  return <Box
    borderRadius={8}
    borderWidth={1}
    p={4} mb={4}
    as={Flex}
  >
    <Box w={220} mr={4}>
      <Box borderWidth={2} borderRadius={8} >
        { data.file?.length
          ? (
            <Flex h={120} alignItems={'center'} onClick={ isEditable ? onOpen : null}>
              <Img src={data.file[0].path} w={'100%'} />
            </Flex>
          ) : (
            <Flex
              alignItems={'center'} justifyContent={'center'} flexDirection={'column'}
              cursor={'pointer'}
              onClick={onOpen}
              h={120}
            >
              <AddImageIcon fontSize={48} />
              <Text>Select Images</Text>
            </Flex>
          )
        }
      </Box>
    </Box>
    
    <Box flex={1} mr={4}>
      {isEditable && (
        <>
          <Input placeholder='Title' mb={2} 
            value={data.title}
            onChange={(e) => setData('title', e.target.value)}
          />
          <Input placeholder='Description' mb={2} 
            value={data.description}
            onChange={(e) => setData('description', e.target.value)}
          />
          <Flex>
            <Input placeholder='Button Text' mr={2} flex={4} 
              value={data.link_text}
              onChange={(e) => setData('link_text', e.target.value)}
            />
            <Input placeholder='Button link' flex={8} 
              value={data.link}
              onChange={(e) => setData('link', e.target.value)}
            />
          </Flex>
        </>
      )}

      {!isEditable && (
        <>
          <Text fontSize={'lg'} fontWeight={'bold'}>{data.title}</Text>
          <Text>{data.description}</Text>
          <Text>{data.link}</Text>
        </>
      )}
    </Box>

    <Flex alignItems={'center'} >
      {
        isEditable ? (
          <>
            <IconButton 
              mr={2} 
              onClick={onCancelHandler}
            >
              <CancelIcon />
            </IconButton>
  
            <IconButton
              onClick={() => succesHandler()}
              disabled={!data.file?.length || !data.title || !data.description}
            >
              <CheckIcon />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton mr={2} onClick={() => setIsEditable(true)}>
              <PenIcon />
            </IconButton>

            <IconButton>
              <TrashIcon />
            </IconButton>
          </>
        )
      }
    </Flex>

    <FileSelector 
      {...{isOpen, onClose}} 
      onSuccess={(file) => setData({...data, file, file_relation_id: file[0].id})} 
    />
    
  </Box>
}

export default ({...other}) => {
  const { carousel } = usePage().props
  const [showNewItem, setShowNewItem] = useState(false)

  return (
    <Box 
      {...other}
    >
      <Text fontSize={'xl'}>Top Carousel</Text>
      <Divider my={4} />
      
      {carousel.map((item, index) => <CarouselItem data={item} key={index} />)}

      {
        showNewItem 
          ? <CarouselItem 
              onCancel={() => setShowNewItem(false) } 
              onSuccess={() => setShowNewItem(false) } 
            />
          : <Button 
              w={'full'} size={'lg'} 
              onClick={() => setShowNewItem(true)}
            >
              <PlusIcon mr={2} fontSize={12} />
              <Text> Add new </Text>
            </Button>
      }
    </Box>
  )
}