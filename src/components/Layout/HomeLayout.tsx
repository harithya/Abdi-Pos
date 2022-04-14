import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react'
import Bubble from '../Bubble'
import { Icon, Text } from '@ui-kitten/components'
import { color, constant, helper, theme } from '@utils'
import SearchBar from '../Form/SearchBar'
import Loading from '../Loading'
import { CategoryStateProps, LayoutStateProps } from '@types'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'src/redux/reducer'
import { changeLayout } from 'src/redux/actions/layoutAction'
import { useNavigation } from '@react-navigation/native'
import SideMenu from 'react-native-side-menu-updated'
import Sidebar from '../Sidebar/Sidebar'

interface Props {
    search?: boolean,
    loading?: boolean,
    onPressCategory?: () => void,
    onChangeLayout?: () => void,
}
const HomeLayout: FC<Props> = ({ children, search, loading, onPressCategory, onChangeLayout }) => {
    const navigation: any = useNavigation();
    const layoutState: LayoutStateProps = useSelector((state: State) => state.layout);
    const dispatch = useDispatch();

    const handleChangeLayout = () => {
        const value = layoutState.data === 'list' ? 'grid' : 'list';
        dispatch(changeLayout(value))
        if (onChangeLayout) {
            onChangeLayout()
        }
    }

    const categoryState: CategoryStateProps = useSelector((state: State) => state.category);

    // Handle drawer
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const handleSideBarChange = () => {
        setIsOpenDrawer(!isOpenDrawer)
    }


    return (
        <SideMenu menu={<Sidebar />} onChange={handleSideBarChange} openMenuOffset={275} autoClosing isOpen={isOpenDrawer} >
            <View style={[theme.flex1, styles.mainContent]}>
                <ImageBackground source={require("../../assets/img/background.png")} style={[styles.background, search && styles.withSearch]}>
                    <Bubble />
                    <View style={styles.header}>
                        <View style={theme.flexStart}>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => setIsOpenDrawer(true)}>
                                <Icon name='menu-2-outline' pack='eva' fill={color.white} style={styles.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.touchableTitle} onPress={onPressCategory} activeOpacity={0.8}>
                                <View style={[styles.titleContainer, theme.flex1]}>
                                    <Text status={"control"} numberOfLines={1} category="h6" style={styles.title}>
                                        {categoryState.selected.nama === '' ? 'Semuanya' : categoryState.selected.nama}
                                    </Text>
                                    <Icon name='chevron-down' fill={color.white} style={styles.more} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={theme.flexStart}>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("Barcode")} style={styles.right}>
                                <Icon name='barcode-scan' fill={color.white} style={styles.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} onPress={handleChangeLayout} style={styles.right}>
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
        </SideMenu>
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
    },
    touchableTitle: {
        maxWidth: helper.isTablet() ? undefined : 220,
        marginLeft: 20
    },
    mainContent: {
        backgroundColor: color.white,
        borderLeftWidth: 1,
        borderLeftColor: color.border
    }
})