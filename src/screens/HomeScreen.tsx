import React, { useRef, useState } from 'react'
import { View, Text, Button, StyleSheet, Pressable } from 'react-native'
import { levels, CardProps } from '../types/type'
import { commonStyles } from '../assets/styles'

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
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? 'lightgrey' : 'white',
                        borderRadius: 5,
                        alignItems: 'center',
                        borderWidth: props.keys === selectedBtn ? 2 : 0
                    }, commonStyles.card
                ]}
            >
                <View >
                    <Text style={commonStyles.title18}>{props.obj?.l}</Text>
                </View>
            </Pressable>

        );
    };

    const goToPlay = () => {
        navigation.navigate('Sudoku', { data: data.current })
    }
    return (
        <View style={[styles.container]}>
            <View style={{ flexDirection: 'row' }}>
                {levels.map((level, index) => (
                    <Card key={index} obj={level} keys={index} /> // Moved key prop to the Card component
                ))}
            </View>
            <Pressable
                android_ripple={{ color: 'rgba(0, 0, 0, 0.1)', radius: 70, borderless: false }}
                onPress={() => goToPlay()}
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? 'lightgrey' : 'white',
                        padding: 10,
                        borderRadius: 5,
                        width: '30%',
                        alignItems: 'center'
                    }, styles.card
                ]}
            >
                <Text style={styles.title}>
                    Play
                </Text>
            </Pressable>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center'
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    wrapperCustom: {
        borderRadius: 8,
        padding: 6,
    },
    text: {
        fontSize: 16,
    },
})