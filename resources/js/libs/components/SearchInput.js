import { Button, chakra,FormControl, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { useForm, usePage } from "@inertiajs/inertia-react"
import { BiSearch } from 'react-icons/bi'

const SearchIcon = chakra(BiSearch)

export default () => {
  const { searchUrl, query } = usePage().props

  const {data, setData, get} = useForm({
    query : query ?? ''
  })
  
  const submitHandler = (e) => {
    e.preventDefault()
    if (data.query) get(searchUrl)
  }

  return (
    <form onSubmit={submitHandler}>
      <FormControl minW={'400px'}>
        <InputGroup>
          <Input 
            placeholder="Search" 
            value={data.query}
            onChange={e => setData('query', e.target.value)}
          />
          <InputRightElement w={12} as={Button} variant={'link'} type={'submit'}>
            <SearchIcon />
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </form>
  )
}