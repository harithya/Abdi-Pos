import { LayoutStateProps, ReducerProps } from "@types"

const initialState: LayoutStateProps = {
    data: 'list'
}

export default (state = initialState, { type, payload }: ReducerProps) => {
    switch (type) {

        case "CHANGE_LAYOUT":
            return {
                ...state,
                data: payload
            }

        default:
            return state
    }
}
