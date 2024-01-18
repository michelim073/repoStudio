import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { User } from "../../../src/models";

type Props = {
  usrItem: User;
};

const ListItemsSuscriptions = (usrItem: Props) => {
  console.log(usrItem);
  return (
    <View style={{}}>
      <View style={styles.boxUser}>
        <Image
          style={{ width: 60, height: 60, borderRadius: 30 }}
          source={{ uri: usrItem.usrItem?.item?.imageUser }}
        />
        <Text>{usrItem.usrItem.item.name}</Text>
      </View>
    </View>
  );
};

export default ListItemsSuscriptions;

const styles = StyleSheet.create({
  boxUser:{
    backgroundColor:'white',
    maxWidth:80,
    borderRadius:6,
  }
});
