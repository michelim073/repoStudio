import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Cursos, TradicionEnum } from '../../src/models'
import { DataStore } from 'aws-amplify/datastore'
import { FlatList } from 'react-native-gesture-handler'
import CursosItemList from '../componentes/CursosItemList'
import MenuAnimado from '../screens/menus/MenuAnimado'
import { Link, Stack, router } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import { useCallback, useMemo, useRef } from 'react';
import BottomSheet, { useBottomSheetModal } from '@gorhom/bottom-sheet';

type Props = {}

const cursos = (props: Props) => {
    const [cursos, setCursos] = useState<Cursos[]>([]);
    const [index, setIndex] = useState<number>(0)
    const [nombre, setNombre] = useState<string>()
    const [descripcion, setDescripcion] = useState<string>()
    const [isVisible, setIsVisible] = useState(true);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const arrayCategoria = ['IFA', 'OLORISA']
    const [categories, setCategories] = useState<string>('IFA');
    const [tradicion, setTradicion] = useState<string>('Afrocubana');
    const arrayTradicion = ['Afrocubana', 'Isese']
   const [error, setError] = useState<string>()


    useEffect(() => {
        const sub = DataStore.observeQuery(Cursos)
            .subscribe(({ items }) => {
                setCursos(items);
                setIndex(items.length + 1)
            });
        return () => {
            sub.unsubscribe();
        };
    }, []);

    const creaCurso = async () => {
        if (!nombre || !descripcion) {
            setError('Todos los campos son obligatorios')
            return
        }
        try {
             const _curso = await DataStore.save(
                new Cursos({
                index: index,
                nombre: nombre,
                descripcion: descripcion,
                imageCover: '',
                categoria: categories,
                tradicion: tradicion,
            })
        );  
                clearState()
                handleClosePress()
                
        } catch (error:any) {
            console.log(error)
            setError(error.toString())
        }          
    }

    const deleteCurso = async (id: string) => {
        try {
            const curso = await DataStore.delete(Cursos, (c)=> c.id.eq(id))
        console.log(curso)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteCursoAlert = (id:string, nombre: string) =>
    Alert.alert('Alerta',
     `Se va a eliminar el curso ${nombre} , esta seguro?, se eliminara de forma Permanente...`,
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () =>deleteCurso(id)},
    ]);


    const clearState = () => {
        setNombre('')
        setDescripcion('')
        setError('')
    }

    const handleClosePress = useCallback(() => {
        clearState()
        bottomSheetRef?.current?.close()
       
    }, [])
    const handleExpandPress = () => bottomSheetRef?.current?.expand();
    // variables
    const snapPoints = useMemo(() => ['100%'], []);

    const handleSheetChanges = useCallback((index: number) => {
    }, [])
         
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
                    renderItem={({ item }) => <CursosItemList infoCurso={item}  deleteCursoAlert={deleteCursoAlert} />} 
                    />
           <BottomSheet
               ref={bottomSheetRef}
               index={-1}
               snapPoints={snapPoints}
               onChange={handleSheetChanges}
               enablePanDownToClose={false}
               style={{ paddingTop: 5}}
           >
            
               <ScrollView showsVerticalScrollIndicator={false} style={styles.contentContainerBottom}>
                 <View style={styles.cajaInputs}>
                   <Text style={{textAlign:'center',fontSize:16,fontWeight:'bold', paddingVertical:20}}>Crear Curso</Text>
                  
                  <View style={{marginVertical:10}} >
                   <Text>Curso Numero</Text>
                    <Text style={styles.TextInput}>{index}</Text>
                     </View>

                    <View style={{marginVertical:10}} >
                     <Text>Nombre del Curso</Text>
                   <TextInput style={styles.TextInput} 
                    placeholderTextColor={'gray'}
                    placeholder='Nombre del curso'
                    onChangeText={(text) => setNombre(text) }
                    value={nombre}
                    />
                    </View>

                    <View style={{marginVertical:10}} >
                   <Text>Descripcion del Curso</Text>
                   <TextInput style={styles.TextInput} 
                    placeholderTextColor={'gray'}
                    placeholder='Descripcion Corta'
                    onChangeText={(text) => {setDescripcion(text)}}
                    value={descripcion}
                    />
                  </View>
                  <View style={{marginVertical:10}} >
                   <Text>Categoria</Text>
                      <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:15,alignItems:'center' }}>
                        <Text style={{fontSize:20, fontWeight:'600'}}>{categories}</Text>
                        <View style={{flexDirection:'row'}}>
                        {arrayCategoria.map((item, index) => {
                            return( 
                                <View key={index} style={{ borderRadius:5, borderWidth:1, borderColor:'lightgray',padding:5, margin:5}}>
                                <Text onPress={()=> {setCategories(item)}} key={index} style={{textAlign:'center'}}>{item}</Text>
                              </View> )
                        })}  
                       </View>
                        </View>
                    </View>

                    <View style={{marginVertical:10}} >
                        <Text>Tradicion</Text>
                        <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:15,alignItems:'center' }}>
                        <Text style={{fontSize:20, fontWeight:'600'}}>{tradicion}</Text>
                        <View style={{flexDirection:'row'}}>
                        {arrayTradicion.map((item, index) => {
                            return( 
                                <View key={index} style={{ borderRadius:5, borderWidth:1, borderColor:'lightgray',padding:5, margin:5}}>
                                <Text onPress={()=> {setTradicion(item)}} key={index} style={{textAlign:'center'}}>{item}</Text>
                              </View> )
                        })}  
                       </View>
                        </View>
                
                  </View>
                  <View style={{flexDirection:'row', justifyContent:'space-between', 
                 marginTop:20,
                  marginHorizontal:50,
                  borderWidth:1,
                  borderColor:'lightgray',
                  borderRadius:10,
                  padding:10,
                  alignItems:'center',
                  }}>
                  <Text onPress={creaCurso} style={{fontWeight:'600', fontSize:20}}>Guardar</Text>
                  <Text onPress={()=>handleClosePress()} style={{fontWeight:'600', fontSize:20}}>Cerrar</Text>
                  </View>
                  {error && <Text style={{textAlign:'center', color:'red'}}>{error}</Text>}
                
                 </View>
               </ScrollView>
           </BottomSheet>
            </View>
        </>
        )
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
        marginVertical:10,
    },
    styleSelectable:{
        borderWidth:1,
        borderColor:'lightgray',
        borderRadius:5,
       
        maxWidth:'40%',
     
        paddingHorizontal:5,
        justifyContent:'center'
    },
})