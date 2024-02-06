import { BluetoothProps } from "@types";

const setPrinterLayout = (value: number) => {
    return {
        type: "SET_PRINTER_LAYOUT",
        payload: value
    }
}

const setPrinterSize = (value: number) => {
    return {
        type: "SET_PRINTER_SIZE",
        payload: value
    }
}

export { setPrinterLayout, setPrinterSize }