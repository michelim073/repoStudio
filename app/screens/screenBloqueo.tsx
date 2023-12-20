import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const screenBloqueo = () => {
  return (
    <>
    <Stack.Screen options={{headerShown:false}}/>
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Esta usted Bloqueado</Text>
    </SafeAreaView>
    </>
  )
}

export default screenBloqueo

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
      },
})