import { StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { Text } from '@ui-kitten/components'
import { color, constant, theme } from '@utils'
import TouchableRipple from '../Touchable/TouchableRipple'

interface Props {
    title: string,
    active?: boolean,
    onPress?: () => void,
}
const Radio: FC<Props> = ({ title, active, onPress }) => {
    return (
        <TouchableRipple onPress={onPress}>
            <View style={[styles.radio, active && styles.radioActive]}>
                <Text category={"p2"} status={active ? 'primary' : ''} style={theme.fontMedium} appearance="hint">{title}</Text>
            </View>
        </TouchableRipple>
    )
}

export default Radio

const styles = StyleSheet.create({
    radio: {
        paddingVertical: 5,
        paddingHorizontal: 16,
        marginBottom: 10,
        borderWidth: 1,
        marginRight: 10,
        borderRadius: 10,
        borderColor: color.border
    },
    radioActive: {
        borderColor: color.primary
    }
})