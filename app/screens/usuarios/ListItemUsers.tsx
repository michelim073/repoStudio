import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const ListItemUsers = ({detailUser}) => {


  return ( 
    <Pressable onPress={() => console.log(detailUser.name)}>
     <View style={styles.container}>
    <Image style={{width:50, height:50, borderRadius: 25}}source={{ uri: detailUser.imageUser }} />
    <View style={styles.righBox} >
      <Text style={{fontWeight:'bold', fontSize:16}}>{detailUser.name}</Text>
      <Text style={{fontWeight:'bold', fontSize:12, color:'gray'}}>{detailUser.email}</Text>
    </View> 
    </View>
    </Pressable>
   
  )
}

export default ListItemUsers

const styles = StyleSheet.create({
    container:{
            flexDirection: 'row',
          
            marginHorizontal: 5,
    },
    righBox:{
      justifyContent: 'center',
      marginLeft: 5
    }
})