import { Box, chakra, Flex, ListItem, Text } from "@chakra-ui/react"
import { FiChevronRight, FiTag} from 'react-icons/fi'

const EndIcon = chakra(FiChevronRight)
const StartIcon = chakra(FiTag)

const listItemProps = {
  as: Flex,
  px:4, py: 2,
  borderBottomWidth: 1,
  alignItems: 'center',
  bg: 'white',
  _last: { borderBottomWidth: 0, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 },
  _first: { borderTopLeftRadius: 8, borderTopRightRadius: 8 }
}

export default ({ title, ...others}) => {
  return (
    <ListItem {...others} {...listItemProps} >
      <Box mr={4}>
        <StartIcon color={'gray'} />
      </Box>
      <Box flex={{ base: 1 }} >
        {typeof title === 'string' && (
          <Text> {title} </Text>
        )}
      </Box>
      <Box ml={4}>
        <EndIcon color={'primary.500'} />
      </Box>
    </ListItem>
  )
}