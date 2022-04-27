import { View, StyleSheet, ScrollView, ToastAndroid } from 'react-native'
import React, { FC, useState } from 'react'
import { DetailLayout, Input } from '@components'
import { color, constant, theme } from '@utils'
import { Button, Text } from '@ui-kitten/components'
import { PageProps, SettingStateProps } from '@types'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'src/redux/reducer'
import { http } from '@services'
import { useMutation } from 'react-query'
import { fetchSetting } from 'src/redux/actions/settingAction'

const ReceiptScreen: FC<PageProps> = ({ navigation }) => {
    const settingState: SettingStateProps = useSelector((state: State) => state.setting);
    const dispatch = useDispatch();

    const [data, setData] = useState({
        nama: settingState.data.name,
        alamat: settingState.data.adress,
        footer: settingState.data.footer
    })
    const [error, setError] = useState<any>([])

    const handleInput = (name: string, value: string,) => {
        setData({
            ...data,
            [name]: value
        })
    }

    const postSetting = async () => {
        const req = http.post("pengaturan", data);
        return req;
    }

    const settingMutation = useMutation(postSetting, {
        onMutate: () => setError([]),
        onSuccess: (res) => {
            dispatch(fetchSetting());
            ToastAndroid.show("Data berhasil disimpan", ToastAndroid.SHORT);
            navigation.goBack();
        },
        onError: (err: any) => {
            setError(err.response.data.result);
        }
    })

    return (
        <DetailLayout title='Struk' back loading={settingMutation.isLoading}>
            <ScrollView contentContainerStyle={theme.content}>
                <View style={styles.section}>
                    <Text style={styles.header} status="primary" category="h5" >Header (Bagian Atas)</Text>
                    <Input
                        value={data.nama}
                        onChangeText={(value) => handleInput('nama', value)}
                        label='Nama Klink (Header)'
                        error={error?.nama}
                        placeholder='Cth: Klinik Hebat'
                    />
                    <Input
                        value={data.alamat}
                        onChangeText={(value) => handleInput('alamat', value)}
                        textArea
                        error={error?.alamat}
                        label='Alamat (Header)'
                        placeholder='Cth: Jl. Raya Kedungwuni No.1'
                    />
                </View>
                <View style={styles.section}>
                    <Text style={styles.header} status="primary" category="h5" >Footer (Bagian Bawah)</Text>
                    <Input
                        textArea
                        value={data.footer}
                        error={error?.footer}
                        onChangeText={(value) => handleInput('footer', value)}
                        label='Ucapan (Footer)'
                        placeholder='Cth: Semoga Lekas Sembuh'
                    />
                </View>
                <Button onPress={() => settingMutation.mutate()}>Simpan Perubahan</Button>
            </ScrollView>
        </DetailLayout>
    )
}

const styles = StyleSheet.create({
    header: {
        textAlign: "center",
        borderBottomWidth: 2,
        borderBottomColor: color.primary,
        paddingBottom: 16,
        ...theme.fontMedium,
        borderStyle: "dashed",
        marginBottom: constant.container
    },
    section: {
        marginBottom: constant.container
    }
})

export default ReceiptScreen