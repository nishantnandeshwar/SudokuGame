import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SudokuScreen } from '../screens/sudoku.tsx';
import { HomeScreen } from '../screens/HomeScreen.tsx';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Sudoku" component={SudokuScreen} />
    </Stack.Navigator>
    // <Stack.Navigator>
    //   <Stack.Screen name="Home" component={HomeScreen} />
    //   // <Stack.Screen name="Details" component={DetailsScreen} />
    // </Stack.Navigator>
  );
}

export default AppNavigator;
