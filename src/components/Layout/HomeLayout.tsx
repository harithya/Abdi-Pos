import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import Bubble from '../Bubble'
import { Icon, Text } from '@ui-kitten/components'
import { color, theme } from '@utils'
import { useNavigation } from '@react-navigation/native'
import { useNavigationProps } from '@types'
import SearchBar from '../Form/SearchBar'
import Loading from '../Loading'

interface Props {
    search?: boolean,
    loading?: boolean
}
const HomeLayout: FC<Props> = ({ children, search, loading }) => {
    const navigation = useNavigation<useNavigationProps>()
    return (
        <View style={theme.flex1}>
            <ImageBackground source={require("../../assets/img/background.png")} style={[styles.background, search && styles.withSearch]}>
                <Bubble />
                <View style={styles.header}>
                    <TouchableOpacity style={styles.menu}>
                        <Icon name='menu-2-outline' fill={color.white} style={styles.icon} />
                    </TouchableOpacity>
                    <View style={styles.titleContainer}>
                        <Text status={"control"} category="h6" style={styles.title}>{'Semuanya'}</Text>
                        <Icon name='arrow-ios-downward-outline' fill={color.white} style={styles.more} />
                    </View>
                    <TouchableOpacity style={styles.option}>
                        <Icon name='grid-outline' fill={color.white} style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            {search && <SearchBar style={styles.searchBar} inputStyle={styles.inputSearch} />}
            {loading ? <View style={styles.loading}>
                <Loading />
            </View> : children}
        </View>
    )
}

export default HomeLayout

const styles = StyleSheet.create({
    background: {
        height: 85,
        resizeMode: "cover",
        position: "relative"
    },
    header: {
        flex: 1,
        marginTop: 42,
        alignItems: "flex-start"
    },
    title: {
        fontSize: 18,
    },
    titleContainer: {
        marginLeft: 75,
        marginTop: -1,
        ...theme.flexStart
    },
    more: {
        height: 24,
        width: 24,
        marginLeft: 16,
        marginTop: 1
    },
    icon: {
        height: 24,
        width: 24
    },
    menu: {
        position: "absolute",
        left: 18
    },
    option: {
        position: "absolute",
        right: 18
    },
    withSearch: {
        height: 110
    },
    inputSearch: {
        borderRadius: 10
    },
    searchBar: {
        marginBottom: 0,
    },
    loading: {
        flex: 1,
        ...theme.toCenter
    }
})