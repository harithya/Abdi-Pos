import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import Bubble from '../Bubble'
import { Icon, Text } from '@ui-kitten/components'
import { color, constant, theme } from '@utils'
import SearchBar from '../Form/SearchBar'
import Loading from '../Loading'
import { LayoutStateProps, useNavigationProps } from '@types'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'src/redux/reducer'
import { changeLayout } from 'src/redux/actions/layoutAction'
import { useNavigation } from '@react-navigation/native'

interface Props {
    search?: boolean,
    loading?: boolean
}
const HomeLayout: FC<Props> = ({ children, search, loading }) => {
    const navigation: any = useNavigation();
    const layoutState: LayoutStateProps = useSelector((state: State) => state.layout);
    const dispatch = useDispatch();

    const handleChangeLayout = () => {
        const value = layoutState.data === 'list' ? 'grid' : 'list';
        dispatch(changeLayout(value))
    }

    return (
        <View style={theme.flex1}>
            <ImageBackground source={require("../../assets/img/background.png")} style={[styles.background, search && styles.withSearch]}>
                <Bubble />
                <View style={styles.header}>
                    <View style={theme.flexStart}>
                        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                            <Icon name='menu-2-outline' pack='eva' fill={color.white} style={styles.icon} />
                        </TouchableOpacity>
                        <View style={styles.titleContainer}>
                            <Text status={"control"} category="h6" style={styles.title}>{'Semuanya'}</Text>
                            <Icon name='chevron-down' fill={color.white} style={styles.more} />
                        </View>
                    </View>
                    <View style={theme.flexStart}>
                        <TouchableOpacity onPress={() => navigation.navigate("Barcode")} style={styles.right}>
                            <Icon name='barcode-scan' fill={color.white} style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleChangeLayout} style={styles.right}>
                            <Icon name={layoutState.data == "grid" ? "format-list-bulleted-square" : "view-grid-outline"} fill={color.white} style={styles.icon} />
                        </TouchableOpacity>
                    </View>
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
        ...theme.flexBetween,
        paddingHorizontal: constant.container
    },
    title: {
        fontSize: 18,
    },
    titleContainer: {
        ...theme.flexStart,
        marginLeft: constant.container
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
    },
    right: {
        marginLeft: 16
    }
})