import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'

const screenBloqueo = () => {
  return (
    <>
    <Stack.Screen options={{headerShown:false}}/>
    <SafeAreaView style={styles.container}>

    <MaterialIcons name="app-blocking" size={70} color="white" />
      <Text style={styles.text}>Bloqueado</Text>
      <Text style={{ fontWeight:'600', fontSize:15, color:'white'}}>Por Favor realice el pago de su Suscripcion</Text>
      <Text style={{ fontWeight:'600', fontSize:15, color:'white'}}>en el enlace sigiente</Text>
      <MaterialIcons name="payment" size={60} color="white" />
      <StatusBar style="light" />
    </SafeAreaView>
    </>
  )
}

export default screenBloqueo

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgb(234,81,89)'
    },
    text: {
        fontSize: 25,
        textAlign: 'center',
        color: 'white',
        margin: 10,
        fontWeight: 'bold',
      },
})