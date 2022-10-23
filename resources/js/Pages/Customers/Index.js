import { Text, Container, Flex, Button, chakra } from '@chakra-ui/react'
import Datatable from '../../libs/components/Datatable';
import FrameBoard from '../../libs/components/FrameBoard'
import { FiTrash, FiEdit, FiEye } from 'react-icons/fi'
import { Link, useForm, usePage } from '@inertiajs/inertia-react';

const TrashIcon = chakra(FiTrash)
const EditIcon = chakra(FiEdit)
const ShowIcon = chakra(FiEye)

const userActions = (category) => {
  const { csrf: _token } = usePage().props
  const { processing, delete: destroy } = useForm({ _token })

  return (
    <Flex>
      <Button variant={'link'} size={'md'} as={Link} href={category.actions.show}>
        <ShowIcon />
      </Button>
      <Button variant={'link'} size={'md'} as={Link} href={category.actions.edit}>
        <EditIcon />
      </Button>
      <form onSubmit={() => destroy(category.actions.destroy)}>
        <Button variant={'link'} size={'md'} type="submit" display={'flex'}>
          <TrashIcon color={'red.500'} />
        </Button>
      </form>
    </Flex>
  )
}

export default ({ customers, createUrl }) => {
  return (
    <FrameBoard
      pageTitle={'Customers'}
      pageTitleEnd={
        <Button
          size={'sm'}
          colorScheme={'primary'}
          as={Link}
          href={createUrl}
        >
          Create new
        </Button>
      }
    >
      <Datatable
        data={customers}
        headers={{
          name: 'Name',
          surname: 'Surname',
          email: 'E-mail',
          phone: 'Phone',
          actions: { title: '', render: userActions }
        }}
        options={{
          actions: {
            props: { w: '170px' }
          }
        }}
      />
    </FrameBoard>
  )
}