import { Button, Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { FaMinus, FaPlus } from "react-icons/fa"

export default ({ onChange, value:initialValue, ...other }) => {

  const [value, setValue] = useState(initialValue ?? 1)

  let timer;

  const valueHandler = (value) => {
    setValue(value ? value : 1)
  }
  
  useEffect(() => {
    timer = setTimeout(() => {
      onChange ? onChange(value) : null
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [value])

  return (
    <InputGroup {...other}>
      <InputLeftElement>
        <Button size={'sm'} ml={1} onClick={() => valueHandler(parseInt(value) -1)} >
          <FaMinus />
        </Button>
      </InputLeftElement>

      <Input 
        value={value} px={2} 
        textAlign={'center'} 
        onChange={(e) => valueHandler(parseInt(e.target.value))} 
      />

      <InputRightElement>
        <Button size={'sm'} mr={1} onClick={() => valueHandler(parseInt(value) +1)}>
          <FaPlus />
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}