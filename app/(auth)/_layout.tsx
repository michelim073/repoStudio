import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Slot, Stack } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

export default function Layout() {

    return (
     <Stack>
        <Stack.Screen name="SignIn"  options={{ headerShown: true }}  />
     </Stack>
    )


}