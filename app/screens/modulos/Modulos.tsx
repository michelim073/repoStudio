import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react'
import { ModulosCursos } from '../../../src/models'
import { DataStore } from 'aws-amplify/datastore'
import Accordion from '../../../app/componentes/accordion/Accordion';
import { useLocalSearchParams } from 'expo-router';

type Props = {}

const Modulos = () => {
    const [modulos, setModulos] = useState<ModulosCursos[]>([]);
        const param = useLocalSearchParams();
       const id : any = param.id;
      
    useEffect(() => {
        const sub = DataStore.observeQuery(ModulosCursos, c => c.cursosID.eq(id))
            .subscribe(({ items }) => {
                setModulos(items);
            });
        return () => {
            sub.unsubscribe();
        };
    }, []);
    
  
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>
      {modulos.map((value, index) => {
        return <Accordion value={value} key={index}/>;
      })}
    </ScrollView>
  </SafeAreaView>
  )
}

export default Modulos

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})