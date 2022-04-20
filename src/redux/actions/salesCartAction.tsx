import { ProductResultProps, CartProps } from "@types";
import { store } from "../store";

const addSalesCart = (value: ProductResultProps) => {
    const data = {
        id: value.kode,
        name: value.nama,
        price: value.harga_jual,
        priceList: value.harga,
        qty: 1,
        unit: {
            id: value.satuan_id,
            name: value.satuan
        },
        discount: 0,
        total: value.harga_jual,
        stok: parseInt(value.stok)
    }

    return {
        type: "ADD_SALES_CART",
        payload: data
    }
}


const updateSalesCart = (value: CartProps[]) => {
    return {
        type: "UPDATE_SALES_CART",
        payload: value
    }
}

const deleteSalesCart = (id: string) => {
    const cart = store.getState().salesCart.data;
    const data = cart.filter((item: CartProps) => item.id !== id);
    return {
        type: "DELETE_SALES_CART",
        payload: data
    }
}

const emptySalesCart = () => {
    return {
        type: "EMPTY_SALES_CART",
        payload: []
    }
}

export { addSalesCart, updateSalesCart, deleteSalesCart, emptySalesCart }