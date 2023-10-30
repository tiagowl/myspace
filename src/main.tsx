import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import RoutesApp from './Routes.tsx'
import { FinancesProvider } from './contexts/Finances.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <FinancesProvider>
        <RoutesApp />
      </FinancesProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
