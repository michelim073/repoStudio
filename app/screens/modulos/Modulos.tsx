import { StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList, Pressable, TextInput, Alert, Keyboard } from 'react-native'
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import { Clases, ModulosCursos, ChatRoomClases, Suscripciones } from '../../../src/models'
import { DataStore } from 'aws-amplify/datastore'
import Accordion from '../../../app/componentes/accordion/Accordion';
import { Stack, useLocalSearchParams } from 'expo-router';
import BottomSheet from '@gorhom/bottom-sheet';
import { FontAwesome } from '@expo/vector-icons';
import { useAuthenticator } from '@aws-amplify/ui-react-native';

type Props = {}

const Modulos = () => {
    const [modulos, setModulos] = useState<ModulosCursos[]>([]);
    const [error, setError] = useState<string>()
    const [isVisible, setIsVisible] = useState(true);
    const [index, setIndex] = useState<number>(0)
    const[ nombre, setNombre] = useState<string>()
    const[ costo, setCosto] = useState<number>(0)
    const [tituloClase, setTituloClase] = useState<string>()
    const [indexClase, setIndexClase] = useState<number>(0)
    const [idModulo, setIdModulo] = useState<any>()
    const bottomSheetRef = useRef<BottomSheet>(null);
    const bottomSheetRef1 = useRef<BottomSheet>(null);
   
        const param = useLocalSearchParams();
       const id : any = param.id;
       const { user} = useAuthenticator()
      
    useEffect(() => {
        const sub = DataStore.observeQuery(ModulosCursos, c => c.cursosID.eq(id))
            .subscribe(({ items }) => {
                setModulos(items);
                setIndex(items.length + 1)
            });
           
        return () => {
            sub.unsubscribe();
        };
    }, []);


    const crearModulo = async () => {
      if (!nombre || !costo) {
        setError('Todos los campos son obligatorios')
        return
    }
    try {
         const _curso = await DataStore.save(
            new ModulosCursos({
            index: index,
            nombre: nombre,
            costoModulo: costo,
            cursosID: id,
        })
    );  
            clearState()
            handleClosePress()
            
    } catch (error:any) {
        console.log(error)
        setError(error.toString())
    }     
    }

   const eliminarModulo = async (id: string) => {
    try {
      const curso = await DataStore.delete(ModulosCursos, (c)=> c.id.eq(id))
  } catch (error) {
      console.log(error)
  }
  clearState()
   }

   const deleteModuloAlert = (id:string) =>
   Alert.alert('Alerta',
    `Se va a eliminar el Modulo, esta seguro?, se eliminara de forma Permanente...`,
   [
     {
       text: 'Cancel',
       onPress: () => console.log('Cancel Pressed'),
       style: 'cancel',
     },
     {text: 'OK', onPress: () => eliminarModulo(id)},
   ]);


    const clearState = () => {
      setNombre('')
      setCosto(0)
      setError('')
  }

  const crearTituloClase = async () => {
    if (!tituloClase) {
      setError('Todos los campos son obligatorios')
      return
  }
  try { 
    const chatClases = await DataStore.save(
    new ChatRoomClases({})
  )
       const clase = await DataStore.save(
          new Clases({
          index: indexClase,
          titulo: tituloClase,
          moduloscursosID: idModulo,
          clasesChatRoomClasesId: chatClases?.id
      })
  );      Keyboard.dismiss()
          setTimeout(() => {
             handleClosePress1()
          },500);
          setIdModulo('')
          setTituloClase('')
          setIndexClase(0)
          
  } catch (error:any) {
      console.log(error)
      setError(error.toString())
  }     
  }

    const handleClosePress = useCallback(() => {
      bottomSheetRef?.current?.close()
      clearState()
    }, [])
    const handleClosePress1 = useCallback(() => { 
      Keyboard.dismiss()
      setTituloClase('')
      setIdModulo('')
      setTimeout(() => {
      bottomSheetRef1?.current?.close()
     }, 500);
    }, [])
    const handleExpandPress = () => bottomSheetRef?.current?.expand();

    const handleExpandPress1 = useCallback((idm:string) => {
      bottomSheetRef1?.current?.expand()
      setIdModulo(idm)
    },[])
    // variables
    const snapPoints = useMemo(() => ['100%'], []);
    const snapPoints1 = useMemo(() => ["100%"], []);
    const handleSheetChanges = useCallback((index: number) => {
    }, [])
  
  return (
    <SafeAreaView style={styles.container}>
     <Stack.Screen options={{
                headerRight: () =>(
          <Pressable onPress={handleExpandPress}>
            {isVisible && <FontAwesome name='plus-circle' size={25} color={'gray'} style={{marginRight:20}}/>}
          </Pressable>
                )
            }} />
    <FlatList
        data={modulos}
        renderItem={({item}) => <Accordion value={item} deleteModuloAlert={deleteModuloAlert}
        handleExpandPress1={handleExpandPress1} />}
      />
      <BottomSheet
      ref={bottomSheetRef1}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={false}
      style={{ paddingTop: 5 }}
      >
       <View style={styles.cajaInputs}>
                   <Text style={{textAlign:'center',
                   fontSize:16,
                   fontWeight:'bold',
                   paddingVertical:20}}>Crear Clase</Text>
                  
                  <View style={{ width:50, }} >
                   <Text>Clase</Text>
                    <Text style={[styles.TextInput,{alignItems:'center'}]}>{indexClase}</Text>
                  </View>
                  <View style={{marginVertical:10}} >
                  <Text>Titulo de la Clase</Text>
                  <TextInput style={styles.TextInput} 
                    placeholderTextColor={'gray'}
                    placeholder='Titulo Clase'
                    onChangeText={(text) => setTituloClase(text) }
                    value={tituloClase}
                    />
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
                  <Text onPress={()=>crearTituloClase()} style={{fontWeight:'600', fontSize:20}}>Guardar</Text>
                  <Text onPress={handleClosePress1} style={{fontWeight:'600', fontSize:20}}>Cerrar</Text>
                  </View>
        </View>
      </BottomSheet>
      
      <BottomSheet
         ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose={false}
          style={{ paddingTop: 5 }} >


        <ScrollView 
           showsVerticalScrollIndicator={false} 
            style={styles.contentContainerBottom}>
                 <View style={styles.cajaInputs}>
                   <Text style={{textAlign:'center',
                   fontSize:16,
                   fontWeight:'bold',
                   paddingVertical:20}}>Crear Modulo</Text>
                  
                  <View style={{ width:50, }} >
                   <Text>Modulo</Text>
                    <Text style={[styles.TextInput,{alignItems:'center'}]}>{index}</Text>
                     </View>

                    <View style={{marginVertical:10}} >
                     <Text>Nombre del Modulo</Text>
                   <TextInput style={styles.TextInput} 
                    placeholderTextColor={'gray'}
                    placeholder='Nombre del curso'
                    onChangeText={(text) => setNombre(text) }
                    value={nombre}
                    />
                    </View>

                    <View style={{marginVertical:10}} >
                   <Text>Costo del Modulo</Text>
                   <TextInput style={[styles.TextInput, {width:100}]} 
                    placeholderTextColor={'gray'}
                    placeholder='Costo $'
                    keyboardType='numeric'
                    onChangeText={(text) => {setCosto(Number(text))}}
                    value={costo.toString()}
                    />
                  </View>

                    <View style={{marginVertical:10}} >
                        <Text>Tradicion</Text>

                        <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:15,alignItems:'center' }}>
                       
                  
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
                  <Text onPress={()=>crearModulo()} style={{fontWeight:'600', fontSize:20}}>Guardar</Text>
                  <Text onPress={()=>handleClosePress()} style={{fontWeight:'600', fontSize:20}}>Cerrar</Text>
                  </View>
                  {error && <Text style={{textAlign:'center', color:'red'}}>{error}</Text>}
                
                 </View>
               </ScrollView>


      </BottomSheet> 
  </SafeAreaView>
  )
}

export default Modulos

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    contentContainerBottom: {
      flex: 1,   
      backgroundColor: 'white',
  },
  cajaInputs:{
    marginHorizontal:15,
    marginVertical:10,
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
})