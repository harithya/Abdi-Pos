import { SettingStateProps, TransactionDetailResultProps, TransactionResultProps, useNavigationProps } from "@types";
import { helper } from "@utils";
import { ToastAndroid } from "react-native";
import { BLEPrinter } from "react-native-thermal-receipt-printer"
import { store } from "src/redux/store"
import { requestMultiple, PERMISSIONS } from 'react-native-permissions'

const receipt = {
    print: async (data: TransactionResultProps) => {
        try {
            await BLEPrinter.init();
            const permission = await requestMultiple([PERMISSIONS.ANDROID.BLUETOOTH_CONNECT, PERMISSIONS.ANDROID.BLUETOOTH_SCAN]);
            if (permission["android.permission.BLUETOOTH_SCAN"] == "granted" && permission["android.permission.BLUETOOTH_CONNECT"] == "granted" && store.getState().bluetooth.data.inner_mac_address) {
                const req = await BLEPrinter.connectPrinter(store.getState().bluetooth.data.inner_mac_address)
                if (req) {
                    let setting: SettingStateProps = store.getState().setting
                    const line = `------------------------------------------------`;
                    // const line = `------------------------------------`;
                    let design =
                        `<C>${setting.data.name}</C>\n` +
                        `<C>${setting.data.adress}</C>\n` +
                        `<C>${line}</C>\n\n` +
                        `No.Transaksi : ${data.kode}\n` +
                        `Pelanggan    : ${data.pasien !== null ? data.pasien.substring(0, 12) + '...' : '-'}\n` +
                        `Tanggal      : ${helper.date(data.tanggal)}\n` +
                        `<C>${line}</C>\n\n`;

                    let totalDiskon = 0;
                    data.detail_transaksi.map((val: TransactionDetailResultProps) => {
                        let produk = ''
                        if (val.produk.length > 24) {
                            produk = val.produk.substring(0, 18) + '...';
                        } else {
                            produk = val.produk;
                        }
                        const autoSpace = ' '.repeat(24 - produk.length);

                        if (val.diskon > 0) {
                            design += `${produk}${autoSpace}` +
                                `${parseInt(val.jumlah)} ${val.satuan} x ${helper.formatNumber(val.harga - val.diskon, false)} ,  ${helper.formatNumber((val.harga - val.diskon) * parseInt(val.jumlah), false)}\n`;
                            design += `Diskon : ${helper.formatNumber(val.diskon, false)}\n\n`;
                        } else {
                            design += `${produk}${autoSpace}` +
                                `${parseInt(val.jumlah)} ${val.satuan} x ${helper.formatNumber(val.harga, false)} ,  ${helper.formatNumber(val.harga * parseInt(val.jumlah), false)}\n\n`;
                        }

                        totalDiskon += val.diskon * parseInt(val.jumlah);
                    })
                    design += `<C>${line}</C>\n\n` +
                        `Total       : ${helper.formatNumber(data.jumlah - totalDiskon)}\n` +
                        `Diskon      : ${helper.formatNumber(totalDiskon)}\n` +
                        `Bayar       : ${helper.formatNumber(data.dibayar)}\n` +
                        `Kembali     : ${helper.formatNumber(data.kembalian)}\n` +
                        `<C>${line}</C>\n\n` +
                        `<C>${setting.data.footer}</C>\n`;
                    BLEPrinter.printBill(design)
                }
            } else {
                ToastAndroid.show("Pergi ke halaman pengaturan", ToastAndroid.SHORT);
            }

        } catch (error) {
            ToastAndroid.show("Opps printer tidak terhubung", ToastAndroid.SHORT);
        }

    }
}

export default receipt