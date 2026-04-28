import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';


  // import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';



import { Provider } from 'react-redux';
import { store } from '@/store/store';

// const queryClient = new QueryClient();

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
   
    <Provider store={store}>
      {/* 
        
          <QueryClientProvider client={queryClient}> 
      */}
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
            <Stack.Screen name="user/[id]" options={{ title: 'User Details', headerBackTitle: 'Back' }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      {/* </QueryClientProvider> */}
    </Provider>
  );
}
