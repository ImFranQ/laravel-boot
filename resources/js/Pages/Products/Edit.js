import { useForm } from '@inertiajs/inertia-react'
import EditorLayout from '../../libs/components/EditorLayout'
import FrameBoard from '../../libs/components/FrameBoard'

export default ({ csrf, updateUrl, product }) => {

  const { data, setData, patch, processing, errors, clearErrors, isDirty } = useForm({
    title: product.title,
    description: product.description,
    price: product.price,
    parent_id: product.parent_id,
    category_id: product.category_id,
    files: product.files ?? [],
    _token: csrf
  })

  const handleSubmit = () => {
    patch(updateUrl)
  }

  const handleInput = (name, value) => {
    clearErrors(name)
    setData(name, value)
  }

  return (
    <FrameBoard
      fullScreen={true}
    >
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