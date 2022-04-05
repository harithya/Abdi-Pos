import { ImageBackground, StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import Bubble from '../Bubble'
import { theme } from '@utils'
import { Text } from '@ui-kitten/components'
import Loading from '../Loading'

interface Props {
    loading?: boolean
}
const AuthLayout: FC<Props> = ({ children, loading }) => {
    return (
        <View style={styles.container}>
            {loading && <Loading />}
            <ImageBackground source={require("../../assets/img/background.png")} style={styles.background}>
                <Bubble />
                <View style={styles.header}>
                    <Text status={"control"} category={"h3"}>Login</Text>
                    <Text status={"control"} appearance={"hint"} style={theme.marginTop5}>Let’s Learn More About Abdi POS</Text>
                </View>
            </ImageBackground>
            {children}
        </View>
    )
}

export default AuthLayout

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        height: 200,
        resizeMode: "cover"
    },
    header: {
        ...theme.content,
        flex: 1,
        marginTop: 30,
        justifyContent: "center"
    }
})