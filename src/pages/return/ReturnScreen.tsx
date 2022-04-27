import { ScrollView, StyleSheet, ToastAndroid, View } from 'react-native'
import React, { FC, useState, useEffect } from 'react'
import { BottomSheet, DetailLayout, Input, Item, ProductReturn } from '@components'
import { constant, helper, theme } from '@utils'
import { Button, Divider, Text } from '@ui-kitten/components'
import { SheetManager } from 'react-native-actions-sheet'
import { PageProps, TransactionDetailResultProps } from '@types'
import { http } from '@services'
import { useInfiniteQuery, useMutation } from 'react-query'

const ReturnScreen: FC<PageProps<'Return'>> = ({ route, navigation }) => {

    const [transaction] = useState(route.params.data)
    const [cart, setCart] = useState<TransactionDetailResultProps[]>([])
    const [selected, setSelected] = useState<TransactionDetailResultProps | undefined>(undefined)
    const [reason, setReason] = useState('')

    const handleOpenBottomSheet = (value: TransactionDetailResultProps) => {
        setSelected(value)
        SheetManager.show("returnSheet");
    }

    useEffect(() => {
        setCart(route.params.data.detail_transaksi.map((val) => {
            val.checked = false;
            // val.harga = val.harga - val.diskon;
            val.qty = parseInt(val.jumlah)
            return val;
        }))
    }, [])

    const handleCheckProduct = (id: number) => {
        setCart(cart.map((val) => {
            if (val.id === id) {
                val.checked = !val.checked;
                val.qty = 1;
            }
            return val;
        }))
    }

    const getTotal = () => {
        return cart.reduce((acc, val) => {
            if (val.checked) {
                return acc + (val.qty * val.harga)
            }
            return acc
        }, 0)
    }

    const handleChangeQty = (value: string) => {
        setCart(cart.map((val) => {
            if (val.id === selected?.id) {
                const newQty = isNaN(parseInt(value)) ? 0 : parseInt(value)
                if (newQty <= parseInt(selected.jumlah)) {
                    val.qty = newQty
                }
            }
            return val
        }))
    }

    const postReturn = async () => {
        let cartSelected = cart.filter((val) => val.checked)
        const data = {
            invoice: transaction.kode,
            total: getTotal(),
            cart: cartSelected,
            alasan: reason
        }
        const req = await http.post("pengembalian", data)
        return req;
    }

    const queryClient = useInfiniteQuery(['transaction', '', '']);
    const post = useMutation(postReturn, {
        onSuccess: (res) => {
            ToastAndroid.show("Berhasil membuat pengembalian", ToastAndroid.SHORT)
            queryClient.refetch();
            navigation.goBack();
        },
        onError: (err) => {
            ToastAndroid.show("Gagal membuat pengembalian", ToastAndroid.SHORT)
        }
    })

    return (
        <DetailLayout title='Pengembalian' back loading={post.isLoading}>
            <ScrollView contentContainerStyle={styles.scrollview}>
                <View style={styles.section}>
                    <Item title='No Transakasi' value={transaction.kode} />
                    <View style={styles.form}>
                        <Input
                            placeholder='Alasan Pengembalian'
                            containerStyle={theme.marginBottom10}
                            textArea
                            value={reason}
                            onChangeText={(value) => setReason(value)}
                        />
                    </View>
                </View>
                <Divider />
                <View style={styles.section}>
                    {cart.map((val, key) =>
                        <ProductReturn
                            key={key}
                            data={val}
                            onChecked={() => handleCheckProduct(val.id)}
                            onPress={() => handleOpenBottomSheet(val)}
                        />)}
                </View>
                <Divider />
                <View style={styles.section}>
                    <Item title='Jumlah Dipilih' value={cart.filter((x) => x.checked).length.toString() + " Item"} />
                    <Item title='Sub Total' value={helper.formatNumber(getTotal())} />
                </View>
                <View style={styles.form}>
                    <Button onPress={() => post.mutate()} disabled={cart.filter((x) => x.checked).length === 0}>Kirimkan</Button>
                </View>
            </ScrollView>
            <BottomSheet title='Ubah Jumlah' id='returnSheet'>
                <View style={styles.form}>
                    <Input
                        placeholder='Jumlah Dikembalian'
                        keyboardType='number-pad'
                        value={(selected?.qty ? selected.qty : '').toString()}
                        onChangeText={handleChangeQty}
                        autoFocus
                    />
                    <Text appearance={"hint"} style={styles.label} category="label">Jumlah stok tidak boleh melebihi {parseInt(selected?.jumlah ? parseInt(selected.jumlah).toString() : '')}</Text>
                </View>
            </BottomSheet>
        </DetailLayout>
    )
}

export default ReturnScreen

const styles = StyleSheet.create({
    scrollview: {
        // paddingVertical: constant.container
        paddingBottom: 150
    },
    form: {
        paddingHorizontal: constant.container
    },
    section: {
        paddingVertical: 16
    },
    label: {
        paddingBottom: constant.container
    }
})