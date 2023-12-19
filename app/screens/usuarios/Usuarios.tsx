import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { User } from '../../../src/models'
import { useAuthenticator } from '@aws-amplify/ui-react-native';
import { DataStore, SortDirection } from 'aws-amplify/datastore';
import ListItemUsers from './ListItemUsers';
import { Stack } from 'expo-router';

const Usuarios = () => {
const [users, setUsers] = useState<User[]>([]);
const {user} = useAuthenticator((context) => [context.user]);
const [userCount, setUserCount] = useState(0);


useEffect(() => {  
  const sub =DataStore.observeQuery(User)
  .subscribe(({ items }) => {
   setUsers(items);
   setUserCount(items.length);
  });
  return () => {
    sub.unsubscribe();
  };
}, []);


  return (
    <>
    <Stack.Screen options={{
      title: 'Usuarios',
    }}/>
    <View>
      <Text style={{fontWeight:'bold', marginLeft:10}}>{'Usuarios: ' + userCount}</Text>
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