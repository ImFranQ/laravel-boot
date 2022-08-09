import { Text, Box, Button, Flex, useToast } from '@chakra-ui/react'
import { useForm, usePage } from '@inertiajs/inertia-react'
import Counter from '../../libs/components/Counter'
import { FaTimes } from 'react-icons/fa'
import { AlertLayout } from '../../libs/components/Alerts'
import { useEffect } from 'react'

export default ({ product }) => {

  const { csrf } = usePage().props

  const toast = useToast()

  const { delete: destroy } = useForm({
    _token: csrf
  })

  const { data, setData, post, isDirty } = useForm({
    count: product.count,
    _token: csrf
  })

  const updateProduct = (product, count) => {
    if (count == data.count) return;
    setData('count', count)
  }

  const destroyHandle = (product) => {
    destroy(product.destroyUrl, {
      onSuccess: () => {
        toast({
          position: 'bottom-right',
          containerStyle: {
            minWidth: '400px'
          },
          render: () => (
            <AlertLayout
              type={'success'}
              message={'Product removed from the cart successfully'}
              onClose={() => toast.closeAll()} />
          ),
        })
      }
    })
  }

  useEffect(() => {
    if (isDirty) post(product.updateUrl)
  }, [data])

  return (
    <Flex gap={4} align={'center'} mb={4} key={product.id}>
      <Box w={'100px'} h={'70px'} bg={'gray.100'}>
        img
      </Box>

      <Box flex={{ base: 1 }}>
        <Text>{product.data.title}</Text>
      </Box>

      <Flex align={'center'} gap={2}>
        <Counter
          w={'120px'}
          value={data.count}
          onChange={(value) => updateProduct(product, value)}
        />
        <Text> x ${product.price} </Text>
      </Flex>

      <Box>
        <Button onClick={() => destroyHandle(product)}>
          <FaTimes />
        </Button>
      </Box>
    </Flex>
  )
}