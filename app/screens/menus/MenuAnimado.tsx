import { FontAwesome } from '@expo/vector-icons';
import React, { useRef } from 'react';
import { Button, View, StyleSheet, Pressable, Text } from 'react-native';
import Animated, {
    useSharedValue,
    withSpring,
    useAnimatedStyle,
    withTiming,
    interpolate,
} from 'react-native-reanimated';


const TRANSLATE_Y = -30;
const TRANSLATE_x = -100;
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function App() {

    const translateYcamara = useSharedValue(0);
    const translateXcamara = useSharedValue(0);
    const isOpened = useRef(false);

    const rCameraAnimatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                // {translateY: translateYcamara.value },
                { translateX: translateXcamara.value },
                { scale: interpolate(translateXcamara.value, [TRANSLATE_x, 0], [1, 0]) },
            ],
        };
    }, []);

    return (
        <>
            <View style={styles.container}>

                <AnimatedPressable style={[styles.camera, rCameraAnimatedStyles]}>
                    <View style={styles.bottomCrear}>
                        <Text style={{ fontSize: 14, color:'black', fontWeight:'bold' }} onPress={() => console.log('Crear')}>Crear Curso</Text>
                    </View>
                </AnimatedPressable>
                <Pressable style={styles.plusButtom} onPress={handlePress}>
                    <FontAwesome name="plus" size={24} color="white" />
                </Pressable>

            </View>
        </>
    );

    function handlePress() {
        if (isOpened.current) {
            // translateYcamara.value = withTiming(0, { duration: 100});
            translateXcamara.value = withTiming(0, { duration: 100 });
        } else {
            // translateYcamara.value = withTiming(TRANSLATE_Y, { duration: 100});
            translateXcamara.value = withTiming(TRANSLATE_x, { duration: 100 });
        }
        isOpened.current = !isOpened.current;
    };
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    plusButtom: {
        width: 50,
        height: 50,
        backgroundColor: 'rgb(60, 179, 31)',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    camera: {
        // width: 50,
        // height: 50,
        // backgroundColor: 'violet',
        // borderRadius: 25,
        // justifyContent: 'center',
        // alignItems: 'center',
        // position: 'absolute',
    },
    bottomCrear: {
        backgroundColor: '#9be14a',
        borderRadius: 5,
        padding: 4,
        position: 'absolute',
        width: 90,
        borderWidth: 1,
        borderColor: 'rgb(60, 179, 31)',
    }

});
