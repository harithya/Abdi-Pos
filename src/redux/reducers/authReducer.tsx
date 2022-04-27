import { AuthStateProps, ReducerProps } from "@types"

const initialState: AuthStateProps = {
    id: null,
    name: '',
    avatar: '',
    spesialist: '',
    address: '',
    phone: ''
}

export default (state = initialState, { type, payload }: ReducerProps) => {
    switch (type) {

        case "SET_PROFILE_AUTH":
            return {
                ...state,
                ...payload
            }

        default:
            return state
    }
}
