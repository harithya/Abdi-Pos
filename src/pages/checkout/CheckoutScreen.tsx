import { StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
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
    return (
        <DetailLayout title='Checkout' back>
            <View style={theme.content}>
                <Input label='Total yang dibayar' placeholder='Masukan total dibayar' leftIcon='currency-usd' />
                <Input label='Diskon' containerStyle={theme.marginBottom0} placeholder='Masukan jumlah diskon' leftIcon='percent-outline' />
            </View>
            <Divider />
            <View style={theme.content}>
                <Item title='Sub Total' value={17500} />
                <Item title='Diskon' value={5000} />
                <Item title='Yang harus dibayar' value={15000} />
                <Item title='Dibayarkan' value={20000} />
                <Item title='Kembalian' value={15000} />
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