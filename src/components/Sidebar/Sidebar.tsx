import { View, Image, StyleSheet } from 'react-native'
import React from 'react'
import { theme } from '@utils'
import { Divider, Text } from '@ui-kitten/components'
import Menu from './Menu'
import { useNavigation } from '@react-navigation/native'
import { useNavigationProps } from '@types'

const Sidebar = () => {
    const navigation: useNavigationProps = useNavigation();
    return (
        <View>
            <View style={styles.profile}>
                <Image source={{ uri: "http://via.placeholder.com/640x640" }} style={styles.img} />
                <View>
                    <Text style={theme.fontSemiBold} numberOfLines={1}>Harithya Wisesa</Text>
                    <Text category={'p2'} style={theme.marginTop5} appearance='hint'>harithya77@gmail.com</Text>
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
                    title='History Transaksi'
                    icon='refresh-outline'
                />
                <Menu
                    title='Pengembalian'
                    icon='layout-outline'
                />
            </View>
            <Divider />
            <View style={styles.section}>
                <Menu
                    title='Log Out'
                    icon='log-out-outline'
                />
            </View>
        </View>
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
    }
})

export default Sidebar