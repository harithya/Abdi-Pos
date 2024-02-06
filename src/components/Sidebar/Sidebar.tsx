import { View, Image, StyleSheet, Alert, AsyncStorage } from 'react-native'
import React, { useState } from 'react'
import { theme } from '@utils'
import { Divider, Text } from '@ui-kitten/components'
import Menu from './Menu'
import { useNavigation } from '@react-navigation/native'
import { AuthStateProps, useNavigationProps } from '@types'
import { useSelector } from 'react-redux'
import { State } from 'src/redux/reducer'
import { ScrollView } from 'react-native-gesture-handler'
import { http } from '@services'

const Sidebar = () => {
    const navigation: useNavigationProps = useNavigation();
    const authState: AuthStateProps = useSelector((state: State) => state.auth);

    const [loading, setLoading] = useState(false)
    // Fetch to url logout
    const onLogout = async () => {
        setLoading(true)
        await http.post('profile/logout');
        await AsyncStorage.removeItem("token");
        setLoading(false)
        navigation.navigate('Login');
    }

    const handleLogout = () => {
        Alert.alert("Konfirmasi",
            "Apakah yakin ingin logout ?",
            [
                {
                    text: "Cancel", style: "cancel"
                },
                { text: "OK", onPress: () => onLogout() }
            ]
        );
    }

    return (
        <ScrollView scrollsToTop={false} showsVerticalScrollIndicator={false}>
            <View style={styles.profile}>
                <Image source={{ uri: `https://ui-avatars.com/api/?background=50D4B4&color=fff&font-size=0.33&name=${authState.name}` }} style={styles.img} />
                <View style={theme.toCenter}>
                    <Text style={[theme.fontSemiBold]} numberOfLines={1}>{authState.name}</Text>
                    <Text category={'p2'} style={[theme.marginTop5, theme.textCenter]} appearance='hint'>Kasir Arfan Medika</Text>
                </View>
            </View>
            <Divider />
            <View style={styles.section}>
                <Menu
                    title='Profile'
                    icon='person-outline'
                    onPress={() => navigation.navigate("ProfileEdit")}
                />
                <Menu
                    title='Ganti Password'
                    icon='lock-outline'
                    onPress={() => navigation.navigate("PasswordEdit")}
                />
                <Menu
                    title='Pelanggan'
                    icon='person-add-outline'
                    onPress={() => navigation.navigate("Customer", {})}
                />
                <Menu
                    title='Transaksi'
                    icon='refresh-outline'
                    onPress={() => navigation.navigate("Transaction")}
                />
                <Menu
                    title='Antrian Klinik'
                    icon='activity-outline'
                    onPress={() => navigation.navigate("Queue")}
                />
            </View>
            <Divider />
            <View style={styles.section}>
                <Menu
                    title='Pengaturan'
                    icon='settings-outline'
                    onPress={() => navigation.navigate("Setting")}
                />
                <Menu
                    title='Log Out'
                    onPress={handleLogout}
                    icon='log-out-outline'
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 200,
        width: "100%"
    },
    profile: {
        ...theme.content,
        ...theme.toCenter,
        marginBottom: 0,
        marginTop: 30
    },
    img: {
        height: 80,
        width: 80,
        borderRadius: 50,
        marginBottom: 10
    },
    section: {
        marginVertical: 16
    },
})

export default Sidebar