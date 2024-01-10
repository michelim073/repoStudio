import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import React from 'react';
import YoutubeView from '../componentes/youtube/YoutubeView';

export default function TabOneScreen() {





  return (
    <View style={styles.container}>
      
        <Text>Aqui</Text>
        <YoutubeView/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'violet',
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
});
