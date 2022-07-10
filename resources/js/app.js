import './bootstrap';

import React from 'react'
import { render } from 'react-dom'
import { createInertiaApp } from '@inertiajs/inertia-react'
import { ChakraProvider } from '@chakra-ui/react'

createInertiaApp({
  resolve: name => require(`./Pages/${name}`),
  setup({ el, App, props }) {
    render(
      <ChakraProvider>
        <App {...props} />
      </ChakraProvider> , el
    )
  },
})