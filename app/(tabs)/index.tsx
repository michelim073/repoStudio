import { StyleSheet } from 'react-native';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { Button } from 'react-native'
import { DataStore } from 'aws-amplify/datastore';
import { User } from '../../src/models';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';

export default function TabOneScreen() {
 const { signOut } = useAuthenticator(context => ([context.user]));
  const [usr, setUsr] = useState();
 

  useEffect(() => {
    const sub = DataStore.observeQuery(User).subscribe(( items ) => {
      setUsr(items);
    });
    return () => {
      sub.unsubscribe();
    }
  }, []);


  function SignOutButton() {
    return <Button title="Sign Out" onPress={signOut} />;
  }
 
  return (
    <View style={styles.container}>
      <SignOutButton />
      <Text style={styles.title}>Tab One</Text>
     
      <Text onPress={()=> router.push('/paymentCheckout')}>Pago Suscripcion</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
