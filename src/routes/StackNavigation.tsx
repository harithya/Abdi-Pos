import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    BarcodeScreen,
    CartScreen,
    CartShowScreen,
    CheckoutScreen,
    CustomerCreateScreen,
    CustomerImportScreen,
    CustomerScreen,
    FinishScreen,
    HomeScreen,
    LayoutScreen,
    PasswordEditScreen,
    PrinterScreen,
    ProductScreen,
    ProfileEditScreen,
    QueueFinishScreen,
    QueueScreen,
    QueueShowScreen,
    ReceiptScreen,
    ReturnScreen,
    ReturnShowScreen,
    SettingScreen,
    SplashScreen,
    TransactionScreen,
    TransactionShowScreen,
    WelcomeScreen
} from '@pages';
import LoginScreen from 'src/pages/auth/LoginScreen';

const Stack = createNativeStackNavigator();
const StackNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* Introduction */}
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
            <Stack.Screen name="PasswordEdit" component={PasswordEditScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="Customer" component={CustomerScreen} />
            <Stack.Screen name="CartShow" component={CartShowScreen} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ animation: "slide_from_right" }} />
            <Stack.Screen name="Finish" component={FinishScreen} />
            <Stack.Screen name="Barcode" component={BarcodeScreen} />
            <Stack.Screen name="CustomerImport" component={CustomerImportScreen} />
            <Stack.Screen name="CustomerCreate" component={CustomerCreateScreen} />
            <Stack.Screen name="Product" component={ProductScreen} />
            <Stack.Screen name="Transaction" component={TransactionScreen} />
            <Stack.Screen name="TransactionShow" component={TransactionShowScreen} />
            <Stack.Screen name="Return" component={ReturnScreen} options={{ animation: "slide_from_right" }} />
            <Stack.Screen name="Setting" component={SettingScreen} />
            <Stack.Screen name="Layout" component={LayoutScreen} />
            <Stack.Screen name="Receipt" component={ReceiptScreen} />
            <Stack.Screen name="Printer" component={PrinterScreen} />
            <Stack.Screen name="Queue" component={QueueScreen} />
            <Stack.Screen name="QueueShow" component={QueueShowScreen} />
            <Stack.Screen name="ReturnShow" component={ReturnShowScreen} />
            <Stack.Screen name="QueueFinish" component={QueueFinishScreen} />

        </Stack.Navigator>
    )
}

export default StackNavigation