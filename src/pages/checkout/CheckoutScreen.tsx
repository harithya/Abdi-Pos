import { StyleSheet, View } from 'react-native'
import React, { FC, useState } from 'react'
import { DetailLayout, Input } from '@components'
import { helper, theme } from '@utils'
import { Button, Divider, Text } from '@ui-kitten/components'
import { PageProps } from '@types'

interface Props {
    title: string,
    value: number
}
const Item: FC<Props> = ({ title, value }) => {
    return (
        <View style={styles.item}>
            <Text>{title}</Text>
            <Text>{helper.formatNumber(value)}</Text>
        </View>
    )
}

const CheckoutScreen: FC<PageProps> = ({ navigation }) => {
    const [discount, setDiscount] = useState(0)
    const [paid, setPaid] = useState(0)

    const handleSetPaid = (value: string) => {
        (isNaN(parseInt(value))) ? setPaid(0) : setPaid(parseInt(helper.inputNumber(value)));
    }

    const handleSetDiscount = (value: string) => {
        (isNaN(parseInt(value))) ? setDiscount(0) : setDiscount(parseInt(helper.inputNumber(value)));
    }

    return (
        <DetailLayout title='Checkout' back>
            <View style={theme.content}>
                <Input
                    label='Total yang dibayar'
                    placeholder='Masukan total dibayar'
                    leftIcon='currency-usd'
                    value={paid === 0 ? '' : helper.formatNumber(paid, false)}
                    onChangeText={handleSetPaid}
                />
                <Input
                    label='Diskon'
                    containerStyle={theme.marginBottom0}
                    placeholder='Masukan jumlah diskon'
                    leftIcon='percent-outline'
                    value={discount === 0 ? '' : helper.formatNumber(discount, false)}
                    onChangeText={handleSetDiscount}
                />
            </View>
            <Divider />
            <View style={theme.content}>
                <Item title='Sub Total' value={helper.getTotalCart()} />
                <Item title='Diskon' value={discount} />
                <Item title='Yang harus dibayar' value={helper.getTotalCart() - discount} />
                <Item title='Dibayarkan' value={paid} />
                <Item title='Kembalian' value={paid - (helper.getTotalCart() - discount)} />
            </View>
            <View style={theme.footer}>
                <Button onPress={() => navigation.replace("Finish")}>Bayar Sekarang</Button>
            </View>
        </DetailLayout>
    )
}

export default CheckoutScreen

const styles = StyleSheet.create({
    item: {
        ...theme.flexBetween,
        marginBottom: 16
    }
})