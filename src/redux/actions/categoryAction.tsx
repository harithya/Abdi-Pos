import { http } from "@services"
import { CategoryResultProps } from "@types";
import { store } from "../store";

const fetchCategory = () => {
    return async (dispatch: any) => {
        const req = await http.get("master/kategori");
        dispatch({
            type: "FETCH_CATEGORY",
            payload: req.data.result
        })
    }
}

const searchCategory = (keyword: string) => {
    const data = store.getState().category.temp
    const result = data.filter((item: CategoryResultProps) => {
        return item.nama.toLowerCase().includes(keyword.toLowerCase())
    })

    return {
        type: "SEARCH_CATEGORY",
        payload: result
    }
}

const selectedCategory = (item: CategoryResultProps) => {
    return {
        type: "SELECTED_CATEGORY",
        payload: item
    }
}


export { fetchCategory, searchCategory, selectedCategory }