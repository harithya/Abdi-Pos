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

        case "DELETE_SALES_CART":
            return {
                ...state,
                data: payload
            }

        case "EMPTY_SALES_CART":
            return {
                ...state,
                data: []
            }

        default:
            return state
    }
}
