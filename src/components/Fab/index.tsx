import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon } from '@ui-kitten/components'
import { constant, theme } from '@utils'

interface Props {
    onPress: () => void
}
const Fab: FC<Props> = (props) => {
    return (
        <View style={styles.fabContainer}>
            <Button
                accessoryLeft={(eva) => <Icon pack='eva' name="edit-outline" {...eva} />}
                style={styles.fab}
                size='giant'
                onPress={() => props.onPress()} />
        </View>
    )
}


const styles = StyleSheet.create({
    fab: {
        alignSelf: 'flex-start',
        borderRadius: 150,
        height: 60,
        width: 60,
        ...theme.boxShadow
    },
    fabContainer: {
        position: 'absolute',
        right: constant.container - 6,
        bottom: constant.container
    }
})

export default Fab

