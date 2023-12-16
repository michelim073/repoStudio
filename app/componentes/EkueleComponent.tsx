import React, { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useCallback, useEffect } from 'react';
import { Text, View } from '../../components/Themed'
import Animated, { Easing, useSharedValue, withSpring } from 'react-native-reanimated';

import ekuele from '../../assets/images/ekuele.png'
import ekuele1 from '../../assets/images/ekuele1.png'

const EkueleComponent = ({pataMayor}: {pataMayor: any}) => {
    const [arrayState, setArrayState] = useState([1, 1, 1, 1]);
    const [oduPataMayor, setOduPataMayor] = useState<string>('')
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
  

  const handleButtonPress = useCallback((index:any) => {
    setArrayState((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] = newArray[index] === 0 ? 1 : 0;
               
      // Animate the button
      buttonValues[index].value = newArray[index]
  
      return newArray;

    });
   

  }, []);

 const getOdu = () =>{
  switch (JSON.stringify(arrayState)) {
        case '[1,1,1,1]':
            setOduPataMayor('Ejiogbe')
            pataMayor('Ejiogbe')
              break;
        case '[0,0,0,0]':
            setOduPataMayor('Ojekun')
            pataMayor('Ojekun')
              break;
              case '[0,1,1,0]':
                setOduPataMayor('Iwori')
                pataMayor('Iwori')
              break;
              case '[1,0,0,1]':
                setOduPataMayor('Odi')
                pataMayor('Odi')
              break;
              case '[1,1,0,0]':
                setOduPataMayor('Iroso')
                pataMayor('Iroso')
              break;
              case '[0,0,1,1]':
                setOduPataMayor('Ojuani')
                pataMayor('Ojuani')
              break;
              case '[1,0,0,0]':
                setOduPataMayor('Obara')
                pataMayor('Obara')
              break;
              case '[0,0,0,1]':
                setOduPataMayor('Okana')
                pataMayor('Okana')
              break;
              case '[1,1,1,0]':
                setOduPataMayor('Ogunda')
                pataMayor('Ogunda')
              break;
              case '[0,1,1,1]':
                setOduPataMayor('Osa')
                pataMayor('Osa')
              break;
              case '[0,1,0,0]':
                setOduPataMayor('Ika')
                pataMayor('Ika')
              break;
              case '[0,0,1,0]':
                setOduPataMayor('Otrupon')
                pataMayor('Otrupon')
              break;
              case '[1,0,1,1]':
                setOduPataMayor('Otura')
                pataMayor('Otura')
              break;
              case '[1,1,0,1]':
                setOduPataMayor('Irete')
                pataMayor('Irete')
              break;
              case '[1,0,1,0]':
                setOduPataMayor("Oshe")
                pataMayor('Oshe')
              break;
              case '[0,1,0,1]':
                setOduPataMayor('Ofun')
                pataMayor('Ofun')
              break;
            }
        }
  return (
    <>
    
    <View style={{ marginTop: 50, alignItems:'center' }}>
        <Text>{oduPataMayor}</Text>
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

export default EkueleComponent

const styles = StyleSheet.create({})