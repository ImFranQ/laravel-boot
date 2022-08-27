import { useForm } from '@inertiajs/inertia-react'
import FrameBoard from '../../libs/components/FrameBoard'
import EditorLayout from '../../libs/components/EditorLayout'

export default ({ csrf, storeUrl }) => {
  
  const { data, setData, post, processing, errors, clearErrors } = useForm({
    title: '',
    description: '',
    price: '',
    category_id: '',
    files: [],
    _token: csrf
  })

  const handleSubmit = () => {
    post(storeUrl)
  }

  const handleInput = (name, value) => {
    clearErrors(name)
    setData(name, value)
  }

  return (
    <FrameBoard>
      <EditorLayout
        data={data} 
        errors={errors}
        setData={handleInput}
        processing={processing}
        onSubmit={handleSubmit}
      />
    </FrameBoard>
  )
}