import moment from "moment";
import DeviceInfo from 'react-native-device-info';

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
    formatNumber: (number: number) => {
        var rupiah = '';
        var angkarev = number.toString().split('').reverse().join('');
        for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
        return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('');
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
    }


}


export default helper