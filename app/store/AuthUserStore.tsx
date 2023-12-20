import { create } from 'zustand'
import { User } from '../../src/models'
import { DataStore } from 'aws-amplify/datastore';
import { signOut } from 'aws-amplify/auth';
import { ActivityIndicator, Alert } from 'react-native';
import { Redirect, router } from 'expo-router';


type State = {
  user: User[]
}

const screenBloqueo = () =>
    Alert.alert('Alerta',
     `Debe Hacer el pago de su suscripcion lo antes Posible`,
    [
      {text: 'OK', onPress: () =>{
         router.replace({ pathname: `/screens/screenBloqueo` });
      }},
    ]);

async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    console.log('error signing out: ', error);
  }
}


type Actions = {
 setAuthUser: (usr: User[]) => void
//   decrement: (qty: []) => void
}

export const useAuthStore = create<State & Actions>((set,get) => ({
  user: [],
  setAuthUser: (usr: User[]) =>{
    if(usr.length === 0){
      console.log('llega cero')
      return
      }
  if(usr[0].roleUser === 'alerta'){
      screenBloqueo()
      }
    set((state) => ({ user: state.user = usr  }))
    // console.log('->',useAuthStore.getState().user)
  },
  getAuthUser: () => {
  
  },
 
//   decrement: (qty: []) => set((state) => ({ user: state.user = qty })),
}))