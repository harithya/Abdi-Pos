import { ReducerProps } from "@types"

const initialState = {
    data: [],
}

export default (state = initialState, { type, payload }: ReducerProps) => {
    switch (type) {

        case "ADD_RETURN_CART":
            return { ...state, ...payload }

        default:
            return state
    }
}
