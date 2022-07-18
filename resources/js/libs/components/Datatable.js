import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button, Flex, chakra } from '@chakra-ui/react'
import { Link } from '@inertiajs/inertia-react'
import { FaChevronLeft, FaChevronRight} from 'react-icons/fa'

const LeftIcon = chakra(FaChevronLeft)
const RightIcon = chakra(FaChevronRight)

export default ({ data, headers, options }) => {
  const props = Object.keys(headers)
  const heads = Object.values(headers)

  return (
    <>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              {props.map((key, index) => (
                <Th key={index} {...options[key]?.props}>
                  {typeof headers[key] != 'string' ? headers[key].title : headers[key]}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data.data.map((item, key) => (
              <Tr key={key}>
                {props.map((prop, key) => (
                  <Td key={key} >
                    {typeof headers[prop] != 'string' ? headers[prop].render(item) : item[prop]}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Flex mt={4}>
        {data.links.map((link, key) => (
          <Button
            key={key} 
            size='sm'
            as={Link} 
            href={link.url}
            disabled={!link.url}
            colorScheme={'blue'}
            variant={link.active ? 'solid' : 'outline'}
            mr={2}
          >
            {key == 0 && (<LeftIcon />)}
            {key != 0 && key != data.links.length - 1 && link.label}
            {key == data.links.length -1 && (<RightIcon />)}
          </Button>
        ))}
      </Flex>
    </>
  )
}