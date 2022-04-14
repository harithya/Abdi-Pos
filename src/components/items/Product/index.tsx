import { Image, View } from 'react-native'
import React, { FC, memo } from 'react'
import { Divider, Text } from '@ui-kitten/components'
import { helper, theme } from '@utils'
import { listStyle, gridStyle } from './style';
import TouchableRipple from 'src/components/Touchable/TouchableRipple';
import { ProductResultProps } from '@types';

interface Props {
    data: ProductResultProps,
    layout: "grid" | "list",
    onPress?: () => void
}
const Product: FC<Props> = ({ data, layout, onPress }) => {
    const styles: any = layout == "grid" ? gridStyle : listStyle;

    return (
        <View style={styles.touchable}>
            <TouchableRipple onPress={onPress}>
                <View style={styles.main}>
                    <View style={styles.item}>
                        <View style={styles.container}>
                            <Image source={{ uri: data.foto }} style={styles.img} />
                            <View style={styles.body}>
                                <Text category={"p2"} numberOfLines={(layout == "list") ? 1 : 2}>{data.nama}</Text>
                                <View style={[theme.flexBetween, styles.footer]}>
                                    <Text
                                        appearance={"hint"}
                                        style={theme.marginTop5}
                                        category={layout == "grid" ? "c2" : "c1"}>{parseInt(data.stok)} {data.satuan} Tersedia</Text>
                                    {layout == "grid" && <Text category={"p2"}>{helper.formatNumber(data.harga_jual)}</Text>}
                                </View>
                            </View>
                        </View>
                        {layout == "list" && <Text category={"p2"}>{helper.formatNumber(data.harga_jual)}</Text>}
                    </View>
                    {layout == "list" && <Divider />}
                </View>
            </TouchableRipple>
        </View>
    )
}

export default memo(Product)
