import { Text } from '@ui-kitten/components'
import React, { FC } from 'react'
import { StyleSheet, View, ActivityIndicator, ViewStyle } from 'react-native'
import { color, theme } from '../../utils'

interface Props {
    style?: ViewStyle
}
const Loading: FC<Props> = (props) => {
    return (
        <View style={[styles.container, props.style]}>
            <ActivityIndicator size="large" color={color.primary} />
            <Text style={theme.marginTop10}>Loading...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        backgroundColor: color.white,
        right: 0,
        left: 0,
        bottom: 0,
        top: 0,
        ...theme.toCenter,
        zIndex: 9999999
    },

})

export default Loading

