import { StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import TouchableRipple from '../Touchable/TouchableRipple'
import { CustomerResultProps } from '@types'
import { Divider, Text } from '@ui-kitten/components'
import { color, constant, helper, theme } from '@utils'

interface Props {
    data: CustomerResultProps,
    onPress?: () => void
}
const Customer: FC<Props> = ({ data, onPress }) => {
    return (
        <>
            <TouchableRipple onPress={onPress}>
                <View style={styles.item}>
                    <View style={styles.initial}>
                        <Text status={"control"}>{helper.getInitial(data.nama)}</Text>
                    </View>
                    <View>
                        <Text>{data.nama}</Text>
                        <Text appearance={"hint"} category="c1">{data.no_hp}</Text>
                    </View>
                </View>
            </TouchableRipple>
            <Divider />
        </>
    )
}

export default Customer

const styles = StyleSheet.create({
    item: {
        paddingHorizontal: constant.container,
        paddingVertical: 14,
        ...theme.flexStart
    },
    initial: {
        height: 40,
        width: 40,
        ...theme.toCenter,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: color.primary,
        backgroundColor: helper.hexToRgb(color.primary, 0.7),
        marginRight: 20
    }
})