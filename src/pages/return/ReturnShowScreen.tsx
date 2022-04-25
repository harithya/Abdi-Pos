import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { DetailLayout, Item, ProductReturnHistory, Section } from '@components'
import { PageProps, ProductReturnResultProps } from '@types'
import { constant, helper, theme } from '@utils'
import { http } from '@services'
import { useQuery } from 'react-query'

const fetchData = async (kode: string) => {
    const req = await http.get("pengembalian/" + kode)
    return req.data.result ?? [];
}
const ReturnShowScreen: FC<PageProps<'ReturnShow'>> = ({ route }) => {
    const { data, isLoading, isSuccess } = useQuery(['returnDetail', route.params.kode],
        () => fetchData(route.params.kode));
    return (
        <DetailLayout title='Rincian Pengembalian' loading={isLoading} back>
            {isSuccess && <ScrollView contentContainerStyle={styles.container}>
                <Section title='Informasi Transaksi' style={theme.section}>
                    <Item title='No Transaksi' value={data.transaksi_kode} />
                    <Item title='Tanggal' value={helper.date(data.tanggal)} />
                    <Item title='Total Pengembalian' value={helper.formatNumber(data.jumlah)} />
                </Section>
                <Section title='Produk Dikembalikan' style={theme.section}>
                    <View style={styles.product}>
                        {data.detail_pengembalian.map((val: ProductReturnResultProps) =>
                            <ProductReturnHistory
                                key={val.id}
                                data={val}
                            />)}
                    </View>
                </Section>
            </ScrollView>}
        </DetailLayout>
    )
}

export default ReturnShowScreen

const styles = StyleSheet.create({
    container: {
        paddingTop: constant.container,
        paddingBottom: 150
    },
    product: {
        marginTop: 12
    },
})