import { Button, Stack, Text, Flex, chakra, Box } from "@chakra-ui/react"
import { Link, usePage, useForm } from "@inertiajs/inertia-react"
import { AiOutlineLogout, AiOutlineUser } from "react-icons/ai";

const LogoutIcon = chakra(AiOutlineLogout);
const AccountIcon = chakra(AiOutlineUser);

export default () => {

  const { user, csrf } = usePage().props

  const { post } = useForm({
    _token: csrf
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post('/logout')
  }

  return <>
    <Stack
      flex={{ base: 1, md: 0 }}
      justify={'flex-end'}
      direction={'row'}
    >
      {!user && (<>
        <Button colorScheme={'blue'} variant='link' mr={4} as={Link} href={'/login'} >
          Sign In
        </Button>

        <Button colorScheme={'blue'} as={Link} href={'/register'}>
          Sign Up
        </Button>
      </>)}
      {user && (<>
        <Flex alignItems={'center'}>
          <Flex as={Link} href="/home" lineHeight={'18px'}  alignItems={'center'} mr={2}>
            <AccountIcon fontSize={'24px'} mr={2} />
            <Flex flexDirection={'column'}>
              <Text>{user.name}</Text>
              <Text color={'gray'} fontSize={'0.9rem'}>{user.email}</Text>
            </Flex>
          </Flex>

          <form onSubmit={handleSubmit}>
            <Flex as={Button} justifyContent={'center'} type="submit" variant={'unstyled'} >
              <LogoutIcon fontSize={'24px'} color={'red.500'} />
            </Flex>
          </form>
        </Flex>
      </>)}
    </Stack>
  </>
}