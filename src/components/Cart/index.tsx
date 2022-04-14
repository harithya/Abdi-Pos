import { StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { Divider, Text } from '@ui-kitten/components'
import { color, constant, helper, theme } from '@utils'
import TouchableRipple from '../Touchable/TouchableRipple'
import { SalesCartProps, useNavigationProps } from '@types'
import { useNavigation } from '@react-navigation/native'

interface Props {
    data: SalesCartProps
}
const Cart: FC<Props> = ({ data }) => {
    const navigation: useNavigationProps = useNavigation();
    return (
        <>
            <TouchableRipple onPress={() => navigation.navigate("CartShow")}>
                <View style={styles.list}>
                    <View style={styles.number}>
                        <Text style={theme.fontMedium} status={"control"}>{data.qty}</Text>
                    </View>
                    <View style={theme.flex1}>
                        <Text>{data.name}</Text>
                        <View style={theme.flexBetween}>
                            <Text appearance={"hint"} category="c2" style={theme.marginTop5}>Harga: {helper.formatNumber(data.price)} x {data.qty}, Diskon: -</Text>
                            <Text category={"p2"}>{helper.formatNumber(data.price)}</Text>
                        </View>
                    </View>
                </View>
            </TouchableRipple>
            <Divider />
        </>
    )
}

export default Cart

const styles = StyleSheet.create({
    list: {
        paddingHorizontal: constant.container,
        paddingVertical: 16,
        ...theme.flexStart
    },
    number: {
        height: 40,
        marginRight: 20,
        width: 40,
        backgroundColor: color.primary,
        borderRadius: 10,
        ...theme.toCenter,
        ...theme.boxShadow,
    }
})