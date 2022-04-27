import { StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { theme, constant, helper } from '@utils'
import { Text } from '@ui-kitten/components'
import { TransactionDetailResultProps } from '@types'

interface Props {
    data: TransactionDetailResultProps
}
const ProductHistory: FC<Props> = ({ data }) => {
    return (
        <View style={[styles.product, theme.flexStart]}>
            <View style={[theme.flex1, theme.flexBetween]}>
                <View>
                    <Text>{data.produk}</Text>
                    <Text appearance={"hint"} category="c1" style=
                        {theme.marginTop10}>{parseInt(data.jumlah)} {data.satuan},
                        Diskon : {helper.formatNumber(data.harga)}
                    </Text>
                </View>
                <Text>{helper.formatNumber(data.harga * parseInt(data.jumlah))}</Text>
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