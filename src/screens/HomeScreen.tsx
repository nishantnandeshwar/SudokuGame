import React from 'react'
import { View, Text, Button } from 'react-native'

export function HomeScreen(navigation: any) {
    return (
        <View>
            <Text>
                HomeScreen
            </Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Sudoku')}
            />
        </View>
    )
}
