import { Image, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import { SuperHero } from '../utils/interfaces'
import Animated, { cancelAnimation, runOnUI, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'
import { useCarouselStore } from '../context/context'



interface CardFrontProps {
    item: SuperHero,
    index: number
}

const { width, height } = Dimensions.get("screen");

const CardFront = ({ item, index }: CardFrontProps) => {

    const { activeSlide } = useCarouselStore()
    const opacity = useSharedValue(0);
    const scale = useSharedValue(0.6)

    const setScale = () => {
        'worklet'
        scale.value = withTiming(1, { duration: 400 })
    }

    const setOpacity = () => {
        'worklet'
        opacity.value = withRepeat(withTiming(1, { duration: 600 }), 2, false)
    }

    useEffect(() => {
        if (activeSlide === index) {
            runOnUI(setOpacity)()
        } else {
            opacity.value = 0
        }
    }, [activeSlide]);

    useEffect(() => {
        if (activeSlide === index) {
            runOnUI(setScale)()
        } else {
            cancelAnimation(scale);
            scale.value = 0.7
        }
    }, [activeSlide]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: scale.value // scale: withTiming(scale.value === activeSlide ? 1 : 0.8, { duration: 400 })
                }
            ]
        };
    });

    return (
        <>
            <Image source={{ uri: item.background }} resizeMode='stretch' style={styles.imageBackground} />
            <Animated.View style={[styles.imageOverlay, animatedStyle]}>
                <Image source={item.image} resizeMode='contain' style={styles.image} />
            </Animated.View>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: width * 0.4,
        height: height * 0.4,
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
    },
    imageOverlay: {
        position: 'absolute',
        bottom: 1,
        zIndex: 1
    },
})
export default CardFront