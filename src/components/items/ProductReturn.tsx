import { Image, StyleSheet, View } from 'react-native'
import React, { FC, memo } from 'react'
import { constant, helper, theme } from '@utils'
import { CheckBox, Divider } from '@ui-kitten/components'
import { Text } from '@ui-kitten/components'
import TouchableRipple from '../Touchable/TouchableRipple'
import { TransactionDetailResultProps } from '@types'

interface Props {
    data: TransactionDetailResultProps,
    onPress?: () => void,
    onChecked?: () => void
}
const ProductReturn: FC<Props> = ({ data, onPress, onChecked }) => {
    return (
        <TouchableRipple onPress={onPress}>
            <View style={styles.item}>
                <View style={theme.flexStart}>
                    <CheckBox
                        checked={data.checked}
                        onChange={onChecked}
                        style={styles.checkbox}
                    />
                    <View style={theme.flexStart}>
                        <Image source={{ uri: data.foto }} style={styles.img} />
                        <View>
                            <Text>{data.produk}</Text>
                            <Text appearance={"hint"} style={theme.marginTop5} category="c1">{parseInt(data.jumlah)} {data.satuan} x {helper.formatNumber(data.harga)}</Text>
                        </View>
                    </View>
                </View>
                <Text>{data.qty} {data.satuan}</Text>
            </View>
        </TouchableRipple>
    )
}

export default memo(ProductReturn)

const styles = StyleSheet.create({
    item: {
        paddingVertical: 16,
        paddingHorizontal: constant.container,
        ...theme.flexBetween,

    },
    img: {
        height: 50,
        width: 50,
        borderRadius: 10,
        resizeMode: "cover",
        marginRight: 20
    },
    checkbox: {
        marginRight: 20
    }
})