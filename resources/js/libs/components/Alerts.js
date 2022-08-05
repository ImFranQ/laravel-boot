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

export const useAlert = () => {
  const dispatchAlert = (type, message) => {
    const toast = useToast()

    toast({
      position: 'bottom-right',
      containerStyle: {
        minWidth: '400px'
      },
      render: () => (
        <AlertLayout {...{ type, message }} onClose={() => toast.closeAll()} />
      ),
    })
  }
  
  return { dispatchAlert }
}