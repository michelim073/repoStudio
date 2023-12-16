import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { Stack, router, Link } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'

const chat = () => {
  return (
    <View style={{flex:1}}>
      <Stack.Screen options={{
        title: 'Chats',
        headerRight: () => (
          <Link href="/screens/usuarios/Usuarios" asChild>
          <Pressable>
            {({ pressed }) => (
              <FontAwesome
                name="user-plus"
                size={25}
                color={'gray'}
                style={{marginRight: 15}}
              />
            )}
          </Pressable>
        </Link>
        )
      }}/>
      <Text>chat</Text>
    </View>
  )
}

export default chat

const styles = StyleSheet.create({})