import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';
import 'core-js/full/symbol/async-iterator';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Redirect, Slot, SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, useColorScheme } from 'react-native';
import { Amplify } from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';
import { StripeProvider } from '@stripe/stripe-react-native';
import amplifyConfig from '../src/amplifyconfiguration.json';
Amplify.configure(amplifyConfig);

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {

    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return  <RootLayoutNav />
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();


  return (
 <Authenticator.Provider>
  <Authenticator signUpAttributes={['name']} >
    <StripeProvider publishableKey='pk_test_51NA10LCzT3rbKoNuXrLQmhhQUc0HuWmR3HYdj9aER5wiNTuHmdEn3Hm0mYohCd9BJdP4pcLj70S06KuzviarLPFE003FByOYvW'>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{headerShown:false}}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          <Stack.Screen name="paymentCheckout" options={{ headerShown: true }}  />
        </Stack>
      </ThemeProvider>
    </StripeProvider>
    </Authenticator>
     </Authenticator.Provider>
  );
}
