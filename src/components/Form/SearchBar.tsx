import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import React, { FC } from 'react'
import Input from '../Form/Input'
import { color, constant, theme } from '@utils'

interface Props {
    style?: StyleProp<ViewStyle>,
    inputStyle?: StyleProp<ViewStyle>,
}
const SearchBar: FC<Props> = (props) => {

    return (
        <View style={[styles.container, props.style]}>
            <Input
                containerStyle={theme.marginBottom0}
                style={[styles.searchbar, props.inputStyle]}
                leftIcon="magnify"
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