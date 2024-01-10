import { Pressable, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, ScrollView, FlatList } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Clases, ModulosCursos, Suscripciones } from '../../../src/models';
import { DataStore } from 'aws-amplify/datastore';
import Animated, {
  useAnimatedRef,
  useSharedValue,
  useAnimatedStyle,
  runOnUI,
  measure,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import Chevron from './Chevron';
import { Stack, router } from 'expo-router';
import { Swipeable } from 'react-native-gesture-handler';
import {FontAwesome, MaterialIcons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import ListTitleClase from './ListTitleClase';
import { useAuthenticator } from '@aws-amplify/ui-react-native';


type Props = {
  value: ModulosCursos;
  deleteModuloAlert: (id: string) => void
  handleExpandPress1: (idm:string) => void
};

const Accordion = ({ value, deleteModuloAlert, handleExpandPress1 }: Props) => {
  const [clases, setClases] = useState<Clases[]>([]);
  const [auth, setAuth] = useState(true)
  const [suscripcion, setSuscripcion] = useState<Suscripciones>()
  const listRef = useAnimatedRef();
  const heightValue = useSharedValue(0);
const [suscrito, setSuscrito] = useState<boolean>(false)
  const open = useSharedValue(false);
  const { user } = useAuthenticator()

      useEffect(() => {
      const sub = DataStore.observeQuery(Suscripciones, (c) => c.and(c => [
        c.moduloscursosID.eq(value.id),
        // c.userID.eq(user.userId)
      ]))
          .subscribe(({ items }) => {
         setSuscripcion(items[0])     
          });
      return () => {
          sub.unsubscribe();
      };
  }, [value]);
  // console.log('suscription ->',suscripcion)
 


  useEffect(() => {
    const sub = DataStore.observeQuery(Clases, c => c.moduloscursosID.eq(value.id))
      .subscribe(({ items }) => {
        setClases(items);
      });
    return () => {
      sub.unsubscribe();
    };
  }, []);

  useEffect(() => {
  const resultado = suscripcion?.userID === user.userId
  setSuscrito(resultado)
  }, [suscripcion])
  

  const progress = useDerivedValue(() =>
    open.value ? withTiming(1) : withTiming(0),
  );

  const heightAnimationStyle = useAnimatedStyle(() => ({
    height: heightValue.value,
  }), [heightValue]);
  
  const renderLeftActions = (progress: any, dragX: any) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 0.5],
      extrapolate: 'clamp',
    })
    return (
      <TouchableOpacity onPress={()=>deleteModuloAlert(value.id)} style={styles.boxMenu}>
        <Animated.View>
          <FontAwesome name="trash-o" size={28} color="red" />
        </Animated.View>
      </TouchableOpacity>
    )
  }
  console.log(suscripcion)
  return (
    <>
    <Stack.Screen options={{ title: 'Modulos' }} />
      <View style={{ backgroundColor: '#FFF' }}>
         <Swipeable
          enabled={true}
          friction={4}
          renderLeftActions={renderLeftActions}>

          <View style={styles.container}>
            
            <View style={styles.encabezado}>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <Text style={{ fontWeight: '900', fontSize: 16, color: '#488a2b' }}>{value.nombre}</Text>
              <MaterialIcons onPress={()=>handleExpandPress1(value.id)} name="my-library-add" size={24} color="gray" style={{marginRight:10, paddingTop:5 }}/>
              {/* <AntDesign name="addfile" size={24} color="gray" style={{marginRight:10, paddingTop:5 }} /> */}
              </View>
              <Text style={{}}>{`Costo: ${value.costoModulo}$`}</Text>
              <Text style={{}}>{`Modulo: ${value.index}`}</Text>
            </View>
            <Pressable disabled={!auth}
              onPress={() => {
                if (heightValue.value === 0) {
                  runOnUI(() => {
                    'worklet';
                    heightValue.value = withTiming(measure(listRef)!.height);
                    if (heightValue.value === null) {
                      return;
                    }
                  })();
                } else {
                  heightValue.value = withTiming(0);
                }
                open.value = !open.value;
              }}
              style={styles.titleContainer}>
              {/* <Text style={styles.textTitle}>{value.nombre}</Text> */}
              <Text>SUSCRITO</Text>

              <Chevron progress={progress} />
            </Pressable>
            <Animated.View style={heightAnimationStyle}>
              <Animated.View style={styles.contentContainer} ref={listRef}>
                {clases &&
                <FlatList
                data={clases}
                renderItem={({item}) =>  <ListTitleClase clasesTitle={item} />}
                />
         
                }
              </Animated.View>
            </Animated.View>
          </View>
        </Swipeable>
      </View>  
    </>
  );
};

export default Accordion;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f0cb",
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#19a132',
    overflow: 'hidden',
  },
  textTitle: {
    fontSize: 20,
    color: 'black',
  },
  titleContainer: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainer: {
    position: 'absolute',
    width: '100%',
    top: 0,
  },

  encabezado: {
    marginHorizontal: 10,
  },
  boxMenu: {
    width: 50,
    marginLeft: 15,
    borderRadius: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});