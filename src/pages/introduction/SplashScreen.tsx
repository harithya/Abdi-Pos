import { Image, StyleSheet } from 'react-native'
import React, { useEffect, FC } from 'react'
import { theme } from '@utils'
import { PageProps, UserResultProps } from '@types'
import { IntroLayout } from '@components'
import { http } from '@services'
import { useDispatch } from 'react-redux'
import { setProfile } from 'src/redux/actions/authAction'
import { fetchCategory } from 'src/redux/actions/categoryAction'

const SplashScreen: FC<PageProps> = ({ navigation }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        setTimeout(() => {
            http.get("profile").then((res) => {
                const profile: UserResultProps = res.data.result
                dispatch(setProfile(profile));
                dispatch(fetchCategory());
                navigation.replace("Home")
            }).catch((err) => {
                navigation.replace("Welcome")
            })
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