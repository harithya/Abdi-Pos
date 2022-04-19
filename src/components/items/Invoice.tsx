import { StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { color, constant, helper, theme } from '@utils'
import { Divider, Icon, Text } from '@ui-kitten/components'
import TouchableRipple from '../Touchable/TouchableRipple'
import { useNavigation } from '@react-navigation/native'
import { useNavigationProps } from '@types'

interface Props {
    status: "success" | "cancel" | "return"
}
const Invoice: FC<Props> = ({ status }) => {

    const getStatus = () => {
        switch (status) {
            case "success":
                return {
                    color: color.primary,
                    icon: "cash-check",
                    style: {
                        borderColor: color.primary,
                        backgroundColor: helper.hexToRgb(color.primary, 0.1)
                    }
                }
            case "cancel":
                return {
                    color: color.danger,
                    icon: "cash-remove",
                    style: {
                        borderColor: color.danger,
                        backgroundColor: helper.hexToRgb(color.danger, 0.1)
                    }
                }
            case "return":
                return {
                    color: color.warning,
                    icon: "cash-refund",
                    style: {
                        borderColor: color.warning,
                        backgroundColor: helper.hexToRgb(color.warning, 0.1)
                    }
                }
        }
    }

    const navigation: useNavigationProps = useNavigation();
    return (
        <>
            <TouchableRipple onPress={() => navigation.navigate("TransactionShow")}>
                <View style={styles.item}>
                    <View style={[styles.iconContainer, getStatus().style]}>
                        <Icon name={getStatus().icon} fill={getStatus().color} style={styles.icon} />
                    </View>
                    <View style={[theme.flex1, theme.flexBetween]}>
                        <View>
                            <Text>OD-8JPXR202</Text>
                            <Text appearance={"hint"} category="c1" style={theme.marginTop5}>18 Januari 2022</Text>
                        </View>
                        <View>
                            <Text style={styles.textRight}>Rp 36.000</Text>
                            <Text appearance={"hint"} style={[styles.textRight, theme.marginTop5]} category="c1">Harithya Wisesa</Text>
                        </View>
                    </View>
                </View>
            </TouchableRipple>
            <Divider />
        </>
    )
}

export default Invoice

const styles = StyleSheet.create({
    item: {
        paddingHorizontal: constant.container,
        paddingVertical: 14,
        ...theme.flexStart,
    },
    textRight: {
        textAlign: "right"
    },
    icon: {
        ...theme.icon,
    },
    iconContainer: {
        marginRight: 16,
        borderWidth: 1,
        height: 40,
        width: 40,
        ...theme.toCenter,
        borderRadius: 50,
    }
})