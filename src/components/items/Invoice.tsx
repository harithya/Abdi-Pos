import { StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { color, constant, helper, theme } from '@utils'
import { Divider, Icon, Text } from '@ui-kitten/components'
import TouchableRipple from '../Touchable/TouchableRipple'
import { useNavigation } from '@react-navigation/native'
import { TransactionResultProps, useNavigationProps } from '@types'

interface Props {
    data: TransactionResultProps
}
const Invoice: FC<Props> = ({ data }) => {

    const getStatus = () => {
        switch (data.status_kasir) {
            case constant.transactionSuccess:
                return {
                    color: color.primary,
                    icon: "cash-check",
                    style: {
                        borderColor: color.primary,
                        backgroundColor: helper.hexToRgb(color.primary, 0.1)
                    }
                }
            case constant.transactionCancel:
                return {
                    color: color.danger,
                    icon: "cash-remove",
                    style: {
                        borderColor: color.danger,
                        backgroundColor: helper.hexToRgb(color.danger, 0.1)
                    }
                }
            case constant.transactionReturn:
                return {
                    color: color.warning,
                    icon: "cash-refund",
                    style: {
                        borderColor: color.warning,
                        backgroundColor: helper.hexToRgb(color.warning, 0.1)
                    }
                }

            default:
                return {
                    color: color.default,
                    icon: "cash",
                    style: {
                        borderColor: color.default,
                        backgroundColor: helper.hexToRgb(color.default, 0.1)
                    }
                }
        }
    }

    const navigation: useNavigationProps = useNavigation();
    return (
        <>
            <TouchableRipple onPress={() => navigation.navigate("TransactionShow", { kode: data.kode })}>
                <View style={styles.item}>
                    <View style={[styles.iconContainer, getStatus().style]}>
                        <Icon name={getStatus().icon} fill={getStatus().color} style={styles.icon} />
                    </View>
                    <View style={[theme.flex1, theme.flexBetween]}>
                        <View>
                            <Text>{data.kode}</Text>
                            <Text appearance={"hint"} category="c1" style={theme.marginTop5}>{helper.date(data.tanggal)}</Text>
                        </View>
                        <View>
                            <Text style={styles.textRight}>{helper.formatNumber(data.jumlah)}</Text>
                            <Text appearance={"hint"} style={[styles.textRight, theme.marginTop5]} category="c1">{data.pasien ?? 'Tamu'}</Text>
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