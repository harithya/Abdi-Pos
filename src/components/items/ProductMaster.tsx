import { Image, StyleSheet, View } from 'react-native'
import React, { FC, memo } from 'react'
import { Divider, Icon, Text } from '@ui-kitten/components'
import { color, theme } from '@utils'
import { listStyle } from './Product/style';
import TouchableRipple from 'src/components/Touchable/TouchableRipple';
import { ProductResultProps } from '@types';

interface Props {
    data: ProductResultProps,
    onPress?: () => void,
    checked?: boolean
}
const Product: FC<Props> = ({ data, onPress, checked }) => {
    const styles: any = listStyle;

    return (
        <View style={styles.touchable}>
            <TouchableRipple onPress={onPress}>
                <View style={styles.main}>
                    <View style={styles.item}>
                        <View style={styles.container}>
                            <Image source={{ uri: data.foto }} style={styles.img} />
                            {(checked) &&
                                <View style={mainStyle.iconContainer}>
                                    <Icon name='checkmark-outline' fill={color.white} pack="eva" style={mainStyle.icon} />
                                </View>}
                            <View style={styles.body}>
                                <Text category={"p2"} numberOfLines={1}>{data.nama}</Text>
                                <View style={[theme.flexBetween, styles.footer]}>
                                    <Text
                                        appearance={"hint"}
                                        style={theme.marginTop5}
                                        category={"c1"}>Kategori : {data.kategori}, Jenis: {data.jenis}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <Divider />
                </View>
            </TouchableRipple>
        </View>
    )
}

const mainStyle = StyleSheet.create({
    icon: {
        height: 13,
        width: 13,
    },
    iconContainer: {
        backgroundColor: color.primary,
        position: "absolute",
        ...theme.toCenter,
        height: 20,
        width: 20,
        left: 35,
        bottom: -2,
        borderRadius: 50,
        borderWidth: 1.5,
        borderColor: color.white
    }
})

export default memo(Product)
