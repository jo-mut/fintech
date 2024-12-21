import { Image, SafeAreaView, ScrollView, SectionList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { useQuery } from '@tanstack/react-query';
import { Colors } from '@/constants/Colors';
import { CartesianChart, Line, useChartPressState } from "victory-native";
import { Result } from '../interfaces/crypto';
import { Circle, useFont } from '@shopify/react-native-skia';
import { format } from 'date-fns';
import * as Haptics from 'expo-haptics';
import Animated, { SharedValue, useAnimatedProps } from 'react-native-reanimated';


const CryptoDetail = () => {
    const { name } = useLocalSearchParams();
    const [categories, setCategories] = useState(['Text', 'General', 'Trending'])
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const { state, isActive } = useChartPressState({ x: 0, y: { price: 0 } });
    const font = useFont(require('@/assets/fonts/SpaceMono-Regular.ttf'), 12);
    Animated.addWhitelistedNativeProps({text: true});
    const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

    const info = useQuery({
        queryKey: ['info'],
        queryFn: () => fetch(`/info?name=${name}`).then(res => res.json()),
    })

    const coinData = info.data?.data

    const tickers = useQuery({
        queryKey: ['tickers'],
        queryFn: () => fetch(`/tickers?coinId=${name}`).then(res => res.json()),
    })

    const tickerData: any[] = tickers.data?.data!.result;
    console.log(tickerData)

    function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
        return <Circle cx={x} cy={y} r={8} color="black" />;
    }

    useEffect(() => {
        if (isActive) Haptics.selectionAsync();

    }, [isActive])


    const animatedText = useAnimatedProps(() => {
        return {
            text: `${state.y.price.value.value.toFixed(2)} £`,
            defaultValue: ""
        }
    })


    const animatedDateText = useAnimatedProps(() => {
        const date = new Date(state.x.value.value);
        return {
            text: `${date.toLocaleDateString()}`,
            defaultValue: ""
        }
    })

    return (
        <SafeAreaView className='flex-1 mx-5'>
            {info.data &&
                <View className='flex-1'>
                    <Stack.Screen options={{ title: coinData.name }}></Stack.Screen>
                    <SectionList
                        keyExtractor={(item) => item.title}
                        sections={[{ data: [{ title: "Chart" }] }]}
                        renderSectionHeader={() => (
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                className='h-12'>
                                {categories?.map((cat, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => setActiveIndex(index)}
                                        className={`px-5 py-3 rounded-3xl ${activeIndex == index ? 'bg-white' : ''}`}>
                                        <Text className={`${activeIndex == index ? 'text-black font-bold' : ''}`} >{cat}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        )}
                        contentInsetAdjustmentBehavior='automatic'
                        ListHeaderComponent={() => (
                            <View className='flex-row justify-between items-center'>
                                <Text>{coinData.symbol}</Text>
                                <Image
                                    source={{ uri: coinData.icon }}
                                    resizeMode='contain'
                                    className='w-10 h-10' />
                            </View>
                        )}
                        renderItem={() => (
                            tickerData &&
                            <View className='flex-1' >
                                <View className='h-[350]'>
                                    <>
                                        {!isActive &&
                                            <View className='my-5'>
                                                <Text className='text-2xl font-bold'>
                                                    {tickerData[tickerData.length - 1].price.toFixed(2)} £
                                                </Text>
                                                <Text>Today</Text>
                                            </View>}

                                        {isActive &&
                                            <View className='my-5'>
                                                <AnimatedTextInput
                                                    editable={false}
                                                    animatedProps={animatedText}
                                                    underlineColorAndroid={'transparent'}
                                                    className='text-2xl font-bold'/>
                                                <AnimatedTextInput
                                                    editable={false}
                                                    underlineColorAndroid={'transparent'}
                                                    animatedProps={animatedDateText}/>
                                            </View>}
                                        <CartesianChart
                                            chartPressState={state}
                                            axisOptions={{
                                                font,
                                                tickCount: 3,
                                                labelOffset: { x: -2, y: 0 },
                                                labelColor: "gray",
                                                formatYLabel: (v) => `${v} £`,
                                                formatXLabel: (ms) => format(new Date(ms), 'MM/yy'),
                                            }}
                                            data={tickerData}
                                            xKey="_updated_at"
                                            yKeys={["price"]}>
                                            {({ points }) => (
                                                <>
                                                    <Line points={points.price} color='primary' strokeWidth={1} />
                                                    {isActive && <ToolTip x={state.x.position} y={state.y.price.position} />}
                                                </>
                                            )}
                                        </CartesianChart>
                                    </>
                                </View>
                            </View>
                        )}>
                    </SectionList>
                </View>}
        </SafeAreaView>
    )
}

export default CryptoDetail

const styles = StyleSheet.create({})