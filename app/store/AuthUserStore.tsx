import { create } from 'zustand'
import { User, Suscripciones } from '../../src/models'
import { DataStore } from 'aws-amplify/datastore';
import { signOut } from 'aws-amplify/auth';
import { Redirect, router } from 'expo-router';
import { getCurrentUser } from 'aws-amplify/auth';
import { Alert } from 'react-native';

interface AppState{
  users: User[]
  setAuthUser: (user: User[]) => void
  observeUsers: (items:User[]) => void
  userHooks: () => Promise<void>
  id: string ,
  userInfo: User[]
  suscripciones: Suscripciones[]
}

const screenBloqueo = () =>
    Alert.alert('Alerta',
     `Debe Hacer el pago de su suscripcion lo antes Posible`,
    [
      {text: 'OK', onPress: () =>{
         router.replace({ pathname: `/screens/screenBloqueo`});
      }},
    ]);

async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    console.log('error signing out: ', error);
  }
}


const useAuthStore = create<AppState>((set,get) => ({
  users: [],
  userInfo: [],
  suscripciones: [],
  id: '',
  userHooks: async () => {
    try {
      const { userId } = await getCurrentUser(); 
       set((state) => ({ id: state.id = userId }))
     } catch (err) {
       console.log(err);
     }
  },
  setAuthUser: (user) =>{
    set((state) => ({ users: state.users = user }))
    console.log('->',useAuthStore.getState().users)
    if (useAuthStore.getState()?.users[0]?.roleUser === null || useAuthStore.getState()?.users[0]?.roleUser === undefined) {
      return
    }else if (useAuthStore.getState().users[0].roleUser === 'f') {
      screenBloqueo()
    }
  },
  observeUsers: (items) => {
     set((state) => ({ users: state.users = items }))
    //  console.log(useAuthStore.getState().users )
  },
  // suscripcionesUser: (sus:any) => {
  //   set((state) => ({ suscripciones: state.suscripciones = sus }))
  //   // console.log(useAuthStore.getState().suscripciones)
  // } ,

//   decrement: (qty: []) => set((state) => ({ user: state.user = qty })),
}))
export default useAuthStore