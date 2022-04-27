import { StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { Text } from '@ui-kitten/components'
import { constant, theme } from '@utils'

interface ItemProps {
    title: string,
    value?: string
}
const Item: FC<ItemProps> = ({ title, value }) => {
    return (
        <View style={styles.item}>
            <Text>{title}</Text>
            {value && <Text>{value}</Text>}
        </View>
    )
}

export default Item

const styles = StyleSheet.create({
    item: {
        paddingVertical: 12,
        paddingHorizontal: constant.container,
        ...theme.flexBetween
    },
})