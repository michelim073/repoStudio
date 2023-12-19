import { create } from 'zustand'
import { User } from '../../src/models'
import { DataStore } from 'aws-amplify/datastore';
import { signOut } from 'aws-amplify/auth';
import { ActivityIndicator } from 'react-native';

type State = {
  user: User[]
}

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
  if(usr[0].roleUser === 'Fuera'){
      handleSignOut()
      }
    set((state) => ({ user: state.user = usr  }))
    // console.log('->',useAuthStore.getState().user)
  },
  getAuthUser: () => {
  
  },
 
//   decrement: (qty: []) => set((state) => ({ user: state.user = qty })),
}))