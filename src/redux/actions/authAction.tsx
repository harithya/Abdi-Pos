import { UserResultProps } from "@types"

const setProfile = (value: UserResultProps) => {
    return {
        type: "SET_PROFILE_AUTH",
        payload: {
            id: value.id,
            name: value.nama,
            avatar: value.avatar,
            spesialist: value.spesialis,
            address: value.alamat,
            phone: value.no_hp
        }
    }
}

export { setProfile }