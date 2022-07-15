import React from 'react'
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react'
import { ChakraProvider } from '@chakra-ui/react'

createInertiaApp({
  resolve: name => require(`./Pages/${name}`),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <ChakraProvider>
        <App {...props} />
      </ChakraProvider>
    )
  },
})