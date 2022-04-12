import { StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { Cart, DetailLayout, SelectPeople } from '@components'
import { color, constant, theme } from '@utils'
import { Button, Text } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { useNavigationProps } from '@types'

interface Props {
    disableLayout?: boolean
}
const CartScreen: FC<Props> = ({ disableLayout }) => {
    const navigation = useNavigation<useNavigationProps>()
    return (
        <DetailLayout title='Keranjang' disable={disableLayout} back>
            <View style={theme.flex1}>
                <SelectPeople />
                <Cart />
                <View style={styles.footer}>
                    <View style={[theme.flexBetween, theme.marginBottom5]}>
                        <Text style={theme.fontMedium} category={"p2"}>Total Pembayaran</Text>
                        <Text style={theme.fontMedium} category={"p2"}>Rp 17.500</Text>
                    </View>
                    <View style={[theme.flexBetween, theme.marginTop10]}>
                        <Button status={"danger"} style={styles.button} appearance={"outline"}>
                            Hapus Keranjang
                        </Button>
                        <Button onPress={() => navigation.navigate("Checkout")} style={styles.button}>Bayar Sekarang</Button>
                    </View>
                </View>
            </View>
        </DetailLayout>
    )
}

export default CartScreen

const styles = StyleSheet.create({
    footer: {
        position: "absolute",
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: color.white,
        borderTopWidth: 0.8,
        borderTopColor: color.border,
        ...theme.content,
        paddingVertical: constant.container,
        paddingTop: 16
    },
    button: {
        width: "48%"
    }
})