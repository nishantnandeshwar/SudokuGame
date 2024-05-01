import React from 'react'
import { View, Text, Button, StyleSheet, Pressable } from 'react-native'

interface CardProps {
    title: string;
    keys?: number,
}

export const HomeScreen = ({ navigation }: { navigation: any }) => {
    const levels = ["Easy", "Medium", "Hard"]
    const selectLevel = (level: string) => {
        console.log("Selected Level:", level)
    }

    const Card: React.FC<CardProps> = ({ title, keys }) => {
        return (
            <Pressable onPress={() => selectLevel(title)} key={keys}>
                <View style={styles.card}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </Pressable>
        );
    };

    const goToPlay=()=>{
        navigation.navigate('Sudoku')
    }
    return (
        <View style={[styles.container]}>
            <View style={{ flexDirection: 'row' }}>
                {levels.map((level, index) => (
                    <Card key={index} title={level} /> // Moved key prop to the Card component
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