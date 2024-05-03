import React,{ useRef} from 'react'
import { View, Text, Button, StyleSheet, Pressable } from 'react-native'

interface levels {
    l: string;
    blanck: string;
}
interface CardProps {
    keys?: number;
    // obj: {}
    obj: levels;
}

export const HomeScreen = ({ navigation }: { navigation: any }) => {
    const data:any = useRef("")
    const levels = [
        {l:'Easy',blanck:'10'},
        {l:'Medium',blanck:'20'},
        {l:'Hard',blanck:'30'},
    ]
    const selectLevel = (obj:{l: string,blanck: string;}) => {
        data.current = obj
    }

    const Card: React.FC<CardProps> = ({ obj, keys }) => {
        return (
            <Pressable onPress={() => selectLevel(obj)} key={keys}>
                <View style={styles.card}>
                    <Text style={styles.title}>{obj?.l}</Text>
                </View>
            </Pressable>
        );
    };

    const goToPlay=()=>{
        navigation.navigate('Sudoku',{data:data.current})
    }
    return (
        <View style={[styles.container]}>
            <View style={{ flexDirection: 'row' }}>
                {levels.map((level, index) => (
                    <Card key={index} obj={level} /> // Moved key prop to the Card component
                ))}
            </View>
            <View style={[styles.card]}>
                <Pressable onPress={()=> goToPlay()}>
                    <Text style={styles.title}>
                        Play
                    </Text>
                </Pressable>
            </View>
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
})