import React, { useRef, useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { levels, CardProps } from '../types/type'

export const HomeScreen = ({ navigation }: { navigation: any }) => {
    const data: any = useRef("")
    const [selectedBtn, setSelectedBtn] = useState<number | undefined>(undefined)
    const levels = [
        { l: 'Easy', blanck: '5' },
        { l: 'Medium', blanck: '18' },
        { l: 'Hard', blanck: '35' },
    ]
    const selectLevel = (obj: levels, key: number | undefined) => {
        data.current = obj
        setSelectedBtn(key)
    }

    const Card: React.FC<CardProps> = (props: any) => {
        return (
            <Pressable
                android_ripple={{ color: 'rgba(0, 0, 0, 0.1)', radius: 70, borderless: false }}
                onPress={() => selectLevel(props.obj, props.keys)} key={props.keys}
                style={{ borderWidth: props.keys === selectedBtn ? 2 : 0, elevation: 2 }}
                className='bg-white dark:bg-slate-800 rounded items-center p-4 m-2 drop-shadow-md hover:drop-shadow-xl border-gray-950 dark:border-white '
            >
                <Text className="text-slate-900 dark:text-white text-base font-medium tracking-tight">
                    {props.obj?.l}
                </Text>
            </Pressable>

        );
    };

    const goToPlay = () => {
        navigation.navigate('Sudoku', { data: data.current })
    }

    return (
        <View className="flex-1 justify-center items-center bg-white dark:bg-slate-800 ">
            <View style={{ flexDirection: 'row' }}>
                {levels.map((level, index) => (
                    <Card key={index} obj={level} keys={index} /> // Moved key prop to the Card component
                ))}
            </View>
            <Pressable
                android_ripple={{ color: 'rgba(0, 0, 0, 0.1)', radius: 70, borderless: false }}
                onPress={() => goToPlay()}
                className='bg-slate-800 dark:bg-white  rounded items-center p-4 m-2 drop-shadow-md hover:drop-shadow-xl border-gray-950 dark:border-white '
            >
                <Text className="text-white dark:text-slate-900  text-xl tracking-tight">
                    Go to playing ground
                </Text>
            </Pressable>
        </View>
    )
}