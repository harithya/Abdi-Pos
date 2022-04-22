import { Image, StyleSheet, View } from 'react-native'
import React, { FC, memo } from 'react'
import { color, constant, helper, theme } from '@utils'
import { Text } from '@ui-kitten/components'
import TouchableRipple from '../Touchable/TouchableRipple'
import { CartProps } from '@types'
import { SwipeRow } from 'react-native-swipe-list-view'
import DeleteSwipe from '../Touchable/DeleteSwipe'
import { useDispatch } from 'react-redux'
import { deleteQueueCart } from 'src/redux/actions/queueCartAction'

interface Props {
    data: CartProps,
    onPress?: () => void,
}
const ProductQueue: FC<Props> = ({ data, onPress }) => {
    const dispatch = useDispatch();
    return (
        <SwipeRow
            disableRightSwipe={true}
            rightOpenValue={-75}>
            <DeleteSwipe onPress={() => dispatch(deleteQueueCart(data.id))} />
            <TouchableRipple onPress={onPress}>
                <View style={styles.item}>
                    <View style={theme.flexStart}>
                        <View style={theme.flexStart}>
                            <Image source={{ uri: data.img }} style={styles.img} />
                            <View>
                                <Text>{data.name}</Text>
                                <Text appearance={"hint"} style={theme.marginTop5} category="c1">{`${data.qty} ${data.unit.name} x ${helper.formatNumber(data.price)}`}</Text>
                            </View>
                        </View>
                    </View>
                    <Text>{helper.formatNumber(data.qty * data.price)}</Text>
                </View>
            </TouchableRipple>
        </SwipeRow>
    )
}

export default memo(ProductQueue)

const styles = StyleSheet.create({
    item: {
        paddingVertical: 16,
        zIndex: 9999999,
        backgroundColor: color.white,
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