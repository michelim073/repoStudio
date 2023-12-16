import React, { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useCallback, useEffect } from 'react';
import { Text, View } from '../../components/Themed'
import Animated, { Easing, useSharedValue, withSpring } from 'react-native-reanimated';

import ekuele from '../../assets/images/ekuele.png'
import ekuele1 from '../../assets/images/ekuele1.png'

const EkueleComponentPataMenor = ({pataMenor}) => {
    const [arrayState, setArrayState] = useState([1, 1, 1, 1]);
    const [oduPataMenor, setOduPataMenor] = useState<string>('')
  // Animated values for each button
  const buttonValues = [
    useSharedValue(0),
    useSharedValue(0),
    useSharedValue(0),
    useSharedValue(0),
  ];

  useEffect(() => {
getOdu()
  }, [arrayState])
  

  const handleButtonPress = useCallback((index) => {
    setArrayState((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] = newArray[index] === 0 ? 1 : 0;
               
      // Animate the button
      buttonValues[index].value = newArray
  
      return newArray;

    });
   

  }, []);

 const getOdu = () =>{
  switch (JSON.stringify(arrayState)) {
        case '[1,1,1,1]':
            setOduPataMenor('Ejiogbe')
            pataMenor('Ejiogbe')
              break;
        case '[0,0,0,0]':
            setOduPataMenor('Ojekun')
            pataMenor('Ojekun')
              break;
              case '[0,1,1,0]':
                setOduPataMenor('Iwori')
                pataMenor('Iwori')
              break;
              case '[1,0,0,1]':
                setOduPataMenor('Odi')
                pataMenor('Odi')
              break;
              case '[1,1,0,0]':
                setOduPataMenor('Iroso')
                pataMenor('Iroso')
              break;
              case '[0,0,1,1]':
                setOduPataMenor('Ojuani')
                pataMenor('Ojuani')
              break;
              case '[1,0,0,0]':
                setOduPataMenor('Obara')
                pataMenor('Obara')
              break;
              case '[0,0,0,1]':
                setOduPataMenor('Okana')
                pataMenor('Okana')
              break;
              case '[1,1,1,0]':
                setOduPataMenor('Ogunda')
                pataMenor('Ogunda')
              break;
              case '[0,1,1,1]':
                setOduPataMenor('Osa')
                pataMenor('Osa')
              break;
              case '[0,1,0,0]':
                setOduPataMenor('Ika')
                pataMenor('Ika')
              break;
              case '[0,0,1,0]':
                setOduPataMenor('Otrupon')
                pataMenor('Otrupon')
              break;
              case '[1,0,1,1]':
                setOduPataMenor('Otura')
                pataMenor('Otura')
              break;
              case '[1,1,0,1]':
                setOduPataMenor('Irete')
                pataMenor('Irete')
              break;
              case '[1,0,1,0]':
                setOduPataMenor("Oshe")
                pataMenor('Oshe')
              break;
              case '[0,1,0,1]':
                setOduPataMenor('Ofun')
                pataMenor('Ofun')
              break;
            }
        }
 
 

  

  return (
    <>
    
    <View style={{ marginTop: 50, alignItems:'center' }}>
        <Text>{oduPataMenor}</Text>
      {buttonValues.map((item, index) => (
        <Animated.View key={index} style={{ margin: 8, transform: [{ scale: 1 }] }}>
          <TouchableOpacity activeOpacity={1} onPress={() => handleButtonPress(index)}>
           {arrayState[index] === 1 ? <Image source={ekuele} style={{ width: 70, height:100, margin: 5 }} />:
            <Image source={ekuele1} style={{ width: 70, height:100, margin: 5 }} />}
          </TouchableOpacity>
        </Animated.View>
      ))}
    </View>
    </>
  )
}

export default EkueleComponentPataMenor

const styles = StyleSheet.create({})