import { View, Dimensions, StyleSheet, } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { SuperHero } from './utils/interfaces';
import axios from 'axios';
import { heros } from './utils/data';
import Card from './components/Card';
import { useCarouselStore } from './context/context';

const { width, height } = Dimensions.get("screen");

const Main = () => {

    const BASE_URL = process.env.BASE_URL
    const API_KEY = process.env.API_KEY

    const [superheros, setSuperHeros] = useState<SuperHero[]>([])
    const carouselRef = useRef<Carousel<SuperHero>>(null);
    const { activeSlide, setActiveSlide } = useCarouselStore();

    useEffect(() => {
        const fetchHerosData = async () => {
            try {
                const updatedHeros: SuperHero[] = await Promise.all(heros.map(async (hero) => {
                    const response = await axios.get(`${BASE_URL}/${API_KEY}/search/${hero.name}`);
                    const responsedHero = response.data.results[0];
                    const { powerstats } = responsedHero;
                    return { ...hero, powerstats };
                }));
                setSuperHeros(updatedHeros);
            }
            catch (error) {
                console.log(error)
            };
        }
        fetchHerosData();
    }, [heros]);

    const _renderItem = ({ item, index }: { item: SuperHero, index: number }) => (

        <Card item={item} index={index} />

    );

    return (
        <View style={styles.container}>
            {superheros.length > 0 &&
                <>
                    <Carousel
                        ref={carouselRef}
                        data={superheros}
                        renderItem={_renderItem}
                        onSnapToItem={index => setActiveSlide(index)}
                        itemWidth={width * 0.6}
                        sliderWidth={width}
                        vertical={false}
                        layout='default'
                    />
                    <Pagination
                        dotsLength={superheros.length}
                        activeDotIndex={activeSlide}
                        dotStyle={styles.activeDot}
                        inactiveDotStyle={styles.inactiveDot}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                    />
                </>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    activeDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8,
        backgroundColor: 'black',
    },
    inactiveDot: {
        backgroundColor: 'gray',
    },
});

export default Main;
