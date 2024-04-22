import { ThemeProvider } from 'styled-components/native';
import { Routes } from './src/Routes/routes';
import theme from './src/styles/theme';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </ThemeProvider>
  );
}