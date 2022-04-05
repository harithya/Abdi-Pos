import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native'
import React, { FC } from 'react'
import { constant } from '@utils'

interface Props {
    style?: StyleProp<ViewStyle>
}

const Layout: FC<Props> = ({ children, style }) => {
    return (
        <View style={[styles.container, style]}>
            {children}
        </View>
    )
}

export default Layout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: constant.statusBarPadding,
        width: "100%",
    }
})