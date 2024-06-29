import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';

import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import AppNavigator from './src/navigations/AppNavigator';
import SplashScreen from 'react-native-splash-screen';

export const appNavRef = createNavigationContainerRef();


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  setTimeout(() => SplashScreen.hide(), 2000);

  return (
    <SafeAreaView className='flex-1 bg-white dark:bg-slate-800'>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <NavigationContainer ref={appNavRef}>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
