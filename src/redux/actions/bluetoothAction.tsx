import { BluetoothProps } from "@types";

const setBluetooth = (value: BluetoothProps) => {
    return {
        type: "SET_BLUETOOTH",
        payload: value
    }
}

export { setBluetooth }