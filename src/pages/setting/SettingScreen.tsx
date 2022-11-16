import { StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { DetailLayout, TouchableRipple } from '@components'
import { Divider, Icon, Text } from '@ui-kitten/components'
import { color, constant, theme } from '@utils'
import { PageProps } from '@types'


interface Props {
    title: string,
    icon: string,
    subtitle: string,
    onPress: () => void
}
const Item: FC<Props> = ({ title, icon, subtitle, onPress }) => {

    return (
        <TouchableRipple onPress={onPress}>
            <View style={styles.list}>
                <Icon name={icon} fill={color.default} style={styles.icon} />
                <View>
                    <Text>{title}</Text>
                    <Text appearance={"hint"} category="c1" style={theme.marginTop5}>{subtitle}</Text>
                </View>
            </View>
        </TouchableRipple>
    )
}

const SettingScreen: FC<PageProps> = ({ navigation }) => {
    return (
        <DetailLayout title='Pengaturan' back>
            <Item
                title='Layout'
                icon='view-grid-plus'
                subtitle='Pemilihan layout utama pada halaman depan'
                onPress={() => navigation.navigate("Layout")}
            />
            <Item
                title='Printer'
                icon='printer'
                subtitle='Pengaturan perangkat printer untuk cetak struk'
                onPress={() => navigation.navigate("Printer")}
            />
            <Item
                title='Informasi'
                icon='page-layout-header-footer'
                subtitle='Header stuk, footer struk, informasi klinik'
                onPress={() => navigation.navigate("Receipt")}
            />
            {/* <Item
                title='Struk'
                icon='receipt'
                subtitle='Ukuran printer dan layout struk'
                onPress={() => navigation.navigate("ReceiptLayout")}
            /> */}
        </DetailLayout>
    )
}

export default SettingScreen

const styles = StyleSheet.create({
    icon: {
        ...theme.icon,
        marginRight: 20
    },
    list: {
        paddingHorizontal: constant.container,
        paddingVertical: 16,
        ...theme.flexStart,
    }
})