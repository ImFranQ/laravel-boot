import { Head, usePage } from '@inertiajs/inertia-react'

export default ({ title, description }) => {

  const {defaultTitle, defaultDescription, appName} = usePage().props
  
  return (
    <Head>
      <title>{title ? `${title} | ${appName}` : defaultTitle}</title>
      <meta name="description" content={description ?? defaultDescription} />
    </Head>
  )
}