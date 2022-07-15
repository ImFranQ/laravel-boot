import { Text, Container, Stack, Button } from '@chakra-ui/react'
import Navbar from '../libs/components/Navbar'
import { Link } from '@inertiajs/inertia-react'

export default ({ appName }) => {
  return (
    <>
      <Navbar appName={appName}
        end={
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
          >
            <Button colorScheme={'blue'} variant='link' mr={4} as={Link} href={'/login'} >
              Sign In
            </Button>

            <Button colorScheme={'blue'} as={Link} href={'/register'}>
              Sign Up
            </Button>
          </Stack>
        }
      />
      <Container 
        maxW='6xl' 
        bg={'gray.50'} 
        borderColor={'gray.200'} 
        borderWidth={1} 
        borderStyle={'solid'} 
        p={4} 
        my={4} 
        borderRadius={8}
      >
        <Text fontSize='xl'>Application Works!</Text>
      </Container>
    </>
  )
}