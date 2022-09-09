import { usePage } from "@inertiajs/inertia-react"
import { useEffect } from "react"
import { AlertLayout } from "./Alerts"
import { useToast } from "@chakra-ui/react"

export default ({children}) => {
  const toast = useToast()
  const { props } = usePage()
  const { alert } = props
  
  useEffect(() => {
    if (alert) toast({
      position: 'bottom-right',
      containerStyle: {
        minWidth: '400px'
      },
      render: () => (
        <AlertLayout 
          {...{ type: alert.type, message: alert.message}} 
          onClose={() => toast.closeAll()} 
        />
      ),
    })
  }, [alert])

  return (
    <>
      {children}
    </>
  )
}
