import { StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { theme, constant, helper } from '@utils'
import { Text } from '@ui-kitten/components'
import { ProductReturnResultProps } from '@types'

interface Props {
    data: ProductReturnResultProps
}
const ProductReturnHistory: FC<Props> = ({ data }) => {
    return (
        <View style={[styles.product, theme.flexStart]}>
            <View style={[theme.flex1, theme.flexBetween]}>
                <View>
                    <Text>{data.produk}</Text>
                    <Text appearance={"hint"} category="c1" style=
                        {theme.marginTop10}>{data.jumlah} {data.satuan},
                        Diskon : {helper.formatNumber(data.harga)}
                    </Text>
                </View>
                <Text>{helper.formatNumber(data.harga * data.jumlah)}</Text>
            </View>
        </View>
    )
}

export default ProductReturnHistory

const styles = StyleSheet.create({
    product: {
        paddingHorizontal: constant.container,
        marginBottom: constant.container
    }
})