import { BluetoothStateProps, PrinterStateProps, ReducerProps } from "@types"

const initialState: PrinterStateProps = {
    data: {
        layout: 0,
        size: 0
    }
}

export default (state = initialState, { type, payload }: ReducerProps) => {
    switch (type) {
        case "SET_PRINTER_SIZE":
            return {
                ...state,
                data: {
                    ...state.data,
                    size: payload
                }
            }

        case "SET_PRINTER_LAYOUT":
            return {
                data: {
                    ...state.data,
                    layout: payload
                }
            }

        default:
            return state
    }
}
