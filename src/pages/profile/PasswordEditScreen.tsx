import { Alert, ToastAndroid, View } from 'react-native'
import React, { FC, useState } from 'react'
import { DetailLayout, Input } from '@components'
import { theme } from '@utils'
import { Button } from '@ui-kitten/components'
import { http } from '@services'
import { useMutation } from 'react-query'
import { PageProps } from '@types'
import { AxiosError } from 'axios'

const PasswordEditScreen: FC<PageProps> = ({ navigation }) => {
    const [data, setData] = useState({
        password_baru: '',
        konfirmasi_password: ''
    })
    const [error, setError] = useState<any>([])

    const postData = async () => {
        const req = await http.post('profile/ganti-password', data)
        return req
    }

    const request = useMutation(postData, {
        onMutate: () => setError([]),
        onSuccess: (res) => {
            ToastAndroid.show("Password berhasil di ubah", ToastAndroid.SHORT);
            navigation.goBack();
        },
        onError: (err: AxiosError) => {
            setError(err.response?.data.result)
        }
    })

    const handleInput = (key: string, value: string) => setData({ ...data, [key]: value });

    return (
        <DetailLayout title='Ganti Password' loading={request.isLoading} back>
            <View style={theme.content}>
                <Input
                    label='Password Baru'
                    value={data.password_baru}
                    secureTextEntry
                    autoCapitalize='none'
                    error={error?.password_baru}
                    onChangeText={(val) => handleInput('password_baru', val)}
                    placeholder='enter new password'
                />
                <Input
                    label='Konfirmasi Password'
                    placeholder='confirm your password'
                    value={data.konfirmasi_password}
                    secureTextEntry
                    error={error?.konfirmasi_password}
                    autoCapitalize='none'
                    onChangeText={(val) => handleInput('konfirmasi_password', val)}
                />
            </View>
            <View style={theme.footer}>
                <Button onPress={() => request.mutate()}>Simpan</Button>
            </View>
        </DetailLayout>
    )
}

export default PasswordEditScreen