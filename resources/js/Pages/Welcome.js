import { Text, Container, Stack, Button } from '@chakra-ui/react'
import Navbar from '../libs/components/Navbar'
import { Link } from '@inertiajs/inertia-react'
import AuthProfile from '../libs/components/AuthProfile'

export default ({ appName }) => {
  return (
    <>
      <Navbar 
        appName={appName}
        end={ <AuthProfile /> }
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