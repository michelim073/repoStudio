import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Cursos } from '../../src/models'
import { DataStore } from 'aws-amplify/datastore'
import { FlatList } from 'react-native-gesture-handler'
import CursosItemList from '../componentes/CursosItemList'
import MenuAnimado from '../screens/menus/MenuAnimado'
import { Link, Stack, router } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import { useCallback, useMemo, useRef } from 'react';
import BottomSheet, { useBottomSheet } from '@gorhom/bottom-sheet';

type Props = {}

const cursos = (props: Props) => {
    const [cursos, setCursos] = useState<Cursos[]>([]);
    const [isVisible, setIsVisible] = useState(true);
    const bottomSheetRef = useRef<BottomSheet>(null);


    useEffect(() => {
        const sub = DataStore.observeQuery(Cursos)
            .subscribe(({ items }) => {
                setCursos(items);
            });
        return () => {
            sub.unsubscribe();
        };
    }, []);

    const handleClosePress = () => bottomSheetRef?.current?.close();
    const handleExpandPress = () => bottomSheetRef?.current?.expand();
    // variables
    const snapPoints = useMemo(() => ['100%'], []);

    const handleSheetChanges = useCallback((index: number) => {
       
    }, []);

    return (
        <>
            <Stack.Screen options={{
        
                headerRight: () =>(
                    <Pressable onPress={handleExpandPress}>
                        {isVisible && <FontAwesome name='plus-circle' size={25} color={'gray'} style={{marginRight:20}}/>}
                    </Pressable>
                )
            }} />
            <View style={styles.container}>
                <Text style={{ marginLeft: 40 }}>Entrenamientos Disponibles</Text>
                <FlatList
                    data={cursos}
                    renderItem={({ item }) => <CursosItemList infoCurso={item} />} 
                    />


           <BottomSheet
               ref={bottomSheetRef}
               index={-1}
               snapPoints={snapPoints}
               onChange={handleSheetChanges}
               enablePanDownToClose={true}
               style={{ paddingTop: 5}}
           >
               <View style={styles.contentContainerBottom}>
                 <View style={styles.cajaInputs}>
                   <Text style={{textAlign:'center',fontSize:16,fontWeight:'bold', paddingVertical:20}}>Crear Curso</Text>
                  
                   <Text>Curso Numero</Text>
                   <TextInput style={styles.TextInput} 
                    placeholderTextColor={'gray'}
                    placeholder='Curso Numero'
                    keyboardType='number-pad'
                    /> 
                     <Text>Nombre del Curso</Text>
                   <TextInput style={styles.TextInput} 
                    placeholderTextColor={'gray'}
                    placeholder='Nombre del curso'
                    
                    />
                   <Text>Descripcion del Curso</Text>
                   <TextInput style={styles.TextInput} 
                    placeholderTextColor={'gray'}
                    placeholder='Descripcion Corta'
                    
                    />
                  
                   <Text>Categoria</Text>
                   <TextInput style={styles.TextInput} 
                    placeholderTextColor={'gray'}
                    placeholder='Categoria'
                    />
                      <Text>Tradicion</Text>
                   <TextInput style={styles.TextInput} 
                    placeholderTextColor={'gray'}
                    placeholder='Tradicion'
                    
                    />
               
                 </View>
               </View>
           </BottomSheet>
            </View>
        </>)

}

export default cursos

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    contentContainerBottom: {
        flex: 1,   
        backgroundColor: 'white',
    },
    TextInput:{
        borderWidth:1,
        height:40,
        borderColor:'lightgray',
        marginVertical:5,
        borderRadius:5,
        paddingHorizontal:5,
        fontSize:16,
        
    },
    cajaInputs:{
        marginHorizontal:15,
    }
})