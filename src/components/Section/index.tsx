import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import React, { FC } from 'react'
import { Text } from '@ui-kitten/components'
import { constant, theme } from '@utils'

interface Props {
    title: string,
    style?: StyleProp<ViewStyle>
}
const Section: FC<Props> = ({ title, children, style }) => {
    return (
        <View style={style}>
            <View style={styles.container}>
                <Text category={"h6"} style={theme.marginBottom10}>{title}</Text>
            </View>
            {children}
        </View>
    )
}

export default Section

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: constant.container
    }
})