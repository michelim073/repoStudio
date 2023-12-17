import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import { Clases, ModulosCursos } from '../../../src/models';
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



type Props = {
  value: ModulosCursos;
   
};

const Accordion = ({value}: Props) => {
    const [clases, setClases] = useState<Clases[]>([]);
    const [auth, setAuth] = useState(true)
  const listRef = useAnimatedRef();
  const heightValue = useSharedValue(0);
  const open = useSharedValue(false);

  useEffect(() => {
    const sub = DataStore.observeQuery(Clases, c => c.moduloscursosID.eq(value.id))
        .subscribe(({ items }) => {
            setClases(items);
        });
    return () => {
        sub.unsubscribe();
    };
}, []);

  const progress = useDerivedValue(() =>
    open.value ? withTiming(1) : withTiming(0),
  );

  const heightAnimationStyle = useAnimatedStyle(() => ({
    height: heightValue.value,
  }));

  const goClase = (id: any) => {
    router.push({ pathname: `/screens/clases/ClasesScreen`, params: {id:id}});
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: 'Modulos'}}/>
      <View style={styles.encabezado}>
      <Text style={{fontWeight:'900', fontSize:16, color:'#488a2b'}}>{value.nombre}</Text>
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
            clases.map((v, i) => {
              return (
                <View key={i} style={styles.content}>
                  <Text onPress={()=> goClase(v.id)} style={styles.textContent}>{v.titulo}</Text>
                </View>
              )
            })}
        </Animated.View>
      </Animated.View>
    </View>
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
  content: {
    padding: 5,
    backgroundColor: '#cfe9d0',
  },
  textContent: {
    fontSize: 15,
    color: 'black',
  },
  encabezado:{
marginHorizontal:10,
  },
});