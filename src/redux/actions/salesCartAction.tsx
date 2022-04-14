import { ProductResultProps, SalesCartProps } from "@types";

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
        total: value.harga_jual,
        stok: parseInt(value.stok)
    }

    return {
        type: "ADD_SALES_CART",
        payload: data
    }
}


const updateSalesCart = (value: SalesCartProps[]) => {
    return {
        type: "UPDATE_SALES_CART",
        payload: value
    }
}

export { addSalesCart, updateSalesCart }