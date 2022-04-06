import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, SplashScreen, WelcomeScreen } from '@pages';
import LoginScreen from 'src/pages/auth/LoginScreen';
import DrawerNavigation from './DrawerNavigation';

const Stack = createNativeStackNavigator();
const StackNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* Introduction */}
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={DrawerNavigation} />
        </Stack.Navigator>
    )
}

export default StackNavigation