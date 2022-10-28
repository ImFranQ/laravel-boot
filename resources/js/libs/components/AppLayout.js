import { usePage } from "@inertiajs/inertia-react"
import { useEffect } from "react"
import { AlertLayout } from "./Alerts"
import { useToast } from "@chakra-ui/react"

export default ({children}) => {
  const toast = useToast()
  const { props } = usePage()
  const { alert, errors } = props
  
  const showAlert = (type, message) => toast({
    position: 'bottom-right',
    containerStyle: {
      minWidth: '400px'
    },
    render: () => (
      <AlertLayout 
        {...{ type: type, message: message}} 
        onClose={() => toast.closeAll()} 
      />
    ),
  })

  useEffect(() => {
    if (alert) showAlert(alert.type, alert.message)
    Object.values(errors).forEach(error => showAlert('danger', error))
  }, [alert, errors])

  return (
    <>
      {children}
    </>
  )
}
