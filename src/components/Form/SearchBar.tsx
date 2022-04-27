import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import React, { FC, useEffect } from 'react'
import Input from '../Form/Input'
import { color, constant, theme } from '@utils'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'src/redux/reducer'
import { removeKeyword, setKeyword } from 'src/redux/actions/searchAction'
import { useNavigation } from '@react-navigation/native'
import { useNavigationProps } from '@types'

interface Props {
    style?: StyleProp<ViewStyle>,
    inputStyle?: StyleProp<ViewStyle>,
}
const SearchBar: FC<Props> = (props) => {
    const dispatch = useDispatch();
    const navigation = useNavigation<useNavigationProps>()
    const searchState = useSelector((state: State) => state.search)

    useEffect(() => {
        navigation.addListener("blur", () => dispatch(removeKeyword()))
    }, [])

    return (
        <View style={[styles.container, props.style]}>
            <Input
                containerStyle={theme.marginBottom0}
                style={[styles.searchbar, props.inputStyle]}
                leftIcon="magnify"
                value={searchState.data}
                rightIcon={searchState.data ? "close-circle-outline" : undefined}
                righIconOnPress={() => dispatch(removeKeyword())}
                onChangeText={(val) => dispatch(setKeyword(val))}
                placeholder='Apa yang ingin anda cari ?'
            />
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: constant.container,
        marginTop: -28,
        marginBottom: constant.container
    },
    searchbar: {
        backgroundColor: color.white,
        borderRadius: 50,
        ...theme.boxShadow
    }
})