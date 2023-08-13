import Router from '@components/Router/Router';
import { persistor, store } from '@store/index';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#333333',
    },
    secondary: {
      main: '#EAEAEA',
    },
  },
  typography: {
    fontFamily: 'Monserrat, Helvetica, Arial, sans-serif',
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
