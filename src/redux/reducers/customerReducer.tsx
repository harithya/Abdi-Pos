import { CustomerStateProps, ReducerProps } from "@types"

const initialState: CustomerStateProps = {
    data: null
}

export default (state = initialState, { type, payload }: ReducerProps) => {
    switch (type) {

        case "SELECTED_CUSTOMER":
            return {
                ...state,
                data: payload
            }

        case "REMOVE_CUSTOMER":
            return {
                ...state,
                data: null
            }

        default:
            return state
    }
}
