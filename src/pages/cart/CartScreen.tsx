import { FlatList, StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { Cart, DetailLayout, Empty, SelectPeople } from '@components'
import { color, constant, theme } from '@utils'
import { Button, Text } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { SalesCartStateProps, useNavigationProps } from '@types'
import { useSelector } from 'react-redux'
import { State } from 'src/redux/reducer'

interface Props {
    disableLayout?: boolean
}
const CartScreen: FC<Props> = ({ disableLayout }) => {
    const navigation = useNavigation<useNavigationProps>()
    const salesCartState: SalesCartStateProps = useSelector((state: State) => state.salesCart);
    return (
        <DetailLayout title='Keranjang' disable={disableLayout} back>
            <View style={theme.flex1}>
                <SelectPeople />
                {salesCartState.data.length > 0 ?
                    <FlatList
                        data={salesCartState.data}
                        keyExtractor={(val) => val.id.toString()}
                        renderItem={({ item }) => <Cart key={`cart-${item.id}`} data={item} />}
                    /> :
                    <Empty
                        title='Keranjang Anda Kosong'
                        subtitle='Silahkan pilih produk yang ingin dibeli'
                    />}
                <View style={styles.footer}>
                    <View style={[theme.flexBetween, theme.marginBottom5]}>
                        <Text style={theme.fontMedium} category={"p2"}>Total Pembayaran</Text>
                        <Text style={theme.fontMedium} category={"p2"}>Rp 17.500</Text>
                    </View>
                    <View style={[theme.flexBetween, theme.marginTop10]}>
                        <Button status={"danger"} style={styles.button} appearance={"outline"}>
                            Hapus Keranjang
                        </Button>
                        <Button onPress={() => navigation.navigate("Checkout")} style={styles.button}>Bayar Sekarang</Button>
                    </View>
                </View>
            </View>
        </DetailLayout>
    )
}

export default CartScreen

const styles = StyleSheet.create({
    footer: {
        position: "absolute",
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: color.white,
        borderTopWidth: 0.8,
        borderTopColor: color.border,
        ...theme.content,
        paddingVertical: constant.container,
        paddingTop: 16
    },
    button: {
        width: "48%"
    }
})