import { SettingStateProps, TransactionDetailResultProps, TransactionResultProps } from "@types";
import { helper } from "@utils";
import { ToastAndroid } from "react-native";
import { BLEPrinter } from "react-native-thermal-receipt-printer"
import { store } from "src/redux/store"

const receipt = {
    print: async (data: TransactionResultProps) => {
        try {
            await BLEPrinter.init();
            const req = await BLEPrinter.connectPrinter(store.getState().bluetooth.data.inner_mac_address)
            if (req) {
                let setting: SettingStateProps = store.getState().setting
                let design =
                    `<C>${setting.data.name}</C>\n` +
                    `<C>${setting.data.adress}</C>\n` +
                    `<C>--------------------------------</C>\n\n` +
                    `No.Transaksi : ${data.kode}\n` +
                    `Pelanggan    : ${data.pasien !== null ? data.pasien.substring(0, 12) + '...' : '-'}\n` +
                    `Tanggal      : ${helper.date(data.tanggal)}\n` +
                    `<C>--------------------------------</C>\n\n`;

                data.detail_transaksi.map((val: TransactionDetailResultProps) => {
                    design += `${val.produk}\n` +
                        `${parseInt(val.jumlah)} ${val.satuan} x ${helper.formatNumber(val.harga, false)} ,  <R>${helper.formatNumber(val.harga * parseInt(val.jumlah), false)}</R>\n` +
                        `Diskon: ${helper.formatNumber(val.diskon, false)}\n\n`;
                })
                design += `<C>--------------------------------</C>\n\n` +
                    `Total       : ${helper.formatNumber(data.jumlah)}\n` +
                    `Diskon      : ${helper.formatNumber(data.diskon)}\n` +
                    `Bayar       : ${helper.formatNumber(data.dibayar)}\n` +
                    `Kembali     : ${helper.formatNumber(data.kembalian)}\n` +
                    `<C>--------------------------------</C>\n\n` +
                    `<C>${setting.data.footer}</C>\n`;
                BLEPrinter.printBill(design)
            }
        } catch (error) {
            console.log(error);
            ToastAndroid.show("Opps printer tidak terhubung", ToastAndroid.SHORT);
        }

    }
}

export default receipt