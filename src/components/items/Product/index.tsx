import { Image, View } from 'react-native'
import React, { FC, memo } from 'react'
import { Divider, Text } from '@ui-kitten/components'
import { helper, theme } from '@utils'
import { listStyle, gridStyle } from './style';
import TouchableRipple from 'src/components/Touchable/TouchableRipple';
import { ProductResultProps, CartProps } from '@types';

interface Props {
    data: ProductResultProps,
    layout: "grid" | "list",
    onPress?: () => void,
    cart?: CartProps
}
const Product: FC<Props> = ({ data, layout, onPress, cart }) => {
    const styles: any = layout == "grid" ? gridStyle : listStyle;

    const getData = () => {
        if (cart) {
            return {
                unit: cart.unit.name,
                price: cart.price
            }
        } else {
            return {
                unit: data.satuan,
                price: data.harga_jual
            }
        }
    }

    return (
        <View style={styles.touchable}>
            <TouchableRipple onPress={onPress}>
                <View style={styles.main}>
                    <View style={styles.item}>
                        <View style={styles.container}>
                            <Image source={{ uri: `https://ui-avatars.com/api/?background=50D4B4&color=fff&font-size=${layout == "list" ? '0.33' : '0.22'}&name=${data.nama}` }} style={styles.img} />
                            <View style={styles.body}>
                                <Text category={"p2"} numberOfLines={(layout == "list") ? 1 : 2}>{data.nama}</Text>
                                <View style={[theme.flexBetween, styles.footer]}>
                                    <Text
                                        appearance={"hint"}
                                        style={theme.marginTop5}
                                        category={layout == "grid" ? "c2" : "c1"}>Satuan : {getData().unit}</Text>
                                    {layout == "grid" && <Text category={"p2"}>{helper.formatNumber(getData().price)}</Text>}
                                </View>
                            </View>
                        </View>
                        {layout == "list" && <Text category={"p2"}>{helper.formatNumber(getData().price)}</Text>}
                    </View>
                    {layout == "list" && <Divider />}
                </View>
            </TouchableRipple>
        </View>
    )
}

export default memo(Product)
