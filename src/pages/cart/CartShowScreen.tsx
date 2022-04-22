import { Pressable, StyleSheet, View } from 'react-native'
import React, { FC, useState } from 'react'
import { BottomSheet, DetailLayout, Input, UnitSheet } from '@components'
import { color, constant, helper, theme } from '@utils'
import { Button, Icon, Text } from '@ui-kitten/components'
import { PageProps, PriceProductResultProps, CartProps, CartStateProps } from '@types'
import { SheetManager } from 'react-native-actions-sheet'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'src/redux/reducer'
import { deleteSalesCart, updateSalesCart } from 'src/redux/actions/salesCartAction'

const CartShowScreen: FC<PageProps<'CartShow'>> = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        price: route.params.data.price,
        qty: route.params.data.qty,
        discount: route.params.data.discount,
        unit: {
            id: route.params.data.unit.id,
            name: route.params.data.unit.name
        }
    })

    const handleInput = (key: string, value: string | number) => {
        setData({
            ...data,
            [key]: value
        })
    }

    const handleChangeUnit = (priceList: PriceProductResultProps) => {
        setData({
            ...data,
            price: priceList.harga_jual,
            unit: {
                id: priceList.satuan_id,
                name: priceList.satuan
            },
        })
        SheetManager.hide("unitSheet")
    }

    const handleOpenSheet = () => {
        SheetManager.show("unitSheet")
    }

    const salesCartState: CartStateProps = useSelector((state: State) => state.salesCart);
    const handleUpdateCart = () => {
        const newCart = salesCartState.data.map((item: CartProps) => {
            let newItem: CartProps = item;
            if (item.id === route.params.data.id) {
                newItem = {
                    ...item,
                    ...data
                }
            }
            newItem.discount = newItem.discount.toString() === "" || newItem.discount == undefined
                ? 0 : newItem.discount;
            return newItem
        })

        dispatch(updateSalesCart(newCart))
        navigation.goBack()
    }


    const handleDeleteCart = () => {
        dispatch(deleteSalesCart(route.params.data.id));
        navigation.goBack()
    }

    return (
        <DetailLayout title={route.params.data.name} back>
            {/* <Cart /> */}
            <View style={styles.container}>
                <Input
                    placeholder='Harga'
                    value={helper.formatNumber(data.price, false)}
                    leftIcon='currency-usd'
                    keyboardType='number-pad'
                    onChangeText={(val) => handleInput('price', helper.inputNumber(val))}
                />
                <Input
                    placeholder='Diskon dalam rupiah'
                    leftIcon='percent-outline'
                    keyboardType='number-pad'
                    onChangeText={(val) => handleInput('discount', helper.inputNumber(val))}
                    value={helper.formatNumber(data.discount, false)}
                />
                <View style={styles.info}>
                    <Icon fill={color.default} name="info-outline" style={styles.icon} pack="eva" />
                    <Text appearance={"hint"} style={theme.fontRegular} category="c2">Masukan diskon dalam jumlah rupiah bukan persen</Text>
                </View>
                <View>
                    <Button appearance={"ghost"} onPress={handleDeleteCart} status="danger">Hapus Keranjang</Button>
                </View>
            </View>
            <View style={styles.footer}>
                <View style={styles.qtyContainer}>
                    <Input
                        placeholder='Qty'
                        keyboardType='number-pad'
                        value={data.qty.toString()}
                        onChangeText={(val) => handleInput("qty", val)}
                        containerStyle={styles.input}
                        textAlign='center'
                    />
                    <Pressable style={styles.input} onPress={handleOpenSheet}>
                        <Input
                            placeholder='Satuan'
                            value={data.unit.name}
                            containerStyle={theme.marginBottom0}
                            textAlign='center'
                            disabled
                            rightIcon='chevron-down'
                        />
                    </Pressable>
                </View>
                <Button onPress={handleUpdateCart}>Simpan Perubahan</Button>
                <BottomSheet title='Satuan' id='unitSheet'>
                    <UnitSheet
                        data={route.params.data.priceList}
                        onPress={handleChangeUnit}
                    />
                </BottomSheet>
            </View>
        </DetailLayout>
    )
}

export default CartShowScreen

const styles = StyleSheet.create({
    input: {
        // ...theme.flex1,
        ...theme.marginBottom0,
        width: "49%"
    },
    qtyContainer: {
        ...theme.flexBetween,
        marginBottom: 16
    },
    icon: {
        height: 18,
        width: 18,
        marginRight: 10
    },
    info: {
        ...theme.flexStart,
        marginTop: -10,
        marginBottom: 16
    },
    container: {
        ...theme.content,
        paddingHorizontal: helper.isTablet() ? 150 : constant.container
    },
    footer: {
        ...theme.footer,
        right: helper.isTablet() ? 150 : constant.container,
        left: helper.isTablet() ? 150 : constant.container
    }
})