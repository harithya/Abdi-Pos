import { StyleSheet, View } from 'react-native'
import React from 'react'
import { theme, constant } from '@utils'
import { Text } from '@ui-kitten/components'

const ProductHistory = () => {
    return (
        <View style={[styles.product, theme.flexStart]}>
            <View style={[theme.flex1, theme.flexBetween]}>
                <View>
                    <Text>Acilaz 30 mg kapsul</Text>
                    <Text appearance={"hint"} category="c1" style={theme.marginTop10}>2 Box, Diskon : Rp 2000</Text>
                </View>
                <Text>Rp 18.000</Text>
            </View>
        </View>
    )
}

export default ProductHistory

const styles = StyleSheet.create({
    product: {
        paddingHorizontal: constant.container,
        marginBottom: constant.container
    }
})