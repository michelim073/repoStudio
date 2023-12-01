import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Stack } from 'expo-router';
import React from 'react';
import { Pressable, useColorScheme } from 'react-native';

export default function Layout() {

    return (
        <Stack>
            <Stack.Screen name="SignIn"  options={{ headerShown: true }} />
            
          
        </Stack>
    )


}