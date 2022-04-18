import { StyleSheet, View } from 'react-native'
import React, { useRef } from 'react'
import { DetailLayout, SelectInfo } from '@components'
import { RNCamera } from 'react-native-camera';
import { color, helper, theme } from '@utils';
import BarcodeMask from 'react-native-barcode-mask';

const BarcodeScreen = () => {
    const cameraRef = useRef(null)
    return (
        <DetailLayout title='Scan Barcode' disableBubble={helper.isTablet() ? true : false} back>
            <RNCamera
                ref={cameraRef}
                style={styles.camera}
            // onBarCodeRead={(e) => console.log(e)}
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