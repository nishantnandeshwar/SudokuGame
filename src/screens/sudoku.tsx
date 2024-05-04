import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, TextInput, Pressable, Alert, ScrollView } from 'react-native'
import { commonStyles } from '../assets/styles'

const SudokuScreen = (props: any) => {
    console.log("props>>", JSON.stringify(props.route.params?.data?.l))
    const [grid, setGrid] = useState(() => {
        const completeSudoku = generateSudoku()
        return completeSudoku;
    })
    const [rememberCordinate, setRememberCordinate] = useState(grid?.zeroCoordinates)
    const details = useRef(props.route.params?.data || undefined)

    // Function to shuffle an array
    function shuffle(array: number[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Function to check if a number can be placed in a particular position
    function isValid(grid: number[][], row: number, col: number, num: number) {
        // Check if the number exists in the current row
        for (let i = 0; i < 9; i++) {
            if (grid[row][i] === num) {
                return false;
            }
        }

        // Check if the number exists in the current column
        for (let i = 0; i < 9; i++) {
            if (grid[i][col] === num) {
                return false;
            }
        }

        // Check if the number exists in the current 3x3 subgrid
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = startRow; i < startRow + 3; i++) {
            for (let j = startCol; j < startCol + 3; j++) {
                if (grid[i][j] === num) {
                    return false;
                }
            }
        }
        return true;
    }

    // Function to solve the Sudoku grid using backtracking
    function solveSudoku(grid: number[][], numbers: number[]) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                // Find an empty cell
                if (grid[row][col] === 0) {
                    shuffle(numbers);
                    // Try placing shuffled numbers
                    for (const num of numbers) {
                        if (isValid(grid, row, col, num)) {
                            // If the number is valid, place it in the grid
                            grid[row][col] = num;
                            // Recursively solve the rest of the grid
                            if (solveSudoku(grid, numbers)) {
                                return true;
                            }
                            // If no solution is found, backtrack and try the next number
                            grid[row][col] = 0;
                        }
                    }
                    // If no number can be placed in this cell, the puzzle is unsolvable
                    return false;
                }
            }
        }
        // If all cells are filled, the puzzle is solved
        return true;
    }

    type Coordinate = string;
    function removeNumbers(grid: number[][], count: number) {
        const updatedGrid = grid.map(row => [...row]); // Create a copy of the grid
        const coordinates: Set<Coordinate> = new Set();

        // Generate unique random coordinates
        while (coordinates.size < count) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);
            coordinates.add(`${row},${col}`);
        }

        // Update grid values at random coordinates to 0
        for (const coord of coordinates) {
            const [row, col] = coord.split(',').map(Number);
            updatedGrid[row][col] = 0;
        }
        return updatedGrid;
    }

    // Function to generate a Sudoku puzzle
    function generateSudoku() {
        const grid = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0));
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        shuffle(numbers);
        solveSudoku(grid, numbers);
        const updatedSudoku = removeNumbers(grid, 10)
        const zeroCoordinates = updatedSudoku.reduce((coordinates:any, row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (cell === 0) {
                    coordinates.push({ row: rowIndex, col: colIndex });
                }
            });
            return coordinates;
        }, []);
        return { grid, updatedSudoku, zeroCoordinates };
    }

    const updateSudoku = (e:string, row: any,col: any) => {
        const newGrid = [...grid?.updatedSudoku]
        newGrid[row][col] = parseInt(e) || 0
        setGrid({ ...grid, updatedSudoku: newGrid });
    }

    const varifySudoku=()=>{
        if(JSON.stringify(grid?.updatedSudoku) === JSON.stringify(grid?.grid)){
            Alert.alert("Success")
            props.navigation.navigate('Home')
        }
        else{
            Alert.alert("Failed")
        }
    }

    const checkEdit=(col: number,row: number)=>{
        const status = rememberCordinate.find((item:any)=>item.col === col && item.row === row)
        return status ? true : false
    }

    return (
        <ScrollView contentContainerStyle={[styles.container]} >
            <Text style={[styles.header]}>
                The Sudoku Game
            </Text>
            <View style={{ borderLeftWidth: 2, borderTopWidth: 2 }}>
                {grid?.updatedSudoku?.map((row, rowIndex) => (
                    <View style={[styles.column]} key={rowIndex}>
                        <Text>
                            {row.map((cell, cellIndex) => (
                                <View style={[styles.row]} key={cellIndex}>
                                    <TextInput
                                        style={[
                                            styles.cell,
                                            (rowIndex + 1) % 3 === 0 ? { borderBottomWidth: 2 } : { borderBottomWidth: 0.2 },
                                            (cellIndex + 1) % 3 === 0 ? { borderRightWidth: 2 } : { borderRightWidth: 0.2 },
                                        ]}
                                        onChangeText={(e) => updateSudoku(e,rowIndex,cellIndex)}
                                        value={cell.toString() !== "0" ? cell.toString() : ""}
                                        keyboardType="numeric"
                                        editable={checkEdit(cellIndex,rowIndex)}
                                    />
                                </View>
                            ))}
                        </Text>
                    </View>
                ))}
            </View>
            <Pressable
                android_ripple={{ color: 'rgba(0, 0, 0, 0.1)', radius: 70, borderless: false }}
                onPress={()=> varifySudoku()}
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? 'lightgrey' : 'white',
                        borderRadius: 5,
                        alignItems: 'center',
                    }, commonStyles.card
                ]}
            >
                <View>
                    <Text style={commonStyles.title18}>Submit</Text>
                </View>
            </Pressable>
        </ScrollView>
    )
}

export { SudokuScreen }

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row'
    },
    column: {
        flexDirection: 'column'
    },
    cell: {
        width: 40,
        height: 40,
        borderWidth: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'black'
    },
})