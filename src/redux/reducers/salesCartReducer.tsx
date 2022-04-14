import { ReducerProps, SalesCartStateProps } from "@types"

const initialState: SalesCartStateProps = {
    data: []
}

export default (state = initialState, { type, payload }: ReducerProps) => {
    switch (type) {

        case "ADD_SALES_CART":
            return {
                ...state,
                data: [...state.data, payload]
            }

        case "UPDATE_SALES_CART":
            return {
                ...state,
                data: payload
            }

        default:
            return state
    }
}
