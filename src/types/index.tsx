import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import RootStackList from './page-types';

export type PageProps<RouteName extends keyof RootStackList = keyof RootStackList> = NativeStackScreenProps<RootStackList, RouteName>;
export type useNavigationProps = NativeStackNavigationProp<RootStackList>;

export interface ReducerProps {
    type: string,
    payload: any
}

export interface FileProps {
    id?: number,
    name: string,
    type: string,
    uri: string
}

//STATE Props
export interface LayoutStateProps {
    data: "grid" | "list"
}

export interface SearchStateProps {
    data: string
}

export interface AuthStateProps {
    id: number | null,
    name: string,
    avatar: string,
    spesialist: string,
    address?: string,
    phone?: string
}

export interface CategoryStateProps {
    data: CategoryResultProps[],
    temp: CategoryResultProps[],
    selected: CategoryResultProps
}

export interface CustomerStateProps {
    data: CustomerResultProps | null,
}


export interface CartStateProps {
    data: CartProps[]
}

export interface UnitProps {
    id: number,
    name: string
}
export interface CartProps {
    id: string,
    name: string,
    price: number,
    priceList: PriceProductResultProps[],
    qty: number,
    unit: UnitProps,
    discount: number,
    total: number,
    stok: number
}

//pagination
export interface PaginationProps {
    current_page: number,
    data?: Array<any>,
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: null;
    path: string;
    per_page: number;
    prev_page_url: null;
    to: number;
    total: number;
}

interface Link {
    url: null | string;
    label: string;
    active: boolean;
}


// Htpp request response
export interface UserResultProps {
    id: number,
    alamat: string,
    avatar?: string,
    nama: string,
    spesialis: string,
    username: string,
    no_hp?: string
}

export interface CategoryResultProps {
    id: number,
    nama: string
}

export interface CustomerResultProps {
    id: number;
    nama: string;
    tanggal_lahir: string;
    no_hp: string;
    jenis_kelamin: string;
    alamat: string;
    jenis_identitas_id?: any;
    no_identitas?: any;
    alergi_khusus?: any;
    keterangan: string;
    golongan_darah?: any;
}


export interface ProductResultProps {
    kode: string;
    nama: string;
    harga_beli: number;
    stok_awal?: null | number;
    foto: string;
    kategori_produk_id: number;
    jenis_produk_id: number;
    kategori: string;
    jenis: string;
    stok: string;
    satuan: string;
    satuan_id: number;
    harga_jual: number;
    harga: PriceProductResultProps[];
}

export interface PriceProductResultProps {
    id: number;
    harga_jual: number;
    satuan_id: number;
    produk_kode: string;
    status: number;
    jumlah: string;
    jumlah_satuan_utama: string;
    satuan: string;
}