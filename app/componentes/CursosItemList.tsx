import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Cursos } from '../../src/models'
import { router } from 'expo-router';

type Props = {
    infoCurso: Cursos; 
   
}

const CursosItemList = ({infoCurso}: Props) => {

    const handlePress = () => {
       
        // router.push('/screens/modulos/Modulos')
        router.push({ pathname: `/screens/modulos/Modulos`, params: {id:infoCurso.id}}); 
    }

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
    <View style={styles.container}>
        <View style={styles.titulo}>
             <Text style={{fontWeight:'bold', fontSize:24}}>{infoCurso.nombre}</Text>
             <Text style={{fontWeight:'bold', fontSize:14}}>{`Categoria: ${infoCurso.categoria}`}</Text>
        </View>
             <Text style={{fontWeight:'bold', fontSize:16, marginHorizontal:16}}>{infoCurso.descripcion}</Text>
             <Text style={{fontWeight:'bold', fontSize:12, marginHorizontal:12, alignSelf:'flex-end', marginBottom:7}}>{`Tradicion: ${infoCurso.tradicion}`}</Text>
     
    </View>
    </TouchableOpacity>
  )
}

export default CursosItemList

const styles = StyleSheet.create({
    container:{
        
        backgroundColor:'lightgray',
        borderRadius:8,
        marginHorizontal:10,
        gap:5,

    },
    titulo:{
        flexDirection: 'row',
         justifyContent:'space-between',
          marginHorizontal:10,
          padding:10,
         
    }
})