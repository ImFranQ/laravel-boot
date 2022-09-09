import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, CloseButton, useToast } from "@chakra-ui/react"

export const AlertLayout = ({type, message, onClose}) => {
  return (
    <Alert status={type} borderRadius={4} flex={'display'}>
      <AlertIcon />
      <Box>
        <AlertTitle>{type.replace(/^./, str => str.toUpperCase())}!</AlertTitle>
        <AlertDescription>
          {message}
        </AlertDescription>
      </Box>
      <CloseButton
        ml={'auto'}
        alignSelf='flex-start'
        position='relative'
        right={-1}
        top={-1}
        onClick={() => onClose ? onClose() : null}
      />
    </Alert>
  )
}