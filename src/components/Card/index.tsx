import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import React, { FC } from 'react'
import { color, theme } from '@utils'

interface Props {
    style?: StyleProp<ViewStyle>,
}
const Card: FC<Props> = (props) => {
    return (
        <View style={[styles.card, props.style]}>
            {props.children}
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    card: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: color.white,
        borderRadius: 10,
        ...theme.boxShadow
    }
})