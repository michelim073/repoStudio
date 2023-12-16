import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import EkueleComponentPataMenor from '../componentes/EkueleComponentPataMenor'
import EkueleComponent from '../componentes/EkueleComponent'

const odu = () => {
  const [pataMayor, setPataMayor] = useState<string>()
  const [pataMenor, setPataMenor] = useState<string>()


      useEffect(() => {
        
      // console.log(pataMayor, pataMenor)
      
      }, [pataMenor, pataMayor])

      const setPmenor=(odu:string)=>{
        setPataMenor(odu)
      }
      const setPmayor=(odu:string)=>{
        setPataMayor(odu)
      }
      

  return (
    <View style={{ flex: 1, alignItems:'center', backgroundColor:'white' }}>
    {pataMayor !== 'undefined' || pataMenor !== 'undefined' ? <Text style={{fontSize:20, fontWeight:'800'}}>{`${pataMayor}-${pataMenor}`}</Text>:<ActivityIndicator/>}
  <View style={{flexDirection:'row'}}>
    <EkueleComponentPataMenor pataMenor={setPmenor}/>
    <EkueleComponent pataMayor={setPataMayor}/>
    </View>
  </View>
  )
}


export default odu

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },

})