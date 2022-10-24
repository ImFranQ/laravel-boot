import { Text, Container, Flex, Button, chakra } from '@chakra-ui/react'
import Datatable from '../../libs/components/Datatable';
import FrameBoard from '../../libs/components/FrameBoard'
import { FiTrash, FiEdit, FiEye } from 'react-icons/fi'
import { Link, useForm, usePage } from '@inertiajs/inertia-react';

const TrashIcon = chakra(FiTrash)
const EditIcon = chakra(FiEdit)
const ShowIcon = chakra(FiEye)

const userActions = (product) => {
  const { csrf: _token } = usePage().props
  const { processing, delete: destroy } = useForm({ _token })

  return (
    <Flex>
      <Button variant={'link'} size={'md'} as={Link} href={product.actions.show}>
        <ShowIcon />
      </Button>
      <Button variant={'link'} size={'md'} as={Link} href={product.actions.edit}>
        <EditIcon />
      </Button>
      <form onSubmit={() => destroy(product.actions.destroy)}>
        <Button variant={'link'} size={'md'} type="submit" display={'flex'}>
          <TrashIcon color={'red.500'} />
        </Button>
      </form>
    </Flex>
  )
}

export default ({ products, createUrl }) => {
  return (
    <FrameBoard>
      <Container maxW='7xl' p={4} >
        <Flex
          pb={2} mb={2}
          borderBottomWidth={'1px'}
          borderBottomColor={'gray.200'}
          justifyContent={'space-between'}
        >
          <Text fontSize='xl'>Products</Text>
          <Button
            size={'sm'}
            colorScheme={'primary'}
            as={Link}
            href={createUrl}
          >
            Create new
          </Button>
        </Flex>
        <Datatable
          data={products}
          headers={{
            title: 'Title',
            price: 'Price',
            actions: { title: '', render: userActions }
          }}
          options={{
            actions: {
              props: { w: '170px' }
            }
          }}
        />
      </Container>
    </FrameBoard>
  )
}