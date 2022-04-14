import { StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { color, theme } from '@utils'
import { Icon, Text } from '@ui-kitten/components'
import TouchableRipple from '../Touchable/TouchableRipple'
import { useNavigation } from '@react-navigation/native'
import { useNavigationProps } from '@types'

interface Props {
    value: number
}
const SelectInfo: FC<Props> = ({ value }) => {
    const navigation: useNavigationProps = useNavigation()
    return (
        <View style={styles.card}>
            <TouchableRipple onPress={() => navigation.navigate("Cart")}>
                <View style={styles.info}>
                    <View style={theme.flexStart}>
                        <Icon name='cart' fill={color.white} style={styles.icon} />
                        <Text status={"control"} style={theme.fontSemiBold}>{value}  Item</Text>
                    </View>
                    <Text status={"control"} style={theme.fontSemiBold}>Rp 280.000</Text>
                </View>
            </TouchableRipple>
        </View>
    )
}

export default SelectInfo

const styles = StyleSheet.create({
    card: {
        paddingHorizontal: 16,
        zIndex: 99,
        position: "absolute",
        right: 0,
        left: 0,
        bottom: 0,
        ...theme.boxShadow,
        paddingTop: 10,
        backgroundColor: color.white
        // bottom: 16
    },
    info: {
        padding: 16,
        ...theme.flexBetween,
        ...theme.boxShadow,
        marginBottom: 16,
        borderRadius: 10,
        backgroundColor: color.primary,
    },
    icon: {
        ...theme.icon,
        marginRight: 16
    }
})