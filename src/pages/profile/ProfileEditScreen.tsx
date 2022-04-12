import { View, Image, StyleSheet, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import React, { useState, FC } from 'react'
import { DetailLayout, Input } from '@components'
import { color, theme } from '@utils'
import { Button, Icon } from '@ui-kitten/components'
import { useSelector, useDispatch } from 'react-redux'
import { State } from 'src/redux/reducer'
import { AuthStateProps, FileProps, PageProps } from '@types'
import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker'
import { http } from '@services'
import { useMutation } from 'react-query'
import { AxiosError } from 'axios'
import { setProfile } from 'src/redux/actions/authAction'

const ProfileEditScreen: FC<PageProps> = ({ navigation }) => {
    const authState: AuthStateProps = useSelector((state: State) => state.auth);
    const [error, setError] = useState<any>([])
    const dispatch = useDispatch();

    const [data, setData] = useState<any>({
        nama: authState.name,
        alamat: authState.address,
        avatar_lama: authState.avatar,
        no_hp: authState.phone
    })

    const [avatar, setAvatar] = useState<FileProps>({
        name: '',
        uri: '',
        type: ''
    })

    const openGallery = () => {
        launchImageLibrary({
            mediaType: "photo",
        }, (res: ImagePickerResponse) => {
            if (!res.didCancel) {
                res.assets?.map((val) => {
                    setAvatar({
                        name: val.fileName ?? '',
                        uri: val.uri ?? '',
                        type: val.type ?? ''
                    })
                })
            }
        })
    }

    const handleInput = (key: string, value: string) => setData({ ...data, [key]: value });

    const postData = async () => {
        const formData = new FormData();
        Object.keys(data).map((val) => {
            formData.append(val, data[val]);
        })
        if (avatar.name != '') {
            formData.append("avatar", avatar);
        }

        const req = await http.post("profile", formData)
        return req;
    }

    const request = useMutation(postData, {
        onMutate: () => setError([]),
        onSuccess: (res) => {
            dispatch(setProfile(res.data.result));
            ToastAndroid.show("Profile berhasil di ubah", ToastAndroid.SHORT);
            navigation.goBack();
        },
        onError: (err: AxiosError) => {
            setError(err.response?.data.result)
        },
    });

    return (
        <DetailLayout title='Edit Profile' loading={request.isLoading} back>
            <ScrollView contentContainerStyle={theme.content}>
                <View style={theme.toCenter}>
                    <View style={styles.imgContainer}>
                        <Image source={{ uri: (avatar.uri == '') ? data.avatar_lama : avatar.uri }} style={styles.img} />
                        <TouchableOpacity style={styles.iconContainer} onPress={openGallery}>
                            <Icon name='edit-2-outline' pack='eva' fill={color.default} style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Input
                        label='Nama Lengkap'
                        value={data.nama}
                        error={error?.nama}
                        onChangeText={(value) => handleInput("nama", value)}
                        placeholder='Cth: Dr. Eka Julianta Wahjoepramono'
                    />
                    <Input
                        label='No Hp'
                        value={data.no_hp}
                        error={error?.no_hp}
                        keyboardType='number-pad'
                        onChangeText={(value) => handleInput("no_hp", value)}
                        placeholder='Cth: 0896627xxx'
                    />
                    <Input
                        label='Alamat'
                        value={data.alamat}
                        error={error?.alamat}
                        onChangeText={(value) => handleInput("alamat", value)}
                        textArea
                        placeholder='Cth: Jln tasik garut no 6'
                    />
                </View>
                <Button onPress={() => request.mutate()}>Simpan Perubahan</Button>
            </ScrollView>
        </DetailLayout>
    )
}

const styles = StyleSheet.create({
    img: {
        height: 110,
        width: 110,
        borderRadius: 80,
    },
    imgContainer: {
        marginBottom: 40,
        borderRadius: 80,
        position: "relative"
    },
    iconContainer: {
        backgroundColor: color.backgroundInput,
        alignSelf: "flex-end",
        position: "absolute",
        bottom: 0,
        right: 10,
        padding: 5,
        borderRadius: 50
    },
    icon: {
        height: 18,
        width: 18
    }
})

export default ProfileEditScreen