import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import { BottomSheet, DetailLayout, Input, Item, ProductReturn, Section } from '@components'
import { constant, theme } from '@utils'
import { Button, Divider } from '@ui-kitten/components'
import { SheetManager } from 'react-native-actions-sheet'

const ReturnScreen = () => {

    const handleOpenBottomSheet = () => {
        SheetManager.show("returnSheet");
    }

    return (
        <DetailLayout title='Pengembalian' back>
            <ScrollView contentContainerStyle={styles.scrollview}>
                <View style={styles.section}>
                    <Item title='No Transakasi' value='OD-8JPXR202' />
                    <View style={styles.form}>
                        <Input placeholder='Alasan Pengembalian' containerStyle={theme.marginBottom10} textArea />
                    </View>
                </View>
                <Divider />
                <View style={styles.section}>
                    <ProductReturn title="Acilaz 30 mg kapsul" onPress={handleOpenBottomSheet} />
                    <ProductReturn title="Akilen ear drops TT" onPress={handleOpenBottomSheet} />
                    <ProductReturn title="Bioplacentom 15 gr" onPress={handleOpenBottomSheet} />
                </View>
                <Divider />
                <View style={styles.section}>
                    <Item title='Jumlah Dipiih' value='4' />
                    <Item title='Sub Total' value='Rp 350.000' />
                </View>
                <View style={styles.form}>
                    <Button>Kirimkan</Button>
                </View>
            </ScrollView>
            <BottomSheet title='Ubah Jumlah' id='returnSheet'>
                <View style={styles.form}>
                    <Input
                        placeholder='Jumlah Dikembalian'
                        keyboardType='number-pad'
                        autoFocus
                    />
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
    }
})