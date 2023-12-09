import { StyleSheet } from 'react-native';
import { useAuthenticator } from '@aws-amplify/ui-react-native';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { Button } from 'react-native'
import { DataStore } from 'aws-amplify/datastore';
import { User } from '../../src/models';
import { useEffect, useState } from 'react';
import { generateClient,GraphQLQuery } from 'aws-amplify/api';
import { createPaymentIntent,  } from '../../src/graphql/mutations';

export default function TabOneScreen() {
const [amount, setAmount] = useState(5500)
  const [usr, setUsr] = useState();

  const client = generateClient();
  useEffect(() => {
    /**
     * This keeps `post` fresh.
     */
    const sub = DataStore.observeQuery(User).subscribe(({ items }) => {
      setUsr(items);
    });

    return () => {
      sub.unsubscribe();
    }
  }, []);

  const fetchPaymentIntent = async () => { 
    const res = await client.graphql({ query: createPaymentIntent, variables: { amount } } )
   console.log(res)
  }
  

  function SignOutButton() {
    const { signOut } = useAuthenticator();
    return <Button title="Sign Out" onPress={signOut} />;
  }
  console.log(usr)
  return (
    <View style={styles.container}>
      <SignOutButton />
      <Text style={styles.title}>Tab One</Text>
      <Text onPress={fetchPaymentIntent}>consulta</Text>
      {usr && usr.map((user:any) => <Text key={user.id}>{user.name}</Text>)}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
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
