import { StyleSheet, PermissionsAndroid, FlatList, View, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DetailLayout, List, Empty } from '@components'
import Contacts, { Contact } from 'react-native-contacts';
import { useSelector } from 'react-redux';
import { State } from 'src/redux/reducer';
import { SearchStateProps } from '@types';
import { color, constant, theme } from '@utils';
import { Button } from '@ui-kitten/components';

const CustomerImportScreen = () => {
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
    const [selectedContact, setSelectedContact] = useState<string[]>([]);

    const setAllContact = () => {
        setIsSelectAll(!isSelectAll)
        if (isSelectAll) {
            setSelectedContact([])
        } else {
            setSelectedContact(data.map(item => item.recordID))
        }
    }

    const onSelectContact = (item: Contact) => {
        if (selectedContact.includes(item.recordID)) {
            setSelectedContact(selectedContact.filter(id => id !== item.recordID))
        } else {
            setSelectedContact([...selectedContact, item.recordID])
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
                // await fetchContact();
            }
        }
        searchData();
    }, [searchState.data])



    return (
        <DetailLayout
            title='Import Kontak'
            back
            action
            actionIcon={(isSelectAll) ? 'close-square-outline' : 'checkmark-square-outline'}
            actionOnPress={setAllContact}
            loading={loading}
            search>
            {data.length > 0 ? <FlatList
                data={data}
                keyExtractor={(item) => item.recordID}
                renderItem={({ item }) =>
                    <List
                        useCheckbox
                        title={item.displayName}
                        key={item.recordID}
                        checked={selectedContact.includes(item.recordID)}
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
                    <Button>{`Import Kontak (${selectedContact.length})`}</Button>
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