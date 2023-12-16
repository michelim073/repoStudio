import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Cursos } from '../../src/models'
import { DataStore } from 'aws-amplify/datastore'
import { FlatList } from 'react-native-gesture-handler'
import CursosItemList from '../componentes/CursosItemList'

type Props = {}

const cursos = (props: Props) => {
    const [cursos, setCursos] = useState<Cursos[]>([]);

    useEffect(() => {
        const sub = DataStore.observeQuery(Cursos)
            .subscribe(({ items }) => {
                setCursos(items);

            });
        return () => {
            sub.unsubscribe();
        };
    }, []);

    console.log(cursos)
    return (
        <View style={styles.container}>
            <Text style={{marginLeft:40}}>Entrenamientos Disponibles</Text>
            <FlatList
                data={cursos}
                renderItem={({ item }) => <CursosItemList infoCurso={item}/>}/>
        </View>
    )
}

export default cursos

const styles = StyleSheet.create({
    container: {
        flex:1,
    }
})