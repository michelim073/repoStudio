import 'core-js/full/symbol/async-iterator';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { ActivityIndicator, Pressable, View, useColorScheme } from 'react-native';
import react,{ useEffect, useState } from 'react';
import Colors from '../../constants/Colors';
import {  DataStore } from 'aws-amplify/datastore';
import { Octicons } from '@expo/vector-icons';
// import { useAuthStore } from '../store/AuthUserStore';
import { useAuthenticator } from '@aws-amplify/ui-react-native';
import { Hub } from 'aws-amplify/utils';
import { useStoreContext } from '../store/storeContext';
import { ModulosCursos, User } from '../../src/models';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}
function TabBarIcon1(props: {
  name: React.ComponentProps<typeof Octicons>['name'];
  color: string;
}) {
  return <Octicons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const store = useStoreContext()
  const {user} = useAuthenticator((context) => [context.user]);
  const [miModulos, setMiModulos] = useState<ModulosCursos[]>([])

  useEffect(() => { 
    const hubListenerCancel = Hub.listen('auth', (data) => {
      if (data.payload.event === 'signedOut') {
        DataStore.clear();
        console.log('Data Cleared');
      }
    });
    return () => {
      hubListenerCancel();
    }
  }, []) 
  
  // useEffect(() => {
  //   console.log('cargo el UseEffect de ObserveQuery User en Layout')
  //   const subscription = DataStore.observeQuery(User).subscribe(snapshot => {
  //     const { items, isSynced } = snapshot;
  //     //console.log(`[Snapshot] item count: ${items.length}, isSynced: ${isSynced}`);
  //    // console.log((items))
  //     store.observeUsers(items)
  //   });
  //   return () => {
  //    //  console.log('Se desmonto el UseEffect de ObserveQuery User en Layout')
  //     subscription.unsubscribe()
  //   }
  // }, []);

  useEffect(() => {
    const subscriptio = DataStore.observeQuery(ModulosCursos ,(c) => c.Suscripciones.userID.eq(user.userId))
    .subscribe(msg => {
      setMiModulos(msg.items)
    })
    return () => {
      subscriptio.unsubscribe()
    }
}, [])

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
      <Tabs.Screen
        name="index"
        options={{ 
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color } />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
       
        name="two"
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />  
      <Tabs.Screen
        name="cursos"
        options={{
          title: 'Entrenamientos',
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
        }}
      />
         <Tabs.Screen
        name="chat"
        options={{
          title: 'Chats',
          tabBarIcon: ({ color }) => <TabBarIcon name="wechat" color={color} />,
        }}
      />
         <Tabs.Screen
        name="odu"
        options={{
          title: 'Odu Ifa',
          tabBarIcon: ({ color }) => <TabBarIcon1 name="file-binary" color={color} />,
        }}
      />
    
    </Tabs>
  );
}
