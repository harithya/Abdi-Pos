import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeScreen } from '../pages';
import { Sidebar } from '@components';

const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
    return (
        <Drawer.Navigator
            initialRouteName='DashboardDrawer'
            screenOptions={{
                headerShown: false, drawerStyle: {
                    width: '75%',
                },
            }}
            drawerContent={(props) => <Sidebar />}
        >
            <Drawer.Screen name="DashboardDrawer" component={HomeScreen} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigation
