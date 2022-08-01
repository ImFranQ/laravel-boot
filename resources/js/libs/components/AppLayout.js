import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, CloseButton, useToast } from "@chakra-ui/react"
import { usePage } from "@inertiajs/inertia-react"
import { useEffect } from "react"

export default ({children}) => {

  const { props } = usePage()
  const { alert } = props
  const toast = useToast()

  useEffect(() => {

    if (alert) toast({
      position: 'bottom-right',
      containerStyle: {
        minWidth: '400px'
      },
      render: () => (
        <Alert status={alert.type} borderRadius={4} flex={'display'}>
          <AlertIcon />
          <Box>
            <AlertTitle>{alert.type.replace(/^./, str => str.toUpperCase())}!</AlertTitle>
            <AlertDescription>
              {alert.message}
            </AlertDescription>
          </Box>
          <CloseButton
            ml={'auto'}
            alignSelf='flex-start'
            position='relative'
            right={-1}
            top={-1}
            onClick={() => toast.closeAll()}
          />
        </Alert>
      ),
    })
  }, [alert])

  return (
    <>
      {children}
    </>
  )
}