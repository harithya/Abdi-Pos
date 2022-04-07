import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Divider, Text } from '@ui-kitten/components'
import { color, constant, theme } from '@utils'
import TouchableRipple from '../Touchable/TouchableRipple'
import { useNavigationProps } from '@types'
import { useNavigation } from '@react-navigation/native'

const Cart = () => {
    const navigation: useNavigationProps = useNavigation();
    return (
        <>
            <TouchableRipple onPress={() => navigation.navigate("CartShow")}>
                <View style={styles.list}>
                    <View style={styles.number}>
                        <Text style={theme.fontMedium} status={"control"}>13</Text>
                    </View>
                    <View style={theme.flex1}>
                        <Text>Holisticare Ester C</Text>
                        <View style={theme.flexBetween}>
                            <Text appearance={"hint"} category="c2" style={theme.marginTop5}>Harga: Rp 17.500 x 3, Diskon: -</Text>
                            <Text category={"p2"}>Rp 17.500</Text>
                        </View>
                    </View>
                </View>
            </TouchableRipple>
            <Divider />
        </>
    )
}

export default Cart

const styles = StyleSheet.create({
    list: {
        paddingHorizontal: constant.container,
        paddingVertical: 16,
        ...theme.flexStart
    },
    number: {
        height: 40,
        marginRight: 20,
        width: 40,
        backgroundColor: color.primary,
        borderRadius: 10,
        ...theme.toCenter,
        ...theme.boxShadow,
    }
})