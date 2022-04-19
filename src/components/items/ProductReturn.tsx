import { Image, StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { constant, theme } from '@utils'
import { CheckBox, Divider } from '@ui-kitten/components'
import { Text } from '@ui-kitten/components'
import TouchableRipple from '../Touchable/TouchableRipple'

interface Props {
    title: string,
    onPress?: () => void
}
const ProductReturn: FC<Props> = ({ title, onPress }) => {
    return (
        <TouchableRipple onPress={onPress}>
            <View style={styles.item}>
                <View style={theme.flexStart}>
                    <CheckBox
                        checked={false}
                        style={styles.checkbox}
                    />
                    <View style={theme.flexStart}>
                        <Image source={{ uri: "https://via.placeholder.com/150" }} style={styles.img} />
                        <View>
                            <Text>{title}</Text>
                            <Text appearance={"hint"} style={theme.marginTop5} category="c1">1 Box x Rp 18.000</Text>
                        </View>
                    </View>
                </View>
                <Text>3 Box</Text>
            </View>
        </TouchableRipple>
    )
}

export default ProductReturn

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