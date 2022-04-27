import { ScrollView, StyleSheet, ToastAndroid, View } from 'react-native'
import React, { FC, useState } from 'react'
import { DetailLayout, Input } from '@components'
import { constant, helper, theme } from '@utils'
import { Button, Divider, Text } from '@ui-kitten/components'
import { CartStateProps, CustomerStateProps, PageProps } from '@types'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'src/redux/reducer'
import { useMutation } from 'react-query'
import { http } from '@services'
import { removeCustomer } from 'src/redux/actions/customerAction'
import { emptySalesCart } from 'src/redux/actions/salesCartAction'

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

    const saleCartState: CartStateProps = useSelector((state: State) => state.salesCart);
    const customerState: CustomerStateProps = useSelector((state: State) => state.customer);

    const postCheckout = async () => {
        const data = {
            discount: discount,
            paid: paid,
            cart: saleCartState.data,
            subTotal: helper.getTotalCart(),
            customerId: customerState.data?.id ?? null
        }
        const req = http.post("/transaksi", data);
        return req;
    }

    const dispatch = useDispatch();


    const mutaion = useMutation(postCheckout, {
        onSuccess: (res) => {
            dispatch(removeCustomer());
            dispatch(emptySalesCart());
            navigation.replace("Finish", { kode: res.data.result.kode });
        },
        onError: () => {
            ToastAndroid.show("Gagal melakukan transaksi", ToastAndroid.SHORT);
        }
    })

    return (
        <DetailLayout title='Checkout' back loading={mutaion.isLoading}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <Input
                    label='Total yang dibayar'
                    placeholder='Masukan total dibayar'
                    leftIcon='currency-usd'
                    keyboardType='number-pad'
                    value={paid === 0 ? '' : helper.formatNumber(paid, false)}
                    onChangeText={handleSetPaid}
                />
                <Input
                    label='Diskon'
                    containerStyle={theme.marginBottom0}
                    placeholder='Masukan jumlah diskon'
                    leftIcon='percent-outline'
                    keyboardType='number-pad'
                    value={discount === 0 ? '' : helper.formatNumber(discount, false)}
                    onChangeText={handleSetDiscount}
                />
                <View style={styles.info}>
                    <Item title='Sub Total' value={helper.getTotalCart()} />
                    <Item title='Diskon' value={discount} />
                    <Item title='Yang harus dibayar' value={helper.getTotalCart() - discount} />
                    <Item title='Dibayarkan' value={paid} />
                    <Item title='Kembalian' value={paid - (helper.getTotalCart() - discount)} />
                </View>
            </ScrollView>

            <View style={theme.footer}>
                <Button onPress={() => mutaion.mutate()}>Bayar Sekarang</Button>
            </View>
        </DetailLayout>
    )
}

export default CheckoutScreen

const styles = StyleSheet.create({
    item: {
        ...theme.flexBetween,
        marginBottom: 16
    },
    info: {
        marginTop: constant.container
    },
    scroll: {
        ...theme.content,
        paddingBottom: 100
    }
})