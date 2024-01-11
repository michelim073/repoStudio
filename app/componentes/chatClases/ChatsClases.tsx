import { FlatList, ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native'
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
  const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};
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

    <View style={{flex:1}}>
   
     <Stack.Screen options={{title: `Chats Clase`}}/>
   
        <KeyboardAvoidingView style={styles.container}
       
    behavior={Platform.OS === "ios" ? "padding" : undefined}
    keyboardVerticalOffset={100}
    >  
     <ImageBackground style={{flex:1}}resizeMode='cover' source={require('../../../assets/images/BG.png')}>
      <FlatList
        contentContainerStyle={{gap:5, marginHorizontal:20, paddingBottom:10}}
        data={messages}
        renderItem={({ item }) => (<ItemListMessage item={item}/>)}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets
      /> 
  </ImageBackground>
      <MessageInputChats chatroomInfo = {param?.chatRoom}/>
    </KeyboardAvoidingView>
    
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