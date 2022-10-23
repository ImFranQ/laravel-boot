import { Box, Flex, List, ListItem, chakra, Img, Center, Text, Divider, Container } from "@chakra-ui/react"
import { Link, usePage } from "@inertiajs/inertia-react"
import AuthProfile from "./AuthProfile"
import Navbar from "./Navbar"
import { AiOutlineHome, AiOutlineTag, AiOutlineFile, AiOutlineSetting } from 'react-icons/ai'
import { FiUsers, FiShoppingCart, FiUserCheck, FiNavigation } from 'react-icons/fi'
import AppLayout from "./AppLayout"
import { useState } from "react"

const HomeIcon = chakra(AiOutlineHome)
const UsersIcon = chakra(FiUsers)
const TagIcon = chakra(AiOutlineTag)
const ProductIcon = chakra(FiShoppingCart)
const CustomerIcon = chakra(FiUserCheck)
const FileIcon = chakra(AiOutlineFile)
const SettingIcon = chakra(AiOutlineSetting)
const NavigationIcon = chakra(FiNavigation)

const menu = [
  { name: 'Home', link: '/home', icon: <HomeIcon /> },
  { name: 'Users', link: '/users', icon: <UsersIcon /> },
  { name: 'Categories', link: '/categories', icon: <TagIcon /> },
  { name: 'Products', link: '/products', icon: <ProductIcon /> },
  { name: 'Customers', link: '/customers', icon: <CustomerIcon /> },
  { name: 'Files', link: '/files', icon: <FileIcon /> },
  { 
    name: 'Pages',
    link: '/pages',
    icon: <NavigationIcon />,
    children: [
      { name: 'Home', link: '/pages/home' },
      { name: 'Term of services', link: '/pages/term-of-services' },
    ]
  },
  { name: 'Settings', link: '/settings', icon: <SettingIcon /> },
]

export default ({ children, footer, pageTitle, pageTitleEnd }) => {
  const { props, url } = usePage()
  const { appName, brandImage, urlSite } = props

  const urlActive = url.split('/')[1]
  const [menuActive, setMenuActive] = useState(
    menu.findIndex(item => item.link.match(urlActive))
  )

  const [showExpandible, setShowExpandble] = useState(null)

  return (
    <AppLayout>
      <Flex flexDirection={'column'} minH={'100vh'}>
        <Box flexGrow={1} as={Flex}>
          <Box 
            minW={'300px'} 
            w={'300px'} 
            borderRightColor={'gray.200'} 
            borderRightWidth={'1px'} 
            bg={'white'}
          >
            <Center p={4}>
              <Link href={urlSite}>
                <Img src={brandImage} alt={appName} w={'150px'} />
              </Link>
            </Center>

            <Divider mb={4} />

            <List p={2}>
              {menu.map((item, key) => (
                <Box
                  bg={item.children && (menuActive == key || showExpandible == key) ? 'gray.100' : 'transparent'}
                  borderRadius={8}
                  key={key}
                >
                  <ListItem
                    as={ item.children ? Box : Link}
                    href={item.link}
                    px={4} py={2} mb={2}
                    display={'block'}
                    borderRadius={8}
                    onClick={() => item.children ? setShowExpandble(showExpandible == key ? null : key) : null}
                    w={'100%'} cursor={'pointer'}
                    bg={menuActive == key || showExpandible == key ? 'primary.500' : ''} color={'gray'}
                    _hover={{
                      bg: menuActive == key || showExpandible == key ? 'primary.600' : 'gray.100',
                      color: 'gray.700'
                    }}
                  >
                    <Flex 
                      alignItems={'center'} 
                      color={menuActive == key || showExpandible == key ? 'white' : null}
                    >
                      {item.icon}
                      <Box ml={4}>{item.name}</Box>
                    </Flex>
                  </ListItem>
                  {(menuActive == key || showExpandible == key) && item.children?.length && (
                    <Box p={2}>
                      {item.children.map((child, key) => (
                        <ListItem
                          key={key}
                          as={Link} href={item.children?.length ?  child.link : ''}
                          px={4} py={2} mb={2}
                          display={'block'}
                          borderRadius={8}
                          bg={child.link.match(url) ? 'gray.200' : ''} color={'gray'}
                          _hover={{ bg: 'gray.300' }}
                        >
                          <Flex alignItems={'center'} >
                            <Box>{child.name}</Box>
                          </Flex>
                        </ListItem>
                      ))}
                    </Box>
                  )}
                </Box>
              ))}
            </List>

          </Box>
          <Box flexGrow={1}>
            <Flex
              minH={16}
              py={{ base: 2 }}
              px={{ base: 4 }}
              borderBottomWidth={1}
              bg={'white'}
              align={'center'}
            >
              <Navbar
                appName={appName}
                end={<AuthProfile />}
              />
            </Flex>
            <Container maxW={'6xl'} p={4}>
              {(pageTitle || pageTitleEnd) && (
                <Flex 
                  pb={2} mb={4} 
                  borderBottomWidth={'1px'} 
                  borderBottomColor={'gray.200'}
                  justifyContent={'space-between'}
                >
                  <Text fontSize='xl'>{ pageTitle }</Text>
                  <Box>{ pageTitleEnd }</Box>
                </Flex>
              )}

              <Box bg={'white'} p={4} mb={4} borderWidth={'1px'} borderRadius={8}>
                {children}
              </Box>
              
              {footer && (
                <>
                  <Divider mb={4} />
                  {footer}
                </>
              )}

            </Container>
          </Box>
        </Box>
      </Flex>
    </AppLayout>
  )
}