import { Image, StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { Bubble, IntroLayout } from '@components'
import { theme } from '@utils'
import { Button, Text } from '@ui-kitten/components'
import { PageProps } from '@types'

const WelcomeScreen: FC<PageProps> = ({ navigation }) => {
    return (
        <IntroLayout>
            <Bubble />
            <View style={theme.toCenter}>
                <Image source={require("../../assets/img/logo.png")} style={styles.logo} />
                <Image source={require("../../assets/img/people.png")} style={styles.img} />
                <Text category={"h6"} status={"control"} style={styles.title}>
                    Abdi POS is a <Text category={"h6"} style={[styles.title, theme.fontSemiBold]} status="control">solution</Text> for clinics to make <Text category={"h6"} style={[styles.title, theme.fontSemiBold]} status="control">operations </Text>easier
                </Text>
            </View>
            <View style={theme.footer}>
                <Button status={"basic"} onPress={() => navigation.replace("Login")}>Get Started</Button>
            </View>
        </IntroLayout>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    logo: {
        height: 27,
        marginTop: 50,
        resizeMode: "contain"
    },
    img: {
        width: 220,
        height: 220,
        marginTop: 50,
        resizeMode: "contain",
        marginBottom: 70
    },
    title: {
        paddingHorizontal: 50,
        lineHeight: 30,
        fontSize: 18,
        textAlign: "center",
        ...theme.fontRegular
    }
})