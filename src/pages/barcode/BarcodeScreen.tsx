import { StyleSheet, View } from 'react-native'
import React, { useRef } from 'react'
import { DetailLayout, SelectInfo } from '@components'
import { RNCamera } from 'react-native-camera';
import { color, theme } from '@utils';
import BarcodeMask from 'react-native-barcode-mask';

const BarcodeScreen = () => {
    const cameraRef = useRef(null)
    return (
        <DetailLayout title='Scan Barcode' back>
            <RNCamera
                ref={cameraRef}
                style={theme.flex1}
                onBarCodeRead={(e) => console.log(e)}
            >
                <BarcodeMask
                    edgeColor={color.primary}
                    edgeBorderWidth={8}
                    animatedLineColor={color.danger}
                />
                <View style={styles.footer}>
                    <SelectInfo value={3} />
                </View>
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
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    }
})