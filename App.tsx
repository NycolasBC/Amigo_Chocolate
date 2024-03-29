import { ThemeProvider } from 'styled-components/native';
import { Routes } from './src/Routes/routes';
import theme from './src/styles/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}