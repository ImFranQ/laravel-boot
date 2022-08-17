import { Button, Stack, Flex, chakra, Menu, MenuButton, Avatar, MenuList, MenuItem, MenuDivider, Text } from "@chakra-ui/react"
import { Link, usePage, useForm } from "@inertiajs/inertia-react"
import { AiOutlineLogout, AiOutlineUser, AiOutlineDashboard } from "react-icons/ai";
import { FaStore } from "react-icons/fa";

const LogoutIcon = chakra(AiOutlineLogout);
// const AccountIcon = chakra(AiOutlineUser);
const StoreIcon = chakra(FaStore);
const DashboardIcon = chakra(AiOutlineDashboard);

export default () => {

  const { auth:user, csrf, storeUrl, boardUrl } = usePage().props

  const { post } = useForm({
    _token: csrf
  })

  return <>
    <Stack
      flex={{ base: 1, md: 0 }}
      justify={'flex-end'}
      direction={'row'}
    >
      {!user && (<>
        <Button colorScheme={'primary'} variant='link' mr={4} as={Link} href={'/login'} >
          Sign In
        </Button>

        <Button colorScheme={'primary'} as={Link} href={'/register'}>
          Sign Up
        </Button>
      </>)}
      {user && (<>
        <Flex alignItems={'center'}>
          <Menu >
            <MenuButton
              as={Button}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              minW={0}
            >
              <Avatar size={'sm'} />
            </MenuButton>
            <MenuList>
              <MenuItem
                as={Link}
                icon={<StoreIcon color={'gray.500'} fontSize={'18px'} />}
                href={storeUrl}
              >
                <Text>Store</Text>
              </MenuItem>
              <MenuItem
                as={Link}
                icon={<DashboardIcon color={'gray.500'} fontSize={'18px'} />}
                href={boardUrl}
              >
                <Text>Dashboard</Text>
              </MenuItem>
              <MenuDivider />
              <MenuItem
                icon={<LogoutIcon fontSize={'18px'} color={'red.500'} /> }
                onClick={() => post('/logout')}
              >
                <Text color={'red.500'}>Log Out</Text>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        {/* <Flex alignItems={'center'}>
          <Flex as={Link} href="/home" lineHeight={'18px'}  alignItems={'center'} mr={2}>
            <AccountIcon fontSize={'24px'} mr={2} />
            <Flex flexDirection={'column'}>
              <Text>{user.name}</Text>
              <Text color={'gray'} fontSize={'0.9rem'}>{user.email}</Text>
            </Flex>
          </Flex>

          <form onSubmit={handleSubmit}>
            
          </form>
        </Flex> */}
      </>)}
    </Stack>
  </>
}