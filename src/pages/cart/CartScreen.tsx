import { StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { Cart, DetailLayout, Empty, SelectPeople, TouchableRipple } from '@components'
import { color, constant, helper, theme } from '@utils'
import { Button, Icon, Text } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { SalesCartStateProps, useNavigationProps } from '@types'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'src/redux/reducer'
import { SwipeListView } from 'react-native-swipe-list-view';
import { deleteSalesCart, emptySalesCart } from 'src/redux/actions/salesCartAction'

interface Props {
    disableLayout?: boolean
}
const CartScreen: FC<Props> = ({ disableLayout }) => {
    const navigation = useNavigation<useNavigationProps>()
    const salesCartState: SalesCartStateProps = useSelector((state: State) => state.salesCart);
    const dispatch = useDispatch();

    const deleteById = (id: string) => {
        dispatch(deleteSalesCart(id));
    }

    const emptyCart = () => dispatch(emptySalesCart());

    return (
        <DetailLayout title='Keranjang' disable={disableLayout} back>
            <View style={theme.flex1}>
                <SelectPeople />
                {salesCartState.data.length > 0 ?
                    <SwipeListView
                        data={salesCartState.data}
                        keyExtractor={(val) => val.id.toString()}
                        renderItem={({ item }) => <Cart key={`cart-${item.id}`} data={item} />}
                        renderHiddenItem={(data, rowMap) => (
                            <TouchableRipple onPress={() => deleteById(data.item.id)}>
                                <View style={styles.action}>
                                    <View style={styles.actionBody}>
                                        <Icon name='delete' fill={color.white} style={theme.icon} />
                                    </View>
                                </View>
                            </TouchableRipple>
                        )}
                        disableRightSwipe={true}
                        rightOpenValue={-75}
                    /> :
                    <Empty
                        title='Keranjang Anda Kosong'
                        subtitle='Silahkan pilih produk yang ingin dibeli'
                    />}
                <View style={styles.footer}>
                    <View style={[theme.flexBetween, theme.marginBottom5]}>
                        <Text style={theme.fontMedium} category={"p2"}>Total Pembayaran</Text>
                        <Text style={theme.fontMedium} category={"p2"}>{helper.formatNumber(helper.getTotalCart())}</Text>
                    </View>
                    <View style={[theme.flexBetween, theme.marginTop10]}>
                        <Button
                            status={"danger"}
                            onPress={emptyCart}
                            style={styles.button}
                            appearance={"outline"}>
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
    },
    action: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        backgroundColor: color.danger,
    },
    actionBody: {
        flex: 1,
        width: 75,
        ...theme.toCenter
    }
})