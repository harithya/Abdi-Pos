import { View, Image, StyleSheet } from 'react-native'
import React from 'react'
import { theme } from '@utils'
import { Divider, Text } from '@ui-kitten/components'
import Menu from './Menu'
import { useNavigation } from '@react-navigation/native'
import { AuthStateProps, useNavigationProps } from '@types'
import { useSelector } from 'react-redux'
import { State } from 'src/redux/reducer'
import { ScrollView } from 'react-native-gesture-handler'

const Sidebar = () => {
    const navigation: useNavigationProps = useNavigation();
    const authState: AuthStateProps = useSelector((state: State) => state.auth);
    return (
        <ScrollView scrollsToTop={false} >
            <View style={styles.profile}>
                <Image source={{ uri: authState.avatar }} style={styles.img} />
                <View>
                    <Text style={theme.fontSemiBold} numberOfLines={1}>{authState.name}</Text>
                    <Text category={'p2'} style={theme.marginTop5} appearance='hint'>Kasir</Text>
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
                    title='Pengaturan'
                    icon='settings-outline'
                    onPress={() => navigation.navigate("Setting")}
                />
            </View>
            <Divider />
            <View style={styles.section}>
                <Menu
                    title='Log Out'
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
        marginBottom: 0,
        marginTop: 30
    },
    img: {
        height: 70,
        width: 70,
        borderRadius: 50,
        marginBottom: 20
    },
    section: {
        marginVertical: 16
    },
})

export default Sidebar