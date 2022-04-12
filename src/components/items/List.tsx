import { StyleSheet, View } from 'react-native'
import React, { FC, memo } from 'react'
import { constant, theme } from '@utils'
import { CheckBox, Divider, Text } from '@ui-kitten/components'
import TouchableRipple from '../Touchable/TouchableRipple'

interface Props {
    title: string,
    subtitle: string,
    useCheckbox?: boolean,
    checked?: boolean,
    onChecked?: (checked: boolean) => void,
    onPress?: () => void,
}
const List: FC<Props> = (props) => {
    return (
        <>
            <TouchableRipple onPress={props.onPress}>
                <View style={styles.item}>
                    {props.useCheckbox && <CheckBox
                        checked={props.checked}
                        onChange={props.onChecked}>
                        <Text></Text>
                    </CheckBox>}
                    <View>
                        <Text>{props.title}</Text>
                        <Text appearance={"hint"} category="c1">{props.subtitle}</Text>
                    </View>
                </View>
            </TouchableRipple>
            <Divider />
        </>
    )
}

export default memo(List)

const styles = StyleSheet.create({
    item: {
        paddingHorizontal: constant.container,
        paddingVertical: 14,
        ...theme.flexStart
    }
})