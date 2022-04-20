import { ScrollView, StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { BottomSheet, DetailLayout, List, ProductHistory, Section, Item } from '@components'
import { color, constant, helper, theme } from '@utils'
import { Button, Icon } from '@ui-kitten/components'
import { SheetManager } from 'react-native-actions-sheet'
import { PageProps, TransactionDetailResultProps } from '@types'
import RootStackList from 'src/types/page-types'
import { useQuery } from 'react-query'
import { http, receipt } from '@services'

const fetchData = async (kode: string) => {
    const req = await http.get("/transaksi/" + kode);
    return req.data.result
}
const TransactionShowScreen: FC<PageProps<'TransactionShow'>> = ({ navigation, route }) => {

    const handleAction = (url: keyof RootStackList) => {
        navigation.navigate(url);
        SheetManager.hide("actionSheet")
    }

    const { data, isLoading, isSuccess } = useQuery(['transactionDetail', route.params.kode],
        () => fetchData(route.params.kode));

    return (
        <DetailLayout
            title='Detail'
            action
            loading={isLoading}
            actionIcon='share-variant'
            actionPack='material-community'
            actionOnPress={() => { }}
            back>
            {isSuccess && <ScrollView contentContainerStyle={styles.container}>
                <Section title='Informasi Transaksi' style={styles.section}>
                    <Item title='No Transaksi' value={data.kode} />
                    <Item title='Nama Pelanggan' value={data.pasien ?? '-'} />
                    <Item title='Tanggal' value={helper.date(data.tanggal)} />
                </Section>
                <Section title='Detail Produk' style={styles.section}>
                    <View style={styles.product}>
                        {data.detail_transaksi.map((val: TransactionDetailResultProps, key: number) =>
                            <ProductHistory key={key} data={val} />)}
                    </View>
                </Section>
                <Section title='Total Transaksi' style={styles.section}>
                    <View style={styles.product}>
                        <Item title='Sub Total' value={helper.formatNumber(data.jumlah)} />
                        <Item title='Diskon' value={helper.formatNumber(data.diskon)} />
                        <Item title='Dibayarkan' value={helper.formatNumber(data.dibayar)} />
                        <Item title='Kembalian' value={helper.formatNumber(data.kembalian)} />
                    </View>
                </Section>
            </ScrollView>}
            <View style={styles.footer}>
                <Button
                    status={"basic"}
                    onPress={() => SheetManager.show("actionSheet")}
                    style={styles.action}
                    accessoryLeft={(eva) => <Icon {...eva} name="menu" />}
                />
                <Button onPress={() => receipt.print(data)} style={theme.flex1}>Cetak Struk</Button>
            </View>
            <BottomSheet title='Lainnya' icon='information-outline' id='actionSheet'>
                <List title='Pengajuan Pengembalian' onPress={() => handleAction("Return")} />
                <List title='Batalkan Transaksi' />
            </BottomSheet>
        </DetailLayout>
    )
}

export default TransactionShowScreen

const styles = StyleSheet.create({
    container: {
        paddingTop: constant.container,
        paddingBottom: 150
    },
    footer: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        ...theme.flexStart,
        ...theme.content,
        borderTopWidth: 1,
        borderTopColor: color.border,
        paddingVertical: 16,
        backgroundColor: color.white
    },

    product: {
        marginTop: 12
    },
    section: {
        marginBottom: constant.container
    },
    action: {
        borderTopWidth: 1,
        borderColor: color.border,
        marginRight: 16
    }

})