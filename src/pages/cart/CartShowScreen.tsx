import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Cart, DetailLayout, Input } from '@components'
import { constant, theme } from '@utils'
import { Button, Icon } from '@ui-kitten/components'

const CartShowScreen = () => {
    return (
        <DetailLayout title='Detail' back>
            <Cart />
            <View style={theme.content}>
                <Input placeholder='Harga' leftIcon='currency-usd' />
                <Input placeholder='Diskon dalam rupiah' leftIcon='percent-outline' />
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
    }
})