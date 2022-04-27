import { StyleSheet, Text, View } from 'react-native'
import React, { FC, memo } from 'react'
import { Icon } from '@ui-kitten/components'
import { color, theme } from '@utils'
import TouchableRipple from './TouchableRipple'

interface Props {
    onPress: () => void,
}
const DeleteSwipe: FC<Props> = ({ onPress }) => {
    return (
        <TouchableRipple onPress={onPress}>
            <View style={styles.action}>
                <View style={styles.actionBody}>
                    <Icon name='delete' fill={color.white} style={theme.icon} />
                </View>
            </View>
        </TouchableRipple>
    )
}

export default memo(DeleteSwipe)

const styles = StyleSheet.create({
    action: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        backgroundColor: color.danger,
    },
    actionBody: {
        flex: 1,
        width: 75,
        ...theme.toCenter
    }
})