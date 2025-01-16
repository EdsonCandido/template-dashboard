import { ChakraProvider } from '@chakra-ui/react'
import { ThemeProvider } from "next-themes"
import { BrowserRouter } from 'react-router-dom'
import RoutesAplication from './routes'
import AppProvider from './provider'
import { Slide, ToastContainer } from 'react-toastify'

import { devextremeMessages } from "./utils/devextremePtBr";

import { locale, loadMessages } from 'devextreme/localization';

import 'react-toastify/dist/ReactToastify.min.css';
// import 'rsuite/dist/rsuite.min.css';
import 'devextreme/dist/css/dx.softblue.css';
import { CustomProvider } from 'rsuite'
import { ptBR } from 'rsuite/locales';
import theme from './theme'
loadMessages(devextremeMessages);
locale('pt-BR');

function App() {

  return (
    <BrowserRouter basename='/template-dashboard'>
      <ChakraProvider theme={theme} >
        <CustomProvider locale={ptBR}>
          <ThemeProvider attribute="class" disableTransitionOnChange>
            <AppProvider>
              <ToastContainer position="top-right" autoClose={5000} pauseOnFocusLoss={true} theme='light' style={{ fontSize: '12px' }}
                draggable={true} transition={Slide} />
              <RoutesAplication />
            </AppProvider>
          </ThemeProvider>
        </CustomProvider>
      </ChakraProvider>
    </BrowserRouter>
  )
}

export default App
