import { StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import ActionSheet from 'react-native-actions-sheet'
import { constant, theme } from '@utils'
import { Icon, Text } from '@ui-kitten/components'

interface Props {
    id: string,
    icon?: string,
    title: string
}
const BottomSheet: FC<Props> = ({ id, children, icon = 'filter-variant', title }) => {
    return (
        <ActionSheet id='bottomSheet' containerStyle={styles.container} gestureEnabled>
            <View style={styles.header}>
                <Icon name={icon} fill={"black"} style={styles.icon} />
                <Text style={theme.fontMedium}>{title}</Text>
            </View>
            {children}
        </ActionSheet>
    )
}

export default BottomSheet

const styles = StyleSheet.create({
    container: {
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25
    },
    icon: {
        ...theme.icon,
        marginRight: 16
    },
    header: {
        ...theme.flexStart,
        paddingHorizontal: constant.container,
        paddingVertical: 16,
        paddingBottom: 16
    }
})