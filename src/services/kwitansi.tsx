import { AuthStateProps, QueueResultProps, ServiceResultProps, SettingStateProps, TransactionDetailResultProps, TransactionResultProps } from "@types";
import { helper } from "@utils";
import { ToastAndroid } from "react-native";
import { BLEPrinter } from "react-native-thermal-receipt-printer"
import { store } from "src/redux/store"

interface KwitansiProps {
    antrian: QueueResultProps,
    layanan: ServiceResultProps[],
}

const kwitansi = {
    print: async (queue: KwitansiProps, transaction: TransactionResultProps) => {
        try {
            await BLEPrinter.init();
            const req = await BLEPrinter.connectPrinter(store.getState().bluetooth.data.inner_mac_address)
            if (req) {
                let setting: SettingStateProps = store.getState().setting
                let user: AuthStateProps = store.getState().auth
                const line = `------------------------------------------------`;
                let design =
                    `<C>${setting.data.name}</C>\n` +
                    `<C>${setting.data.adress}</C>\n` +
                    `<C>${line}</C>\n\n` +
                    `<CB>KWITANSI</CB>\n\n\n` +
                    `No.Transaksi    : ${queue.antrian.kode_transaksi}\n\n` +
                    `Tanggal         : ${helper.date(queue.antrian.tanggal_transaksi)}\n\n` +
                    `Passien         : ${queue.antrian.pasien}\n\n`;
                queue.layanan.map((val, key) => {
                    if (key == 0) {
                        design += `Untuk           : ${val.layanan}\n`;
                    } else {
                        design += `                  ${val.layanan}\n`;
                    }
                })
                design +=
                    `\nJumlah          : ${helper.formatNumber(transaction.jumlah, false)}\n\n\n` +
                    `<C>${setting.data.footer}</C>\n`;




                BLEPrinter.printBill(design)
            }
        } catch (error) {
            ToastAndroid.show("Opps printer tidak terhubung", ToastAndroid.SHORT);
        }
    }
}

export default kwitansi