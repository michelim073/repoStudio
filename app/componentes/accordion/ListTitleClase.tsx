import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Clases } from '../../../src/models';
import { Swipeable } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { DataStore } from 'aws-amplify/datastore';


type Props = {
    clasesTitle: Clases;
}


const ListTitleClase = ({clasesTitle }:Props) => {

    const goClase = (id: any) => {
        router.push({ pathname: `/screens/clases/ClasesScreen`, params: { id: id , nombre: clasesTitle?.titulo, chatRoom:clasesTitle?.clasesChatRoomClasesId} });
      }
      const eliminarClase = async (id: any) => {
   
          try {
            const curso = await DataStore.delete(Clases, (c)=> c.id.eq(id))
        } catch (error) {
            console.log(error)
        }
      }

    const renderRightActions = (progress: any, dragX: any, id:any) => {
        const scale = dragX.interpolate({
          inputRange: [-100, 0],
          outputRange: [0.5, 0],
          extrapolate: 'clamp',
        })
        return (
          <TouchableOpacity style={{backgroundColor:'#cfe9d0'}}>
            <Animated.View>
              <FontAwesome onPress={()=> eliminarClase(clasesTitle.id)} name="trash-o" size={22} color="#e02131" style={{marginRight:25}} />
            </Animated.View>
          </TouchableOpacity>
        )
      }

    
  return ( 
  <View style={styles.content}>
    <Swipeable 
    enabled={true}
    friction={4}
    renderRightActions={renderRightActions}>
      <Text style={styles.textContent} onPress={()=> goClase(clasesTitle.id)}>{clasesTitle.titulo}</Text>
   
    </Swipeable>
     </View>
  )
}

export default ListTitleClase

const styles = StyleSheet.create({
    content: {
        padding: 5,
        backgroundColor: '#cfe9d0',
        borderWidth: 1,
        borderColor: 'lightgray',
      },
      textContent: {
        fontSize: 16,
        color: 'black',
      },
})