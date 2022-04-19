import { ScrollView, StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { BottomSheet, DetailLayout, List, ProductHistory, Section, Item } from '@components'
import { color, constant, theme } from '@utils'
import { Button, Icon } from '@ui-kitten/components'
import { SheetManager } from 'react-native-actions-sheet'
import { PageProps } from '@types'
import RootStackList from 'src/types/page-types'

const TransactionShowScreen: FC<PageProps> = ({ navigation }) => {
    
    const handleAction = (url: keyof RootStackList) => {
        navigation.navigate(url);
        SheetManager.hide("actionSheet")
    }

    const handlePrintReceipt = async () => {

    }

    return (
        <DetailLayout
            title='Detail'
            action
            actionIcon='share-variant'
            actionPack='material-community'
            actionOnPress={() => { }}
            back>
            <ScrollView contentContainerStyle={styles.container}>
                <Section title='Informasi Transaksi' style={styles.section}>
                    <Item title='No Transaksi' value='OD-8JPXR-20220418' />
                    <Item title='Nama Pelanggan' value='Harithya Wisesa' />
                    <Item title='Tanggal' value='24 Agustus 2022' />
                </Section>
                <Section title='Detail Produk' style={styles.section}>
                    <View style={styles.product}>
                        <ProductHistory />
                        <ProductHistory />
                    </View>
                </Section>
                <Section title='Total Transaksi' style={styles.section}>
                    <View style={styles.product}>
                        <Item title='Sub Total' value='Rp 35.000' />
                        <Item title='Diskon' value='Rp 5.000' />
                        <Item title='Dibayarkan' value='Rp 40.000' />
                        <Item title='Kembalian' value='Rp 2.000' />
                    </View>
                </Section>
            </ScrollView>
            <View style={styles.footer}>
                <Button
                    status={"basic"}
                    onPress={() => SheetManager.show("actionSheet")}
                    style={styles.action}
                    accessoryLeft={(eva) => <Icon {...eva} name="menu" />}
                />
                <Button onPress={handlePrintReceipt} style={theme.flex1}>Cetak Struk</Button>
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