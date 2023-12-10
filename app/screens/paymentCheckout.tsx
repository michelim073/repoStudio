import { Alert, StyleSheet, Text, View, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import { generateClient, GraphQLQuery } from 'aws-amplify/api';
import { createPaymentIntent, } from '../../src/graphql/mutations';
import { useStripe } from '@stripe/stripe-react-native';


const paymentCheckout = () => {
    const [amount, setAmount] = useState(55000)
    const [loading, setLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState<string | null>(null)
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const client = generateClient();

    useEffect(() => {
        fetchPaymentIntent()

    }, [])

    useEffect(() => {
        if (clientSecret) {
            iniciarPaymentSheet()
        }
    }, [clientSecret])

const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
}

    const fetchPaymentIntent = async () => {
        const res = await client.graphql({ query: createPaymentIntent, variables: { amount } })
        setClientSecret(res.data.createPaymentIntent.clientSecret)
    }

    const iniciarPaymentSheet = async () => {
        if (!clientSecret) {
            return
        }
        const { error } = await initPaymentSheet({
            merchantDisplayName:'egbe',
            paymentIntentClientSecret: clientSecret,
        });
        console.log('success')
        if (error) {
            Alert.alert(error.message)
        } else {
            setLoading(true)
        }
    }


    return (
        <View>
            <Text>paymentCheckout</Text>
            <Button
        disabled={!loading}
        title="Checkout"
        onPress={openPaymentSheet}
      />
        </View>
    )
}

export default paymentCheckout

const styles = StyleSheet.create({})