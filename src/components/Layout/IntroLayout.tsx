import { ImageBackground, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import React, { FC } from 'react'
import Layout from '../Layout'

interface Props {
    style?: StyleProp<ViewStyle>
}
const IntroLayout: FC<Props> = (props) => {
    return (
        <ImageBackground source={require("../../assets/img/background.png")} style={styles.container}>
            <Layout style={props.style}>
                {props.children}
            </Layout>
        </ImageBackground>
    )
}

export default IntroLayout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        resizeMode: "cover"
    }
})