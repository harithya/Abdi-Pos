import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { color, constant, theme } from '@utils'
import { Divider, Icon, Text } from '@ui-kitten/components'
import TouchableRipple from '../Touchable/TouchableRipple'
import { CustomerStateProps, useNavigationProps } from '@types'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'src/redux/reducer'
import { removeCustomer } from 'src/redux/actions/customerAction'

const SelectPeople = () => {
    const navigation: useNavigationProps = useNavigation();
    const customerState: CustomerStateProps = useSelector((state: State) => state.customer);
    const dispatch = useDispatch();

    return (
        <>
            <TouchableRipple onPress={() => navigation.navigate("Customer", { withSelect: true })}>
                <View style={styles.container}>
                    <View style={theme.flexStart}>
                        <Icon fill={color.default} style={styles.icon} name="person-outline" pack='eva' />
                        <Text appearance={"hint"} category="p2">
                            {customerState.data?.nama ?? "Pilih Passien"}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => dispatch(removeCustomer())}>
                        <Icon
                            fill={color.default}
                            style={theme.icon}
                            name={customerState.data?.id ? 'close-circle-outline' : 'arrow-ios-forward-outline'}
                            pack='eva'
                        />
                    </TouchableOpacity>
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