import { StyleSheet, PermissionsAndroid, FlatList, View, ToastAndroid } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { DetailLayout, List, Empty } from '@components'
import Contacts, { Contact } from 'react-native-contacts';
import { useSelector } from 'react-redux';
import { State } from 'src/redux/reducer';
import { PageProps, SearchStateProps } from '@types';
import { color, constant, theme } from '@utils';
import { Button } from '@ui-kitten/components';
import { useInfiniteQuery, useMutation } from 'react-query';
import { http } from '@services';


interface ContactSelectedProps {
    id: string,
    name: string,
    phone: string
}

const CustomerImportScreen: FC<PageProps> = ({ navigation }) => {
    const [data, setData] = useState<Contact[]>([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
            'title': 'Contacts',
            'message': 'This app would like to view your contacts.',
            'buttonPositive': 'Please accept bare mortal'
        }).then(async () => {
            await fetchContact();
        })
    }, [])

    const fetchContact = () => {
        return new Promise(async (resolve, reject) => {
            const checkPermission = await Contacts.checkPermission();
            if (checkPermission == "authorized") {
                setLoading(true)
                const request = await Contacts.getAll();
                setData(request);
                setLoading(false)
                resolve(request)
            }

            if (checkPermission == "denied") {
                ToastAndroid.show("You have denied the permission", ToastAndroid.SHORT)
            }

            if (checkPermission == "undefined") {
                Contacts.requestPermission();
            }
        })
    }

    const [isSelectAll, setIsSelectAll] = useState(false)
    const [selectedContact, setSelectedContact] = useState<ContactSelectedProps[]>([]);

    const setAllContact = () => {
        setIsSelectAll(!isSelectAll)
        if (isSelectAll) {
            setSelectedContact([])
        } else {
            setSelectedContact(data.map(item => {
                return {
                    id: item.recordID,
                    name: item.givenName,
                    phone: (item.phoneNumbers.length > 0) ? item.phoneNumbers[0].number : '-'
                }
            }))
        }
    }

    const onSelectContact = (item: Contact) => {
        const index = selectedContact.findIndex(contact => contact.id === item.recordID)
        if (index > -1) {
            setSelectedContact(selectedContact.filter(contact => contact.id !== item.recordID))
        } else {
            setSelectedContact([...selectedContact, {
                id: item.recordID,
                name: item.givenName,
                phone: (item.phoneNumbers.length > 0) ? item.phoneNumbers[0].number : '-'
            }])
        }
    }

    const searchState: SearchStateProps = useSelector((state: State) => state.search);
    useEffect(() => {
        // Search data contact
        const searchData = async () => {
            if (searchState.data.length > 0) {
                const searchData = data.filter(item => {
                    return item.givenName?.toLowerCase().includes(searchState.data.toLowerCase()) ||
                        item.familyName?.toLowerCase().includes(searchState.data.toLowerCase()) ||
                        item.phoneNumbers?.map(phone => phone.number).join('').includes(searchState.data)
                })
                setData(searchData)
            } else {
                await fetchContact();
            }
        }
        searchData();
    }, [searchState.data])

    const queryClient = useInfiniteQuery(["customer", '']);
    const postCustomer = useMutation(async () => {
        const req = await http.post("pasien/import", selectedContact);
        return req
    }, {
        onSuccess: (res) => {
            queryClient.refetch();
            ToastAndroid.show("Import data berhasil", ToastAndroid.SHORT)
            navigation.goBack();
        },
        onError: (err) => {
            ToastAndroid.show("Import data gagal", ToastAndroid.SHORT)
        }
    })

    return (
        <DetailLayout
            title='Import Kontak'
            back
            action
            actionIcon={(isSelectAll) ? 'close-square-outline' : 'checkmark-square-outline'}
            actionOnPress={setAllContact}
            loading={loading || postCustomer.isLoading}
            search>
            {data.length > 0 ? <FlatList
                data={data}
                keyExtractor={(item) => item.recordID}
                renderItem={({ item }) =>
                    <List
                        useCheckbox
                        title={item.displayName}
                        key={item.recordID}
                        checked={selectedContact.findIndex(contact => contact.id === item.recordID) > -1}
                        onChecked={() => onSelectContact(item)}
                        onPress={() => onSelectContact(item)}
                        subtitle={(item.phoneNumbers.length > 0) ? item.phoneNumbers[0].number : '-'}
                    />}
            /> : <Empty
                title='Tidak Ada data'
                subtitle='Untuk saat ini data tidak tersedia'
            />}
            {selectedContact.length > 0 &&
                <View style={styles.footer}>
                    <Button onPress={() => postCustomer.mutate()}>{`Import Kontak (${selectedContact.length})`}</Button>
                </View>}
        </DetailLayout>
    )
}

export default CustomerImportScreen

const styles = StyleSheet.create({
    footer: {
        position: "absolute",
        right: 0,
        left: 0,
        bottom: 0,
        paddingTop: 16,
        backgroundColor: color.white,
        paddingHorizontal: constant.container,
        paddingBottom: 16,
        ...theme.boxShadow
    }
})