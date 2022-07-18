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
  const { processing, delete:destroy } = useForm({ _token })
  
  return (
    <Flex>
      <Button variant={'link'} size={'md'} as={Link} href={user.actions.show}>
        <ShowIcon />
      </Button>
      <Button variant={'link'} size={'md'} as={Link} href={user.actions.edit}>
        <EditIcon />
      </Button>
      <form onSubmit={() => destroy(user.actions.destroy)}>
        <Button variant={'link'} size={'md'} type="submit" display={'flex'}>
          <TrashIcon color={'red.500'} />
        </Button>
      </form>
    </Flex>
  )
}

export default ({ users, createUrl }) => {
  return (
    <FrameBoard>
      <Container maxW='6xl' p={4} >
        <Flex 
          pb={2} mb={2} 
          borderBottomWidth={'1px'} 
          borderBottomColor={'gray.200'}
          justifyContent={'space-between'}
        >
          <Text fontSize='xl'>Users</Text>
          <Button 
            size={'sm'} 
            colorScheme={'blue'} 
            as={Link} 
            href={createUrl}
          >
            Create new
          </Button>
        </Flex>
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
      </Container>
    </FrameBoard>
  )
}