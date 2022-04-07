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
    title: string,
    back?: boolean,
    search?: boolean,
    loading?: boolean
}
const DetailLayout: FC<Props> = ({ title, children, back, search, loading }) => {
    const navigation = useNavigation<useNavigationProps>()
    return (
        <View style={theme.flex1}>
            <ImageBackground source={require("../../assets/img/background.png")} style={[styles.background, search && styles.withSearch]}>
                <Bubble />
                <View style={styles.header}>
                    {back && <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
                        <Icon name='arrow-ios-back-outline' pack='eva' fill={color.white} style={styles.icon} />
                    </TouchableOpacity>}
                    <Text status={"control"} category="h6" style={styles.title}>{title}</Text>
                </View>
            </ImageBackground>
            {search && <SearchBar style={styles.searchBar} inputStyle={styles.inputSearch} />}
            {loading ? <View style={styles.loading}>
                <Loading />
            </View> : children}
        </View>
    )
}

export default DetailLayout

const styles = StyleSheet.create({
    background: {
        height: 85,
        resizeMode: "cover",
        position: "relative"
    },
    header: {
        flex: 1,
        marginTop: 42,
        alignItems: "center"
    },
    title: {
        fontSize: 18
    },
    icon: {
        height: 24,
        width: 24
    },
    back: {
        position: "absolute",
        left: 18
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