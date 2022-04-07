import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartScreen, CartShowScreen, CustomerScreen, HomeScreen, PasswordEditScreen, ProfileEditScreen, SplashScreen, WelcomeScreen } from '@pages';
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
            <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
            <Stack.Screen name="PasswordEdit" component={PasswordEditScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="Customer" component={CustomerScreen} />
            <Stack.Screen name="CartShow" component={CartShowScreen} />
        </Stack.Navigator>
    )
}

export default StackNavigation