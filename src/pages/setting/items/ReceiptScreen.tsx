import { View, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { DetailLayout, Input } from '@components'
import { color, constant, theme } from '@utils'
import { Button, Text } from '@ui-kitten/components'

const ReceiptScreen = () => {
    return (
        <DetailLayout title='Struk' back>
            <ScrollView contentContainerStyle={theme.content}>
                <View style={styles.section}>
                    <Text style={styles.header} status="primary" category="h5" >Header (Bagian Atas)</Text>
                    <Input
                        label='Nama Klink (Header)'
                        placeholder='Cth: Klinik Hebat'
                    />
                    <Input
                        textArea
                        label='Alamat (Header)'
                        placeholder='Cth: Jl. Raya Kedungwuni No.1'
                    />
                </View>
                <View style={styles.section}>
                    <Text style={styles.header} status="primary" category="h5" >Footer (Bagian Bawah)</Text>
                    <Input
                        label='Nama Klink (Header)'
                        placeholder='Cth: Klinik Hebat'
                    />
                    <Input
                        textArea
                        label='Alamat (Header)'
                        placeholder='Cth: Jl. Raya Kedungwuni No.1'
                    />
                </View>
                <Button>Simpan Perubahan</Button>
            </ScrollView>
        </DetailLayout>
    )
}

const styles = StyleSheet.create({
    header: {
        textAlign: "center",
        borderBottomWidth: 2,
        borderBottomColor: color.primary,
        paddingBottom: 16,
        ...theme.fontMedium,
        borderStyle: "dashed",
        marginBottom: constant.container
    },
    section: {
        marginBottom: constant.container
    }
})

export default ReceiptScreen