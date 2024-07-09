import {  Animated, StyleSheet,  Dimensions, ImageBackground, Pressable } from 'react-native';
import React, { useRef, useState } from 'react';
import { SuperHero } from '../utils/interfaces';
import CardFront from './CardFront';
import CardBack from './CardBack';

const { width, height } = Dimensions.get("screen");


interface CardProps {
    item: SuperHero,
    index: number,
}

const Card = ({ item, index }: CardProps) => {

    const [isFlipping, setIsFlipping] = useState(false)
    const rotateValue = useRef(new Animated.Value(0)).current;
    const [isFront, setIsFront] = useState(true);

    const startRotation = () => {
        setIsFlipping(true)
        Animated.timing(rotateValue, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            setIsFlipping(false)
            setIsFront(!isFront);
            rotateValue.setValue(0);  // Reset the animation value for the next flip

        });
    };

    const frontInterpolate = rotateValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['0deg', '90deg', '180deg'],
    });

    const backInterpolate = rotateValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['180deg', '90deg', '0deg'],
    });

    const animatedStyle = {
        transform: [
            { rotateY: isFront ? frontInterpolate : backInterpolate },
        ],
    };

    return (
        <Pressable onPress={startRotation} style={styles.container}>
            <Animated.View style={[styles.card, animatedStyle]}>
                {isFlipping
                    ?
                    <ImageBackground style={styles.flipping} resizeMode='stretch' source={{ uri: item.background }} />
                    :
                    <>
                        {isFront ? <CardFront item={item} index={index} /> : <CardBack item={item} />}
                    </>

                }
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        width: width * 0.6,
        height: height * 0.6,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        overflow: 'hidden'
    },
    flipping: {
        width: '100%',
        height: '100%',
    }
});

export default Card;
