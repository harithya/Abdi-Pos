import { ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { FC, useState, useEffect } from 'react'
import { DetailLayout, Input } from '@components'
import { theme } from '@utils'
import { Button } from '@ui-kitten/components'
import { useInfiniteQuery, useMutation } from 'react-query'
import { http } from '@services'
import { CustomerResultProps, PageProps } from '@types'
import { AxiosError } from 'axios'

const CustomerCreateScreen: FC<PageProps<'CustomerCreate'>> = ({ navigation, route }) => {
    const [data, setData] = useState({
        id: route.params.id ?? '',
        nama: "",
        no_hp: "",
        alamat: ""
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (route.params.id) {
            const fetchDetail = async () => {
                try {
                    setLoading(true)
                    const req = await http.get(`pelanggan/${route.params.id}`)
                    const result: CustomerResultProps = req.data.result
                    setData({
                        id: result.id,
                        nama: result.nama,
                        no_hp: result.no_hp,
                        alamat: result.alamat
                    })
                    setLoading(false)
                } catch (error) {
                    ToastAndroid.show("Gagal mengambil data", ToastAndroid.SHORT);
                }
            }
            fetchDetail()
        }
    }, [])


    const [error, setError] = useState<any>([])

    const handleInput = (key: string, value: string) => {
        setData({
            ...data,
            [key]: value
        })
    }

    const queryClient = useInfiniteQuery(['customer', ''])
    const postData = useMutation(async () => {
        const req = await http.post("pelanggan", data)
        return req
    }, {
        onMutate: () => setError([]),
        onSuccess: (res) => {
            queryClient.refetch();
            ToastAndroid.show("Data berhasil ditambahkan", ToastAndroid.SHORT)
            navigation.goBack();
        },
        onError: (err: AxiosError) => {
            setError(err.response?.data.result)
            ToastAndroid.show("Data gagal ditambahkan", ToastAndroid.SHORT)
        }
    })

    return (
        <DetailLayout title='Tambah' back loading={postData.isLoading || loading}>
            <ScrollView contentContainerStyle={theme.content}>
                <Input
                    label='Nama Lengkap'
                    value={data.nama}
                    error={error?.nama}
                    onChangeText={(value) => handleInput('nama', value)}
                    placeholder='Cth : Harithya Wisesa'
                />
                <Input
                    label='No Hp'
                    value={data.no_hp}
                    error={error?.no_hp}
                    onChangeText={(value) => handleInput('no_hp', value)}
                    placeholder='Cth : 089662xxxx'
                />
                <Input
                    label='Alamat Lengkap'
                    textArea
                    value={data.alamat}
                    error={error?.alamat}
                    onChangeText={(value) => handleInput('alamat', value)}
                    placeholder='Cth : Jln tasik garut no 6'
                />
                <Button onPress={() => postData.mutate()}>Simpan Perubahan</Button>
            </ScrollView>

        </DetailLayout>
    )
}

export default CustomerCreateScreen

const styles = StyleSheet.create({})