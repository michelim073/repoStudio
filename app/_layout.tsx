import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme, Image } from 'react-native';
import { Authenticator } from '@aws-amplify/ui-react-native';
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../src/amplifyconfiguration.json';
import { DataStore } from 'aws-amplify/datastore';
import { StoreContext } from './store/storeContext';
import { useFonts, Inter_900Black, Inter_500Medium, Inter_800ExtraBold } from '@expo-google-fonts/inter';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import useAuthStore from './store/AuthUserStore';
import { View } from '../components/Themed';
Amplify.configure(amplifyconfig);

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
    Inter_900Black,
    Inter_500Medium,
    Inter_800ExtraBold ,
    ...FontAwesome.font,
  });

  async function loadResourcesAndDataAsync() {
    await DataStore.start()
  }
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      loadResourcesAndDataAsync()
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  const MyHeader = () =>{
    return(
      <View style={{alignContent:'center', alignItems:'center'}}>
        <Image 
       style={{height:160, width:160}}
       source={require("../assets/images/logoOlolaye.png") }
        />
      </View>
    )
  }

  return (
  
    <GestureHandlerRootView style={{ flex: 1 }}>  
    <StoreContext.Provider value={useAuthStore()}>
    <Authenticator.Provider>
      <Authenticator 
      signUpAttributes={['name']}
      Header={MyHeader}
      >
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
            <Stack.Screen name="modalCreaCurso" options={{ presentation: 'modal' }} />
          </Stack>
        </ThemeProvider>
      </Authenticator>
    </Authenticator.Provider>
    </StoreContext.Provider>
    </GestureHandlerRootView>
    
  );
}
