import { Alert, StyleSheet, ToastAndroid, View } from 'react-native'
import React, { FC, useState, useEffect } from 'react'
import { AuthLayout, Input } from '@components'
import { Button, Text } from '@ui-kitten/components'
import { constant, theme } from '@utils'
import { PageProps, UserResultProps } from '@types'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { setProfile } from '../../redux/actions/authAction'

const LoginScreen: FC<PageProps> = (props) => {
    const [data, setData] = useState({
        username: '',
        password: '',
        token: ''
    })
    const [error, setError] = useState<any>([])
    const [loading, setLoading] = useState(false)
    const handleChange = (name: string, value: string) => setData({ ...data, [name]: value })
    const [isOpenPassword, setIsOpenPassword] = useState(false)

    const dispatch = useDispatch();
    useEffect(() => {
        const setToken = async () => {
            const token = await AsyncStorage.getItem("fcm_token") ?? '-';
            setData({ ...data, token: token })
        }
        setToken()
    }, [])


    const handleSubmit = async () => {
        setLoading(true);
        setError([]);
        await axios.post(constant.baseUrl + '/login', data)
            .then(async res => {
                await AsyncStorage.setItem("token", res.data.token);
                const result: UserResultProps = res.data.user
                dispatch(setProfile(result))
                props.navigation.replace("Splash");
            }).catch(err => {
                if (err.response.status == 400) {
                    Alert.alert("Kata Sandi Salah", "Kata sandi yang anda masukan salah. Harap coba lagi")
                } else {
                    ToastAndroid.show("Oops terdapat kesalahan", ToastAndroid.SHORT)
                }
                setError(err.response.data.result);
            })
        setLoading(false)
    }

    return (
        <AuthLayout loading={loading}>
            <View style={styles.body}>
                <View style={styles.form}>
                    <Input
                        leftIcon='account'
                        label='Username'
                        placeholder='username@mail.com'
                        value={data.username}
                        error={error?.username}
                        autoCapitalize={'none'}
                        onChangeText={(value) => handleChange('username', value)}
                    />
                    <Input
                        leftIcon='key'
                        label='Password'
                        placeholder='your password'
                        secureTextEntry={!isOpenPassword}
                        autoCapitalize={'none'}
                        value={data.password}
                        error={error?.password}
                        rightIcon={isOpenPassword ? 'eye-off' : 'eye'}
                        righIconOnPress={() => setIsOpenPassword(!isOpenPassword)}
                        onChangeText={(value) => handleChange('password', value)}
                    />
                    <View style={styles.forgotPassword}>
                        <Text appearance={"hint"} category="c1" style={theme.fontRegular}>Forgot Password?</Text>
                    </View>
                    <Button onPress={handleSubmit}>Login</Button>
                    <View style={styles.register}>
                        <Text appearance={"hint"} category="c1" style={[theme.fontRegular, theme.textCenter]}>
                            Don’t Have Account? <Text category={"c1"} status="primary" style={theme.fontSemiBold}>Sign Up</Text>
                        </Text>
                    </View>
                </View>
            </View>
        </AuthLayout>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    body: {
        ...theme.container
    },
    form: {
        marginTop: 30
    },
    forgotPassword: {
        marginBottom: 20,
        alignItems: "flex-end"
    },
    register: {
        marginTop: 20
    }
})