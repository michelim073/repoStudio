import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ContenidoClases } from "../../../src/models";
import { DataStore } from "aws-amplify/datastore";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import MessageInput from "../../componentes/messagesInput/MessageInput";

type Props = {};

const ClasesScreen = (props: Props) => {
  const [contenidos, setContenido] = useState<ContenidoClases[]>([]);
  const param = useLocalSearchParams();
  const id: any = param.id;
  const name: any = param.nombre;
  const chatRoom: any = param.chatRoom;

  useEffect(() => {
    const sub = DataStore.observeQuery(ContenidoClases, (c) =>
      c.clasesID.eq(id)
    ).subscribe(({ items }) => {
      setContenido(items);
    });
    return () => {
      sub.unsubscribe();
    };
  }, []);
// console.log(contenidos);
  return (
    <>
    <Stack.Screen options={{ 
        title: `Clase`,
        headerRight: () => (
          <View style={{flexDirection:'row'}}>
            <FontAwesome name="wechat" size={25} color={'gray'} 
            onPress={
                ()=> router.push({pathname:`/componentes/chatClases/ChatsClases`, params:{chatRoom:chatRoom}})}/>
          
          </View>
        ),
        
        }}/>
    <View style={styles.constiner}>
        
      <FlatList
        data={contenidos}
        renderItem={({ item }) => (
          <Text style={styles.titleClase}>{item.text}</Text>
        )}
      />
      <MessageInput />
    </View>
    </>
  );
};

export default ClasesScreen;

const styles = StyleSheet.create({
    constiner:{
        flex:1,
        
    },
  titleClase: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
