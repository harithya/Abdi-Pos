import { StyleSheet, ToastAndroid } from 'react-native'
import React, { useRef, useState } from 'react'
import { DetailLayout } from '@components'
import { RNCamera } from 'react-native-camera';
import { color, helper, theme } from '@utils';
import BarcodeMask from 'react-native-barcode-mask';
import { http } from '@services';
import { useQuery } from 'react-query';
import { CartStateProps, ProductResultProps } from '@types';
import { State } from 'src/redux/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { addSalesCart, updateSalesCart } from 'src/redux/actions/salesCartAction';

const fetchData = async (kode: string) => {
    const req = await http.get("produk/" + kode);
    return req.data.result;
}
const BarcodeScreen = () => {
    const cameraRef = useRef(null)
    const [barcode, setBarcode] = useState('')

    const { data, isSuccess } = useQuery(['barcode', barcode], () => fetchData(barcode), {
        enabled: barcode.length > 0,
        onSuccess: (res) => {
            if (res !== null) {
                handleAddCart(res);
                ToastAndroid.show("Produk berhasil ditambahkan ke keranjang", ToastAndroid.SHORT);
            } else {
                ToastAndroid.show("Produk tidak ditemukan", ToastAndroid.SHORT);
            }

        }
    })

    const dispatch = useDispatch();
    const salesCartState: CartStateProps = useSelector((state: State) => state.salesCart);

    const handleAddCart = (item: ProductResultProps) => {
        //Find Product in Cart
        const find = salesCartState.data.find((data) => data.id === item.kode)
        if (!find) {
            dispatch(addSalesCart(item))
        } else {
            const cart = salesCartState.data.map((data) => {
                if (data.id === item.kode) {
                    data.qty += 1
                }
                return data
            })
            dispatch(updateSalesCart(cart));
        }
        setBarcode('')
    }

    return (
        <DetailLayout title='Scan Barcode' disableBubble={helper.isTablet() ? true : false} back>
            <RNCamera
                ref={cameraRef}
                style={styles.camera}
                onBarCodeRead={(e) => setBarcode(e.data)}
            >
                <BarcodeMask
                    edgeColor={color.primary}
                    edgeBorderWidth={8}
                    animatedLineColor={color.danger}
                />

            </RNCamera>
        </DetailLayout>
    )
}

export default BarcodeScreen

const styles = StyleSheet.create({
    footer: {
        ...theme.footer,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: "white",
        paddingTop: 16,
    },
    camera: {
        ...theme.flex1,
    },
})