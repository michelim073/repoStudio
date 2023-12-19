import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Animated } from 'react-native'
import React from 'react'
import { Cursos } from '../../src/models'
import { router } from 'expo-router';
import MenuAnimado from '../screens/menus/MenuAnimado';
import { LinearGradient } from 'expo-linear-gradient';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { FontAwesome } from '@expo/vector-icons';

type Props = {
    infoCurso: Cursos;
}
const SCREEN_WIDTH = Dimensions.get('window').width;
const CursosItemList = ({ infoCurso }: Props) => {

    const handlePress = () => {
        // router.push('/screens/modulos/Modulos')
        router.push({ pathname: `/screens/modulos/Modulos`, params: { id: infoCurso.id } });
    }
    const renderLeftActions = (progress: any, dragX: any) => {
        const scale = dragX.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 0.5],
            extrapolate: 'clamp',
        })
        return (
            <TouchableOpacity activeOpacity={0.6} style={styles.boxMenu}>
                {/* <Animated.Text style={{fontSize:18,fontWeight:'bold',color:'white', transform:[{scale:scale}]}}>Eliminar</Animated.Text> */}
                <Animated.View><FontAwesome name="trash-o" size={28} color="red" /></Animated.View>
            </TouchableOpacity>
        )
    }
    const renderRightActions = (progress: any, dragX: any) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        })
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity activeOpacity={0.6} style={styles.boxMenu}>
                    <Animated.Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', transform: [{ scale: scale }] }}>Eliminar</Animated.Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (

        <View style={styles.container}>
    <Swipeable
        enabled={true}
        friction={4}
        renderLeftActions={renderLeftActions}
    //  renderRightActions={renderRightActions}
                     >
        <View style={{ backgroundColor: 'lightgray', borderRadius: 8, overflow: 'hidden' }} >
            <LinearGradient
                // Button Linear Gradient
                colors={['#ceab2c', '#f7e70a', '#72cb54']}
                style={styles.button}>
                <TouchableOpacity activeOpacity={0.7} onPress={handlePress} style={[styles.titulo,]}>
                    <Text style={{ fontWeight: '600', fontSize: 24, color: 'black' }}>{infoCurso.nombre}</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{`Categoria: ${infoCurso.categoria}`}</Text>
                </TouchableOpacity>
                <View style={{ gap: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, marginHorizontal: 16 }}>{infoCurso.descripcion}</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'white', marginHorizontal: 12, alignSelf: 'flex-end', marginBottom: 7 }}>{`Tradicion: ${infoCurso.tradicion}`}</Text>
                </View>
            </LinearGradient>
        </View>
    </Swipeable>
    {/* </LinearGradient> */}
        </View>
    )
}
export default CursosItemList

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginHorizontal: 5,
        marginVertical: 8,
    },
    titulo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        padding: 10,

    },
    boxMenu: {
        width: 50,
        borderRadius: 5,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',

    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 300,
    },
    button: {


        borderRadius: 5,
    },

})