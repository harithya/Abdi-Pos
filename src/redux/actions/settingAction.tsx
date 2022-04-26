import { http } from "@services";

const fetchSetting = () => {
    return async (dispatch: any) => {
        const req = await http.get("pengaturan");
        dispatch({
            type: "FETCH_SETTING",
            payload: {
                id: req.data.result.id,
                name: req.data.result.nama,
                phone: req.data.result.no_hp,
                adress: req.data.result.alamat,
                logo: req.data.result.logo,
                footer: req.data.result.footer,
            }
        })
    }
}

export { fetchSetting }