import { Button, Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react"
import { useState } from "react"
import { FaMinus, FaPlus } from "react-icons/fa"

export default ({ onChange, ...other }) => {

  const [value, setValue] = useState(1)

  const valueHandler = (value) => {

    setValue(value ? parseInt(value) : 1)
    onChange ? onChange(value) : null
  }

  return (
    <InputGroup {...other}>
      <InputLeftElement>
        <Button size={'sm'} ml={1} onClick={() => valueHandler(value -1)} >
          <FaMinus />
        </Button>
      </InputLeftElement>

      <Input 
        value={value} px={2} 
        textAlign={'center'} 
        onChange={(e) => valueHandler(e.target.value)} 
      />

      <InputRightElement>
        <Button size={'sm'} mr={1} onClick={() => valueHandler(value +1)}>
          <FaPlus />
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}