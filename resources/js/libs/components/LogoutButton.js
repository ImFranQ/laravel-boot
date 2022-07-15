import { Button } from "@chakra-ui/react"
import { useForm, usePage } from "@inertiajs/inertia-react"

export default ({ appName }) => {

  const { csrf } = usePage().props

  const { post } = useForm({
    _token: csrf
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post('/logout')
  }

  return (
    <form onSubmit={handleSubmit}>
      <Button colorScheme={'blue'} type="submit" >
        Logout
      </Button>
    </form>
  )
}