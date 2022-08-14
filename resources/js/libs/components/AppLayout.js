import { usePage } from "@inertiajs/inertia-react"
import { useEffect } from "react"
import { useAlert } from "./Alerts"

export default ({children}) => {

  const { props } = usePage()
  const { alert } = props
  const { dispatchAlert } = useAlert()

  useEffect(() => {
    // if (alert) dispatchAlert(alert.type, alert.message)
  }, [alert])

  return (
    <>
      {children}
    </>
  )
}
