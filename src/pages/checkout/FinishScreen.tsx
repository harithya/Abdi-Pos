import { Image, StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { DetailLayout } from '@components'
import { Button, Text } from '@ui-kitten/components'
import { theme } from '@utils'
import { PageProps } from '@types'

const FinishScreen: FC<PageProps> = ({ navigation }) => {
    return (
        <DetailLayout title='Selesai' back>
            <View style={[theme.flex1, theme.toCenter]}>
                <Image source={require("../../assets/img/success.png")} style={styles.img} />
                <Text category={"h5"} style={theme.textCenter}>Pembayaran Telah Selesai</Text>
                <Text appearance={"hint"} style={theme.marginTop5}>Yeahh transaksi yang anda lakukan sudah selesai</Text>
            </View>
            <View style={theme.content}>
                <Button onPress={() => navigation.goBack()}>Kembali ke awal</Button>
            </View>
        </DetailLayout>
    )
}

export default FinishScreen

const styles = StyleSheet.create({
    img: {
        height: 150,
        width: 150,
        marginBottom: 50
    }
})