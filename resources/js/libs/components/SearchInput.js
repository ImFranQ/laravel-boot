import { Button, chakra,FormControl, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { BiSearch } from 'react-icons/bi'

const SearchIcon = chakra(BiSearch)

export default () => {
  return (
    <FormControl minW={'400px'}>
      <InputGroup>
        <Input placeholder="Search" />
        <InputRightElement w={12} as={Button} variant={'link'}>
          <SearchIcon />
        </InputRightElement>
      </InputGroup>
    </FormControl>
  )
}