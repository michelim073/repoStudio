import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { User } from "../../../src/models";

type Props = {
  value: User;
  suscribirUser:(id: string) => void
};

const ListUsersToSuscrip = ({value,suscribirUser }: Props) => {

 
 
  return (
    <Pressable onPress={()=>suscribirUser(value.item?.id)}>
      <View style={{ flexDirection: "row" }}>
        <Image
          style={{ width: 50, height: 50, borderRadius:25 }}
          source={{ uri: value?.item?.imageUser }}
        />
        <View style={{marginLeft:3}}>
          <Text style={styles.name}>{value?.item?.name}</Text>
          <Text style={styles.email}>{value?.item?.email}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ListUsersToSuscrip;

const styles = StyleSheet.create({
    name:{
        fontWeight:'900'
    },
    email:{
        fontWeight:'900',
        color:'gray'
    }
});
