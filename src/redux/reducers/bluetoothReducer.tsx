import { BluetoothStateProps, ReducerProps } from "@types"

const initialState: BluetoothStateProps = {
    data: {
        device_name: "",
        inner_mac_address: ""
    }
}

export default (state = initialState, { type, payload }: ReducerProps) => {
    switch (type) {

        case "SET_BLUETOOTH":
            return {
                ...state,
                data: payload
            }

        default:
            return state
    }
}
