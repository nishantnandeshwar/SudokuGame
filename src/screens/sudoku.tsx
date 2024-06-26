import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const SudokuScreen = () => {

    const [grid, setGrid] = useState(() => {
        const completeSudoku = generateSudoku()
        return completeSudoku;
    })
    // useEffect(() => { generateSudoku() }, [])


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

    // Function to generate a Sudoku puzzle
    function generateSudoku() {
        const grid = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0));
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        shuffle(numbers);
        solveSudoku(grid, numbers);
        return grid;
    }

    return (
        <View style={[styles.container]}>
            <Text style={[styles.header]}>
                The Sudoku Game
            </Text>
            <View style={[]}>
                {grid.map((row, rowIndex) => (
                    <View style={[styles.column]} key={rowIndex}>
                        <Text>
                            {row.map((cell, cellIndex) => (
                                <View style={[styles.row]} key={cellIndex}>
                                    <Text style={[styles.cell]}>
                                        {cell}
                                    </Text>
                                </View>
                            ))}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    )
}

export { SudokuScreen }

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },

})