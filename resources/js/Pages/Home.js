import { Text, Container, Stack } from '@chakra-ui/react'
import Navbar from '../libs/components/Navbar'
import LogoutButton from '../libs/components/LogoutButton'

export default ({appName, user}) => {
  return (
    <>
      <Navbar 
        {...{appName}} 
        end={
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
          >
            <LogoutButton />
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
        <Text fontSize='xl'>Home Works!</Text>
      </Container>
    </>
  )
}