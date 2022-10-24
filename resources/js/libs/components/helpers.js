import { chakra } from "@chakra-ui/react";

export const DecoratedTitle = chakra('h1', {
  baseStyle: {
    fontSize: '2xl',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    gridTemplateRows: '20px 0',
    gridGap: '22px',
    // py: 16,
    color: 'gray.500',
    _after: {
      content: '""',
      display: 'block',
      borderBottomStyle: 'solid',
      borderBottomWidth: '2px',
      borderBottomColor: 'primary.500',
      backgroundColor: '#f8f8f8'
    },
    _before: {
      content: '""',
      display: 'block',
      borderBottomStyle: 'solid',
      borderBottomWidth: '2px',
      borderBottomColor: 'primary.500',
      backgroundColor: '#f8f8f8'
    }
  }
})