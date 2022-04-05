import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import RootStackList from './page-types';

export type PageProps<RouteName extends keyof RootStackList = keyof RootStackList> = NativeStackScreenProps<RootStackList, RouteName>;
export type useNavigationProps = NativeStackNavigationProp<RootStackList>;

export interface FileProps {
    id?: number,
    name: string,
    type: string,
    uri: string
}

export interface BodyCheckProps {
    id: number,
    name: string,
    img: string,
    value?: string
}
export interface BodyCheckStateProps {
    data: BodyCheckProps[]
}


export interface ReducerProps {
    type: string,
    payload: any
}


export interface SupportStateProps {
    data: {
        note: string,
        files: FileProps[]
    }
}

export interface MedicineProps {
    id: string,
    name: string,
    note?: string
}
export interface MedicineStateProps {
    data: MedicineProps[]
}

export interface SearchStateProps {
    data: string
}

export interface MedicalRecordProps {
    complaint?: string,
    diagnosis?: string,
    diagnosisStatus?: string,
    execution?: string,
}

export interface MedicalRecordStateProps {
    data: MedicalRecordProps
}

export interface VitalSignProps {
    sistole_tension: string,
    diastole_tension: string,
    pulse: string,
    temperature: string,
    respiration: string,
    height: string,
    weight: string,
}

export interface VitalSignStateProps {
    data: VitalSignProps
}

export interface AuthStateProps {
    id: number | null,
    name: string,
    avatar: string,
    spesialist: string,
    address?: string,
    phone?: string
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

export interface OrganResultProps {
    id: number,
    organ: string,
    img: string
}

export interface MedicineResultProps {
    kode: string;
    nama: string;
    harga_beli: number;
    stok_awal?: null | number;
    foto: string;
    kategori_produk_id: number;
    jenis_produk_id: number;
    kategori: string;
    jenis: string;
}

export interface QueueResultProps {
    id: number;
    tanggal: string;
    no_antrian: string;
    status: number;
    pasien_id: number;
    user_id: number;
    pasien: string;
    dokter: string;
    layanan: string,
    no_identitas?: string
}

export interface VitalSignResultProps {
    id: number;
    tensi_sistole: number;
    tensi_diastole: number;
    nadi: number;
    suhu: number;
    respirasi: number;
    tinggi_badan: number;
    rekap_medis_no_rekap: string;
    berat_badan: number;
    tanggal: string;
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

export interface MedicalRecordResultProps {
    no_rekap: string;
    tanggal: string;
    pasien_id: number;
    users_id: number;
    keluhan: string;
    diagnosa: string;
    status: number;
    tata_laksana: string;
    penunjang: string;
    transaksi_kode: string;
    nama: string;
}

//SCREEN 
export interface QueueScreenProps {
    id: number,
    pattientId: number,
    name: string,
    service: string,
    idNumber?: string
}

export interface PattientDetailProps {
    pattientId: number,
    isActive?: boolean
}

export interface PattientScreenProps extends PattientDetailProps {
    name?: string,
    idNumber?: string,
}
