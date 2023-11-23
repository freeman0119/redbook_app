import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Welcome from './src/pages/welcome/Welcome';
import Login from './src/pages/login/Login';
import MainTab from './src/pages/mainTab/MainTab';
const Stack = createStackNavigator();

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            cardStyle: {elevation: 1},
          }}>
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
              ...TransitionPresets.ModalSlideFromBottomIOS,
            }}
          />
          <Stack.Screen
            name="MainTab"
            component={MainTab}
            options={{
              headerShown: false,
              ...TransitionPresets.ModalSlideFromBottomIOS,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
