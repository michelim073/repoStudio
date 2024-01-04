import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ChatRoomClases, MessagesClase } from '../../../src/models'
import { DataStore, SortDirection } from 'aws-amplify/datastore'
import { Stack, useLocalSearchParams } from 'expo-router'
import MessageInputChats from '../messagesInput/MessageInputChats'
import ItemListMessage from './ItemListMessage'



type Props = {}

const ChatsClases = (props: Props) => {
  const param:any = useLocalSearchParams();
  const [messages, setMessages] = useState<MessagesClase[]>([]);
  
  //console.log(param)

  useEffect(() => {
    const subscriptio = DataStore.observeQuery(MessagesClase ,(c) => c.chatroomclasesID.eq(param?.chatRoom),
    {sort: d => d.createdAt(SortDirection.ASCENDING)})
    .subscribe(msg => {
      setMessages(msg.items)
    })
    return () => {
      subscriptio.unsubscribe()
    }
}, [])

  return (
    <View style={styles.container}> 
    <Stack.Screen options={{title: `Chats Clase`}}/>
      <FlatList
        contentContainerStyle={{gap:5, marginHorizontal:20}}
        data={messages}
        renderItem={({ item }) => (<ItemListMessage item={item}/>)}
        showsVerticalScrollIndicator={false}
      /> 
      <MessageInputChats chatroomInfo = {param?.chatRoom}/>
    </View>
  )
}

export default ChatsClases

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
  },
})