import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { supabase } from './lib/supabase-client';



export default function RootLayout() {

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
 
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace("/(tabs)/");
      } else {
        console.log("no user");
       
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace("/(tabs)/");
      } else {
        console.log("no user");
        router.replace("/(auth)/SignIn");
      }
    });
  }, []);
}

