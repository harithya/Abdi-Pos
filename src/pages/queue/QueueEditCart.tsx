import { StyleSheet, View } from 'react-native'
import React, { FC, useState } from 'react'
import { constant, helper, theme } from '@utils'
import { Radio, Input } from '@components'
import { Text, Button } from '@ui-kitten/components'
import { CartProps, CartStateProps, PriceProductResultProps } from '@types'
import { useDispatch, useSelector } from 'react-redux'
import { updateQueueCart } from 'src/redux/actions/queueCartAction'
import { State } from 'src/redux/reducer'
import { SheetManager } from 'react-native-actions-sheet'

interface Props {
    cart: CartProps
}
const QueueEditCart: FC<Props> = ({ cart }) => {
    const [qty, setQty] = useState(cart.qty)
    const [unit, setUnit] = useState(cart.unit)
    const [price, setPrice] = useState(cart.price)

    const handleSetUnit = (val: PriceProductResultProps) => {
        setUnit({
            id: val.satuan_id,
            name: val.satuan
        })
        setPrice(val.harga_jual)
    }

    const dispatch = useDispatch();
    const queueCartState: CartStateProps = useSelector((state: State) => state.queueCart);
    const handleUpdateCart = () => {
        const newCart = queueCartState.data.map((item) => {
            if (item.id === cart.id) {
                return {
                    ...item,
                    qty: qty,
                    unit: unit,
                    price: price
                }
            }
            return item
        })
        dispatch(updateQueueCart(newCart))
        SheetManager.hide("productSheet");
    }

    const handleSetQty = (value: string) => {
        (isNaN(parseInt(value))) ? setQty(0) : setQty(parseInt(value));
    }

    const handleSetPrice = (value: string) => {
        value = helper.inputNumber(value);
        (isNaN(parseInt(value))) ? setPrice(0) : setPrice(parseInt(value));
    }

    return (
        <View style={[styles.form, theme.marginBottom10]}>
            <Input
                label='Jumlah (Qty)'
                onChangeText={handleSetQty}
                keyboardType="number-pad"
                value={qty === 0 ? '' : qty.toString()}
            />
            <Input
                label='Harga'
                onChangeText={handleSetPrice}
                keyboardType="number-pad"
                value={price === 0 ? '' : helper.formatNumber(price, false)}
            />
            <View style={theme.input}>
                <Text style={styles.label} category={"label"}>Satuan</Text>
                <View style={styles.radioGroup}>
                    {cart.priceList.map((val, key: number) =>
                        <Radio
                            key={`unit-${key}`}
                            active={unit.id === val.satuan_id}
                            title={val.satuan}
                            onPress={() => handleSetUnit(val)}
                        />)}
                </View>
            </View>
            <View style={theme.input}>
                <Text category={"label"} appearance="hint" style={theme.fontRegular}>{cart.description ?? '-'}</Text>
            </View>
            <Button onPress={handleUpdateCart}>Simpan</Button>
        </View>
    )
}

export default QueueEditCart

const styles = StyleSheet.create({
    form: {
        paddingHorizontal: constant.container
    },
    label: {
        marginBottom: 5,
        ...theme.fontMedium
    },
    radioGroup: {
        ...theme.flexStart,
        flexWrap: "wrap"
    }
})