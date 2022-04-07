import { StyleSheet, View } from 'react-native'
import React from 'react'
import { color, constant, theme } from '@utils'
import { Divider, Icon, Text } from '@ui-kitten/components'
import TouchableRipple from '../Touchable/TouchableRipple'
import { useNavigationProps } from '@types'
import { useNavigation } from '@react-navigation/native'

const SelectPeople = () => {
    const navigation: useNavigationProps = useNavigation();
    return (
        <>
            <TouchableRipple onPress={() => navigation.navigate("Customer")}>
                <View style={styles.container}>
                    <View style={theme.flexStart}>
                        <Icon fill={color.default} style={styles.icon} name="person-outline" pack='eva' />
                        <Text appearance={"hint"} category="p2">Passien / Pelanggan</Text>
                    </View>
                    <Icon fill={color.default} style={theme.icon} name="arrow-ios-forward-outline" pack='eva' />
                </View>
            </TouchableRipple>
            <Divider />
        </>
    )
}

export default SelectPeople

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: constant.container,
        paddingVertical: 20,
        ...theme.flexBetween
    },
    icon: {
        ...theme.icon,
        marginRight: 20
    }
})