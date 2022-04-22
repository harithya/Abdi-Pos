import { ProductResultProps, CartProps } from "@types";
import { store } from "../store";

const addQueueCart = (value: ProductResultProps) => {
    const data = {
        id: value.kode,
        name: value.nama,
        price: value.harga[0].harga_jual,
        priceList: value.harga,
        qty: 1,
        unit: {
            id: value.harga[0].satuan_id,
            name: value.harga[0].satuan
        },
        discount: 0,
        total: value.harga_jual,
        stok: parseInt(value.stok),
        img: value.foto,
        description: value.keterangan ?? '-'
    }

    return {
        type: "ADD_QUEUE_CART",
        payload: data
    }
}


const updateQueueCart = (value: CartProps[]) => {
    return {
        type: "UPDATE_QUEUE_CART",
        payload: value
    }
}

const deleteQueueCart = (id: string) => {
    const cart = store.getState().queueCart.data;
    const data = cart.filter((item: CartProps) => item.id !== id);
    return {
        type: "DELETE_QUEUE_CART",
        payload: data
    }
}

const emptyQueueCart = () => {
    return {
        type: "EMPTY_QUEUE_CART",
        payload: []
    }
}

export { addQueueCart, updateQueueCart, deleteQueueCart, emptyQueueCart }