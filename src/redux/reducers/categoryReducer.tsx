import { CategoryStateProps, ReducerProps } from "@types"

const initialState: CategoryStateProps = {
    data: [],
    temp: [],
    selected: {
        id: 0,
        nama: ""
    }
}

export default (state = initialState, { type, payload }: any) => {
    switch (type) {

        case "FETCH_CATEGORY":
            return {
                ...state,
                data: payload,
                temp: payload
            }

        case "SEARCH_CATEGORY":
            return {
                ...state,
                data: payload
            }

        case "SELECTED_CATEGORY":
            return {
                ...state,
                selected: payload
            }

        default:
            return state
    }
}
