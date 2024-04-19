import { ThemeProvider } from 'styled-components/native';
import { Routes } from './src/Routes/routes';
import theme from './src/styles/theme';
import { NativeBaseProvider } from 'native-base';

export default function App() {
  return (
    <NativeBaseProvider>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </NativeBaseProvider>
  );
}