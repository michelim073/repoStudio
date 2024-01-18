import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack } from 'expo-router'
import { Suscripciones, TypeSuscripcion, User } from '../../../src/models'
import { useStoreContext } from '../../store/storeContext'
import { useLocalSearchParams } from 'expo-router'
import { DataStore } from 'aws-amplify/datastore'
import ListItemsSuscriptions from './ListItemsSuscriptions'
import ListUsersToSuscrip from './ListUsersToSuscrip'
type Props = {}

const suscriptionScreen = (props: Props) => {
const [usrSus, setUsrSus] = useState<User[]>()
  const store = useStoreContext()
  const params = useLocalSearchParams()
  const s:any = params.susId
 


  const suscribirUser = async (id:any) =>{
      try {
     await DataStore.save(
      new Suscripciones({
      status: "Activa",
      type: TypeSuscripcion.PAGO,
      userID: id,
      moduloscursosID: s
    })
  ); 
  
  console.log('guardado correctamente')
      } catch (error) {
        console.log(error)
      }


  }

//    useEffect(() => {
//     const sub = DataStore.observeQuery(Suscripciones, (c) => c.and(c => [
//       c.moduloscursosID.eq(s),
//       // c.userID.eq(user.userId)
//     ])).subscribe(({ items }) => {
//              console.log('sus-> ',items) 
//             const usr = items.map((u) =>{
//              const resul = store.users.filter((i) =>{
//               i.id === u.userID
//              })
//             })   
//         });
//     return () => {
//         sub.unsubscribe();
//     };
// }, [s]);

useEffect(() => {
  const sub = DataStore.observeQuery(User, (c) => c.and(c => [
    c.SuscripcionesUser.moduloscursosID.eq(s),
    // c.userID.eq(user.userId)
  ])).subscribe(({ items }) => {
           console.log('usr-> ',items) 
          setUsrSus(items)
      });
  return () => {
      sub.unsubscribe();
  };
}, [s]);




  return (
    <>
    <Stack.Screen options={{
        title:'Suscripciones'
    }}/>
    <View>
      <Text style={{fontWeight:'900', marginLeft:40}}>Usuarios Suscritos</Text>
      <FlatList
      horizontal
      data={usrSus}
      renderItem={(item) => <ListItemsSuscriptions usrItem={item}/>}
      contentContainerStyle={{gap:5, padding:5}}
      />
      <View style={styles.boxUsers}> 
      <Text style={{fontWeight:'900', marginLeft:40}}>Usuarios Por Suscribir</Text>
       <FlatList
      style={{marginTop:20}}
      data={store?.users}
      renderItem={(item) => <ListUsersToSuscrip value={item} suscribirUser={suscribirUser}/>}
      contentContainerStyle={{gap:5, padding:5}}
      />
      </View>
    </View>
    </>
    
  )
}

export default suscriptionScreen

const styles = StyleSheet.create({
  boxUsers:{

  }
})