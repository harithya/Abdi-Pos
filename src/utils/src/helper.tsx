import { PriceProductResultProps, CartProps } from "@types";
import moment from "moment";
import { Dimensions } from "react-native";
import DeviceInfo from 'react-native-device-info';
import store from "src/redux/store";


interface StokProps {
    qty: number,
    priceList: PriceProductResultProps[],
    unitID: number,
    stok: string
}
const helper = {
    space: (index: number, marginValue = 20) => {
        if (index !== 0) {
            return {
                marginLeft: marginValue
            }
        } else {
            return undefined
        }
    },

    hexToRgb: (hex: string, opacity: number) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        const res = result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
        return `rgba(${res?.r.toString()}, ${res?.g.toString()}, ${res?.b.toString()},${opacity} )`;
    },

    getColor: (color: string) => {
        return {
            backgroundColor: color
        }
    },

    imagePlaceholder: (initial: string) => {
        return `https://ui-avatars.com/api/?background=2DDA93&color=fff&name=${initial}&size=128`
    },

    date: (date: any) => {
        return moment(date).format("D MMMM YYYY");
    },

    getGender: (initial: string) => {
        if (initial === "L") {
            return "Laki-laki";
        } else {
            return "Perempuan"
        }
    },

    ucwords: (str: string) => {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    },

    removeUnderScore: (str: string) => {
        return str.replace(/_/g, " ");
    },

    // format number to idr
    formatNumber: (number: number, prefix = true, defaultNumber = 0) => {
        var rupiah = '';
        var angkarev = number.toString().split('').reverse().join('');
        for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
        return (prefix ? 'Rp. ' : '') + rupiah.split('', rupiah.length - 1).reverse().join('');
    },

    defaultNumber: (idr: string) => {
        const data = idr.replace(/[^0-9]/g, '');
        if (parseInt(data) === 0 || data === "") {
            return '-';
        } else {
            return idr;
        }
    },

    inputNumber: (value: string) => {
        return value?.replace(/\./g, '')
    },

    isTablet: () => {
        return DeviceInfo.isTablet();
    },

    // create function to get initial name
    getInitial: (name: string) => {
        var parts = name.split(' ')
        var initials = ''
        for (var i = 0; i < parts.length; i++) {
            if (parts[i].length > 0 && parts[i] !== '') {
                initials += parts[i][0]
            }
        }
        return initials.slice(0, 2).toUpperCase()
    },

    getLimitPage: () => {
        if (store.getState().layout.data == "grid") {
            if (DeviceInfo.isTablet()) {
                return 15
            } else {
                return 14
            }
        } else {
            return 14
        }
    },

    // getStok: ({ qty, priceList, unitID, stok }: StokProps) => {
    //     const unit = priceList.find(item => item.satuan_id == unitID);
    //     const stokUnit = (unit?.jumlah ? parseInt(unit?.jumlah) : 1)
    //     const stokMaster = (unit?.jumlah_satuan_utama ? parseInt(unit?.jumlah_satuan_utama) : 0);

    //     return ((parseInt(stok) - qty) / stokUnit) / stokMaster;
    // },

    getTotalCart: () => {
        const cart = store.getState().salesCart.data;
        let total = 0;
        cart.forEach((item: CartProps) => {
            total += item.qty * (item.price - item.discount);
        })
        return total;
    }

}


export default helper