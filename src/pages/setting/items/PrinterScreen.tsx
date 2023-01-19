import { ToastAndroid, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DetailLayout, Empty, List } from '@components'
import {
    BLEPrinter,
    IBLEPrinter
} from "react-native-thermal-receipt-printer";
import { helper } from '@utils';
import { useDispatch, useSelector } from 'react-redux';
import { setBluetooth } from 'src/redux/actions/bluetoothAction';
import { BluetoothStateProps } from '@types';
import { State } from 'src/redux/reducer';
import { request, PERMISSIONS } from 'react-native-permissions';

const PrinterScreen = () => {
    const [deviceList, setDeviceList] = useState<IBLEPrinter[]>([])
    const [loading, setLoading] = useState(false)
    const [isRefresh, setIsRefresh] = useState(false)

    useEffect(() => {
        const fetchBleManager = async () => {
            setLoading(true)
            try {
                const bluetootConnect = await request(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
                const bluetoothScan = await request(PERMISSIONS.ANDROID.BLUETOOTH_SCAN);
                if (bluetootConnect == "granted" && bluetoothScan == "granted") {
                    await BLEPrinter.init()
                    const bluetooth = await BLEPrinter.getDeviceList();
                    setDeviceList(bluetooth);
                } else {
                    ToastAndroid.show('Permission not granted', ToastAndroid.SHORT)
                }
            } catch (error: any) {
                ToastAndroid.show("Mohon nyalakan bluetooth", ToastAndroid.SHORT)
            }
            setLoading(false)
        }
        fetchBleManager();
    }, [isRefresh])

    const handleRefresh = () => {
        setIsRefresh(true)
        setTimeout(() => {
            setIsRefresh(false)
        }, 1000);
    }

    const dispatch = useDispatch();
    const bluetoothState: BluetoothStateProps = useSelector((state: State) => state.bluetooth)
    const handleSelectBluetooth = (device: IBLEPrinter) => {
        dispatch(setBluetooth(device))
        BLEPrinter.connectPrinter(device.inner_mac_address)
    }


    return (
        <DetailLayout
            title='Printer'
            back
            action
            actionIcon='refresh'
            actionPack='material-community'
            actionOnPress={handleRefresh}
            loading={loading}>
            {deviceList.length > 0 ? <FlatList
                data={deviceList}
                refreshing={isRefresh}
                onRefresh={handleRefresh}
                keyExtractor={(item) => item.inner_mac_address.toString()}
                renderItem={({ item }) =>
                    <List
                        title={item.device_name}
                        subtitle={item.inner_mac_address}
                        rightValue={bluetoothState.data.inner_mac_address == item.inner_mac_address ? 'selected' : undefined}
                        onPress={() => handleSelectBluetooth(item)}
                    />}
            /> :
                <Empty
                    title='Tidak ada perangkat terhubung'
                    subtitle='Coba lakukan pindai ulang pada setting bluetooth anda'
                />}
        </DetailLayout>
    )
}

export default PrinterScreen