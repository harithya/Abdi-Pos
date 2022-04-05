import { StyleSheet, Image } from 'react-native'
import React, { FC, useEffect } from 'react'
import { IntroLayout } from '@components'
import { theme } from '@utils'
import { PageProps } from '@types'

const SplashScreen: FC<PageProps> = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace("Welcome");
        }, 1500);
    }, [])

    return (
        <IntroLayout style={theme.toCenter}>
            <Image source={require("../../assets/img/logo.png")} style={styles.img} />
        </IntroLayout>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    img: {
        height: 40,
        resizeMode: "contain"
    }
})