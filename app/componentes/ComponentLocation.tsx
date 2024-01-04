import React, { useState, useEffect, useRef, MutableRefObject } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import * as Location from 'expo-location';

export default function ComponentLocation() {
  const [errorMsg, setErrorMsg] = useState('');
  const [origin, setOrigin] = useState<LocationData | null>(null);
const mapRef = useRef<MapView|undefined>()

interface LocationData {
  latitude: number;
  longitude: number;
}

useEffect(() => {
  // Obtener la ubicación inicial al cargar el componente
  getLocation();
  // Configurar la verificación de ubicación cada 6 horas
  const intervalId = setInterval(() => {
    getLocation();
  }, 3600000);
  // Limpiar el intervalo al desmontar el componente
  return () => clearInterval(intervalId);
}, []);

  const getLocation = async () => {
    try {
      // Solicitar permisos de ubicación si aún no se han otorgado
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permiso de ubicación no otorgado');
        return;
      }
      // Obtener la ubicación actual del dispositivo
      const locationData = await Location.getCurrentPositionAsync({})
      if (locationData) {
        setOrigin({
          latitude: locationData.coords.latitude,
          longitude: locationData.coords.longitude,
        });
        mapRef.current?.animateToRegion({latitude: locationData.coords.latitude, longitude: locationData.coords.longitude, latitudeDelta:5, longitudeDelta:5},3000)

      } else {
        console.error('La ubicación es nula.');
      }
     
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
    }
  };
    
    console.log('->', origin)
  if (origin === null || origin === undefined) {
         getLocation()
    }  else{
          // mapRef.current?.animateToRegion({latitude:origin.latitude  , longitude: origin.longitude, latitudeDelta:2, longitudeDelta:2},3000)
         }
      
  return (
    <>
 {origin && <MapView 
      provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
      ref={mapRef}
      userLocationUpdateInterval={1000}
      followsUserLocation={true}
      initialRegion={{
        latitude: 4.3523,
        longitude: -1.04466,
        latitudeDelta: 120,
        longitudeDelta: 120,
      }}
      
    
      showsMyLocationButton
      showsUserLocation
      
      style={styles.maps}
    /> }
      </>
  )
}
const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    paragraph: {
        fontSize: 18,
        textAlign: 'center',
    },
    maps:{
        width: '100%',
        height: '100%',
      },

 }); 