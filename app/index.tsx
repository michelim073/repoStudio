import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuthenticator } from '@aws-amplify/ui-react-native';
import { Redirect } from 'expo-router';

const index = () => {
    const { authStatus } = useAuthenticator(context => ([context.authStatus]));

    if (authStatus === 'unauthenticated') {
     return <Redirect href="/(auth)/signIn" />
    }
 
}

export default index

const styles = StyleSheet.create({})