import { ReducerProps, SettingStateProps } from "@types"

const initialState: SettingStateProps = {
    data: {
        id: 0,
        name: '',
        phone: '',
        adress: '',
        logo: '',
        footer: '',
    }
}

export default (state = initialState, { type, payload }: ReducerProps) => {
    switch (type) {

        case "FETCH_SETTING":
            return {
                ...state,
                data: payload
            }

        default:
            return state
    }
}
