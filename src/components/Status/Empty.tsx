import React, { FC, memo } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Text } from '@ui-kitten/components'
import { theme } from '../../utils'

interface Props {
    title: string,
    subtitle: string
}
const Empty: FC<Props> = (props) => {
    return (
        <View style={styles.container}>
            <Image source={require("../../assets/img/empty.png")} style={styles.image} />
            <Text category={'p1'} style={theme.fontRegular}>{props.title}</Text>
            <Text style={styles.subtitle} category='p2' appearance='hint'>{props.subtitle}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 180,
        width: 180,
        marginBottom: 30,
        resizeMode: "contain"
    },
    container: {
        ...theme.toCenter,
        marginTop: 20
    },
    subtitle: {
        marginTop: 5
    }
})

export default memo(Empty)

