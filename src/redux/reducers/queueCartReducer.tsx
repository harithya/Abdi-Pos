import { ReducerProps, CartStateProps } from "@types"

const initialState: CartStateProps = {
    data: []
}

export default (state = initialState, { type, payload }: ReducerProps) => {
    switch (type) {

        case "ADD_QUEUE_CART":
            return {
                ...state,
                data: [...state.data, payload]
            }

        case "UPDATE_QUEUE_CART":
            return {
                ...state,
                data: payload
            }

        case "DELETE_QUEUE_CART":
            return {
                ...state,
                data: payload
            }

        case "EMPTY_QUEUE_CART":
            return {
                ...state,
                data: []
            }

        default:
            return state
    }
}
