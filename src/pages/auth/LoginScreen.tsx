import { View, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { Input, AuthLayout } from '@components'
import { Button, Text } from '@ui-kitten/components'
import { theme } from '@utils'
import { PageProps } from '@types'

const LoginScreen: FC<PageProps> = ({ navigation }) => {
    return (
        <AuthLayout loading={false}>
            <View style={styles.body}>
                <View style={styles.form}>
                    <Input
                        leftIcon='person-outline'
                        label='Username'
                        placeholder='username@mail.com'
                        autoCapitalize={'none'}

                    />
                    <Input
                        leftIcon='lock-outline'
                        label='Password'
                        placeholder='your password'
                        secureTextEntry
                        autoCapitalize={'none'}
                    />
                    <View style={styles.forgotPassword}>
                        <Text appearance={"hint"} category="c1" style={theme.fontRegular}>Forgot Password?</Text>
                    </View>
                    <Button onPress={() => navigation.navigate("Home")}>Login</Button>
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

export default LoginScreen