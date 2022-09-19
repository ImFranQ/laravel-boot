import React from 'react'
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider as ReduxProvider } from 'react-redux'
import store from './redux/store';
import theme, { primaryColor } from './theme';

import { InertiaProgress } from "@inertiajs/progress";

createInertiaApp({
  resolve: name => require(`./Pages/${name}`),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <ReduxProvider store={store}>
        <ChakraProvider theme={theme}>
          <App {...props} />
        </ChakraProvider>
      </ReduxProvider>
    )
  },
})

InertiaProgress.init({    
  color: primaryColor,
  showSpinner: false,
});