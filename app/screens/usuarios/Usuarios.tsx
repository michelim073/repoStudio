import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { User } from '../../../src/models'
import { useAuthenticator } from '@aws-amplify/ui-react-native';
import { DataStore, SortDirection } from 'aws-amplify/datastore';
import ListItemUsers from './ListItemUsers';
import { Stack } from 'expo-router';
// import { useAuthStore } from '../../store/AuthUserStore';
import { useStoreContext } from '../../store/storeContext';
const Usuarios = () => {
// const store = useStoreContext()
const [users, setUsers] = useState<User[]>();

type Props = {
detailUser: User
}
useEffect(() => {
 
  const subscription = DataStore.observeQuery(User).subscribe(snapshot => {
    const { items, isSynced } = snapshot;
    //console.log(`[Snapshot] item count: ${items.length}, isSynced: ${isSynced}`);
   // console.log((items))
    setUsers(items)
  });
  return () => {
    subscription.unsubscribe()
  }
}, []);

if (!users) {
  return(
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <ActivityIndicator size="large" color="#5cdb3d" />
    </View>
  )
}
  return (
    <>
    <Stack.Screen options={{
      title: 'Usuarios',
    }}/>
    <View>
      <Text style={{fontWeight:'bold', marginLeft:10}}>{'Usuarios: ' + users.length}</Text>
      <FlatList
      data={users}
      renderItem={({item}) => (<ListItemUsers detailUser={item}/>)}
      contentContainerStyle={{gap: 5, paddingTop:10}}
    
      />
    </View>
    </>
  )
}
export default Usuarios

const styles = StyleSheet.create({})