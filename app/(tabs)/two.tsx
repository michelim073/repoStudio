import { StyleSheet, Image, Platform, ActivityIndicator, ScrollView, FlatList } from 'react-native';
import { useAuthenticator } from '@aws-amplify/ui-react-native';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import MenuAnimado from '../screens/menus/MenuAnimado';
import { useEffect, useState } from 'react';
import { Cursos, ModulosCursos, User } from '../../src/models';
import  useri  from '../../assets/images/useri.png';
import { useStoreContext } from '../store/storeContext';
import { Stack } from 'expo-router';
import ComponentLocation from '../componentes/ComponentLocation';
import { FontAwesome } from '@expo/vector-icons';
import { DataStore } from 'aws-amplify/datastore';





export default function TabTwoScreen() {
const store = useStoreContext()
  const {signOut, user} = useAuthenticator((context) => [context.user]);
  // const usr = useAuthStore((state) => state.users)
  // const observer = useAuthStore((state) => state.observeUsers)
  const [miModulos, setMiModulos] = useState<ModulosCursos[]>([])
  const [userAuth, setUserAuth] = useState<User>();


  useEffect(() => {
    const subscription = DataStore.observeQuery(User, c => c.id.eq(user.userId)).subscribe(snapshot => {
      const { items, isSynced } = snapshot;
      setUserAuth(items[0])
     store.setAuthUser(items)
    });
    return () => {
      subscription.unsubscribe()
    }
  }, []);


  
if (!userAuth) { 
  return 
   ( 
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <ActivityIndicator size="large" color="#5cdb3d" />
    </View>
    )
}

  return (
    <View style={styles.container}>
     <View style={styles.contenedorMap}>
    <ComponentLocation/>
    </View >
      <Image source={userAuth?.imageUser === null || undefined ? require("../../assets/images/avatar.png") : {uri:userAuth?.imageUser}} 
      style={styles.imageUser} />
       <View style={{marginTop:25,
       backgroundColor:'white',
        flexDirection:'row',
         justifyContent:'space-between',
          marginHorizontal:20,
          }}>
     <Text style={{fontSize:20, fontWeight:'bold', marginHorizontal:20}}>Datos Personales</Text>
      <View style={{alignItems:'center'}}>
        <FontAwesome onPress={signOut} name="sign-out" size={24} color="rgb(236, 77, 45)" />
        <Text style={{fontWeight:'bold', fontSize:12, color:"rgb(236, 77, 45)" }}>SingOut</Text>
      </View>
     </View>
     <View>
      <View>
        <View style={{flexDirection:'row'}} >
        <View style={{marginHorizontal:20, marginTop:10}}>
          <Text style={{fontSize:16, fontWeight:'bold'}}>Nombre</Text>
          <Text style={{fontSize:14}}>{userAuth?.name}</Text>
        </View>
        <View style={{marginHorizontal:20, marginTop:10}}>
          <Text style={{fontSize:16, fontWeight:'bold'}}>Email</Text>
          <Text style={{fontSize:14}}>{userAuth?.email}</Text>
        </View>
        </View>
        <View style={{marginHorizontal:20, marginTop:10}}>
          <Text style={{fontSize:16, fontWeight:'bold'}}>Telefono</Text>
          <Text style={{fontSize:14}}>--</Text>
        </View>

        <View style={{marginHorizontal:20, marginTop:10}}>
          <Text style={{fontSize:16, fontWeight:'bold'}}>Mis Entrenamientos</Text>
          <>
         <FlatList
              data={miModulos}
              renderItem={({item}) => <Text>{item.nombre}</Text>}/>
          
          </>
        </View>
      
      </View>
     </View>
  
     
    
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
 
  imageUser:{
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 100,
    left: 8,
    top: 140,
    borderWidth: 2,
    borderColor: 'gray',
  },
  contenedorMap:{
     width:'100%',
     height:'30%',
     borderBottomWidth:1,
      borderBottomColor:'gray',

  }
 
 
});
