import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { ContenidoClases } from '../../../src/models'
import { DataStore } from 'aws-amplify/datastore'
import { useLocalSearchParams } from 'expo-router'

type Props = {}

const ClasesScreen = (props: Props) => {
    const [contenidos, setContenido] = useState<ContenidoClases[]>([]);
    const param = useLocalSearchParams();
    const id : any = param.id;
    useEffect(() => {
        const sub = DataStore.observeQuery(ContenidoClases, c => c.clasesID.eq(id))
            .subscribe(({ items }) => {
                setContenido(items);
            });
        return () => {
            sub.unsubscribe();
        };
    }, []);
console.log(contenidos)
  return (
    <View>
     <FlatList
        data={contenidos}
        renderItem={({item}) => <Text style={styles.titleClase}>{item.text}</Text>}
        keyExtractor={(item) => item.id}
       
      />
    </View>
  )
}

export default ClasesScreen

const styles = StyleSheet.create({
    titleClase:{
        fontSize: 14,
        fontWeight: 'bold',
      
    }
})