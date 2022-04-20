import { Image, StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { DetailLayout } from '@components'
import { Button, Text } from '@ui-kitten/components'
import { helper, theme } from '@utils'
import { PageProps } from '@types'
import { useQuery } from 'react-query'
import { http, receipt } from '@services'

const fetchData = async (kode: string) => {
    const req = await http.get("/transaksi/" + kode);
    return req.data.result
}
const FinishScreen: FC<PageProps<'Finish'>> = ({ navigation, route }) => {

    const { data, isLoading } = useQuery(['transactionDetail', route.params.kode],
        () => fetchData(route.params.kode));

    console.log(data);

    return (
        <DetailLayout title='Selesai' loading={isLoading} back>
            <View style={[theme.flex1, theme.toCenter]}>
                <Image source={require("../../assets/img/success.png")} style={styles.img} />
                <Text category={"h5"} style={theme.textCenter}>Pembayaran Telah Selesai</Text>
                <Text appearance={"hint"} style={theme.marginTop5}>Yeahh transaksi yang anda lakukan sudah selesai</Text>
            </View>
            <View style={theme.content}>
                <Button
                    appearance={"outline"}
                    onPress={() => receipt.print(data)}
                    style={theme.marginBottom10}>
                    Print Struk
                </Button>
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