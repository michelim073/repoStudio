import { StyleSheet } from 'react-native';
import { useAuthenticator } from '@aws-amplify/ui-react-native';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import MenuAnimado from '../screens/menus/MenuAnimado';
import { useAuthStore } from '../store/AuthUserStore';
import { useEffect, useState } from 'react';
import { User } from '../../src/models';

type State = {
  userAuth: User;
}

export default function TabTwoScreen() {
  const {signOut} = useAuthenticator((context) => [context.user]);
  

  const setUserAuth = useAuthStore((state) => state.setAuthUser)
  const usr = useAuthStore((state) => state.user)


 


  return (
    <View style={styles.container}>
      <Text onPress={signOut}>Sign Out</Text>
      <Text>'Bienvenido: {usr[0].roleUser} </Text>
   
      <MenuAnimado/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
 
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
 
});
