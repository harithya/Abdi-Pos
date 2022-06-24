import { ScrollView, StyleSheet, ToastAndroid, View } from 'react-native'
import React, { FC, useState, useEffect } from 'react'
import { BottomSheet, DetailLayout, Input, Item, Section, Radio, ProductQueue } from '@components'
import { color, constant, helper, theme } from '@utils'
import { Button, Icon } from '@ui-kitten/components'
import { CartProps, CartStateProps, PageProps, ProductResultProps, ServiceResultProps } from '@types'
import { SheetManager } from 'react-native-actions-sheet'
import { http } from '@services'
import { useInfiniteQuery, useMutation, useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'src/redux/reducer'
import { addQueueCart, emptyQueueCart } from 'src/redux/actions/queueCartAction'
import QueueEditCart from './QueueEditCart'

const fetchData = async (id: number) => {
    const req = await http.get(`antrian/${id}/transaksi`);
    return req.data.result ?? []
}
const QueueShowScreen: FC<PageProps<'QueueShow'>> = ({ navigation, route }) => {

    const { data, isLoading, isSuccess } = useQuery(["queueShow", route.params.id],
        () => fetchData(route.params.id), {
        cacheTime: 0
    });

    const queueCartState: CartStateProps = useSelector((state: State) => state.queueCart);
    const dispatch = useDispatch();

    const [discount, setDiscount] = useState(0)
    const [paid, setPaid] = useState(0)

    const handleSetPaid = (value: string) => {
        (isNaN(parseInt(value))) ? setPaid(0) : setPaid(parseInt(helper.inputNumber(value)));
    }

    const handleSetDiscount = (value: string) => {
        (isNaN(parseInt(value))) ? setDiscount(0) : setDiscount(parseInt(helper.inputNumber(value)));
    }

    const [cartSelected, setcartSelected] = useState<CartProps>(queueCartState.data[0] ?? []);

    useEffect(() => {
        dispatch(emptyQueueCart())
        if (isSuccess && queueCartState.data.length === 0) {
            data.resep.map((val: ProductResultProps) => {
                dispatch(addQueueCart(val))
            })
        }
    }, [isSuccess])

    const handleDetailProduct = (val: CartProps) => {
        setcartSelected(val);
        SheetManager.show("productSheet");
    }

    const getTotalAll = () => {
        let total = 0;
        queueCartState.data.map((val: CartProps) => {
            total += val.qty * val.price;
        })
        data.layanan.map((val: ServiceResultProps) => {
            total += val.harga;
        })

        total -= data.antrian.jumlah_asuransi ?? 0;
        total -= discount;
        return total;
    }

    const postTransaction = async () => {
        let service = 0;
        data.layanan.map((val: ServiceResultProps) => {
            service += val.harga;
        })
        const prepare = {
            discount: discount,
            paid: paid,
            insurance: data.antrian.jumlah_asuransi ?? 0,
            antrianId: route.params.id,
            serviceCost: service,
            noRekap: data.antrian.no_rekap,
            metodePembayaran: paid > 0 ? 1 : 0,
            cart: queueCartState.data
        }
        const req = await http.post('antrian/selesai', prepare);
        return req;
    }

    const queryClient = useInfiniteQuery(['queue', '', 0])
    const transactionMutate = useMutation(postTransaction, {
        onSuccess: () => {
            ToastAndroid.show("Transaksi berhasil", ToastAndroid.SHORT);
            navigation.replace("QueueFinish", { kode: data.antrian.kode_transaksi });
            queryClient.refetch();
        },
        onError: (err) => {
            ToastAndroid.show("Transaksi tidak berhasil", ToastAndroid.SHORT);
        }
    })

    return (
        <DetailLayout title='Detail' back loading={isLoading || transactionMutate.isLoading}>
            {isSuccess && <ScrollView contentContainerStyle={styles.container}>
                <Section title='Informasi Antrian' style={styles.section}>
                    <Item title='Nama Lengkap' value={data.antrian.pasien} />
                    <Item title='No Identitas' value={data.antrian.no_identitas ?? '-'} />
                    <Item title='Dokter Pemeriksa' value={data.antrian.dokter ?? '-'} />
                </Section>

                <Section title='Layanan' style={styles.section}>
                    {data.layanan.map((val: ServiceResultProps, key: number) =>
                        <Item
                            key={`service-${key}`}
                            title={val.layanan}
                            value={helper.formatNumber(val.harga)}
                        />)}
                </Section>
                <Section title='Obat / Produk' style={styles.section}>
                    {queueCartState.data.map((val, key: number) =>
                        <ProductQueue
                            key={`product-${key}`}
                            data={val}
                            onPress={() => handleDetailProduct(val)}
                        />
                    )}
                    <View style={styles.form}>
                        <Button
                            onPress={() => navigation.navigate("Product")}
                            accessoryLeft={(eva) => <Icon fill={color.primary} name='plus' {...eva} />}
                            appearance={"ghost"}>
                            Tambah Obat / Produk
                        </Button>
                    </View>
                </Section>
                <Section title='Pembayaran' style={styles.section}>
                    <View style={[styles.form, theme.marginTop10]}>
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
                            leftIcon='percent-outline'
                            keyboardType='number-pad'
                            placeholder='Masukan total diskon (Rupiah)'
                            value={discount === 0 ? '' : helper.formatNumber(discount, false)}
                            onChangeText={handleSetDiscount}
                        />
                    </View>
                </Section>
                <Section title='Total Akhir' style={styles.section}>
                    <Item title='Diskon' value={helper.formatNumber(discount)} />
                    {data.antrian.asuransi &&
                        <Item title={data.antrian.asuransi} value={helper.formatNumber(data.antrian.jumlah_asuransi)} />}
                    <Item title='Yang harus dibayar' value={helper.formatNumber(getTotalAll())} />
                    <Item title='Kembalian' value={helper.formatNumber(paid - getTotalAll())} />
                </Section>
                <View style={styles.form}>
                    <Button onPress={() => transactionMutate.mutate()}>Simpan Perubahan</Button>
                </View>
            </ScrollView>}
            <BottomSheet id='productSheet' title='Produk Detail'>
                <QueueEditCart cart={cartSelected} />
            </BottomSheet>
        </DetailLayout>
    )
}

export default QueueShowScreen

const styles = StyleSheet.create({
    container: {
        paddingTop: constant.container,
        paddingBottom: 150
    },
    section: {
        marginBottom: constant.container
    },
    form: {
        paddingHorizontal: constant.container
    }
})