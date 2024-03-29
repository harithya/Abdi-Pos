import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { Icon, MenuItem, Text } from '@ui-kitten/components'

interface Props {
    title: string,
    icon: string,
    onPress?: () => void
}
const Menu: FC<Props> = (props) => {
    return (
        <MenuItem
            title={(eva) => <Text category='p1' style={styles.title}>{props.title}</Text>}
            accessoryLeft={(eva) => <Icon pack='eva' name={props.icon} {...eva} />}
            onPress={props.onPress}
            style={styles.menu} />
    )
}

export default Menu

const styles = StyleSheet.create({
    menu: {
        paddingVertical: 16,
        paddingHorizontal: 16
    },
    title: {
        textAlign: 'left',
        flex: 1,
        marginLeft: 16
    }
})
