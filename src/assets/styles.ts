import { StyleSheet } from 'react-native'

export const commonStyles = StyleSheet.create({
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
    title18: {
        fontSize: 18,
        fontWeight: 'bold',
    },
})