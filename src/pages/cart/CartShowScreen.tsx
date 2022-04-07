import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Cart, DetailLayout, Input } from '@components'
import { color, constant, theme } from '@utils'
import { Button, Icon, Text } from '@ui-kitten/components'

const CartShowScreen = () => {
    return (
        <DetailLayout title='Detail' back>
            <Cart />
            <View style={theme.content}>
                <Input placeholder='Harga' leftIcon='currency-usd' />
                <Input placeholder='Diskon dalam rupiah' leftIcon='percent-outline' />
                <View style={styles.info}>
                    <Icon fill={color.default} name="info-outline" style={styles.icon} pack="eva" />
                    <Text appearance={"hint"} style={theme.fontRegular} category="c2">Masukan diskon dalam jumlah rupiah bukan persen</Text>
                </View>
                <View>
                    <Button appearance={"ghost"} status="danger">Hapus Keranjang</Button>
                </View>
            </View>
            <View style={theme.footer}>
                <View style={styles.qtyContainer}>
                    <Button size={"small"} accessoryLeft={(eva) => <Icon {...eva} name="minus-outline" pack='eva' />} />
                    <Input placeholder='Qty' containerStyle={styles.qty} textAlign='center' />
                    <Button size={"small"} accessoryLeft={(eva) => <Icon {...eva} name="plus-outline" pack='eva' />} />
                </View>
                <Button>Simpan Perubahan</Button>
            </View>
        </DetailLayout>
    )
}

export default CartShowScreen

const styles = StyleSheet.create({
    qty: {
        ...theme.flex1,
        ...theme.marginBottom0,
        paddingHorizontal: 16
    },
    qtyContainer: {
        ...theme.flexBetween,
        marginBottom: 16
    },
    icon: {
        height: 18,
        width: 18,
        marginRight: 10
    },
    info: {
        ...theme.flexStart,
        marginTop: -10,
        marginBottom: 16
    }
})