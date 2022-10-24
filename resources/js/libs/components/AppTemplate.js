import { 
  Box,
  Center,
  Container,
  Text 
} from "@chakra-ui/react"
import { usePage } from "@inertiajs/inertia-react"
import AppNavbar from "./AppNavbar"

export default ({children}) => {
  const {appName} = usePage().props
  
  return (
    <>
      <AppNavbar
        appName={appName}
        // end={<AuthProfile />}
      />

      {children}

      <Box as={'footer'} borderTopWidth={'1px'}>
        <Container maxW={'7xl'} py={8}>
          <Center>
            <Text color={'gray.500'}>Copyrigth {appName}</Text>
          </Center>
        </Container>
      </Box>
    </>
  )
}