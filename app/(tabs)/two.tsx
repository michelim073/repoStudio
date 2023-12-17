import { StyleSheet } from 'react-native';
import { useAuthenticator } from '@aws-amplify/ui-react-native';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import MenuAnimado from '../screens/menus/MenuAnimado';

export default function TabTwoScreen() {
  const {signOut } = useAuthenticator((context) => [context.user]);
  return (
    <View style={styles.container}>
      <Text onPress={signOut}>Sign Out</Text>
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
