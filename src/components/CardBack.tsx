import { View, StyleSheet, Dimensions, ImageBackground, Text } from 'react-native'
import React from 'react'
import { SuperHero } from '../utils/interfaces'

const { width, height } = Dimensions.get("screen");

interface CardBackProps {
    item: SuperHero,
}

const CardBack = ({ item }: CardBackProps) => {

    const renderStats = () => {
        return (
            Object.entries(item.powerstats).map(([key, value]) => (
                <View key={key} style={styles.statsBox}>
                    <Text style={styles.stats}>{key.toLocaleUpperCase()}: </Text>
                    <Text style={styles.stats}>{value}</Text>
                </View>
            )
            )
        )
    }

    return (
        <View style={styles.imageBackground}>
            <ImageBackground source={{ uri: item.background }} resizeMode='stretch' style={{ width: '100%', height: '100%', alignItems:'center',justifyContent:'center' }}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.name}>{item.name.toUpperCase()}</Text>
                    {renderStats()}
                </View>
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    imageBackground: {
        width: width * 0.6,
        height: height * 0.6,
        borderRadius: 50,
        overflow: 'hidden',
    },
    name: {
        fontSize: 34,
        color: '#fff',
        alignSelf: 'center',
        paddingBottom:80,
        fontWeight: 'bold',
        transform: [{ rotateY: '180deg' }]
    },
    statsBox: {
        flexDirection: 'row',
        transform: [{ rotateY: '180deg' }]
    },
    stats: {
        fontSize: 24,
        fontWeight:'800',
        color: '#fff',
    }
})
export default CardBack