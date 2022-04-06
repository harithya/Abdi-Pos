import { Image, View } from 'react-native'
import React, { FC, Fragment } from 'react'
import { Divider, Text } from '@ui-kitten/components'
import { helper, theme } from '@utils'
import { listStyle, gridStyle } from './style';
import TouchableRipple from 'src/components/Touchable/TouchableRipple';

interface Props {
    title: string,
    stok: number,
    img: string,
    price: number,
    layout: "grid" | "list"
}
const Product: FC<Props> = ({ title, stok, img, price, layout }) => {
    const styles: any = layout == "grid" ? gridStyle : listStyle;

    return (
        <View style={styles.touchable}>
            <TouchableRipple>
                <View style={styles.main}>
                    <View style={styles.item}>
                        <View style={styles.container}>
                            <Image source={{ uri: img }} style={styles.img} />
                            <View style={styles.body}>
                                <Text category={"p2"} numberOfLines={(layout == "list") ? 1 : 2}>{title}</Text>
                                <View style={[theme.flexBetween, styles.footer]}>
                                    <Text
                                        appearance={"hint"}
                                        style={theme.marginTop5}
                                        category={layout == "grid" ? "c2" : "c1"}>{stok} Tersedia</Text>
                                    {layout == "grid" && <Text category={"p2"}>{helper.formatNumber(price)}</Text>}
                                </View>
                            </View>
                        </View>
                        {layout == "list" && <Text category={"p2"}>{helper.formatNumber(price)}</Text>}
                    </View>
                    {layout == "list" && <Divider />}
                </View>
            </TouchableRipple>
        </View>
    )
}

export default Product
