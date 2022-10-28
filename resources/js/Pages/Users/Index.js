import { Text, Container, Flex, Button, chakra } from '@chakra-ui/react'
import Datatable from '../../libs/components/Datatable';
import FrameBoard from '../../libs/components/FrameBoard'
import { FiTrash, FiEdit, FiEye } from 'react-icons/fi'
import { Link, useForm, usePage } from '@inertiajs/inertia-react';

const TrashIcon = chakra(FiTrash)
const EditIcon = chakra(FiEdit)
const ShowIcon = chakra(FiEye)

const userActions = (user) => {
  const { csrf: _token } = usePage().props
  const { delete:destroy } = useForm({ _token })
  const destroyHandler = () => {
    destroy(user.actions.destroy)
  }

  return (
    <Flex>
      <Button variant={'link'} size={'md'} as={Link} href={user.actions.show}>
        <ShowIcon />
      </Button>
      <Button variant={'link'} size={'md'} as={Link} href={user.actions.edit}>
        <EditIcon />
      </Button>
      <Button variant={'link'} size={'md'} display={'flex'} onClick={() => destroyHandler()}>
        <TrashIcon color={'red.500'} />
      </Button>
    </Flex>
  )
}

export default ({ users, createUrl }) => {
  return (
    <FrameBoard
      pageTitle={'Users'}
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
        data={users} 
        headers={{
          name: 'Name', 
          email: 'Email', 
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