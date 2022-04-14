import { CustomerResultProps } from "@types";

const selectedCustomer = (item: CustomerResultProps) => {
    return {
        type: "SELECTED_CUSTOMER",
        payload: item
    }
}

const removeCustomer = () => {
    return {
        type: "REMOVE_CUSTOMER",
        payload: null
    }
}

export { selectedCustomer, removeCustomer }