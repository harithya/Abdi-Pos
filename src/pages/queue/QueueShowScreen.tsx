import { ScrollView, StyleSheet, View } from 'react-native'
import React, { FC, useState, useEffect } from 'react'
import { BottomSheet, DetailLayout, Input, Item, Section, Radio, ProductQueue } from '@components'
import { color, constant, helper, theme } from '@utils'
import { Button, Icon, Text } from '@ui-kitten/components'
import { CartProps, CartStateProps, PageProps, ProductResultProps, ServiceResultProps } from '@types'
import { SheetManager } from 'react-native-actions-sheet'
import { http } from '@services'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'src/redux/reducer'
import { addQueueCart } from 'src/redux/actions/queueCartAction'
import QueueEditCart from './QueueEditCart'

const fetchData = async (id: number) => {
    const req = await http.get(`antrian/${id}/transaksi`);
    return req.data.result ?? []
}
const QueueShowScreen: FC<PageProps<'QueueShow'>> = ({ navigation, route }) => {

    const { data, isLoading, isSuccess } = useQuery(["queueShow", route.params.id],
        () => fetchData(route.params.id));

    const queueCartState: CartStateProps = useSelector((state: State) => state.queueCart);
    const dispatch = useDispatch();


    const [cartSelected, setcartSelected] = useState<CartProps>(queueCartState.data[0]);

    useEffect(() => {
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

    return (
        <DetailLayout title='Detail' back loading={isLoading}>
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
                            value='0'
                        />
                        <Input
                            label='Diskon'
                            leftIcon='percent-outline'
                            keyboardType='number-pad'
                            value='0'
                        />
                    </View>
                </Section>
                <Section title='Total Akhir' style={styles.section}>
                    <Item title='Sub Total' value='Rp 258.000' />
                    <Item title='Asuransi' value='Rp 0' />
                    <Item title='Diskon' value='Rp 150.000' />
                </Section>
                <View style={styles.form}>
                    <Button>Simpan Perubahan</Button>
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